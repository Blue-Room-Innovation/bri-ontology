#!/usr/bin/env bash
set -euo pipefail

docker build -t dpp-tooling -f docker/Dockerfile .
echo "Built image: dpp-tooling"

