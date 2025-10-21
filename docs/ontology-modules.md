# Módulos de la carpeta `ontology/`

Este documento explica el propósito de cada archivo TTL dentro de `ontology/`, cómo se relacionan entre sí y buenas prácticas de edición.

## Visión general
Dividimos la ontología en módulos para facilitar el mantenimiento, el versionado y las contribuciones. Al construir (build) combinamos módulos relevantes y aplicamos razonamiento para generar artefactos en `build/`.

| Archivo | Rol principal | Se edita con frecuencia | Importa / Referencia | Resultado en build |
|---------|---------------|-------------------------|----------------------|--------------------|
| `dpp.ttl` | Núcleo: clases y propiedades base del DPP (producto, material, actores, identificadores) | Sí | Puede declarar prefixes y usar IRIs de módulos externos | Se fusiona y razona (merged/reasoned) |
| `dpp-extensions.ttl` | Extensiones opcionales (scorecards, provenance, indicadores, sostenibilidad) | Media | Reutiliza clases de `dpp.ttl` | Se fusiona para aportar vocabulario adicional |
| `alignments-untp.ttl` | Alineaciones con UN/CEFACT UNTP: equivalencias y mapeos (`owl:equivalentClass`, `skos:exactMatch`) | Baja | Usa IRIs de `dpp.ttl` y de vocabularios UNTP | Mejora interoperabilidad semántica |
| `gs1-epcis.ttl` | Modelo de eventos EPCIS (ObjectEvent, AggregationEvent, etc.) y su conexión con entidades DPP | Media | Reutiliza DPP + IRIs GS1 | Permite describir trazabilidad basada en eventos |
| `external-declarations.ttl` | Stubs mínimos de IRIs externas (Schema.org, GS1, etc.) para reducir warnings | Baja | Referencia IRIs externas | Se incluye para validación limpia |

## Flujo de build (simplificado)
1. Selección de módulos principales (`dpp.ttl`, `dpp-extensions.ttl`, etc.).
2. `robot merge` combina todos en un archivo único (`build/dpp-merged.ttl`).
3. `robot reason` añade axiomas inferidos y genera `build/dpp-reasoned.ttl`.
4. Las shapes (`shapes/dpp-shapes.ttl`) se aplican sobre instancias usando los vocabularios resultantes.

## Cuándo editar cada archivo
- Cambios estructurales de clase/propiedad base: `dpp.ttl`.
- Nuevas áreas experimentales o dominios no core: empezar en `dpp-extensions.ttl`; mover al core solo tras consenso.
- Alineaciones con estándares externos: `alignments-untp.ttl` (usa comentarios claros explicando el mapeo). Evitar mezclar axiomas de negocio aquí.
- Nuevos tipos de eventos o expansión de trazabilidad: `gs1-epcis.ttl`.
- Añadir stub de IRI externa para silenciar warning: `external-declarations.ttl` (mínimo: tipo + label si aplica).

## Buenas prácticas de edición
- Mantener un bloque de prefixes al inicio, consistente entre archivos. Prefiere w3id (persistencia) para IRIs propias.
- Un concepto = un sitio: define clases y propiedades del dominio principal solo en `dpp.ttl` (evita duplicidad en extensiones).
- Documentar con comentarios (`#`) antes de bloques de definiciones más grandes para contexto.
- Al crear una extensión, usar un prefijo interno si el alcance es experimental (ej: `dppx:`) y documentar intención.
- Alineaciones: usar relaciones semánticas adecuadas (`owl:equivalentClass` vs `skos:closeMatch`) y justificar si la equivalencia no es exacta.

## Ejemplo de patrón recomendado (clase + propiedad)
```ttl
@prefix dpp: <https://w3id.org/dpp#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl:  <http://www.w3.org/2002/07/owl#> .

# Clase principal para representar un producto en el DPP
:dppProduct a owl:Class ;
  rdfs:label "Producto"@es ;
  rdfs:label "Product"@en ;
  rdfs:comment "Entidad material que recibe un Pasaporte Digital"@es .

# Propiedad de identificación
:dppHasGTIN a owl:DatatypeProperty ;
  rdfs:domain :dppProduct ;
  rdfs:range  <http://www.w3.org/2001/XMLSchema#string> ;
  rdfs:label "GTIN"@es ;
  rdfs:comment "Código GTIN asociado al producto"@es .
```
(Ajustar al naming real usado en el repositorio; el fragmento es ilustrativo.)

## Coordinación con Shapes
Cada vez que añades una nueva propiedad relevante para validación de instancias, considera crear/actualizar una `sh:property` correspondiente en `shapes/dpp-shapes.ttl` para asegurar cardinalidad y tipo. Mantener sincronía reduce falsos positivos en datos.

## Cambios mayores
Para refactors (renombrar clases, consolidar propiedades) documenta el plan en un issue y señala:
- IRI antigua
- IRI nueva
- Justificación
- Impacto en ejemplos y shapes

## Preguntas frecuentes
- ¿Puedo importar todos los módulos en un único archivo y evitar merges? Técnicamente sí, pero dificulta revisión incremental y PRs enfocados.
- ¿Por qué separar extensiones? Para mantener un núcleo estable mientras se experimenta con dominios emergentes.
- ¿Se versiona cada módulo por separado? No, se versiona el repositorio; los módulos permiten granularidad en los cambios.

## Referencias cruzadas
- Detalle de IRIs y stubs: `iri-warnings.md`
- Ontología general y diagrama: `dpp-ontology.md`
- Shapes y validación: `dpp-shapes.md`
- Alineaciones UNTP: `dpp-untp-alignment.md`
- Eventos EPCIS: `dpp-epcis.md`

