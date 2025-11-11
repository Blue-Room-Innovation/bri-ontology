# MARPOL Extension (Resumen)

Amplía el modelo core para datos marítimos regulados.

Validar (SHACL con extras auto):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-shacl.sh -d examples/digital-marpol-waste-passport-sample.ttl"
```

Razonamiento OWL (incluyendo codelists):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-owl.sh --include-codelists --profile DL"
```
