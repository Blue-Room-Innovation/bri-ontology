#!/usr/bin/env python3
"""Show current configuration from config.yml"""

import sys
from pathlib import Path

# Add parent directory to path to import config
sys.path.insert(0, str(Path(__file__).parent))

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
        print(f"Contexts version:  {config.contexts_version}")
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
        for artifact in config.get_generation_artifacts():
            print(f"  • {artifact['name']}")
        print()
    except FileNotFoundError as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
