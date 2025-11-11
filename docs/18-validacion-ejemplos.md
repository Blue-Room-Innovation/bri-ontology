# 18. Ejemplos de validación

Archivos:
- Ejemplo Waste válido: `examples/digital-waste-passport-sample.ttl`
- Ejemplo MARPOL válido: `examples/digital-marpol-waste-passport-sample.ttl`
- JSON-LD Waste: `examples/digital-waste-passport-sample.jsonld`
- JSON-LD MARPOL: `examples/digital-marpol-waste-passport-sample.jsonld`

Comandos (PowerShell):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-marpol-waste-passport-sample.ttl"
```

Comparar informes en `11-interpretar-resultados.md`.
