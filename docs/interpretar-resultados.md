## Interpretar resultados de validate-owl y validate-shacl

Este documento explica cómo leer y diagnosticar los resultados de las dos validaciones principales del toolkit (siempre usando Docker).

### validate-owl (ROBOT / RIOT)

Qué hace
- Fusiona ontologías (`ontology/*.ttl`) y genera `build/dpp-merged.ttl`.
- Verifica perfil OWL 2 DL y ejecuta razonamiento (HermiT), generando `build/dpp-reasoned.ttl`.
- Si no hay ROBOT disponible, usa Jena RIOT como verificación de sintaxis RDF (sin razonamiento OWL).

Cómo se ve la salida
- Éxito sin avisos:
  - Mensaje: `[OWL] Validation OK. Merged: build/dpp-merged.ttl`
  - Archivos: `build/dpp-merged.ttl` y `build/dpp-reasoned.ttl` creados.
- Éxito con avisos:
  - Mensaje: `[OWL] Completed with warnings. See logs above.`
  - Registros típicos de ROBOT/OWL-API, por ejemplo:
    - `IOHelper - Input ontology contains N triple(s) that could not be parsed` (suele indicar IRIs externos o constructos no-OWL; consulta “Solución de problemas”).
  - El comando devuelve éxito, pero conviene revisar los avisos.
- Fallback RIOT (sin ROBOT):
  - Mensaje: `[OWL] ROBOT not found. Falling back to Jena RIOT syntax validation.`
  - Verifica solo sintaxis RDF; no valida perfil DL ni razona.

Qué revisar ante avisos/errores
- Perfil DL: busca mensajes de `validate-profile` que indiquen constructos fuera de DL.
- Razonador: si falla `reason`, revisa equivalencias demasiado fuertes (`owl:equivalentClass/Property`) y considera `skos:exactMatch` o `rdfs:seeAlso` cuando sea más apropiado.
- “triples not parsed”: comprueba
  - Prefijos e IRIs (que existan y estén bien formados).
  - Codificación UTF‑8 en archivos TTL.
  - Que las declaraciones externas mínimas estén en `ontology/external-declarations.ttl`.
  - Valida sintaxis con `riot --validate` si lo necesitas (dentro del contenedor no está instalado por defecto; fuera puedes usar Jena).

Archivos generados
- `build/dpp-merged.ttl`: ontología unificada; útil para inspeccionar el grafo final.
- `build/dpp-reasoned.ttl`: incluye inferencias del razonador; útil para chequear equivalencias y jerarquías.


### validate-shacl (pySHACL / Jena SHACL)

Qué hace
- Valida instancias contra `shapes/dpp-shapes.ttl`.
- Incluye las ontologías base como “imports” (`-e ontology/*.ttl`) para mejores mensajes.
- Usa pySHACL con salida “humana”. Si no está, intenta Jena SHACL.

Cómo leer el informe
- Encabezado: `Validation Report` seguido de `Conforms: True|False`.
- Si `Conforms: False`, verás una lista de resultados con campos típicos:
  - Focus node: recurso que incumple (IRI o blank node).
  - Path: propiedad que se valida (p. ej., `dct:issued`).
  - Message: explicación (si la Shape define mensajes).
  - Severity: severidad (p. ej., `sh:Violation`).
  - Constraint: el tipo de restricción (p. ej., `sh:minCount`, `sh:datatype`, `sh:class`).

Ejemplos de fallos comunes y cómo resolver
- Falta un obligatorio: `sh:minCount` incumplido (añade el campo requerido, p. ej. `dct:issued`).
- Tipo de dato incorrecto: `sh:datatype` (usa el tipo esperado, p. ej. `xsd:dateTime`).
- Cardinalidad: demasiados/pocos valores (ajusta a lo exigido por la Shape).
- Clase esperada: `sh:class` (asegura que el objeto del triple tiene el tipo requerido).
