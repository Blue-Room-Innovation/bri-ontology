#!/usr/bin/env python3
"""
JSON Schema to TypeScript Converter
====================================

Generates TypeScript type definitions from JSON Schema files.

This script wraps the json-schema-to-typescript Node.js tool, providing
a simple Python interface for generating TypeScript definitions.

Usage:
    python jsonschema-to-typescript.py --input build/digitalWastePassport.schema.json --output build/digitalWastePassport.ts
    python jsonschema-to-typescript.py -i schema.json -o types.ts --banner "Custom banner"

Requirements:
    - Node.js 18+
    - json-schema-to-typescript (installed via npm install)

Author: Blue Room Innovation
Date: 2026-01-13
"""

import argparse
import json
import logging
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from datetime import datetime

# Handle both direct execution and package import
try:
    from .utils import get_workspace_root
except ImportError:
    from utils import get_workspace_root

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)


class JSONSchemaToTypeScriptConverter:
    """Converts JSON Schema files to TypeScript definitions."""
    
    def __init__(self, verbose: bool = False):
        self.verbose = verbose
        self.workspace_root = get_workspace_root()
        
    def convert(self, input_file: Path, output_file: Path, banner_comment: str = None) -> bool:
        """Convert a JSON Schema file to TypeScript."""
        
        # Validate input file exists
        if not input_file.exists():
            logger.error(f"Input file not found: {input_file}")
            return False
        
        # Check Node.js is installed
        if not self._check_nodejs():
            return False
        
        # Check json-schema-to-typescript is installed
        if not self._check_json2ts():
            return False
        
        # Ensure output directory exists
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        # Generate TypeScript
        logger.info(f"Converting {input_file.name} → {output_file.name}")
        return self._run_json2ts(input_file, output_file, banner_comment)
    
    def _check_nodejs(self) -> bool:
        """Check that Node.js is available."""
        try:
            result = subprocess.run(
                ["node", "--version"],
                capture_output=True,
                text=True,
                check=True
            )
            node_version = result.stdout.strip()
            logger.debug(f"Node.js {node_version}")
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            logger.error("Node.js is not installed or not in PATH")
            logger.error("Install from: https://nodejs.org/")
            return False
    
    def _check_json2ts(self) -> bool:
        """Check that json-schema-to-typescript is installed."""
        json2ts_cmd = self.workspace_root / "node_modules" / "json-schema-to-typescript" / "dist" / "src" / "cli.js"
        
        if not json2ts_cmd.exists():
            logger.error("json-schema-to-typescript not found")
            logger.error("Install with: npm install")
            return False
        
        logger.debug("json-schema-to-typescript found")
        return True
    
    def _run_json2ts(self, input_file: Path, output_file: Path, banner_comment: str = None) -> bool:
        """Run json-schema-to-typescript CLI."""
        json2ts_cmd = self.workspace_root / "node_modules" / "json-schema-to-typescript" / "dist" / "src" / "cli.js"
        
        # Pre-process: close all object schemas so json-schema-to-typescript
        # does NOT emit [k: string]: unknown index signatures.
        # This is essential for TypeScript discriminated union narrowing and autocomplete.
        # The original JSON Schema file (used for runtime validation) is left untouched.
        ts_input_file = self._preprocess_schema_for_typescript(input_file)

        # Build command
        cmd = [
            "node",
            str(json2ts_cmd),
            str(ts_input_file),
            "--output", str(output_file)
        ]
        
        # Add banner comment if provided
        if banner_comment:
            cmd.extend(["--bannerComment", banner_comment])
        
        try:
            result = subprocess.run(
                cmd,
                cwd=str(self.workspace_root),
                capture_output=True,
                text=True,
                check=True
            )
            
            if self.verbose and result.stdout:
                print(result.stdout)
            
            # Clean up temp file and directory
            if ts_input_file != input_file:
                try:
                    shutil.rmtree(ts_input_file.parent, ignore_errors=True)
                except OSError:
                    pass

            # Show relative path if possible, otherwise absolute
            try:
                rel_path = output_file.relative_to(self.workspace_root)
                logger.info(f"✅ Generated {rel_path}")
            except ValueError:
                logger.info(f"✅ Generated {output_file}")
            
            return True
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Failed to generate TypeScript: {e}")
            if e.stderr:
                logger.error(e.stderr)
            return False
        except FileNotFoundError:
            logger.error("Node.js not found. Make sure it's installed and in PATH.")
            return False
    
    def _preprocess_schema_for_typescript(self, input_file: Path) -> Path:
        """Create a modified copy of the JSON Schema optimized for TypeScript generation.

        Two targeted transformations:

        1. Re-close **constraint / mixin** ``$defs`` that carry the
           ``"x-ts-constraint": true`` annotation (set by the SHACL-to-JSON-Schema
           converter when it strips ``additionalProperties: false`` for correct
           runtime validation).  Adding ``additionalProperties: false`` back
           prevents ``json-schema-to-typescript`` from emitting
           ``[k: string]: unknown`` index signatures on these mixin interfaces.

        2. Close inline anonymous object schemas that appear inside ``allOf``
           compositions (e.g. the identity-union ``{ "@id": string }`` objects).

        The original JSON Schema file (used for runtime AJV validation) is NOT modified.
        """
        try:
            with open(input_file, "r", encoding="utf-8") as f:
                schema = json.load(f)
        except (json.JSONDecodeError, OSError) as exc:
            logger.warning(f"Could not pre-process schema for TS ({exc}); using original")
            return input_file

        changed = False
        defs = schema.get("$defs", {})

        # 1. Re-close annotated constraint shapes
        for def_name, def_schema in defs.items():
            if isinstance(def_schema, dict) and def_schema.pop("x-ts-constraint", None):
                self._close_all_objects(def_schema)
                changed = True

        if not changed:
            return input_file

        # Write the modified schema to a temp directory, keeping the original
        # filename so json-schema-to-typescript derives valid TypeScript identifiers.
        tmp_dir = tempfile.mkdtemp(prefix="json2ts_")
        tmp_path = Path(tmp_dir) / input_file.name
        try:
            with open(tmp_path, "w", encoding="utf-8") as tmp_f:
                json.dump(schema, tmp_f, indent=2)
        except OSError as exc:
            logger.warning(f"Could not write temp schema ({exc}); using original")
            return input_file

        logger.debug(f"Pre-processed schema for TS → {tmp_path}")
        return Path(tmp_path)

    @staticmethod
    def _close_all_objects(node):
        """Recursively add ``additionalProperties: false`` to all object sub-schemas.

        Used only on constraint / mixin shapes where the index signature
        ``[k: string]: unknown`` must be suppressed for TypeScript DX.
        """
        if isinstance(node, dict):
            if node.get("type") == "object" and "additionalProperties" not in node:
                node["additionalProperties"] = False
            for value in node.values():
                JSONSchemaToTypeScriptConverter._close_all_objects(value)
        elif isinstance(node, list):
            for item in node:
                JSONSchemaToTypeScriptConverter._close_all_objects(item)

    @staticmethod
    def get_default_banner(source_file: str = None) -> str:
        """Get default banner comment for generated TypeScript."""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        banner = f"""/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: {timestamp}"""
        
        if source_file:
            banner += f"\n * Source: {source_file}"
        
        banner += "\n */"
        return banner


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Convert JSON Schema to TypeScript type definitions",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python jsonschema-to-typescript.py -i schema.json -o types.ts
  python jsonschema-to-typescript.py --input build/digitalWastePassport.schema.json --output build/digitalWastePassport.ts
  python jsonschema-to-typescript.py -i schema.json -o types.ts --banner "Custom banner" --verbose
        """
    )
    
    parser.add_argument(
        "-i", "--input",
        required=True,
        help="Input JSON Schema file"
    )
    
    parser.add_argument(
        "-o", "--output",
        required=True,
        help="Output TypeScript file"
    )
    
    parser.add_argument(
        "-b", "--banner",
        help="Custom banner comment for the generated TypeScript file"
    )
    
    parser.add_argument(
        "-s", "--source",
        help="Source file name to include in the default banner (e.g., 'shapes/v0.1/example.ttl')"
    )
    
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Enable verbose output"
    )
    
    args = parser.parse_args()
    
    if args.verbose:
        logger.setLevel(logging.DEBUG)
    
    # Create converter
    converter = JSONSchemaToTypeScriptConverter(verbose=args.verbose)
    
    # Determine banner comment
    banner = args.banner
    if not banner:
        banner = converter.get_default_banner(source_file=args.source)
    
    # Convert files
    input_path = Path(args.input)
    output_path = Path(args.output)
    
    success = converter.convert(input_path, output_path, banner)
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
