#!/usr/bin/env python
"""
Generador de wiki Markdown para ontologías Turtle en el directorio `ontology/`.

Requisitos:
    pip install -r requirements.txt

Uso:
    python scripts/generate-wiki.py [--ontology-dir ontology] [--output-dir wiki] [--include-codelists]

Produce:
    - wiki/index.md resumen global
    - wiki/<ontology-name>/README.md detalles (Clases, Propiedades de objeto, Propiedades de datos)

Características:
    - Extrae rdfs:label (multi-idioma) y rdfs:comment
    - Fallback al localName cuando falta label
    - Dominios y rangos de propiedades
    - Subclases
    - Manejo de duplicados y orden estable

Limitaciones:
    - No procesa axiomas complejos (restricciones OWL) todavía.
    - Las codelists se incluyen solo si se pasa --include-codelists.
"""
import argparse
import os
from pathlib import Path
from typing import List, Dict, Tuple
import rdflib
from rdflib import RDF, RDFS, OWL

# Namespaces comunes
SKOS = rdflib.Namespace("http://www.w3.org/2004/02/skos/core#")

def slug(uri: rdflib.term.Identifier) -> str:
    s = str(uri)
    if '#' in s:
        s = s.split('#')[-1]
    else:
        s = s.rstrip('/').split('/')[-1]
    return "".join(c if c.isalnum() else '-' for c in s).strip('-').lower()

def local_name(uri: rdflib.term.Identifier) -> str:
    s = str(uri)
    if '#' in s:
        return s.split('#')[-1]
    return s.rstrip('/').split('/')[-1]

def get_labels(g: rdflib.Graph, subject) -> Dict[str, List[str]]:
    labels: Dict[str, List[str]] = {}
    for p in [RDFS.label, SKOS.prefLabel]:
        for lbl in g.objects(subject, p):
            lang = getattr(lbl, 'language', None) or 'und'
            labels.setdefault(lang, []).append(str(lbl))
    return labels

def get_comments(g: rdflib.Graph, subject) -> Dict[str, List[str]]:
    comments: Dict[str, List[str]] = {}
    for c in g.objects(subject, RDFS.comment):
        lang = getattr(c, 'language', None) or 'und'
        comments.setdefault(lang, []).append(str(c))
    return comments

def format_multilang(d: Dict[str, List[str]]) -> str:
    if not d:
        return ''
    lines = []
    # Priorizar es, en, und
    order = sorted(d.keys(), key=lambda k: (k != 'es', k != 'en', k))
    for lang in order:
        values = sorted(set(d[lang]))
        for v in values:
            lines.append(f"- ({lang}) {v}")
    return '\n'.join(lines)

def extract_entities(g: rdflib.Graph, rdf_type) -> List[rdflib.term.Identifier]:
    return sorted(set(g.subjects(RDF.type, rdf_type)), key=lambda u: str(u))

def build_index_row(name: str, classes: int, obj_props: int, data_props: int) -> str:
    return f"| {name} | {classes} | {obj_props} | {data_props} |"

def generate_readme(g: rdflib.Graph, ontology_file: Path) -> str:
    classes = extract_entities(g, OWL.Class)
    obj_props = extract_entities(g, OWL.ObjectProperty)
    data_props = extract_entities(g, OWL.DatatypeProperty)

    lines: List[str] = []
    lines.append(f"# Ontología: {ontology_file.name}")
    lines.append("")
    lines.append(f"Fuente: `{ontology_file}`")
    lines.append("")
    lines.append("## Resumen")
    lines.append("")
    lines.append(f"- Clases: {len(classes)}")
    lines.append(f"- Propiedades de Objeto: {len(obj_props)}")
    lines.append(f"- Propiedades de Datos: {len(data_props)}")
    lines.append("")

    if classes:
        lines.append("## Clases")
        lines.append("")
        for c in classes:
            cname = local_name(c)
            labels = get_labels(g, c)
            comments = get_comments(g, c)
            subclasses = [local_name(o) for o in g.objects(c, RDFS.subClassOf)]
            lines.append(f"### {cname}")
            lines.append("")
            if labels:
                lines.append("**Labels:**")
                lines.append(format_multilang(labels))
            if comments:
                lines.append("**Comentarios:**")
                lines.append(format_multilang(comments))
            if subclasses:
                lines.append("**SubClassOf:** " + ", ".join(subclasses))
            lines.append("")

    if obj_props:
        lines.append("## Propiedades de Objeto")
        lines.append("")
        for p in obj_props:
            pname = local_name(p)
            labels = get_labels(g, p)
            comments = get_comments(g, p)
            domains = [local_name(o) for o in g.objects(p, RDFS.domain)]
            ranges = [local_name(o) for o in g.objects(p, RDFS.range)]
            lines.append(f"### {pname}")
            lines.append("")
            if labels:
                lines.append("**Labels:**")
                lines.append(format_multilang(labels))
            if comments:
                lines.append("**Comentarios:**")
                lines.append(format_multilang(comments))
            if domains:
                lines.append("**Domain:** " + ", ".join(domains))
            if ranges:
                lines.append("**Range:** " + ", ".join(ranges))
            lines.append("")

    if data_props:
        lines.append("## Propiedades de Datos")
        lines.append("")
        for p in data_props:
            pname = local_name(p)
            labels = get_labels(g, p)
            comments = get_comments(g, p)
            domains = [local_name(o) for o in g.objects(p, RDFS.domain)]
            ranges = [local_name(o) for o in g.objects(p, RDFS.range)]
            lines.append(f"### {pname}")
            lines.append("")
            if labels:
                lines.append("**Labels:**")
                lines.append(format_multilang(labels))
            if comments:
                lines.append("**Comentarios:**")
                lines.append(format_multilang(comments))
            if domains:
                lines.append("**Domain:** " + ", ".join(domains))
            if ranges:
                lines.append("**Range:** " + ", ".join(ranges))
            lines.append("")

    return '\n'.join(lines) + '\n'

def main():
    parser = argparse.ArgumentParser(description="Genera wiki Markdown desde ontologías Turtle.")
    parser.add_argument('--ontology-dir', default='ontology', help='Directorio con archivos .ttl')
    parser.add_argument('--output-dir', default='wiki', help='Directorio de salida para Markdown')
    parser.add_argument('--include-codelists', action='store_true', help='Incluir ontologías dentro de codelists')
    args = parser.parse_args()

    ontology_dir = Path(args.ontology_dir)
    out_dir = Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    ttl_files: List[Path] = []
    for root, _, files in os.walk(ontology_dir):
        for f in files:
            if f.endswith('.ttl'):
                fp = Path(root) / f
                # argparse convierte '--include-codelists' a atributo 'include_codelists'
                if not args.include_codelists and 'codelists' in fp.parts:
                    continue
                ttl_files.append(fp)

    ttl_files = sorted(ttl_files)

    index_lines = ["# Índice de Ontologías", "", "| Ontología | #Clases | #ObjProps | #DataProps |", "|-----------|---------|-----------|-----------|"]

    for ttl in ttl_files:
        g = rdflib.Graph()
        g.parse(str(ttl), format='turtle')
        classes = extract_entities(g, OWL.Class)
        obj_props = extract_entities(g, OWL.ObjectProperty)
        data_props = extract_entities(g, OWL.DatatypeProperty)

        name = ttl.stem
        index_lines.append(build_index_row(name, len(classes), len(obj_props), len(data_props)))

        ont_out_dir = out_dir / name
        ont_out_dir.mkdir(parents=True, exist_ok=True)
        readme_content = generate_readme(g, ttl)
        (ont_out_dir / 'README.md').write_text(readme_content, encoding='utf-8')

    (out_dir / 'index.md').write_text('\n'.join(index_lines) + '\n', encoding='utf-8')
    print(f"Generado wiki para {len(ttl_files)} ontologías en {out_dir}")

if __name__ == '__main__':
    main()
