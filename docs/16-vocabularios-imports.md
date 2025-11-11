---
title: "16. Vocabularios e imports"
description: "Decidir entre stubs, imports completos o subsets (extract) para vocabularios externos."
tags: [imports, estrategia]
---

# 16. Vocabularios e imports

Opciones:
- Mantener stubs (simple, offline, sin semántica rica).
- Import completo (más axiomas, más peso).
- Subset vía ROBOT `extract` (equilibrio tamaño/semántica).

Migrar cuando: necesitas inferencias externas o muchos stubs del mismo vocabulario.

SPARQL para detectar IRIs externas sin declaración:
```sparql
SELECT DISTINCT ?iri WHERE {
  ?s ?p ?iri . FILTER(isIRI(?iri))
  FILTER(!STRSTARTS(STR(?iri), "https://w3id.org/dpp#"))
  FILTER NOT EXISTS { ?iri a ?t }
} ORDER BY ?iri
```

Camino seguro: inventario → clasificación → piloto → medir impacto → expandir.

Taxonomías relacionadas: `17-taxonomias-plan.md`.
