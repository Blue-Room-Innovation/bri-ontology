#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR=${BUILD_DIR:-build}
mkdir -p "$BUILD_DIR"

INPUT_FILES=(
  "ontology/dpp.ttl"
  "ontology/alignments-untp.ttl"
  "ontology/dpp-extensions.ttl"
  "ontology/gs1-epcis.ttl"
)

if command -v robot >/dev/null 2>&1; then
  echo "[OWL] Using ROBOT CLI for validation and reasoning"
  MERGED="$BUILD_DIR/dpp-merged.ttl"
  ARGS=(merge)
  for f in "${INPUT_FILES[@]}"; do ARGS+=(--input "$f"); done
  ARGS+=(--output "$MERGED")
  robot "${ARGS[@]}"

  robot validate-profile --input "$MERGED" --profile DL
  robot reason --input "$MERGED" --reasoner HermiT --equivalent-classes-allowed all --output "$BUILD_DIR/dpp-reasoned.ttl"
  echo "[OWL] Validation OK. Merged: $MERGED"
  exit 0
fi

if command -v riot >/dev/null 2>&1; then
  echo "[OWL] ROBOT not found. Falling back to Jena RIOT syntax validation."
  for f in "${INPUT_FILES[@]}"; do
    echo "[RIOT] Validating $f"
    riot --validate "$f"
  done
  echo "[OWL] RIOT completed. Note: this checks RDF syntax, not OWL DL consistency."
  exit 0
fi

echo "[OWL] No validator found. Please install 'robot' (recommended) or Apache Jena (riot)." >&2
exit 1

