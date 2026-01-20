#!/usr/bin/env python3
"""Show current configuration from config.yml"""

import sys
from pathlib import Path

# Add scripts directory to path to import lib modules
scripts_dir = Path(__file__).resolve().parent
if str(scripts_dir) not in sys.path:
    sys.path.insert(0, str(scripts_dir))

from lib.config import load_config

def main():
    try:
        config = load_config()
        print(f"\n📋 Current Configuration")
        print("=" * 50)
        print(f"Ontology version:  {config.ontology_version}")
        print(f"Shapes version:    {config.shapes_version}")
        print(f"Examples version:  {config.examples_version}")
        print(f"Codelists version: {config.codelists_version}")
        print(f"Build version:     {config.build_version}")
        print("\n📁 Example Paths")
        print("=" * 50)
        print(f"Ontology: {config.get_ontology_path('digitalWastePassport.ttl')}")
        print(f"Shapes:   {config.get_shapes_path('digitalWastePassportShapes.ttl')}")
        print(f"Build:    {config.get_build_path('digitalWastePassport.schema.json')}")
        print("\n🔗 GitHub Repository")
        print("=" * 50)
        print(f"Owner:  {config.repository['owner']}")
        print(f"Repo:   {config.repository['name']}")
        print(f"Branch: {config.repository['branch']}")
        print("\n✨ Generation Artifacts")
        print("=" * 50)
        artifacts = config.get_generation_artifacts()
        if not artifacts:
            print("  (none)")
        for artifact in artifacts:
            name = (artifact or {}).get("name", "(unnamed)")
            shape_file = (artifact or {}).get("shape_file")
            json_schema = (artifact or {}).get("json_schema")
            typescript = (artifact or {}).get("typescript")
            naming = (artifact or {}).get("naming")
            context = (artifact or {}).get("context")

            print(f"\n  • {name}")
            if shape_file:
                print(f"     source: {config.get_shapes_path(str(shape_file))}")
            if json_schema:
                print(f"     input:  {config.get_build_path(str(json_schema))}")
            if typescript:
                print(f"     output: {config.get_build_path(str(typescript))}")
            if naming:
                print(f"     naming: {naming}")
            if context:
                print(f"     context: {context}")

        conversions = config.get_conversion_json_to_ts()
        print("\n🔁 Conversion: JSON Schema → TypeScript")
        print("=" * 50)
        if not conversions:
            print("  (none)")
        else:
            for key in sorted(conversions.keys()):
                scenario = conversions.get(key) or {}
                print(f"\n  • {key}")
                print(f"     name:   {scenario.get('name', 'N/A')}")
                print(f"     input:  {scenario.get('input', 'N/A')}")
                print(f"     output: {scenario.get('output', 'N/A')}")
                if scenario.get("source"):
                    print(f"     source: {scenario.get('source')}")

        shacl_to_json = config.get_conversion_shacl_to_json()
        print("\n🔁 Conversion: SHACL → JSON Schema")
        print("=" * 50)
        if not shacl_to_json:
            print("  (none)")
        else:
            for key in sorted(shacl_to_json.keys()):
                scenario = shacl_to_json.get(key) or {}
                print(f"\n  • {key}")
                print(f"     name:   {scenario.get('name', 'N/A')}")
                print(f"     input:  {scenario.get('input', 'N/A')}")
                print(f"     output: {scenario.get('output', 'N/A')}")
                if scenario.get("naming"):
                    print(f"     naming: {scenario.get('naming')}")
                if scenario.get("context"):
                    print(f"     context: {scenario.get('context')}")
        print()
    except FileNotFoundError as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
