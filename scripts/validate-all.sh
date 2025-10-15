#!/usr/bin/env bash
set -u

DATA_FILE=${1:-examples/product-sample.ttl}

echo "== SHACL validation =="
if command -v validate-shacl >/dev/null 2>&1; then
  validate-shacl "$DATA_FILE"
else
  "$(dirname "$0")/validate-shacl.sh" "$DATA_FILE"
fi

echo "== OWL validation =="
if command -v validate-owl >/dev/null 2>&1; then
  validate-owl || OWL_FAILED=1
else
  "$(dirname "$0")/validate-owl.sh" || OWL_FAILED=1
fi

if [[ "${OWL_FAILED:-}" == "1" ]]; then
  echo "[ALL] OWL validation had warnings/errors but SHACL ran. See logs above." >&2
fi
