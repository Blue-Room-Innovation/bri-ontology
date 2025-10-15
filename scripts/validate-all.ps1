Param(
  [string]$DataFile = "examples/product-sample.ttl"
)

$ErrorActionPreference = 'Stop'

Write-Host "== OWL validation ==" -ForegroundColor Cyan
& "$PSScriptRoot/validate-owl.ps1"

Write-Host "== SHACL validation ==" -ForegroundColor Cyan
& "$PSScriptRoot/validate-shacl.ps1" -DataFile $DataFile

