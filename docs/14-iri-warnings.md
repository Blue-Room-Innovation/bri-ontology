# 14. IRIs y warnings

Por qué aparecen: validador no sabe si una IRI externa es clase o propiedad.
Solución: stubs mínimos en `external-declarations.ttl`.
Cuándo migrar a imports reales: cuando necesitas semántica (domain/range, jerarquías) o muchas IRIs del mismo vocabulario.

Flujo sugerido:
1. Añade IRI.
2. Valida OWL.
3. Si warning molesto → stub.
4. Si la semántica se vuelve crítica → import/subset.

Detalles y ejemplos avanzados: `16-vocabularios-imports.md`.
