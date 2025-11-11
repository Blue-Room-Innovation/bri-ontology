# 8. Contribuir y extender

Flujo PR:
1. Rama: `feat/...`, `fix/...`, `chore/...`.
2. Añadir clase / propiedad (label + comment + domain/range si aplica) en núcleo o extensión.
3. Evaluar alineación (UNTP) o mapping SKOS.
4. Actualizar shapes (nueva obligatoriedad / códigos / cardinalidades).
5. Extender ejemplos TTL / JSON-LD.
6. Validar: OWL → SHACL (núcleo y MARPOL).
7. Actualizar documentación y glosario.
8. Checklist y PR.

Ejemplo mínimo:
```turtle
dwpm:SpecializedWasteHandler a owl:Class ;
  rdfs:label "Gestor especializado de residuo"@es ;
  rdfs:comment "Entidad especializada en la manipulación de residuos MARPOL específicos."@es .

dwpm:handledBy a owl:ObjectProperty ;
  rdfs:domain :MarpolWaste ;
  rdfs:range  dwpm:SpecializedWasteHandler ;
  rdfs:comment "Asocia un residuo MARPOL con el gestor especializado."@es .
```

Checklist rápida:
- OWL sin errores.
- SHACL conforme (ambos ejemplos).
- Docs y glosario actualizados.
- Justificación IRIs externas (stub vs import).

Siguiente: `09-roadmap.md`.