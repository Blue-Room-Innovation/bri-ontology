# 7. Vocabularios externos y warnings

Problema: warnings por IRIs externas sin declaración local (codelists, UNTP, EPCIS...).

Opciones:
1. Stubs (`external-declarations.ttl`): declaración mínima para silenciar warnings.
2. Import completo: añade axiomas (domain/range, jerarquías) → más peso.
3. Subset con ROBOT (`extract`): equilibrio tamaño / semántica.

Cuándo migrar de stub a import:
- Necesitas inferencias externas.
- Uso intensivo de IRIs de ese vocabulario.

Flujo sugerido:
1. Inventario IRIs externas (SPARQL abajo).
2. Clasificar (codelist pequeña vs ontología grande).
3. Pilot subset.
4. Medir impacto (tamaño, warnings, inferencias).

SPARQL inventario (ajusta prefijo base si cambia):
```sparql
SELECT DISTINCT ?iri WHERE {
  ?s ?p ?iri . FILTER(isIRI(?iri))
  FILTER(!STRSTARTS(STR(?iri), "https://ontology.circularpass.io/digital-waste-passport"))
  FILTER NOT EXISTS { ?iri a ?t }
} ORDER BY ?iri
```

IRIs repetidas → crear stub. Necesidad semántica → subset/import.

Siguiente: `08-contribuir-extender.md`.