#!/usr/bin/env bash
# Generic OWL validation / reasoning script.
# Descubre automáticamente archivos .ttl en ontology/ si no se especifican --inputs.
set -euo pipefail

BUILD_DIR=${BUILD_DIR:-build}
mkdir -p "$BUILD_DIR"

REASONER_DEFAULT="HermiT" # HermiT|ELK|none
PROFILE_DEFAULT="DL"      # DL|OWL2 (según robot validate-profile)
OUTPUT_MERGED_DEFAULT="merged-ontology.ttl"
OUTPUT_REASONED_DEFAULT="reasoned-ontology.ttl"

INPUT_CSV=""
INCLUDE_CODELISTS=0
NO_AUTO=0
REASONER="$REASONER_DEFAULT"
PROFILE="$PROFILE_DEFAULT"
MERGED_FILE="$BUILD_DIR/$OUTPUT_MERGED_DEFAULT"
REASONED_FILE="$BUILD_DIR/$OUTPUT_REASONED_DEFAULT"
QUIET=0

usage() {
  cat <<'EOF'
Uso: scripts/validate-owl.sh [opciones]

Valida ontologías OWL y ejecuta razonamiento (ROBOT). Fallback a Jena RIOT (solo sintaxis).

Opciones:
  -i, --inputs <csv>      Lista de archivos TTL separados por comas.
      --include-codelists Incluye codelists en ontology/codelists/ al auto-descubrir.
      --no-auto           Desactiva descubrimiento automático (requiere --inputs).
  -r, --reasoner <name>   Razonador (HermiT|ELK|none). Default: HermiT
  -p, --profile <name>    Profile OWL para validate-profile (DL|OWL2). Default: DL
  -m, --merged <file>     Nombre archivo resultado merge (en build/). Default: merged-ontology.ttl
  -o, --output <file>     Nombre archivo razonado (en build/). Default: reasoned-ontology.ttl
  -q, --quiet             Menos salida (solo avisos y errores).
  -h, --help              Mostrar ayuda y salir.

Auto-descubrimiento: si no se pasa --inputs y no se usa --no-auto se añaden todos los .ttl en ontology/ (excluye codelists salvo --include-codelists).

Ejemplos:
  scripts/validate-owl.sh
  scripts/validate-owl.sh --reasoner ELK --profile OWL2
  scripts/validate-owl.sh -i "ontology/digitalWastePassport.ttl,ontology/digitalMarpolWastePassport.ttl" --no-auto
  scripts/validate-owl.sh --inputs ontology/digitalWastePassport.ttl --reasoner none
EOF
}

log() { if [[ $QUIET -eq 0 ]]; then echo "$@"; fi }
warn() { echo "$@" >&2; }

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -i|--inputs) INPUT_CSV="$2"; shift 2;;
      --include-codelists) INCLUDE_CODELISTS=1; shift;;
      --no-auto) NO_AUTO=1; shift;;
      -r|--reasoner) REASONER="$2"; shift 2;;
      -p|--profile) PROFILE="$2"; shift 2;;
      -m|--merged) MERGED_FILE="$BUILD_DIR/$2"; shift 2;;
      -o|--output) REASONED_FILE="$BUILD_DIR/$2"; shift 2;;
      -q|--quiet) QUIET=1; shift;;
      -h|--help) usage; exit 0;;
      -*) warn "[OWL] Opción desconocida: $1"; usage; exit 1;;
      *) warn "[OWL] Argumento inesperado: $1"; usage; exit 1;;
    esac
  done
}

parse_args "$@"

# Build input files list
INPUT_FILES=()
if [[ -n "$INPUT_CSV" ]]; then
  IFS=',' read -r -a INPUT_FILES <<<"$INPUT_CSV"
elif [[ $NO_AUTO -eq 0 ]]; then
  while IFS= read -r f; do
    # Excluir codelists salvo flag
    if [[ $INCLUDE_CODELISTS -eq 0 && "$f" == ontology/codelists/* ]]; then continue; fi
    INPUT_FILES+=("$f")
  done < <(find ontology -maxdepth 2 -type f -name '*.ttl' 2>/dev/null | sort)
fi

if [[ ${#INPUT_FILES[@]} -eq 0 ]]; then
  warn "[OWL] No se han proporcionado ontologías y el auto-descubrimiento está desactivado o vacío."; exit 2
fi

log "[OWL] Ontologías (${#INPUT_FILES[@]}):"
for f in "${INPUT_FILES[@]}"; do log "  - $f"; done
log "[OWL] Profile  : $PROFILE"
log "[OWL] Reasoner : $REASONER"
log "[OWL] Merge out: $MERGED_FILE"
log "[OWL] Reasoned : $REASONED_FILE"

OWL_WARN=0

if command -v robot >/dev/null 2>&1; then
  log "[OWL] Usando ROBOT CLI"
  ARGS=(merge)
  for f in "${INPUT_FILES[@]}"; do ARGS+=(--input "$f"); done
  ARGS+=(--output "$MERGED_FILE")
  set +e
  robot "${ARGS[@]}"
  MERGE_STATUS=$?
  set -e
  # Si el merge falla o no genera el archivo, abortamos para evitar excepciones posteriores.
  if [[ $MERGE_STATUS -ne 0 || ! -s "$MERGED_FILE" ]]; then
    warn "[OWL] Merge fallido o sin salida. No existe '$MERGED_FILE'. Código: $MERGE_STATUS"
    exit $MERGE_STATUS
  fi

  set +e
  robot validate-profile --input "$MERGED_FILE" --profile "$PROFILE"
  PROFILE_STATUS=$?
  set -e
  if [[ $PROFILE_STATUS -ne 0 ]]; then
    warn "[OWL] Profile ($PROFILE) con issues (exit $PROFILE_STATUS)."
  else
    log "[OWL] Profile ($PROFILE) OK."
  fi

  if [[ "$REASONER" != "none" ]]; then
    set +e
    robot reason --input "$MERGED_FILE" --reasoner "$REASONER" --equivalent-classes-allowed all --output "$REASONED_FILE"
    REASON_STATUS=$?
    set -e
    if [[ $REASON_STATUS -ne 0 || ! -s "$REASONED_FILE" ]]; then
      warn "[OWL] Razonamiento fallido o sin salida. Código: $REASON_STATUS"
      exit $REASON_STATUS
    else
      log "[OWL] Razonamiento OK.";
    fi
  else
    log "[OWL] Saltando razonamiento (--reasoner none)"
  fi

  # Salimos con el peor código (profile puede haber fallado) si hubo algún problema.
  if [[ $PROFILE_STATUS -ne 0 ]]; then
    exit $PROFILE_STATUS
  fi
  log "[OWL] Validación completa sin errores fatales."
  exit 0
fi

if command -v riot >/dev/null 2>&1; then
  log "[OWL] ROBOT no encontrado. Usando Jena RIOT (solo sintaxis)."
  for f in "${INPUT_FILES[@]}"; do
    log "[RIOT] Validando $f"
    riot --validate "$f"
  done
  log "[OWL] RIOT finalizado."
  exit 0
fi

warn "[OWL] No se encontró ningún validador. Instalar 'robot' o Apache Jena (riot)."
exit 1
