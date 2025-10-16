#!/usr/bin/env bash
set -euo pipefail

IMAGE=${IMAGE:-bri-ontology-tooling}

if ! docker image inspect "$IMAGE" >/dev/null 2>&1; then
  echo "Docker image '$IMAGE' not found. Building..."
  bash scripts/build-docker.sh
fi

docker run --rm -v "$PWD":/workspace -w /workspace "$IMAGE" -lc "validate-all"

