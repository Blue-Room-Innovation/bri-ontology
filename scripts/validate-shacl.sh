done
#!/usr/bin/env bash
# Deprecated: consolidated into Python.
# Kept as a thin wrapper for backwards compatibility.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "[SHACL] (DEPRECATED) Use: python scripts/ontology_cli.py validate shacl --data ... --shapes ..." >&2

python "$ROOT_DIR/scripts/ontology_cli.py" validate shacl "$@"
