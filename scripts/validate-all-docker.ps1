Param(
  [string]$ImageName = "bri-ontology-tooling",
  [string]$DataFile = "examples/product-sample.ttl"
)

$ErrorActionPreference = 'Stop'

try {
  docker image inspect $ImageName | Out-Null
} catch {
  Write-Host "Docker image '$ImageName' not found. Building..." -ForegroundColor Yellow
  & "$PSScriptRoot/build-docker.ps1" -ImageName $ImageName
}

$mount = "{0}:/workspace" -f $PWD.Path
docker run --rm -v "$mount" -w /workspace $ImageName -lc "validate-all && validate-shacl '$DataFile'"
