#!/usr/bin/env python3
"""Ontology CLI

Unifies validation and generation tasks for this ontology repository.

Currently implemented:
- validate owl   : validates OWL ontologies using ROBOT or Apache Jena
- validate shacl : validates RDF data against SHACL shapes

This CLI delegates to modular components in the cli/ package.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import List, Optional

from cli import OwlConfig, ShaclConfig, validate_owl, validate_shacl
from cli.utils import get_workspace_root


def build_parser() -> argparse.ArgumentParser:
    """Build argument parser for CLI commands.
    
    Returns:
        Configured ArgumentParser
    """
    parser = argparse.ArgumentParser(
        prog="ontology-cli", description="Ontology repository CLI"
    )

    sub = parser.add_subparsers(dest="command", required=True)

    # Validate command
    validate = sub.add_parser("validate", help="Validation commands")
    validate_sub = validate.add_subparsers(dest="validate_cmd", required=True)

    # OWL validation
    owl = validate_sub.add_parser(
        "owl", help="Validate OWL ontologies (ROBOT/RIOT)"
    )
    owl.add_argument(
        "-i",
        "--inputs",
        dest="inputs_csv",
        default="",
        help="CSV list of TTL files",
    )
    owl.add_argument(
        "--include-codelists",
        action="store_true",
        help="Include ontology/codelists/ in auto-discovery",
    )
    owl.add_argument(
        "--no-auto", action="store_true", help="Disable auto-discovery"
    )
    owl.add_argument(
        "-r",
        "--reasoner",
        default="HermiT",
        choices=["HermiT", "ELK", "none"],
        help="Reasoner",
    )
    owl.add_argument(
        "-p",
        "--profile",
        default="DL",
        choices=["DL", "OWL2"],
        help="OWL profile",
    )
    owl.add_argument(
        "--build-dir", default="build", help="Build output dir"
    )
    owl.add_argument(
        "-m",
        "--merged",
        default="merged-ontology.ttl",
        help="Merged output filename (in build dir)",
    )
    owl.add_argument(
        "-o",
        "--output",
        default="reasoned-ontology.ttl",
        help="Reasoned output filename (in build dir)",
    )
    owl.add_argument(
        "-q", "--quiet", action="store_true", help="Reduce output"
    )

    # SHACL validation
    shacl = validate_sub.add_parser(
        "shacl", help="Validate data graph against SHACL shapes (pyshacl)"
    )
    shacl.add_argument(
        "-d",
        "--data",
        dest="data",
        required=True,
        help="Data graph file (ttl/jsonld)",
    )
    shacl.add_argument(
        "-s", "--shapes", dest="shapes", required=True, help="Shapes file (ttl)"
    )
    shacl.add_argument(
        "-e",
        "--extras",
        dest="extras_csv",
        default="",
        help="CSV list of extra ttl files",
    )
    shacl.add_argument(
        "-f",
        "--format",
        dest="fmt",
        default="human",
        choices=["human", "text", "turtle", "json-ld"],
        help="Output format",
    )

    return parser


def main(argv: Optional[List[str]] = None) -> int:
    """Main entry point for CLI.
    
    Args:
        argv: Command-line arguments (defaults to sys.argv)
        
    Returns:
        Exit code
    """
    parser = build_parser()
    ns = parser.parse_args(argv)
    
    workspace_root = get_workspace_root()

    if ns.command == "validate" and ns.validate_cmd == "owl":
        config = OwlConfig(
            inputs_csv=ns.inputs_csv,
            include_codelists=ns.include_codelists,
            no_auto=ns.no_auto,
            reasoner=ns.reasoner,
            profile=ns.profile,
            build_dir=Path(ns.build_dir),
            merged=ns.merged,
            output=ns.output,
            quiet=ns.quiet,
        )
        return validate_owl(config)

    if ns.command == "validate" and ns.validate_cmd == "shacl":
        config = ShaclConfig(
            data_file=workspace_root / Path(ns.data),
            shapes_file=workspace_root / Path(ns.shapes),
            extras_csv=ns.extras_csv,
            output_format=ns.fmt,
        )
        return validate_shacl(config)

    print("Unknown command", file=sys.stderr)
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
