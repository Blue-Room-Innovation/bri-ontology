---
title: "18. Ejemplos de validación"
description: "Comandos y diferencia entre ejemplos válidos e inválidos (OWL/SHACL)."
tags: [ejemplos, validacion]
---

# 18. Ejemplos de validación

Archivos:
- Válido SHACL: `examples/product-sample.ttl`
- Inválido SHACL: `examples/invalid-product-sample.ttl` (si existe)
- JSON-LD ejemplo: `examples/product-sample.jsonld`

Comandos (PowerShell):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/product-sample.ttl"
```

Ver diferencias de informe en `11-interpretar-resultados.md`.
