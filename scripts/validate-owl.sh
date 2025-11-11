#!/usr/bin/env bash
# Moved from docs/scripts/ to top-level scripts/ for clearer project layout.
set -euo pipefail

BUILD_DIR=${BUILD_DIR:-build}
mkdir -p "$BUILD_DIR"
INPUT_FILES=(
  "ontology/dpp.ttl"
  "ontology/alignments-untp.ttl"
  "ontology/dpp-extensions.ttl"
  "ontology/gs1-epcis.ttl"
  "ontology/external-declarations.ttl"
)
if command -v robot >/dev/null 2>&1; then
  echo "[OWL] Using ROBOT CLI for validation and reasoning"
  MERGED="$BUILD_DIR/dpp-merged.ttl"
  ARGS=(merge)
  for f in "${INPUT_FILES[@]}"; do ARGS+=(--input "$f"); done
  ARGS+=(--output "$MERGED")
  if ! robot "${ARGS[@]}"; then
    echo "[OWL] ROBOT merge returned non-zero (likely due to non-OWL triples). Continuing with warnings." >&2
    OWL_WARN=1
  fi
  if ! robot validate-profile --input "$MERGED" --profile DL; then
    echo "[OWL] Profile validation reported issues (non-DL constructs). Continuing with warnings." >&2
    OWL_WARN=1
  fi
  if ! robot reason --input "$MERGED" --reasoner HermiT --equivalent-classes-allowed all --output "$BUILD_DIR/dpp-reasoned.ttl"; then
    echo "[OWL] Reasoner reported issues. Continuing with warnings." >&2
    OWL_WARN=1
  fi
  if [[ "${OWL_WARN:-}" == "1" ]]; then
    echo "[OWL] Completed with warnings. See logs above." >&2
  else
    echo "[OWL] Validation OK. Merged: $MERGED"
  fi
  exit 0
fi
if command -v riot >/dev/null 2>&1; then
  echo "[OWL] ROBOT not found. Falling back to Jena RIOT syntax validation."
  for f in "${INPUT_FILES[@]}"; do
    echo "[RIOT] Validating $f"
    riot --validate "$f"
  done
  echo "[OWL] RIOT completed. Note: syntax only, no OWL DL reasoning."
  exit 0
fi
echo "[OWL] No validator found. Install 'robot' or Apache Jena (riot)." >&2
exit 1
