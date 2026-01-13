#!/usr/bin/env python3
"""
TypeScript Generator from SHACL Shapes
=======================================

Generates TypeScript type definitions from SHACL shapes via JSON Schema.

This script orchestrates a two-step pipeline:
1. SHACL → JSON Schema (using shacl-to-jsonschema.py)
2. JSON Schema → TypeScript (using json-schema-to-typescript)

Usage:
    python generate-typescript.py
    python generate-typescript.py --verbose

Output:
    - build/digitalWastePassport.schema.json
    - build/digitalMarpolWastePassport.schema.json
    - build/digitalWastePassport.ts
    - build/digitalMarpolWastePassport.ts

Requirements:
    - Python 3.8+ with rdflib
    - Node.js 18+ with json-schema-to-typescript

Author: Blue Room Innovation
Date: 2026-01-13
Related: ADR-005
"""

import argparse
import json
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
        
        # Check dependencies
        if not self._check_dependencies():
            return False
        
        success = True
        
        # Process each shape configuration
        for config in self.shape_configs:
            logger.info(f"\n📦 Processing {config['name']}...")
            
            # Step 1: SHACL → JSON Schema
            if not self._generate_json_schema(config):
                logger.error(f"Failed to generate JSON Schema for {config['name']}")
                success = False
                continue
            
            # Step 2: JSON Schema → TypeScript
            if not self._generate_typescript(config):
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
    
    def _check_dependencies(self) -> bool:
        """Check that required tools are available."""
        logger.info("🔍 Checking dependencies...")
        
        # Check Python script exists
        shacl_script = self.scripts_dir / "shacl-to-jsonschema.py"
        if not shacl_script.exists():
            logger.error(f"Missing required script: {shacl_script}")
            return False
        
        # Check Node.js is installed
        try:
            result = subprocess.run(
                ["node", "--version"],
                capture_output=True,
                text=True,
                check=True
            )
            node_version = result.stdout.strip()
            logger.info(f"✓ Node.js {node_version}")
        except (subprocess.CalledProcessError, FileNotFoundError):
            logger.error("Node.js is not installed or not in PATH")
            logger.error("Install from: https://nodejs.org/")
            return False
        
        # Check if node_modules exists
        node_modules = self.workspace_root / "node_modules"
        json_schema_pkg = node_modules / "json-schema-to-typescript"
        
        if not json_schema_pkg.exists():
            logger.warning("json-schema-to-typescript not found")
            logger.info("Installing Node.js dependencies...")
            
            try:
                subprocess.run(
                    ["npm", "install"],
                    cwd=str(self.workspace_root),
                    check=True,
                    capture_output=not self.verbose
                )
                logger.info("✓ Dependencies installed")
            except subprocess.CalledProcessError as e:
                logger.error("Failed to install Node.js dependencies")
                logger.error("Run: npm install")
                return False
        else:
            logger.info("✓ json-schema-to-typescript installed")
        
        return True
    
    def _generate_json_schema(self, config: Dict[str, str]) -> bool:
        """Generate JSON Schema from SHACL shapes."""
        shape_file = self.shapes_dir / config["shape_file"]
        json_schema_file = self.build_dir / config["json_schema"]
        
        if not shape_file.exists():
            logger.error(f"Shape file not found: {shape_file}")
            return False
        
        logger.info(f"  SHACL → JSON Schema: {config['shape_file']}")
        
        # Use the same Python interpreter that's running this script
        cmd = [
            sys.executable,  # This will use the current Python (from venv if active)
            str(self.scripts_dir / "shacl-to-jsonschema.py"),
            "--input", str(shape_file),
            "--output", str(json_schema_file)
        ]
        
        if self.verbose:
            cmd.append("--verbose")
        
        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                check=False  # Don't raise on non-zero exit (script returns 2 for warnings)
            )
            
            if self.verbose:
                print(result.stdout)
            
            # Exit code 2 means warnings (acceptable)
            if result.returncode not in [0, 2]:
                logger.error(result.stderr)
                return False
            
            if result.returncode == 2:
                logger.warning("JSON Schema generated with warnings (see above)")
            
            return json_schema_file.exists()
            
        except Exception as e:
            logger.error(f"Failed to run shacl-to-jsonschema.py: {e}")
            return False
    
    def _generate_typescript(self, config: Dict[str, str]) -> bool:
        """Generate TypeScript from JSON Schema."""
        json_schema_file = self.build_dir / config["json_schema"]
        typescript_file = self.build_dir / config["typescript"]
        
        if not json_schema_file.exists():
            logger.error(f"JSON Schema not found: {json_schema_file}")
            return False
        
        logger.info(f"  JSON Schema → TypeScript: {config['json_schema']}")
        
        # Try to use npx, fallback to direct node_modules invocation
        json2ts_cmd = self.workspace_root / "node_modules" / "json-schema-to-typescript" / "dist" / "src" / "cli.js"
        
        # Prefer npx if available, otherwise use node directly
        if sys.platform == "win32":
            # On Windows, try npx.cmd first, then node + script
            cmd = [
                "node",
                str(json2ts_cmd),
                str(json_schema_file),
                "--output", str(typescript_file),
                "--bannerComment", f"/**\n * Auto-generated TypeScript definitions from SHACL shapes\n * Source: shapes/{config['shape_file']}\n * DO NOT EDIT MANUALLY\n * Generated: {self._get_timestamp()}\n */"
            ]
        else:
            cmd = [
                "npx",
                "json-schema-to-typescript",
                str(json_schema_file),
                "--output", str(typescript_file),
                "--bannerComment", f"/**\n * Auto-generated TypeScript definitions from SHACL shapes\n * Source: shapes/{config['shape_file']}\n * DO NOT EDIT MANUALLY\n * Generated: {self._get_timestamp()}\n */"
            ]
        
        try:
            result = subprocess.run(
                cmd,
                cwd=str(self.workspace_root),
                capture_output=True,
                text=True,
                check=True
            )
            
            if self.verbose:
                print(result.stdout)
            
            return typescript_file.exists()
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Failed to generate TypeScript: {e}")
            if e.stderr:
                logger.error(e.stderr)
            return False
        except FileNotFoundError:
            logger.error("npx not found. Make sure Node.js and npm are properly installed.")
            return False
    
    def _get_timestamp(self) -> str:
        """Get current timestamp for banner comment."""
        from datetime import datetime
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
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
  2. JSON Schema → TypeScript (using json-schema-to-typescript)

Requirements:
  - Python 3.8+ with rdflib
  - Node.js 18+ with json-schema-to-typescript (will auto-install via npm)

Examples:
  python generate-typescript.py
  python generate-typescript.py --verbose
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
