---
title: "17. Taxonomías plan"
description: "Qué taxonomías SKOS necesitamos y cómo integrarlas con SHACL."
tags: [taxonomia, skos]
---

# 17. Taxonomías plan

Faltan esquemas SKOS para:
- Categoría de producto (`productCategory`).
- Nivel de granularidad (`granularityLevel`).
- Alcance operativo (`operationalScope`).
- (Opcional) Asset taxonomy si catalogamos APIs/datasets.

Pasos:
1. Crear `taxonomy/product_category.ttl` etc.
2. Añadir conceptos mínimos y labels.
3. Extender shapes: `productCategory` debe ser `skos:Concept` dentro del esquema.
4. Añadir ejemplos.

Checklist en este archivo hasta completar implementación.
