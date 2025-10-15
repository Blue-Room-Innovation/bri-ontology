Param(
  [string[]]$InputFiles = @(
    "ontology/dpp.ttl",
    "ontology/alignments-untp.ttl",
    "ontology/dpp-extensions.ttl",
    "ontology/gs1-epcis.ttl"
  ),
  [string]$BuildDir = "build"
)

$ErrorActionPreference = 'Stop'
if (-not (Test-Path $BuildDir)) { New-Item -ItemType Directory -Path $BuildDir | Out-Null }

$robot = Get-Command robot -ErrorAction SilentlyContinue
if ($robot) {
  Write-Host "[OWL] Using ROBOT CLI for validation and reasoning" -ForegroundColor Cyan
  $mergeArgs = @('merge')
  foreach ($f in $InputFiles) { $mergeArgs += @('--input', $f) }
  $merged = Join-Path $BuildDir 'dpp-merged.ttl'
  $mergeArgs += @('--output', $merged)
  & $robot.Source $mergeArgs

  & $robot.Source 'validate-profile' '--input' $merged '--profile' 'DL'

  $reasoned = Join-Path $BuildDir 'dpp-reasoned.ttl'
  & $robot.Source 'reason' '--input' $merged '--reasoner' 'HermiT' '--equivalent-classes-allowed' 'all' '--output' $reasoned

  Write-Host "[OWL] Validation OK. Merged: $merged; Reasoned: $reasoned" -ForegroundColor Green
  exit 0
}

$riot = Get-Command riot -ErrorAction SilentlyContinue
if ($riot) {
  Write-Host "[OWL] ROBOT not found. Falling back to Jena RIOT syntax validation." -ForegroundColor Yellow
  foreach ($f in $InputFiles) {
    Write-Host "[RIOT] Validating $f" -ForegroundColor Cyan
    & $riot.Source '--validate' $f
  }
  Write-Host "[OWL] RIOT completed. Note: this checks RDF syntax, not OWL DL consistency." -ForegroundColor Yellow
  exit 0
}

Write-Host "[OWL] No validator found. Please install 'robot' (recommended) or Apache Jena (riot)." -ForegroundColor Red
exit 1

