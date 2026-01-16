#!/usr/bin/env python3
"""Ontology CLI

Unifies validation, generation, and conversion tasks for this ontology repository.

Commands:
- validate owl   : validates OWL ontologies using ROBOT or Apache Jena
- validate shacl : validates RDF data against SHACL shapes
- generate types : generates TypeScript types from SHACL shapes (autogenerate)
- generate wiki  : generates wiki documentation from ontologies
- convert shacl  : converts SHACL shapes to JSON Schema
- convert ts     : converts JSON Schema to TypeScript

This CLI delegates to modular components in the cli/ package.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import List, Optional

from lib import OwlConfig, ShaclConfig, validate_owl, validate_shacl
from lib.config import load_config
from lib.utils import get_workspace_root


def build_parser() -> argparse.ArgumentParser:
    """Build argument parser for CLI commands.
    
    Returns:
        Configured ArgumentParser
    """
    parser = argparse.ArgumentParser(
        prog="ontology-cli",
        description="Ontology repository CLI - validation, generation, and conversion",
    )

    sub = parser.add_subparsers(dest="command", required=True)

    # ===== VALIDATE COMMANDS =====
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
        help="Include codelists/v*/ in auto-discovery",
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
        "--build-dir", default=None, help="Build output dir (default: build/<version>)"
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
        required=False,
        help="Data graph file (ttl/jsonld) - uses config default if not provided",
    )
    shacl.add_argument(
        "-s", 
        "--shapes", 
        dest="shapes", 
        required=False, 
        help="Shapes file (ttl) - uses config default if not provided"
    )
    shacl.add_argument(
        "-e",
        "--extras",
        dest="extras_csv",
        required=False,
        help="CSV list of extra ttl files - uses config default if not provided",
    )
    shacl.add_argument(
        "-f",
        "--format",
        dest="fmt",
        required=False,
        choices=["human", "text", "turtle", "json-ld"],
        help="Output format - uses config default if not provided",
    )

    # ===== GENERATE COMMANDS =====
    generate = sub.add_parser("generate", help="Generation commands")
    generate_sub = generate.add_subparsers(dest="generate_cmd", required=True)

    # TypeScript generation (autogenerate)
    gen_types = generate_sub.add_parser(
        "types",
        help="Generate TypeScript types from SHACL shapes (autogenerate pipeline)",
    )
    gen_types.add_argument(
        "-v", "--verbose", action="store_true", help="Enable verbose output"
    )

    # Wiki generation
    gen_wiki = generate_sub.add_parser(
        "wiki", help="Generate wiki documentation from ontologies"
    )
    gen_wiki.add_argument(
        "--ontology-dir",
        default="ontology",
        help="Ontology directory (default: ontology)",
    )
    gen_wiki.add_argument(
        "--output-dir", default="docs/wiki", help="Output directory (default: docs/wiki)"
    )
    gen_wiki.add_argument(
        "--include-codelists",
        action="store_true",
        help="Include codelists in wiki generation",
    )
    gen_wiki.add_argument(
        "--include-shapes",
        action="store_true",
        default=True,
        help="Include shapes count in index (default: True)",
    )
    gen_wiki.add_argument(
        "-v", "--verbose", action="store_true", help="Enable verbose output"
    )

    # ===== CONVERT COMMANDS =====
    convert = sub.add_parser("convert", help="Conversion commands")
    convert_sub = convert.add_subparsers(dest="convert_cmd", required=True)

    # SHACL to JSON Schema
    conv_shacl = convert_sub.add_parser(
        "shacl", help="Convert SHACL shapes to JSON Schema"
    )
    conv_shacl.add_argument(
        "-i", "--input", required=True, help="Input SHACL shapes file (TTL)"
    )
    conv_shacl.add_argument(
        "-o", "--output", required=True, help="Output JSON Schema file"
    )
    conv_shacl.add_argument(
        "-v", "--verbose", action="store_true", help="Enable verbose output"
    )

    # JSON Schema to TypeScript
    conv_ts = convert_sub.add_parser(
        "ts", help="Convert JSON Schema to TypeScript"
    )
    conv_ts.add_argument(
        "-i", "--input", required=True, help="Input JSON Schema file"
    )
    conv_ts.add_argument(
        "-o", "--output", required=True, help="Output TypeScript file"
    )
    conv_ts.add_argument(
        "-b", "--banner", help="Custom banner comment for TypeScript file"
    )
    conv_ts.add_argument(
        "-s",
        "--source",
        help="Source file name for default banner (e.g., 'shapes/example.ttl')",
    )
    conv_ts.add_argument(
        "-v", "--verbose", action="store_true", help="Enable verbose output"
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
    config_obj = load_config()

    # ===== VALIDATE COMMANDS =====
    if ns.command == "validate":
        if ns.validate_cmd == "owl":
            # Use versioned build directory if not explicitly specified
            build_dir = ns.build_dir
            if build_dir is None:
                build_dir = f"{config_obj.paths['build']}/{config_obj.build_version}"
            
            config = OwlConfig(
                inputs_csv=ns.inputs_csv,
                include_codelists=ns.include_codelists,
                no_auto=ns.no_auto,
                reasoner=ns.reasoner,
                profile=ns.profile,
                build_dir=Path(build_dir),
                merged=ns.merged,
                output=ns.output,
                quiet=ns.quiet,
            )
            return validate_owl(config)
        
        elif ns.validate_cmd == "shacl":
            # Apply defaults from config if arguments not provided
            data_file = ns.data
            shapes_file = ns.shapes
            extras_csv = ns.extras_csv
            fmt = ns.fmt
            
            # Get defaults from config
            defaults = config_obj._data.get("defaults", {}).get("shacl", {})
            
            # Apply defaults
            if data_file is None:
                data_file = defaults.get("data")
                if data_file is None:
                    print("❌ ERROR: --data argument is required or must be configured in config.yml under 'defaults.shacl.data'")
                    return 1
                print(f"[SHACL] Using default data file from config: {data_file}")
            
            if shapes_file is None:
                shapes_file = defaults.get("shapes")
                if shapes_file is None:
                    print("❌ ERROR: --shapes argument is required or must be configured in config.yml under 'defaults.shacl.shapes'")
                    return 1
                print(f"[SHACL] Using default shapes file from config: {shapes_file}")
            
            if extras_csv is None:
                extras_csv = defaults.get("extras", "")
            
            if fmt is None:
                fmt = defaults.get("format", "human")
            
            config = ShaclConfig(
                data_file=workspace_root / Path(data_file),
                shapes_file=workspace_root / Path(shapes_file),
                extras_csv=extras_csv,
                output_format=fmt,
            )
            return validate_shacl(config)

    # ===== GENERATE COMMANDS =====
    elif ns.command == "generate":
        if ns.generate_cmd == "types":
            # Import here to avoid unnecessary dependencies
            import subprocess
            autogenerate_script = workspace_root / "scripts" / "lib" / "autogenerate.py"
            cmd = [sys.executable, str(autogenerate_script)]
            if ns.verbose:
                cmd.append("--verbose")
            result = subprocess.run(cmd)
            return result.returncode
        
        elif ns.generate_cmd == "wiki":
            import subprocess
            wiki_script = workspace_root / "scripts" / "lib" / "generate_wiki.py"
            # Construir path de shapes amb la versió del config
            shapes_dir = f"{config_obj.paths['shapes']}/{config_obj.shapes_version}"
            cmd = [
                sys.executable,
                str(wiki_script),
                "--ontology-dir", ns.ontology_dir,
                "--output-dir", ns.output_dir,
                "--shapes-dir", shapes_dir,
            ]
            if ns.include_codelists:
                cmd.append("--include-codelists")
            if ns.include_shapes:
                cmd.append("--include-shapes")
            if ns.verbose:
                cmd.append("--verbose")
            result = subprocess.run(cmd)
            return result.returncode

    # ===== CONVERT COMMANDS =====
    elif ns.command == "convert":
        if ns.convert_cmd == "shacl":
            import subprocess
            shacl_script = workspace_root / "scripts" / "lib" / "shacl_to_jsonschema.py"
            cmd = [
                sys.executable,
                str(shacl_script),
                "--input", ns.input,
                "--output", ns.output,
            ]
            if ns.verbose:
                cmd.append("--verbose")
            result = subprocess.run(cmd)
            return result.returncode
        
        elif ns.convert_cmd == "ts":
            import subprocess
            ts_script = workspace_root / "scripts" / "lib" / "jsonschema_to_typescript.py"
            cmd = [
                sys.executable,
                str(ts_script),
                "--input", ns.input,
                "--output", ns.output,
            ]
            if ns.banner:
                cmd.extend(["--banner", ns.banner])
            if ns.source:
                cmd.extend(["--source", ns.source])
            if ns.verbose:
                cmd.append("--verbose")
            result = subprocess.run(cmd)
            return result.returncode

    print("Unknown command", file=sys.stderr)
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
