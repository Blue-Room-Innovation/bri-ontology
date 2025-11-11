#!/usr/bin/env bash
# Moved from docs/scripts/ to top-level scripts/ for clearer project layout.
set -euo pipefail
DATA_FILE=${1:-examples/product-sample.ttl}
SHAPES_FILE=${2:-shapes/dpp-shapes.ttl}
if [[ -z "${1:-}" ]]; then
  echo "[SHACL] Usando archivo de datos por defecto: ${DATA_FILE}"
fi
echo "[SHACL] Data   : ${DATA_FILE}"
echo "[SHACL] Shapes : ${SHAPES_FILE}"
echo "[SHACL] Extras : ontology modules"
for CMD in "pyshacl" "python3 -m pyshacl" "/opt/venv/bin/python -m pyshacl"; do
  if bash -lc "command -v ${CMD%% *}" >/dev/null 2>&1 || [[ "$CMD" == "/opt/venv/bin/python -m pyshacl" ]]; then
    echo "[SHACL] Trying ${CMD}"
    if eval $CMD -s "$SHAPES_FILE" -m -f human \
      -e ontology/dpp.ttl \
      -e ontology/alignments-untp.ttl \
      -e ontology/dpp-extensions.ttl \
      -e ontology/gs1-epcis.ttl \
      "$DATA_FILE"; then
      exit 0
    fi
  fi
done
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
echo "[SHACL] No validator found. Install 'pyshacl' or Apache Jena (shacl)." >&2
exit 1
