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
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/product-sample.ttl"
```

Casos de invalidación
```bash
# OWL (incluir ejemplo inválido con ROBOT para forzar violación de perfil) - PowerShell (Windows)
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "robot merge --input ontology/dpp.ttl --input examples/invalid-product-sample.ttl --output build/tmp-invalid.ttl && robot validate-profile --input build/tmp-invalid.ttl --profile DL"

# SHACL (ejemplo inválido; debería mostrar Conforms: False) - PowerShell (Windows)
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/invalid-product-sample.ttl"
```

Más información: consulta `docs/interpretar-resultados.md` para entender los informes y diagnosticar problemas.

### Análisis rápido de resultados

- SHACL (válido: `examples/product-sample.ttl`)
  - Encabezado: `Validation Report` / `Conforms: True`.
  - Sin resultados adicionales.

- SHACL (inválido: `examples/invalid-product-sample.ttl`)
  - Encabezado: `Validation Report` / `Conforms: False`.
  - Violaciones típicas (resumen):
    - `dct:issued`: tipo incorrecto (`xsd:string` en vez de `xsd:dateTime`).
    - `dpp:Product` sin `schema:name` ni identificadores mínimos.
    - `dpp:Identifier` vacío (falta `dpp:gtin`/`dpp:serialNumber`/`dpp:mpn`/`dct:identifier`).
  - Ver campos “Focus node”, “Path”, “Constraint” para ubicar cada incumplimiento.
