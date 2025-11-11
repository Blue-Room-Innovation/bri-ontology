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
from typing import List, Dict, Tuple, Optional
import rdflib
from rdflib import RDF, RDFS, OWL
try:
    from graphviz import Digraph  # type: ignore
except ImportError:  # pragma: no cover
    Digraph = None  # type: ignore

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

def extract_metadata(g: rdflib.Graph) -> Dict[str, List[str]]:
    """Extrae metadatos simples del grafo (title, description, creator, contributor, version, date, imports).
    Intenta múltiples propiedades estándar (DC, DCTERMS, OWL) para cada campo.
    """
    DC = rdflib.Namespace('http://purl.org/dc/elements/1.1/')
    DCT = rdflib.Namespace('http://purl.org/dc/terms/')
    METADATA_PREDICATES = {
        'title': [DCT.title, DC.title],
        'description': [DCT.description, DC.description],
        'creator': [DCT.creator, DC.creator],
        'contributor': [DCT.contributor, DC.contributor],
        'date': [DCT.date, DC.date],
        'version': [OWL.versionInfo],
        'imports': [OWL.imports],
    }
    # Buscar el nodo de la ontología
    ontology_nodes = list(g.subjects(RDF.type, OWL.Ontology))
    meta: Dict[str, List[str]] = {}
    for ont in ontology_nodes:
        for key, preds in METADATA_PREDICATES.items():
            for p in preds:
                for o in g.objects(ont, p):
                    meta.setdefault(key, []).append(str(o))
    return meta


def generate_readme(g: rdflib.Graph, ontology_file: Path, rich: bool = False, mermaid: bool = False) -> str:
    classes = extract_entities(g, OWL.Class)
    obj_props = extract_entities(g, OWL.ObjectProperty)
    data_props = extract_entities(g, OWL.DatatypeProperty)

    lines: List[str] = []
    if not rich:
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
    else:
        meta = extract_metadata(g)
        pretty_name = ontology_file.stem
        lines.append(f"# {pretty_name} Ontology")
        lines.append("")
        if 'title' in meta:
            lines.append(f"**Title:**  {meta['title'][0]}")
        if 'description' in meta:
            lines.append(f"**Description:**  {meta['description'][0]}")
        if 'creator' in meta:
            creators = ', '.join(meta['creator'])
            lines.append(f"**Creator:**  {creators}")
        if 'contributor' in meta:
            contributors = ', '.join(meta['contributor'])
            lines.append(f"**Contributor:**  {contributors}")
        if 'date' in meta:
            lines.append(f"**Date:**  {meta['date'][0]}")
        if 'version' in meta:
            lines.append(f"**Version:**  {meta['version'][0]}")
        if 'imports' in meta:
            lines.append(f"**Imports:**  {' , '.join(meta['imports'])}")
        lines.append("**Link to ontology:**  " + str(ontology_file))
        lines.append("")
        # Mermaid class diagram
        if mermaid:
            lines.append("```mermaid")
            lines.append("classDiagram")
            # Simple attributes from datatype properties (domain -> property -> range)
            # Collect datatype properties per class
            dt_by_class: Dict[str, List[Tuple[str,str]]] = {}
            for dp in data_props:
                domains = list(g.objects(dp, RDFS.domain))
                ranges = list(g.objects(dp, RDFS.range))
                if not domains:
                    continue
                rng_text = ranges[0] if ranges else ''
                for d in domains:
                    cname = local_name(d)
                    dt_by_class.setdefault(cname, []).append((local_name(dp), local_name(rng_text) if rng_text else ''))
            # Class declarations
            for c in classes:
                cname = local_name(c)
                lines.append(f"   class {cname}{{")
                for (prop, rng) in dt_by_class.get(cname, []):
                    rng_disp = rng if rng else ''
                    lines.append(f"       {prop} {rng_disp}")
                lines.append("   }")
            # Object property relations
            for op in obj_props:
                pname = local_name(op)
                domains = list(g.objects(op, RDFS.domain))
                ranges = list(g.objects(op, RDFS.range))
                for d in domains:
                    for r in ranges:
                        lines.append(f"   {local_name(d)} --> {local_name(r)} : {pname}")
            # Subclass relations
            for c in classes:
                for sc in g.objects(c, RDFS.subClassOf):
                    if (sc, RDF.type, OWL.Class) in g or isinstance(sc, rdflib.term.URIRef):
                        lines.append(f"   {local_name(c)} --|> {local_name(sc)}")
            lines.append("```")
            lines.append("")

    if rich:
        # Rich tables similar to user example
        if classes:
            lines.append("## Classes")
            lines.append("\n|Name|Description|Datatype properties|Object properties|Subclass of|")
            lines.append("| :--- | :--- | :--- | :--- | :--- |")
            for c in classes:
                cname = local_name(c)
                comments = get_comments(g, c)
                desc = comments.get('es') or comments.get('en') or comments.get('und') or ['']
                desc_txt = desc[0]
                # Datatype props for this class
                dt_props = []
                for dp in data_props:
                    if (dp, RDF.type, OWL.DatatypeProperty) in g:
                        for d in g.objects(dp, RDFS.domain):
                            if local_name(d) == cname:
                                dt_props.append(f"[{local_name(dp)}](#{local_name(dp)})")
                # Object props for this class (as domain)
                op_props = []
                for op in obj_props:
                    for d in g.objects(op, RDFS.domain):
                        if local_name(d) == cname:
                            op_props.append(f"[{local_name(op)}](#{local_name(op)})")
                subclass_of = []
                for sc in g.objects(c, RDFS.subClassOf):
                    subclass_of.append(local_name(sc))
                # Tabla de clases (línea única)
                lines.append(f"|<span id=\"{cname}\">{cname}</span>|{desc_txt}|{', '.join(dt_props)}|{', '.join(op_props)}|{', '.join(subclass_of)}|")
        if data_props:
            lines.append("\n## Data Properties\n")
            lines.append("|Name|Description|Domain|Range|Subproperty of|")
            lines.append("| :--- | :--- | :--- | :--- | :--- |")
            for dp in data_props:
                pname = local_name(dp)
                comments = get_comments(g, dp)
                desc = comments.get('es') or comments.get('en') or comments.get('und') or ['']
                desc_txt = desc[0]
                domains = [f"[{local_name(d)}](#{local_name(d)})" for d in g.objects(dp, RDFS.domain)]
                ranges = [local_name(r) for r in g.objects(dp, RDFS.range)]
                subprops = [local_name(sp) for sp in g.objects(dp, RDFS.subPropertyOf)]
                lines.append(f"|<span id=\"{pname}\">{pname}</span>|{desc_txt}|{', '.join(domains)}|{', '.join(ranges)}|{', '.join(subprops)}|")
        if obj_props:
            lines.append("\n## Object Properties\n")
            lines.append("|Name|Descriptions|Domain|Range|Subproperty of|")
            lines.append("| :--- | :--- | :--- | :--- | :--- |")
            for op in obj_props:
                pname = local_name(op)
                comments = get_comments(g, op)
                desc = comments.get('es') or comments.get('en') or comments.get('und') or ['']
                desc_txt = ' '.join(desc)
                domains = [f"[{local_name(d)}](#{local_name(d)})" for d in g.objects(op, RDFS.domain)]
                ranges = [f"[{local_name(r)}](#{local_name(r)})" for r in g.objects(op, RDFS.range)]
                subprops = [local_name(sp) for sp in g.objects(op, RDFS.subPropertyOf)]
                lines.append(f"|<span id=\"{pname}\">{pname}</span>|{desc_txt}|{', '.join(domains)}|{', '.join(ranges)}|{', '.join(subprops)}|")
    else:
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

def generate_diagram(g: rdflib.Graph, ontology_file: Path, out_dir: Path, fmt: str = 'png', max_classes: int = 150) -> Optional[Path]:
    """Genera un diagrama simple de clases y propiedades de objeto.

    Reglas:
      - Nodo por clase OWL
      - Arista (domain -> range) para cada ObjectProperty con domain y range definidos
      - Si hay más de max_classes clases, se aborta para evitar diagramas ilegibles
    """
    if Digraph is None:
        return None
    classes = extract_entities(g, OWL.Class)
    if len(classes) > max_classes:
        return None
    obj_props = extract_entities(g, OWL.ObjectProperty)
    dot = Digraph(comment=f"Diagrama {ontology_file.stem}")
    dot.attr(rankdir='LR', fontsize='10')
    class_set = set(classes)
    # Añadir nodos con etiqueta (label principal o localName)
    for c in classes:
        labels = get_labels(g, c)
        label_txt = labels.get('es') or labels.get('en') or []
        if label_txt:
            title = label_txt[0]
        else:
            title = local_name(c)
        dot.node(local_name(c), title, shape='box')

    for p in obj_props:
        domains = list(g.objects(p, RDFS.domain))
        ranges = list(g.objects(p, RDFS.range))
        if not domains or not ranges:
            continue
        pname = local_name(p)
        for d in domains:
            for r in ranges:
                if d in class_set and r in class_set:
                    dot.edge(local_name(d), local_name(r), label=pname)

    out_path = out_dir / f"diagram.{fmt}"
    try:
        dot.format = fmt
        dot.render(out_path.with_suffix(''), cleanup=True)
        return out_path
    except Exception:
        return None


def main():
    parser = argparse.ArgumentParser(description="Genera wiki Markdown desde ontologías Turtle.")
    parser.add_argument('--ontology-dir', default='ontology', help='Directorio con archivos .ttl')
    parser.add_argument('--output-dir', default='wiki', help='Directorio de salida para Markdown')
    parser.add_argument('--include-codelists', action='store_true', help='Incluir ontologías dentro de codelists')
    parser.add_argument('--generate-diagrams', action='store_true', help='Generar diagramas Graphviz de clases y propiedades de objeto')
    parser.add_argument('--diagram-format', default='png', choices=['png','svg'], help='Formato de salida del diagrama (png|svg)')
    parser.add_argument('--format', choices=['basic','rich'], default='basic', help='Formato de salida de README por ontología')
    parser.add_argument('--mermaid', action='store_true', help='Incluir diagrama Mermaid en modo rich')
    parser.add_argument('--diagram-max-classes', type=int, default=150, help='Umbral máximo de clases para intentar generar diagrama')
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
        readme_content = generate_readme(g, ttl, rich=(args.format=='rich'), mermaid=args.mermaid)
        # Diagrama opcional
        if args.generate_diagrams:
            diagram_path = generate_diagram(
                g,
                ttl,
                ont_out_dir,
                fmt=args.diagram_format,
                max_classes=args.diagram_max_classes
            )
            if diagram_path and args.format != 'rich':
                # Insertar referencia al inicio del README solo en modo básico
                readme_content = readme_content.replace('# Ontología:', f"# Ontología:\n\n![Diagrama]({diagram_path.name})\n\nOntología:")
        (ont_out_dir / 'README.md').write_text(readme_content, encoding='utf-8')

    (out_dir / 'index.md').write_text('\n'.join(index_lines) + '\n', encoding='utf-8')
    print(f"Generado wiki para {len(ttl_files)} ontologías en {out_dir}")

if __name__ == '__main__':
    main()
