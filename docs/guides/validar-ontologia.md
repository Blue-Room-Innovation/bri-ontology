---
title: "Validar Ontología y Pasaportes"
description: "Cómo validar OWL y SHACL con scripts y herramientas recomendadas."
tags: [guides, validation, owl, shacl]
---

# Validar Ontología y Pasaportes

Este documento reúne los puntos prácticos para validar el modelo OWL y las instancias mediante SHACL.

## Scripts (Docker)
- OWL: `docs/validation/scripts/validate-owl.sh`
- SHACL: `docs/validation/scripts/validate-shacl.sh`

Ejemplo de ejecución:
```powershell
docker build -t dpp-toolkit ./docker
docker run --rm -v ${PWD}:/work dpp-toolkit bash docs/validation/scripts/validate-owl.sh
docker run --rm -v ${PWD}:/work dpp-toolkit bash docs/validation/scripts/validate-shacl.sh examples/product-sample.ttl
```

## Nativo
- OWL (ROBOT): ver ejemplo en `../getting-started/quick-validation.md`
- SHACL (pySHACL): idem

## Shapes y ejemplos
- Referencia de shapes: `../reference/shapes.md`
- Ejemplos comentados: `../validation/shacl-examples.md`

## Consejos
- Para depurar OWL, aprovecha `robot validate` y `reason`.

