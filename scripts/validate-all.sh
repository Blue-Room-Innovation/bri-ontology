#!/usr/bin/env bash
set -euo pipefail

DATA_FILE=${1:-examples/product-sample.ttl}

echo "== OWL validation =="
"$(dirname "$0")/validate-owl.sh"

echo "== SHACL validation =="
"$(dirname "$0")/validate-shacl.sh" "$DATA_FILE"

