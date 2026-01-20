"""SHACL validation module."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import List

from .utils import get_workspace_root, print_err, split_csv


@dataclass
class ShaclConfig:
    """Configuration for SHACL validation.
    
    Attributes:
        data_file: Path to data graph file (TTL/JSON-LD)
        shapes_file: Path to SHACL shapes file (TTL)
        extras_csv: Comma-separated list of extra TTL files to merge into data
        output_format: Output format (human, text, turtle, json-ld)
    """

    data_file: Path
    shapes_file: Path
    extras_csv: str = ""
    output_format: str = "human"


def _load_graph(path: Path):
    """Load an RDF graph from file.
    
    Args:
        path: Path to RDF file
        
    Returns:
        rdflib Graph object
        
    Raises:
        ImportError: If rdflib is not available
    """
    from rdflib import Graph

    try:
        from urllib.error import HTTPError, URLError
    except Exception:  # pragma: no cover
        HTTPError = None  # type: ignore[assignment]
        URLError = None  # type: ignore[assignment]

    graph = Graph()
    try:
        graph.parse(str(path))
    except Exception as exc:
        # Common case for JSON-LD: remote @context fetch fails (HTTP 404, DNS, etc.)
        if HTTPError is not None and isinstance(exc, HTTPError):
            url = getattr(exc, "url", None) or "(unknown URL)"
            code = getattr(exc, "code", None)
            code_str = f"HTTP {code}" if code is not None else "HTTP error"
            raise RuntimeError(
                "No s'ha pogut carregar RDF des del fitxer: "
                f"{path}\n"
                f"Motiu: {code_str} en intentar descarregar un recurs remot: {url}\n"
                "Això acostuma a passar quan el JSON-LD té un @context (o imports) remot que no existeix o no és accessible.\n"
                "Solució: usa un @context local (p. ex. build/<version>/*.context.jsonld) o arregla la URL perquè sigui accessible."
            ) from exc

        if URLError is not None and isinstance(exc, URLError):
            reason = getattr(exc, "reason", None)
            reason_str = f"{reason}" if reason is not None else "(unknown reason)"
            raise RuntimeError(
                "No s'ha pogut carregar RDF des del fitxer: "
                f"{path}\n"
                "Motiu: error d'accés a recurs remot (URLError): "
                f"{reason_str}\n"
                "Revisa el @context JSON-LD (i qualsevol import remot) o fes-lo local."
            ) from exc

        raise RuntimeError(
            "No s'ha pogut carregar/parsejar RDF des del fitxer: "
            f"{path}\n"
            f"Motiu: {exc}"
        ) from exc
    return graph


def _get_extra_files(config: ShaclConfig) -> List[Path]:
    """Get list of extra files to merge into data graph.
    
    Args:
        config: SHACL validation configuration
        
    Returns:
        List of paths to extra files
    """
    workspace_root = get_workspace_root()
    extras: List[Path] = []
    
    if config.extras_csv:
        for part in split_csv(config.extras_csv):
            p = workspace_root / Path(part)
            if p.exists() and p not in extras:
                extras.append(p)
    
    return extras


def _print_config(config: ShaclConfig, extras: List[Path]) -> None:
    """Print SHACL validation configuration.
    
    Args:
        config: SHACL validation configuration
        extras: List of extra files
    """
    workspace_root = get_workspace_root()
    
    print(
        f"[SHACL] Data   : "
        f"{config.data_file.relative_to(workspace_root).as_posix()}"
    )
    print(
        f"[SHACL] Shapes : "
        f"{config.shapes_file.relative_to(workspace_root).as_posix()}"
    )
    print(f"[SHACL] Format : {config.output_format}")
    
    if extras:
        print(f"[SHACL] Extras ({len(extras)}):")
        for p in extras:
            print(f"  - {p.relative_to(workspace_root).as_posix()}")
    else:
        print("[SHACL] Extras : (cap)")


def _merge_extras_into_data(data_graph, extras: List[Path]):
    """Merge extra RDF files into data graph.
    
    Args:
        data_graph: Main data graph
        extras: List of extra file paths to merge
    """
    for p in extras:
        extra_graph = _load_graph(p)
        for triple in extra_graph:
            data_graph.add(triple)


def _serialize_report(report_graph, report_text: str, output_format: str) -> int:
    """Serialize validation report to specified format.

    Args:
        report_graph: Validation report graph
        report_text: Human-readable validation report text
        output_format: Output format (human, text, turtle, json-ld)

    Returns:
        Exit code (0 for success, 2 for error)
    """
    from rdflib import Graph as RDFGraph
    
    fmt = output_format.lower()
    
    if fmt in {"human", "text"}:
        print(report_text)
        return 0
    
    if fmt == "turtle":
        if isinstance(report_graph, RDFGraph):
            print(report_graph.serialize(format="turtle"))
        elif isinstance(report_graph, (bytes, bytearray)):
            print(report_graph.decode("utf-8", errors="replace"))
        else:
            print_err(
                "[SHACL] No es pot serialitzar el report graph a turtle."
            )
            return 2
    elif fmt in {"json-ld", "jsonld"}:
        if isinstance(report_graph, RDFGraph):
            print(report_graph.serialize(format="json-ld", indent=2))
        elif isinstance(report_graph, (bytes, bytearray)):
            print(report_graph.decode("utf-8", errors="replace"))
        else:
            print_err(
                "[SHACL] No es pot serialitzar el report graph a json-ld."
            )
            return 2
    else:
        print_err(f"[SHACL] Format desconegut: {output_format}")
        return 2
    
    return 0


def validate_shacl(config: ShaclConfig) -> int:
    """Validate RDF data against SHACL shapes.
    
    This function will:
    1. Load data graph and shapes graph
    2. Merge any extra files into data graph
    3. Run SHACL validation with pyshacl
    4. Output results in specified format
    
    Args:
        config: SHACL validation configuration
        
    Returns:
        Exit code (0 for conformance, 1 for violations, 2 for errors)
    """
    # Check file existence
    if not config.data_file.exists():
        print_err(f"[SHACL] Data file no existeix: {config.data_file}")
        return 2
    if not config.shapes_file.exists():
        print_err(f"[SHACL] Shapes file no existeix: {config.shapes_file}")
        return 2
    
    # Get extra files
    extras = _get_extra_files(config)
    
    # Print configuration
    _print_config(config, extras)
    
    # Run validation
    try:
        from pyshacl import validate
        
        # Load graphs
        data_graph = _load_graph(config.data_file)
        _merge_extras_into_data(data_graph, extras)
        shacl_graph = _load_graph(config.shapes_file)
        
        # Validate
        conforms, report_graph, report_text = validate(
            data_graph=data_graph,
            shacl_graph=shacl_graph,
            meta_shacl=True,
            inference="rdfs",
            advanced=True,
            abort_on_first=False,
            allow_infos=True,
            allow_warnings=True,
        )
        
        # Serialize output
        print(f"[SHACL] Conforms: {'true' if conforms else 'false'}")

        status = _serialize_report(report_graph, report_text, config.output_format)
        if status != 0:
            return status
        
        return 0 if conforms else 1
    
    except ImportError as exc:
        print_err(f"[SHACL] pyshacl no està instal·lat: {exc}")
        return 2
    except Exception as exc:
        # If the exception already provides a helpful multi-line message, keep it.
        msg = str(exc)
        if "\n" in msg:
            print_err(f"[SHACL] Error executant validació:\n{msg}")
        else:
            print_err(f"[SHACL] Error executant validació: {msg}")
        return 2
