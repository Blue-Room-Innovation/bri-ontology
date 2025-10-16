#!/usr/bin/env bash
set -euo pipefail

docker build -t bri-ontology-tooling -f docker/Dockerfile .
echo "Built image: bri-ontology-tooling"

