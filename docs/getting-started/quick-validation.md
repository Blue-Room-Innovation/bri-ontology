---
title: "Validación rápida (30s)"
description: "Ejecuta validaciones SHACL/OWL con Docker o nativo en menos de un minuto."
tags: [quickstart, validation]
---

# Validación rápida (30s)

Prerrequisitos: Docker instalado (alternativa nativa más abajo).Ejemplo de ejecución:
- `docs/getting-started/installation.md`

## Docker
Ejemplo de ejecución:
- `docs/getting-started/installation.md`

## Nativo (Java 17 + Python)
```powershell
# OWL (ROBOT) — ejemplo orientativo
robot merge --input ontology/dpp.ttl --input ontology/dpp-extensions.ttl --output build/dpp-merged.ttl ; \
robot reason --input build/dpp-merged.ttl --output build/dpp-reasoned.ttl

# SHACL (pySHACL)
python -m pyshacl -s shapes/dpp-shapes.ttl -m rdfs -i examples/product-sample.ttl
```

Siguiente paso: `../concepts/data-model.md` o ver más `../validation/shacl-examples.md`.

