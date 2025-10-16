Param(
  [string]$ImageName = "bri-ontology-tooling"
)

$ErrorActionPreference = 'Stop'
docker build -t $ImageName -f docker/Dockerfile .
Write-Host "Built image: $ImageName" -ForegroundColor Green

