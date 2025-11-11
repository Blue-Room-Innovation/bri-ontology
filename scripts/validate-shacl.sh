#!/usr/bin/env bash
# Generic SHACL validator wrapper for pyshacl / Apache Jena.
# Permite especificar datos, shapes y descubrir automáticamente módulos .ttl en ontology/.
set -euo pipefail

DEFAULT_DATA="examples/digital-waste-passport-sample.ttl"
DEFAULT_SHAPES="shapes/waste-shapes.ttl"
FORMAT="human" # human|turtle|json-ld|text
DATA_FILE=""
SHAPES_FILE=""
EXTRAS_CSV="" # comma-separated list provided by user
NO_EXTRAS=0

usage() {
  cat <<'EOF'
Uso: scripts/validate-shacl.sh [opciones] [data.ttl [shapes.ttl]]

Opciones:
  -d, --data <file>       Archivo de datos TTL/JSON-LD a validar (default auto).
  -s, --shapes <file>     Archivo SHACL shapes (default auto).
  -e, --extras <csv>      Lista separada por comas de archivos .ttl extra.
      --no-extras         Desactiva descubrimiento automático en ontology/.
  -f, --format <fmt>      Formato salida pyshacl (human|turtle|json-ld|text). Default: human
  -h, --help              Mostrar esta ayuda y salir.

Positional (compatibilidad): primer argumento = data, segundo = shapes.
Descubrimiento automático: si no se pasa --extras ni --no-extras, se añaden todos los .ttl en ontology/ y subdirectorios.
Ejemplos:
  scripts/validate-shacl.sh                                  (usa defaults y extras auto)
  scripts/validate-shacl.sh -d examples/invalid-waste-passport-sample.ttl
  scripts/validate-shacl.sh --data data.ttl --shapes shapes/waste-shapes.ttl --no-extras
  scripts/validate-shacl.sh --extras "ontology/digitalWastePassport.ttl,ontology/codelists/unlocode.ttl"
EOF
}

is_absent() { [[ ! -f "$1" ]]; }

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -d|--data) DATA_FILE="$2"; shift 2;;
      -s|--shapes) SHAPES_FILE="$2"; shift 2;;
      -e|--extras) EXTRAS_CSV="$2"; shift 2;;
      --no-extras) NO_EXTRAS=1; shift;;
      -f|--format) FORMAT="$2"; shift 2;;
      -h|--help) usage; exit 0;;
      --) shift; break;;
      -*) echo "[SHACL] Opción desconocida: $1" >&2; usage; exit 1;;
      *)
        if [[ -z "$DATA_FILE" ]]; then DATA_FILE="$1"; shift; continue; fi
        if [[ -z "$SHAPES_FILE" ]]; then SHAPES_FILE="$1"; shift; continue; fi
        echo "[SHACL] Argumento inesperado: $1" >&2; usage; exit 1
        ;;
    esac
  done
}

parse_args "$@"

DATA_FILE="${DATA_FILE:-$DEFAULT_DATA}"
SHAPES_FILE="${SHAPES_FILE:-$DEFAULT_SHAPES}"

if is_absent "$DATA_FILE"; then echo "[SHACL] Data file no existe: $DATA_FILE" >&2; exit 2; fi
if is_absent "$SHAPES_FILE"; then echo "[SHACL] Shapes file no existe: $SHAPES_FILE" >&2; exit 2; fi

# Build extras list
EXTRA_FILES=()
if [[ $NO_EXTRAS -eq 0 ]]; then
  if [[ -n "$EXTRAS_CSV" ]]; then
    IFS=',' read -r -a EXTRA_FILES <<<"$EXTRAS_CSV"
  else
    # Auto-discover .ttl modules (exclude shapes dir & duplicates)
    while IFS= read -r f; do EXTRA_FILES+=("$f"); done < <(find ontology -type f -name '*.ttl' 2>/dev/null | sort)
  fi
fi

# Remove any accidental duplicates and files equal to DATA/SHAPES
DEDUP=(); declare -A SEEN=()
for f in "${EXTRA_FILES[@]}"; do
  [[ "$f" == "$DATA_FILE" || "$f" == "$SHAPES_FILE" ]] && continue
  if [[ -f "$f" && -z "${SEEN[$f]:-}" ]]; then SEEN[$f]=1; DEDUP+=("$f"); fi
done
EXTRA_FILES=("${DEDUP[@]}")

echo "[SHACL] Data      : $DATA_FILE"
echo "[SHACL] Shapes    : $SHAPES_FILE"
echo "[SHACL] Formato   : $FORMAT"
if [[ ${#EXTRA_FILES[@]} -gt 0 ]]; then
  printf '[SHACL] Extras (%d):\n' "${#EXTRA_FILES[@]}"
  for f in "${EXTRA_FILES[@]}"; do echo "  - $f"; done
else
  echo "[SHACL] Extras    : (ninguno)"
fi

# Build pyshacl -e arguments
PYSHACL_EXTRAS=()
for f in "${EXTRA_FILES[@]}"; do PYSHACL_EXTRAS+=( -e "$f" ); done

VALIDATORS=("pyshacl" "python3 -m pyshacl" "/opt/venv/bin/python -m pyshacl")

for CMD in "${VALIDATORS[@]}"; do
  if bash -lc "command -v ${CMD%% *}" >/dev/null 2>&1 || [[ "$CMD" == "/opt/venv/bin/python -m pyshacl" ]]; then
    echo "[SHACL] Intentando $CMD"
    set +e
    eval $CMD -s "$SHAPES_FILE" -m -f "$FORMAT" "${PYSHACL_EXTRAS[@]}" "$DATA_FILE"
    STATUS=$?
    set -e
    if [[ $STATUS -eq 0 ]]; then exit 0; fi
    echo "[SHACL] Falló con $CMD (exit $STATUS)" >&2
  fi
done

# Fallback: Apache Jena SHACL CLI (no soporte directo -e); concatenamos extras + data si existen
TMP_DATA=""
if command -v shacl >/dev/null 2>&1; then
  if [[ ${#EXTRA_FILES[@]} -gt 0 ]]; then
    TMP_DATA="$(mktemp)"
    for f in "${EXTRA_FILES[@]}"; do cat "$f" >> "$TMP_DATA"; echo '' >> "$TMP_DATA"; done
    cat "$DATA_FILE" >> "$TMP_DATA"
  else
    TMP_DATA="$DATA_FILE"
  fi
  echo "[SHACL] Usando Apache Jena SHACL CLI"
  shacl validate --shapes "$SHAPES_FILE" --data "$TMP_DATA"
  EXIT_CODE=$?
  [[ -n "$TMP_DATA" && "$TMP_DATA" != "$DATA_FILE" ]] && rm -f "$TMP_DATA"
  exit $EXIT_CODE
fi
if command -v jena >/dev/null 2>&1; then
  if [[ ${#EXTRA_FILES[@]} -gt 0 ]]; then
    TMP_DATA="$(mktemp)"
    for f in "${EXTRA_FILES[@]}"; do cat "$f" >> "$TMP_DATA"; echo '' >> "$TMP_DATA"; done
    cat "$DATA_FILE" >> "$TMP_DATA"
  else
    TMP_DATA="$DATA_FILE"
  fi
  echo "[SHACL] Usando Apache Jena (jena shacl)"
  jena shacl validate -s "$SHAPES_FILE" -d "$TMP_DATA"
  EXIT_CODE=$?
  [[ -n "$TMP_DATA" && "$TMP_DATA" != "$DATA_FILE" ]] && rm -f "$TMP_DATA"
  exit $EXIT_CODE
fi
echo "[SHACL] No se encontró ningún validador. Instalar 'pyshacl' o Apache Jena (shacl)." >&2
exit 1
