# 11. Interpretar resultados

OWL (ROBOT):
- Éxito: artefactos creados sin errores.
- Warnings típicos: IRIs externas sin definición (ver `14-iri-warnings.md`).
- Fallos reasoning: revisar equivalencias excesivas.

SHACL:
- `Conforms: True` → OK.
- `Conforms: False` → leer cada violación: nodo foco, propiedad (path), constraint (`sh:minCount`, `sh:datatype`, etc.).

Errores comunes:
- Falta de identificadores mínimos en `Product`.
- Fechas mal tipadas (`xsd:string` vs `xsd:dateTime`).

Siguiente: editar ontología (`12-paso-a-paso-construccion.md`).
