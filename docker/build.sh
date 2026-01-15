#!/bin/bash
# Build Docker image for ontology tooling

set -e

cd "$(dirname "$0")/.."

echo "🐳 Building Docker image: bri-ontology-tooling..."
docker build -t bri-ontology-tooling:latest -f docker/Dockerfile .

echo "✅ Docker image built successfully!"
echo ""
echo "📋 Available npm commands:"
echo "  npm run config:show"
echo "  npm run validate:owl:with-codelists"
echo "  npm run generate:types"
echo "  npm run build:all"
echo ""
echo "🚀 Run commands with:"
echo "  docker run --rm -v \"\$(pwd):/workspace\" -w /workspace bri-ontology-tooling:latest npm run <command>"
