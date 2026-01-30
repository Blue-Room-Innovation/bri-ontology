#!/usr/bin/env python3
"""SHACL to JSON-LD Context Generator

Generates a simple JSON-LD @context from a SHACL shapes file.

Goal:
- Enable JSON instances that use *local names* (e.g. managerCode, name, lat)
  while keeping RDF semantics via the context mapping.

Notes:
- This script generates a *baseline* context: each RDF property IRI becomes a
  JSON term using its local-name. If collisions occur (same local-name used by
  different namespaces), it falls back to <prefix>_<localName> for the
  conflicting terms.
- It cannot infer domain-specific aliases like "recyclerName" unless those
  aliases are provided via external mapping/annotations.
"""

from __future__ import annotations

import argparse
import json
import logging
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, Optional, Set, Tuple

from rdflib import Graph, RDF, URIRef
from rdflib.namespace import SH, OWL
from urllib.parse import urlparse, unquote

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)


def _local_name(uri: str) -> str:
    if "#" in uri:
        return uri.rsplit("#", 1)[-1]
    if "/" in uri:
        return uri.rsplit("/", 1)[-1]
    return uri


def _qname(graph: Graph, uri: URIRef) -> Optional[str]:
    try:
        return graph.namespace_manager.qname(uri)
    except Exception:
        return None


def _graph_prefixes(graph: Graph) -> Dict[str, str]:
    # rdflib pre-registers many namespaces; keep only those that are actually used.
    declared: Dict[str, str] = {p: str(ns) for p, ns in graph.namespaces()}
    used: Set[str] = set()

    def mark(term: object) -> None:
        if not isinstance(term, URIRef):
            return
        qn = _qname(graph, term)
        if qn and ":" in qn:
            pfx, _suffix = qn.split(":", 1)
            used.add(pfx)

    for s, p, o in graph:
        mark(s)
        mark(p)
        mark(o)

    # Ensure common prefixes are present if used via term values
    return {p: declared[p] for p in sorted(used) if p in declared}


def _iter_property_paths(graph: Graph) -> Iterable[URIRef]:
    # SHACL property shapes are blank nodes referenced via sh:property
    for shape in graph.subjects(RDF.type, SH.NodeShape):
        for prop_shape in graph.objects(shape, SH.property):
            path = graph.value(prop_shape, SH.path)
            if isinstance(path, URIRef):
                yield path


def _iter_target_classes(graph: Graph) -> Iterable[URIRef]:
    for shape in graph.subjects(RDF.type, SH.NodeShape):
        for target_class in graph.objects(shape, SH.targetClass):
            if isinstance(target_class, URIRef):
                yield target_class


@dataclass
class TermChoice:
    term: str
    iri: str


def build_context_from_shacl(graph: Graph) -> Dict[str, object]:
    prefixes = _graph_prefixes(graph)

    # Candidate term mappings: localName -> iri
    local_to_iri: Dict[str, str] = {}
    collisions: Dict[str, Set[str]] = {}

    def add_candidate(uri: URIRef) -> None:
        iri = str(uri)
        local = _local_name(iri)
        prev = local_to_iri.get(local)
        if prev is None:
            local_to_iri[local] = iri
        elif prev != iri:
            collisions.setdefault(local, set()).update({prev, iri})

    # Properties
    for path in _iter_property_paths(graph):
        add_candidate(path)

    # Classes (so JSON-LD can use "@type": "LocalName")
    for target_class in _iter_target_classes(graph):
        add_candidate(target_class)

    # Build final terms, resolving collisions
    terms: Dict[str, str] = {}

    for local, iri in sorted(local_to_iri.items()):
        if local in collisions:
            # Do not use plain local name for colliding IRIs.
            continue
        qn = _qname(graph, URIRef(iri))
        # Prefer CURIE in values if available, else full IRI.
        terms[local] = qn if qn else iri

    if collisions:
        logger.warning("Found %d local-name collisions; using prefixed fallback terms", len(collisions))
        for local, iris in sorted(collisions.items()):
            for iri in sorted(iris):
                qn = _qname(graph, URIRef(iri))
                if qn and ":" in qn:
                    prefix, _suffix = qn.split(":", 1)
                    fallback = f"{prefix}_{local}"
                else:
                    fallback = f"iri_{local}"
                # If still collides, append a short hash-like suffix.
                if fallback in terms and terms[fallback] != (qn if qn else iri):
                    fallback = f"{fallback}_{abs(hash(iri)) % 10000}"
                terms[fallback] = qn if qn else iri

    # Compose @context: prefixes + terms
    ctx: Dict[str, object] = {}
    # Keep prefixes first (readability)
    for prefix, ns in sorted(prefixes.items()):
        ctx[prefix] = ns
    # Then terms
    for term, value in sorted(terms.items()):
        ctx[term] = value

    return {
        "@version": 1.1,
        "@protected": True,
        "@context": ctx,
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate a JSON-LD context from a SHACL shapes Turtle file"
    )
    parser.add_argument("-i", "--input", required=True, help="Input SHACL shapes file (TTL)")
    parser.add_argument("-o", "--output", required=True, help="Output JSON-LD context file")
    parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose output")

    args = parser.parse_args()
    if args.verbose:
        logger.setLevel(logging.DEBUG)

    input_path = Path(args.input)
    if not input_path.exists():
        logger.error("Input file not found: %s", input_path)
        return 1

    graph = Graph()
    try:
        graph.parse(str(input_path), format="turtle")
        # Follow local owl:imports so extended profiles produce complete contexts.
        visited: Set[str] = {str(input_path.resolve())}

        def resolve_import_path(import_iri: str, base_dir: Path) -> Optional[Path]:
            try:
                parsed = urlparse(import_iri)
                if parsed.scheme in ("http", "https"):
                    return None
                if parsed.scheme == "file":
                    p = unquote(parsed.path)
                    if p.startswith("/") and len(p) >= 3 and p[2] == ":":
                        p = p[1:]
                    return Path(p)
            except Exception:
                pass

            candidate = Path(import_iri)
            if not candidate.is_absolute():
                candidate = base_dir / candidate
            return candidate

        def load_imports_recursive(base_file: Path):
            base_dir = base_file.parent
            for imported in list(graph.objects(None, OWL.imports)):
                if not isinstance(imported, URIRef):
                    continue
                import_path = resolve_import_path(str(imported), base_dir)
                if not import_path:
                    continue
                try:
                    import_path_abs = import_path.resolve()
                except Exception:
                    import_path_abs = import_path
                key = str(import_path_abs)
                if key in visited:
                    continue
                visited.add(key)
                if not import_path_abs.exists():
                    continue
                graph.parse(str(import_path_abs), format="turtle")
                load_imports_recursive(import_path_abs)

        load_imports_recursive(input_path.resolve())
    except Exception as e:
        logger.error("Failed to parse SHACL file: %s", e)
        return 1

    doc = build_context_from_shacl(graph)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8") as f:
        json.dump(doc, f, indent=2, ensure_ascii=False)
        f.write("\n")

    logger.info("✅ Wrote JSON-LD context to: %s", output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
