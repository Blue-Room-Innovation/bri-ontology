import argparse
import re
from pathlib import Path


def _detect_from_version(text: str) -> str:
    match = re.search(r"^ontology_version:\s*\"?([^\"\n]+)\"?\s*$", text, re.MULTILINE)
    if not match:
        raise SystemExit("Could not find ontology_version in config.yml")
    return match.group(1)


def _replace_version_key(text: str, key: str, target: str) -> str:
    # Preserve quoting style if present.
    pattern = rf"^({re.escape(key)}:\s*)(\"?)([^\"\n]+)(\"?)\s*$"

    def repl(m: re.Match[str]) -> str:
        prefix, open_q, _old, close_q = m.group(1), m.group(2), m.group(3), m.group(4)
        quote = open_q or close_q
        if quote:
            return f"{prefix}\"{target}\""
        return f"{prefix}{target}"

    return re.sub(pattern, repl, text, flags=re.MULTILINE)


def _replace_path_versions(text: str, from_version: str, target_version: str) -> str:
    # Only update versioned folder segments that are known to be versioned.
    roots = ["examples", "shapes", "build"]
    for root in roots:
        text = text.replace(f"{root}/{from_version}", f"{root}/{target_version}")
    return text


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Update config.yml version fields and internal paths to a target version while preserving comments/formatting."
    )
    parser.add_argument("--config", default="config.yml", help="Path to config.yml")
    parser.add_argument("--target", required=True, help='Target version folder, e.g. "v0.2"')
    parser.add_argument(
        "--from",
        dest="from_version",
        default=None,
        help='Optional source version (defaults to ontology_version in config), e.g. "v0.1"',
    )
    args = parser.parse_args()

    config_path = Path(args.config)
    text = config_path.read_text(encoding="utf-8")

    from_version = args.from_version or _detect_from_version(text)
    target_version = args.target

    # Update the top-level version switches that affect build artifacts.
    for key in ["ontology_version", "shapes_version", "examples_version", "build_version"]:
        text = _replace_version_key(text, key, target_version)

    # Keep codelists/contexts independent unless explicitly handled.

    # Update internal config paths that still hardcode versions.
    text = _replace_path_versions(text, from_version, target_version)

    config_path.write_text(text, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
