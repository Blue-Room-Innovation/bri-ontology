## Instalación (solo Docker)

Requisitos
- Docker Desktop (Windows/macOS) o Docker Engine (Linux)
- Tener la imagen preparada `../guides/build.md`

Validar OWL
```bash
# Bash (macOS/Linux)
docker run --rm -v "$PWD:/workspace" -w /workspace bri-ontology-tooling validate-owl
# PowerShell (Windows)
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
# CMD (Windows)
docker run --rm -v %cd%:/workspace -w /workspace bri-ontology-tooling validate-owl
```

Validar SHACL
```bash
# Bash (macOS/Linux)
docker run --rm -v "$PWD:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/product-sample.ttl"
# PowerShell (Windows)
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/product-sample.ttl"
# CMD (Windows)
docker run --rm -v %cd%:/workspace -w /workspace bri-ontology-tooling "validate-shacl examples/product-sample.ttl"
```


Archivos de ejemplo:
- TTL: `examples/product-sample.ttl`
- JSON-LD: `examples/product-sample.jsonld`

Resultados esperados
- SHACL: con `examples/product-sample.ttl` debe verse `Conforms: True`.
- OWL (ROBOT): puede mostrar mensajes de parseo por IRIs externos (schema.org/UNTP/EPCIS). Son esperables y no bloquean la validación de instancias.

Notas:
- Las unidades de `dpp:Measurement` usan QUDT (`qudt:unit`). Para `dpp:declaredUnit` en emisiones se admiten IRIs de `https://vocabulary.uncefact.org/UnitMeasureCode#...`.
- Los códigos de país en los ejemplos hacen referencia a IRIs del vocabulario UN/CEFACT CountryId.
