#!/usr/bin/env python3
"""
TypeScript Generator from SHACL Shapes
=======================================

Orchestrates the generation of TypeScript type definitions from SHACL shapes.

This script is a convenience wrapper that chains two scripts:
1. shacl-to-jsonschema.py: SHACL → JSON Schema
2. jsonschema-to-typescript.py: JSON Schema → TypeScript

Usage:
    python autogenerate.py
    python autogenerate.py --verbose

Output:
    - build/digitalWastePassport.schema.json
    - build/digitalMarpolWastePassport.schema.json
    - build/digitalWastePassport.ts
    - build/digitalMarpolWastePassport.ts

Requirements:
    - Python 3.8+ with rdflib (for SHACL conversion)
    - Node.js 18+ with json-schema-to-typescript (for TS generation)

See also:
    - scripts/shacl-to-jsonschema.py (step 1)
    - scripts/jsonschema-to-typescript.py (step 2)

Author: Blue Room Innovation
Date: 2026-01-13
Related: ADR-005
"""

import argparse
import logging
import subprocess
import sys
from pathlib import Path
from typing import List, Dict

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)


class TypeScriptGenerator:
    """Orchestrates TypeScript generation from SHACL shapes."""
    
    def __init__(self, verbose: bool = False):
        self.verbose = verbose
        self.workspace_root = Path(__file__).parent.parent
        self.build_dir = self.workspace_root / "build"
        self.shapes_dir = self.workspace_root / "shapes"
        self.scripts_dir = self.workspace_root / "scripts"
        
        # Define shape files to process
        self.shape_configs = [
            {
                "name": "digitalWastePassport",
                "shape_file": "digitalWastePassportShapes.ttl",
                "json_schema": "digitalWastePassport.schema.json",
                "typescript": "digitalWastePassport.ts"
            },
            {
                "name": "digitalMarpolWastePassport",
                "shape_file": "digitalMarpolWastePassportShapes.ttl",
                "json_schema": "digitalMarpolWastePassport.schema.json",
                "typescript": "digitalMarpolWastePassport.ts"
            }
        ]
    
    def run(self) -> bool:
        """Execute the full generation pipeline."""
        logger.info("🚀 Starting TypeScript generation pipeline...")
        
        # Ensure build directory exists
        self.build_dir.mkdir(exist_ok=True)
        
        success = True
        
        # Process each shape configuration
        for config in self.shape_configs:
            logger.info(f"\n📦 Processing {config['name']}...")
            
            # Step 1: SHACL → JSON Schema
            if not self._run_shacl_to_jsonschema(config):
                logger.error(f"Failed to generate JSON Schema for {config['name']}")
                success = False
                continue
            
            # Step 2: JSON Schema → TypeScript
            if not self._run_jsonschema_to_typescript(config):
                logger.error(f"Failed to generate TypeScript for {config['name']}")
                success = False
                continue
            
            logger.info(f"✅ Generated {config['typescript']}")
        
        if success:
            logger.info("\n🎉 All TypeScript definitions generated successfully!")
            self._print_output_summary()
        else:
            logger.error("\n❌ Some generations failed. Check the logs above.")
        
        return success
    
    def _run_shacl_to_jsonschema(self, config: Dict[str, str]) -> bool:
        """Run shacl-to-jsonschema.py script."""
        shape_file = self.shapes_dir / config["shape_file"]
        json_schema_file = self.build_dir / config["json_schema"]
        
        logger.info(f"  Step 1/2: SHACL → JSON Schema")
        
        cmd = [
            sys.executable,
            str(self.scripts_dir / "shacl-to-jsonschema.py"),
            "--input", str(shape_file),
            "--output", str(json_schema_file)
        ]
        
        if self.verbose:
            cmd.append("--verbose")
        
        return self._run_command(cmd)
    
    def _run_jsonschema_to_typescript(self, config: Dict[str, str]) -> bool:
        """Run jsonschema-to-typescript.py script."""
        json_schema_file = self.build_dir / config["json_schema"]
        typescript_file = self.build_dir / config["typescript"]
        
        logger.info(f"  Step 2/2: JSON Schema → TypeScript")
        
        cmd = [
            sys.executable,
            str(self.scripts_dir / "jsonschema-to-typescript.py"),
            "--input", str(json_schema_file),
            "--output", str(typescript_file),
            "--source", f"shapes/{config['shape_file']}"
        ]
        
        if self.verbose:
            cmd.append("--verbose")
        
        return self._run_command(cmd)
    
    def _run_command(self, cmd: List[str]) -> bool:
        """Run a command and return success status."""
        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                check=False  # Don't raise on non-zero exit
            )
            
            if self.verbose and result.stdout:
                print(result.stdout)
            
            # Exit code 0 or 2 (warnings) are acceptable
            if result.returncode not in [0, 2]:
                if result.stderr:
                    logger.error(result.stderr)
                return False
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to run command: {e}")
            return False
    
    def _print_output_summary(self):
        """Print summary of generated files."""
        logger.info("\n📄 Generated files:")
        for config in self.shape_configs:
            json_file = self.build_dir / config["json_schema"]
            ts_file = self.build_dir / config["typescript"]
            
            if json_file.exists():
                logger.info(f"  - {json_file.relative_to(self.workspace_root)}")
            if ts_file.exists():
                logger.info(f"  - {ts_file.relative_to(self.workspace_root)}")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Generate TypeScript definitions from SHACL shapes",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
This script orchestrates a two-step pipeline:
  1. SHACL → JSON Schema (using shacl-to-jsonschema.py)
  2. JSON Schema → TypeScript (using jsonschema-to-typescript.py)

You can also run each script independently if needed:
  python scripts/shacl-to-jsonschema.py -i shapes/example.ttl -o build/example.schema.json
  python scripts/jsonschema-to-typescript.py -i build/example.schema.json -o build/example.ts

Examples:
  python autogenerate.py
  python autogenerate.py --verbose
        """
    )
    
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Enable verbose output"
    )
    
    args = parser.parse_args()
    
    if args.verbose:
        logger.setLevel(logging.DEBUG)
    
    generator = TypeScriptGenerator(verbose=args.verbose)
    success = generator.run()
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
