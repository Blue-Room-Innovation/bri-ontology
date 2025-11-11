# 16. Vocabularios e imports

Opciones:
- Stubs: simple, offline, sin semántica rica.
- Import completo: añade axiomas (jerarquías, domain/range) pero aumenta peso.
- Subset ROBOT `extract`: equilibrio tamaño / semántica.

Migrar cuando: necesitas inferencias externas (ej. tipos jerárquicos MARPOL) o volumen alto de IRIs de un vocabulario (UN/LOCODE masivo).

SPARQL para detectar IRIs externas sin declaración (ajustado al nuevo prefijo):
```sparql
SELECT DISTINCT ?iri WHERE {
  ?s ?p ?iri . FILTER(isIRI(?iri))
  FILTER(!STRSTARTS(STR(?iri), "https://ontology.circularpass.io/digital-waste-passport"))
  FILTER NOT EXISTS { ?iri a ?t }
} ORDER BY ?iri
```

Camino recomendado: inventario → clasificación (codelist vs ontología amplia) → piloto → medir impacto → expandir.

Taxonomías relacionadas: `17-taxonomias-plan.md`.
