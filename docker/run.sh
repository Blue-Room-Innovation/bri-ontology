#!/bin/bash
# Run npm command inside Docker container

set -e

cd "$(dirname "$0")/.."

if [ -z "$1" ]; then
  echo "Usage: $0 <npm-script-name> [args...]"
  echo ""
  echo "Examples:"
  echo "  $0 config:show"
  echo "  $0 validate:owl:with-codelists"
  echo "  $0 generate:types"
  echo "  $0 build:all"
  exit 1
fi

echo "🐳 Running: npm run $@"
docker run --rm -v "$(pwd):/workspace" -w /workspace bri-ontology-tooling:latest npm run "$@"
