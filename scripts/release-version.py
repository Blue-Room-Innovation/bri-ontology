#!/usr/bin/env python3
"""Release Version Script

Automatitza la creació de noves versions d'ontologies, shapes, codelists i examples.
Copia carpetes versionades, actualitza URIs interns i metadades owl:versionInfo.

Usage:
    python scripts/release-version.py --component ontology --from v0.1 --to v0.2
    python scripts/release-version.py --component codelists --from v1 --to v2
    python scripts/release-version.py --component shapes --from v0.1 --to v0.2
    python scripts/release-version.py --component examples --from v0.1 --to v0.2
    python scripts/release-version.py --all --from v0.1 --to v0.2  # Release all components

Examples:
    # Release new ontology version (breaking change)
    python scripts/release-version.py --component ontology --from v0.1 --to v1.0

    # Release new codelists version (independent versioning)
    python scripts/release-version.py --component codelists --from v1 --to v2

    # Release all components together
    python scripts/release-version.py --all --from v0.1 --to v0.2
"""

import argparse
import re
import shutil
import sys
from pathlib import Path
from typing import List, Tuple


def get_workspace_root() -> Path:
    """Get workspace root directory."""
    return Path(__file__).resolve().parent.parent


def copy_version_folder(component: str, from_ver: str, to_ver: str, workspace: Path) -> Path:
    """Copy version folder from old version to new version.
    
    Args:
        component: Component name (ontology, shapes, examples, codelists)
        from_ver: Source version (e.g., 'v0.1')
        to_ver: Target version (e.g., 'v0.2')
        workspace: Workspace root path
        
    Returns:
        Path to new version folder
    """
    src_folder = workspace / component / from_ver
    dest_folder = workspace / component / to_ver
    
    if not src_folder.exists():
        print(f"❌ Source folder not found: {src_folder}")
        sys.exit(1)
    
    if dest_folder.exists():
        print(f"❌ Destination folder already exists: {dest_folder}")
        print(f"   Delete it first or choose a different version.")
        sys.exit(1)
    
    print(f"📁 Copying {src_folder} → {dest_folder}")
    shutil.copytree(src_folder, dest_folder)
    print(f"✅ Copied successfully")
    
    return dest_folder


def update_uris_in_file(file_path: Path, replacements: List[Tuple[str, str]]) -> int:
    """Update URIs in a file with multiple find/replace operations.
    
    Args:
        file_path: Path to file to update
        replacements: List of (old_pattern, new_pattern) tuples
        
    Returns:
        Number of replacements made
    """
    content = file_path.read_text(encoding='utf-8')
    original_content = content
    total_replacements = 0
    
    for old_pattern, new_pattern in replacements:
        content, n = re.subn(old_pattern, new_pattern, content)
        total_replacements += n
    
    if content != original_content:
        file_path.write_text(content, encoding='utf-8')
    
    return total_replacements


def update_version_metadata(file_path: Path, new_version: str) -> bool:
    """Update owl:versionInfo in TTL file.
    
    Args:
        file_path: Path to TTL file
        new_version: New version string (without 'v' prefix)
        
    Returns:
        True if updated, False if not found
    """
    if not file_path.suffix == '.ttl':
        return False
    
    content = file_path.read_text(encoding='utf-8')
    
    # Update owl:versionInfo "X.Y" to new version
    version_num = new_version.lstrip('v')
    pattern = r'owl:versionInfo\s+"[^"]+"'
    replacement = f'owl:versionInfo "{version_num}"'
    
    new_content, n = re.subn(pattern, replacement, content)
    
    if n > 0:
        file_path.write_text(new_content, encoding='utf-8')
        return True
    
    return False


def release_ontology(from_ver: str, to_ver: str, workspace: Path) -> None:
    """Release new ontology version.
    
    Updates:
    - ontology URIs: /ontology/vX/ → /ontology/vY/
    - codelists URIs: /codelists/vX/ → /codelists/vY/ (if codelists also updated)
    - owl:versionInfo metadata
    """
    print(f"\n🔧 Releasing ontology: {from_ver} → {to_ver}")
    
    dest_folder = copy_version_folder("ontology", from_ver, to_ver, workspace)
    
    # Determine codelists version (usually stays same unless breaking change)
    # For now, keep same codelists version
    from_ver_num = from_ver.lstrip('v')
    to_ver_num = to_ver.lstrip('v')
    
    replacements = [
        # Update ontology URIs
        (rf'https://raw\.githubusercontent\.com/Blue-Room-Innovation/bri-ontology/main/ontology/{re.escape(from_ver)}/',
         f'https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/ontology/{to_ver}/'),
    ]
    
    total_replacements = 0
    files_updated = 0
    
    for ttl_file in dest_folder.glob("*.ttl"):
        n = update_uris_in_file(ttl_file, replacements)
        if n > 0:
            files_updated += 1
            total_replacements += n
            print(f"  ✏️  Updated {ttl_file.name}: {n} URI replacements")
        
        if update_version_metadata(ttl_file, to_ver):
            print(f"  📌 Updated owl:versionInfo in {ttl_file.name}")
    
    print(f"✅ Ontology release complete: {files_updated} files updated, {total_replacements} URIs replaced")


def release_codelists(from_ver: str, to_ver: str, workspace: Path) -> None:
    """Release new codelists version.
    
    Updates:
    - codelists URIs: /codelists/vX/ → /codelists/vY/
    - owl:versionInfo metadata
    """
    print(f"\n🔧 Releasing codelists: {from_ver} → {to_ver}")
    
    dest_folder = copy_version_folder("codelists", from_ver, to_ver, workspace)
    
    replacements = [
        (rf'https://raw\.githubusercontent\.com/Blue-Room-Innovation/bri-ontology/main/codelists/{re.escape(from_ver)}/',
         f'https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/codelists/{to_ver}/'),
    ]
    
    total_replacements = 0
    files_updated = 0
    
    for ttl_file in dest_folder.rglob("*.ttl"):
        n = update_uris_in_file(ttl_file, replacements)
        if n > 0:
            files_updated += 1
            total_replacements += n
            print(f"  ✏️  Updated {ttl_file.name}: {n} URI replacements")
        
        # Update version to match new codelists version (use major version only, e.g., v1 → 1.0)
        codelist_version = to_ver.lstrip('v')
        if '.' not in codelist_version:
            codelist_version += '.0'
        
        if update_version_metadata(ttl_file, codelist_version):
            print(f"  📌 Updated owl:versionInfo in {ttl_file.name}")
    
    print(f"✅ Codelists release complete: {files_updated} files updated, {total_replacements} URIs replaced")


def release_shapes(from_ver: str, to_ver: str, workspace: Path) -> None:
    """Release new shapes version.
    
    Updates:
    - ontology URIs: /ontology/vX/ → /ontology/vY/
    - codelists URIs: /codelists/vX/ → /codelists/vY/ (if needed)
    """
    print(f"\n🔧 Releasing shapes: {from_ver} → {to_ver}")
    
    dest_folder = copy_version_folder("shapes", from_ver, to_ver, workspace)
    
    replacements = [
        # Update ontology URIs (shapes reference ontologies)
        (rf'https://raw\.githubusercontent\.com/Blue-Room-Innovation/bri-ontology/main/ontology/{re.escape(from_ver)}/',
         f'https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/ontology/{to_ver}/'),
    ]
    
    total_replacements = 0
    files_updated = 0
    
    for ttl_file in dest_folder.glob("*.ttl"):
        n = update_uris_in_file(ttl_file, replacements)
        if n > 0:
            files_updated += 1
            total_replacements += n
            print(f"  ✏️  Updated {ttl_file.name}: {n} URI replacements")
    
    print(f"✅ Shapes release complete: {files_updated} files updated, {total_replacements} URIs replaced")


def release_examples(from_ver: str, to_ver: str, workspace: Path) -> None:
    """Release new examples version.
    
    Updates:
    - ontology URIs: /ontology/vX/ → /ontology/vY/
    - codelists URIs: /codelists/vX/ → /codelists/vY/ (if needed)
    - contexts URIs: /contexts/X/ → /contexts/Y/ (note: no 'v' prefix in contexts)
    """
    print(f"\n🔧 Releasing examples: {from_ver} → {to_ver}")
    
    dest_folder = copy_version_folder("examples", from_ver, to_ver, workspace)
    
    # For contexts, remove 'v' prefix (contexts use 0.1, 0.2 not v0.1, v0.2)
    from_context_ver = from_ver.lstrip('v')
    to_context_ver = to_ver.lstrip('v')
    
    replacements = [
        # Update ontology URIs
        (rf'https://raw\.githubusercontent\.com/Blue-Room-Innovation/bri-ontology/main/ontology/{re.escape(from_ver)}/',
         f'https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/ontology/{to_ver}/'),
        # Update contexts URIs (no 'v' prefix)
        (rf'https://raw\.githubusercontent\.com/Blue-Room-Innovation/bri-ontology/main/contexts/{re.escape(from_context_ver)}/',
         f'https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/contexts/{to_context_ver}/'),
    ]
    
    total_replacements = 0
    files_updated = 0
    
    for example_file in dest_folder.glob("*"):
        if example_file.suffix in ['.ttl', '.jsonld']:
            n = update_uris_in_file(example_file, replacements)
            if n > 0:
                files_updated += 1
                total_replacements += n
                print(f"  ✏️  Updated {example_file.name}: {n} URI replacements")
    
    print(f"✅ Examples release complete: {files_updated} files updated, {total_replacements} URIs replaced")


def release_all_components(from_ver: str, to_ver: str, workspace: Path) -> None:
    """Release all components together."""
    print(f"\n🚀 Releasing ALL components: {from_ver} → {to_ver}")
    
    release_ontology(from_ver, to_ver, workspace)
    release_shapes(from_ver, to_ver, workspace)
    release_examples(from_ver, to_ver, workspace)
    
    # Note: codelists have independent versioning, not released by default
    print(f"\n⚠️  Note: Codelists not released (independent versioning)")
    print(f"   To release codelists: python scripts/release-version.py --component codelists --from v1 --to v2")
    
    print(f"\n🎉 All components released successfully!")
    print(f"\n📝 Next steps:")
    print(f"   1. Review changes: git diff")
    print(f"   2. Validate: python scripts/ontology_cli.py validate owl --include-codelists")
    print(f"   3. Commit: git add . && git commit -m 'Release {to_ver}'")
    print(f"   4. Tag: git tag -a {to_ver} -m 'Release {to_ver}: <summary>'")
    print(f"   5. Push: git push && git push --tags")


def main():
    parser = argparse.ArgumentParser(
        description="Release new version of ontology components",
        epilog=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    parser.add_argument(
        "--component",
        choices=["ontology", "shapes", "examples", "codelists"],
        help="Component to release (or use --all)"
    )
    
    parser.add_argument(
        "--all",
        action="store_true",
        help="Release all components (ontology, shapes, examples)"
    )
    
    parser.add_argument(
        "--from",
        dest="from_version",
        required=True,
        help="Source version (e.g., v0.1 or v1)"
    )
    
    parser.add_argument(
        "--to",
        dest="to_version",
        required=True,
        help="Target version (e.g., v0.2 or v2)"
    )
    
    args = parser.parse_args()
    
    if not args.all and not args.component:
        parser.error("Must specify either --component or --all")
    
    workspace = get_workspace_root()
    
    if args.all:
        release_all_components(args.from_version, args.to_version, workspace)
    elif args.component == "ontology":
        release_ontology(args.from_version, args.to_version, workspace)
    elif args.component == "shapes":
        release_shapes(args.from_version, args.to_version, workspace)
    elif args.component == "examples":
        release_examples(args.from_version, args.to_version, workspace)
    elif args.component == "codelists":
        release_codelists(args.from_version, args.to_version, workspace)


if __name__ == "__main__":
    main()
