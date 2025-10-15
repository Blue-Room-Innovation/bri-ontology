Param(
  [string]$DataFile = "examples/product-sample.ttl",
  [string]$ShapesFile = "shapes/dpp-shapes.ttl",
  [string[]]$ExtraOntologies = @(
    "ontology/dpp.ttl",
    "ontology/alignments-untp.ttl",
    "ontology/dpp-extensions.ttl",
    "ontology/gs1-epcis.ttl"
  )
)

$ErrorActionPreference = 'Stop'

$pyshacl = Get-Command pyshacl -ErrorAction SilentlyContinue
if ($pyshacl) {
  Write-Host "[SHACL] Using pySHACL" -ForegroundColor Cyan
  $args = @('-s', $ShapesFile, '-m', '-f', 'human', '-i', 'ttl')
  foreach ($e in $ExtraOntologies) { $args += @('-e', $e) }
  $args += $DataFile
  & $pyshacl.Source $args
  exit $LASTEXITCODE
}

$jenaShacl = Get-Command shacl -ErrorAction SilentlyContinue
if ($jenaShacl) {
  Write-Host "[SHACL] Using Apache Jena SHACL CLI" -ForegroundColor Cyan
  & $jenaShacl.Source 'validate' '--shapes' $ShapesFile '--data' $DataFile
  exit $LASTEXITCODE
}

$jena = Get-Command jena -ErrorAction SilentlyContinue
if ($jena) {
  Write-Host "[SHACL] Using Apache Jena (jena shacl)" -ForegroundColor Cyan
  & $jena.Source 'shacl' 'validate' '-s' $ShapesFile '-d' $DataFile
  exit $LASTEXITCODE
}

Write-Host "[SHACL] No validator found. Install 'pyshacl' (pip install pyshacl) or Apache Jena (shacl)." -ForegroundColor Red
exit 1

