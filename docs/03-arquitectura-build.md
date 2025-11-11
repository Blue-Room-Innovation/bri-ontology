# 3. Arquitectura y build

Módulos:
- `ontology/digitalWastePassport.ttl` (núcleo).
- `ontology/digitalMarpolWastePassport.ttl` (MARPOL).
- `ontology/codelists/*.ttl` (SKOS códigos).
- `ontology/external-declarations.ttl` (stubs mínimos para IRIs externas).

Proceso build (`validate-owl`):
1. Merge núcleo + extensión + codelists → `build/waste-merged.ttl`.
2. Reasoner OWL → `build/waste-reasoned.ttl`.

Usos:
- merged: distribución única y consultas SPARQL.
- reasoned: auditoría de inferencias (no publicar como ontología canónica).

Buenas prácticas:
- Estabilidad semántica en el núcleo.
- Extensiones regulatorias separadas.
- Alineaciones sólo cuando semántica exacta.

Siguiente: `04-shapes-reglas.md`.