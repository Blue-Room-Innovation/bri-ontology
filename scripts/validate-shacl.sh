#!/usr/bin/env bash
set -euo pipefail

DATA_FILE=${1:-examples/product-sample.ttl}
SHAPES_FILE=${2:-shapes/dpp-shapes.ttl}

if command -v pyshacl >/dev/null 2>&1; then
  echo "[SHACL] Using pySHACL"
  pyshacl -s "$SHAPES_FILE" -m -f human -i ttl \
    -e ontology/dpp.ttl \
    -e ontology/alignments-untp.ttl \
    -e ontology/dpp-extensions.ttl \
    -e ontology/gs1-epcis.ttl \
    "$DATA_FILE"
  exit $?
fi

if command -v shacl >/dev/null 2>&1; then
  echo "[SHACL] Using Apache Jena SHACL CLI"
  shacl validate --shapes "$SHAPES_FILE" --data "$DATA_FILE"
  exit $?
fi

if command -v jena >/dev/null 2>&1; then
  echo "[SHACL] Using Apache Jena (jena shacl)"
  jena shacl validate -s "$SHAPES_FILE" -d "$DATA_FILE"
  exit $?
fi

echo "[SHACL] No validator found. Install 'pyshacl' (pip install pyshacl) or Apache Jena (shacl)." >&2
exit 1

