#!/usr/bin/env python3
"""Build artifact index generator.

Creates GitHub Pages-friendly index.md files for build artifacts:
- build/index.md
- build/<version>/index.md (for each version folder like v0.1)

Designed to run inside the Docker tooling container via the existing CLI wrapper.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List
from urllib.parse import quote

from .config import load_config
from .utils import get_workspace_root

_VERSION_DIR_RE = re.compile(r"^v\d+(?:\.\d+)*$")


@dataclass(frozen=True)
class Group:
    title: str
    exts: tuple[str, ...]


GROUPS: List[Group] = [
    Group("Turtle (TTL)", (".ttl",)),
    Group("JSON-LD", (".jsonld",)),
    Group("JSON Schema / JSON", (".json",)),
    Group("TypeScript", (".ts",)),
]


def iso_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def is_version_dir(p: Path) -> bool:
    return p.is_dir() and _VERSION_DIR_RE.match(p.name) is not None


def group_for_file(file_name: str) -> str:
    suffix = Path(file_name).suffix.lower()
    for g in GROUPS:
        if suffix in g.exts:
            return g.title
    return "Other"


def md_link(text: str, href: str) -> str:
    return f"[{text}]({href})"


def normalize_base_url(url: str) -> str:
    return url.rstrip("/")


def get_pages_base_url() -> str:
    cfg = load_config()

    pages_url = (cfg.repository or {}).get("pages_url")
    if pages_url:
        return normalize_base_url(pages_url)

    owner = (cfg.repository or {}).get("owner", "").strip()
    name = (cfg.repository or {}).get("name", "").strip()
    if owner and name:
        return normalize_base_url(f"https://{owner.lower()}.github.io/{name}")

    return ""


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def generate_version_index(version_dir: Path, pages_base_url: str) -> None:
    files = sorted(
        [p.name for p in version_dir.iterdir() if p.is_file() and p.name.lower() != "index.md"],
        key=lambda s: s.lower(),
    )

    grouped: Dict[str, List[str]] = {}
    for name in files:
        grouped.setdefault(group_for_file(name), []).append(name)

    md: List[str] = []
    md.append(f"# Build artifacts {version_dir.name}\n")
    md.append(f"Generated: {iso_now()}\n")

    back_href = "../"
    if pages_base_url:
        back_href = f"{pages_base_url}/build/"
    md.append(f"- {md_link('Back to build index', back_href)}\n")

    if not files:
        md.append("No artifacts found in this folder.\n")
        write_text(version_dir / "index.md", "\n".join(md).rstrip() + "\n")
        return

    ordered_group_names = [g.title for g in GROUPS if g.title in grouped]
    if "Other" in grouped:
        ordered_group_names.append("Other")

    for group_name in ordered_group_names:
        md.append(f"## {group_name}\n")
        for file_name in grouped[group_name]:
            href = file_name
            if pages_base_url:
                href = f"{pages_base_url}/build/{version_dir.name}/{quote(file_name)}"
            md.append(f"- {md_link(file_name, href)}")
        md.append("")

    write_text(version_dir / "index.md", "\n".join(md).rstrip() + "\n")


def generate_build_root_index(build_dir: Path, versions: List[str], pages_base_url: str) -> None:
    md: List[str] = []
    md.append("# Build artifacts\n")
    md.append(f"Generated: {iso_now()}\n")

    if not versions:
        md.append("No versioned build folders found under `build/`.\n")
    else:
        md.append("## Versions\n")
        for v in versions:
            href = f"{v}/"
            if pages_base_url:
                href = f"{pages_base_url}/build/{quote(v)}/"
            md.append(f"- {md_link(v, href)}")
        md.append("")

    md.append("## Notes\n")
    md.append("This index is auto-generated as part of `npm run build`.\n")

    write_text(build_dir / "index.md", "\n".join(md).rstrip() + "\n")


def generate_build_indexes(workspace_root: Path | None = None) -> int:
    if workspace_root is None:
        workspace_root = get_workspace_root()

    build_dir = workspace_root / "build"
    if not build_dir.exists():
        print("[generate-build-index] No 'build/' directory found. Skipping.")
        return 0

    pages_base_url = get_pages_base_url()

    version_dirs = sorted([p for p in build_dir.iterdir() if is_version_dir(p)], key=lambda p: p.name)
    versions = [p.name for p in version_dirs]

    generate_build_root_index(build_dir, versions, pages_base_url)
    for vd in version_dirs:
        generate_version_index(vd, pages_base_url)

    print(f"[generate-build-index] Wrote build/index.md and {len(version_dirs)} version index(es).")
    return 0


def main() -> int:
    return generate_build_indexes()


if __name__ == "__main__":
    raise SystemExit(main())
