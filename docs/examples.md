## Ejemplos y validación (Docker)

Archivos de ejemplo:
- TTL válido: `examples/product-sample.ttl`
- TTL inválido (SHACL): `examples/invalid-product-sample.ttl`
- OWL inválido (perfil DL): `examples/invalid-owl.ttl`

Validación básica
```bash
# Ejecutar OWL (repositorio) - PowerShell (Windows)
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl

# Ejecutar SHACL (ejemplo válido) - PowerShell (Windows)
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-shacl examples/product-sample.ttl
```

Casos de invalidación
```bash
# OWL (incluir ejemplo inválido con ROBOT para forzar violación de perfil) - PowerShell (Windows)
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "robot merge --input ontology/dpp.ttl --input examples/invalid-product-sample.ttl --output build/tmp-invalid.ttl && robot validate-profile --input build/tmp-invalid.ttl --profile DL"

# SHACL (ejemplo inválido; debería mostrar Conforms: False) - PowerShell (Windows)
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-shacl examples/invalid-product-sample.ttl
```

Más información: consulta `docs/interpretar-resultados.md` para entender los informes y diagnosticar problemas.

