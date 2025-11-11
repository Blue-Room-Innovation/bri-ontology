---
title: "4. Validación express"
description: "Primer contacto: validar ontología y un pasaporte en menos de 1 minuto."
tags: [quickstart, validacion]
---

# 4. Validación express

Con Docker ya configurado (ver `03-instalacion.md`).

OWL + razonamiento:
```powershell
robot merge --input ontology/dpp.ttl --input ontology/dpp-extensions.ttl --output build/dpp-merged.ttl ; robot reason --input build/dpp-merged.ttl --output build/dpp-reasoned.ttl
```

SHACL (pySHACL):
```powershell
python -m pyshacl -s shapes/dpp-shapes.ttl -m rdfs -i examples/product-sample.ttl
```

Siguiente: entender el modelo en `05-modelo-datos.md`.
