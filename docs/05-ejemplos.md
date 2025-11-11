# 5. Ejemplos

Archivos:
- Núcleo TTL: `examples/digital-waste-passport-sample.ttl`
- Núcleo JSON-LD: `examples/digital-waste-passport-sample.jsonld`
- MARPOL TTL: `examples/digital-marpol-waste-passport-sample.ttl`
- MARPOL JSON-LD: `examples/digital-marpol-waste-passport-sample.jsonld`
- Inválido (pruebas SHACL): `examples/invalid-waste-passport-sample.ttl`

Validar (Docker):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-marpol-waste-passport-sample.ttl"
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/invalid-waste-passport-sample.ttl"
```

Comparar salida inválida para entender violaciones (ver guía en `04-shapes-reglas.md`).

Siguiente: `06-alineaciones.md`.