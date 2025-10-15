## Ejemplos y validación

Archivos de ejemplo:
- TTL: `examples/product-sample.ttl`
- JSON-LD: `examples/product-sample.jsonld`

Validación con scripts (Windows PowerShell o Unix bash):

```powershell
# Validar todo (OWL + SHACL)
./scripts/validate-all.ps1

# Solo OWL
./scripts/validate-owl.ps1

# Solo SHACL
./scripts/validate-shacl.ps1 -DataFile examples/product-sample.ttl
```

```bash
# Validar todo (OWL + SHACL)
bash scripts/validate-all.sh

# Solo OWL
bash scripts/validate-owl.sh

# Solo SHACL
bash scripts/validate-shacl.sh examples/product-sample.ttl
```

Validación SHACL (pySHACL directamente):

```bash
# 1) Validar instancias contra Shapes
pyshacl -s shapes/dpp-shapes.ttl -m -f human -i ttl examples/product-sample.ttl

# 2) Validar también ontología base (opcional, para inferencia)
pyshacl -s shapes/dpp-shapes.ttl -m -e ontology/dpp.ttl -e ontology/alignments-untp.ttl -e ontology/dpp-extensions.ttl -e ontology/gs1-epcis.ttl -f human examples/product-sample.ttl
```

Validación con Docker

```powershell
# Construir imagen
./scripts/build-docker.ps1
# Ejecutar validación completa (OWL + SHACL)
./scripts/validate-all-docker.ps1
```

```bash
# Construir imagen
bash scripts/build-docker.sh
# Ejecutar validación completa (OWL + SHACL)
bash scripts/validate-all-docker.sh
```

Resultados esperados
- SHACL: con `examples/product-sample.ttl` debe verse `Conforms: True`.
- OWL (ROBOT): puede mostrar mensajes de parseo por IRIs externos (schema.org/UNTP/EPCIS). Son esperables y no bloquean la validación de instancias. Consulta README.md para detalles y cómo endurecer OWL si deseas “0 warnings”.

Notas:
- Las unidades de medidas de `dpp:Measurement` usan QUDT (`qudt:unit`). Para `dpp:declaredUnit` en emisiones se admiten IRIs de `https://vocabulary.uncefact.org/UnitMeasureCode#...`.
- Los códigos de país en los ejemplos hacen referencia a IRIs del vocabulario UN/CEFACT CountryId.
