## Paso a paso: modificar la ontología DPP

Esta guía explica cómo añadir o modificar clases/propiedades en la ontología, actualizar Shapes SHACL y probar los cambios de forma reproducible.

### Requisitos

- Docker instalado. Sigue `docs/getting-started/installation.md`.

### Flujo de trabajo

1) Elige el archivo a modificar
- `ontology/dpp.ttl`: núcleo OWL (clases y propiedades principales)
- `ontology/alignments-untp.ttl`: equivalencias/enlaces con UNTP (`untpcore:`, `untpdpp:`)
- `ontology/dpp-extensions.ttl`: extensiones (scorecards, provenance, claims, etc.)
- `ontology/gs1-epcis.ttl`: mapeos a eventos EPCIS/CBV
- `shapes/dpp-shapes.ttl`: reglas SHACL para validar instancias
- `examples/product-sample.ttl`: ejemplos que deben conformar tras tus cambios

2) Añade/edita clases y propiedades (OWL)
- Prefijos y estilo: reutiliza los prefijos existentes y define IRIs bajo `https://example.org/dpp#...`
- Anota siempre `rdfs:label` (@es; opcional @en) y `rdfs:comment` claros
- Especifica `rdfs:subClassOf` (clases) y `rdfs:domain`/`rdfs:range` (propiedades) cuando aplique
- Usa `owl:equivalentClass` / `owl:equivalentProperty` solo si la equivalencia semántica es fuerte; en caso contrario usa `skos:exactMatch` o `rdfs:seeAlso`

Ejemplo (nueva clase y propiedad):

```turtle
@prefix dpp:    <https://example.org/dpp#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl:    <http://www.w3.org/2002/07/owl#> .
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .

dpp:SustainabilityClaim a owl:Class ;
  rdfs:label   "Declaración de sostenibilidad"@es ;
  rdfs:comment "Afirmación verificable asociada a un producto o DPP."@es .

dpp:hasClaim a owl:ObjectProperty ;
  rdfs:label  "tiene declaración"@es ;
  rdfs:domain dpp:Product ;
  rdfs:range  dpp:SustainabilityClaim .
```

3) Actualiza las Shapes SHACL
- Crea/ajusta `NodeShape` y `PropertyShape` en `shapes/dpp-shapes.ttl`
- Establece mínimos razonables (`sh:minCount`) y tipos (`sh:datatype` o `sh:class`)
- Si una regla puede satisfacerse con DPP o UNTP, usa `sh:or` como en las Shapes existentes

Ejemplo (Shape para la nueva clase):

```turtle
@prefix sh:  <http://www.w3.org/ns/shacl#> .
@prefix dpp: <https://example.org/dpp#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

dpp:SustainabilityClaimShape a sh:NodeShape ;
  sh:targetClass dpp:SustainabilityClaim ;
  sh:property [ sh:path dpp:issuedBy ; sh:minCount 1 ] ;
  sh:property [ sh:path dpp:issuedAt ; sh:datatype xsd:dateTime ; sh:minCount 1 ] .
```

4) Alinea con UNTP si aplica
- En `ontology/alignments-untp.ttl`, añade `owl:equivalentClass`/`owl:equivalentProperty` solo si la semántica coincide
- Alternativas: `skos:exactMatch`, `rdfs:seeAlso`

5) Actualiza los ejemplos
- Extiende `examples/product-sample.ttl` para cubrir la nueva clase/propiedad
- Si mantienes JSON-LD, alinea contextos y comprueba que serializa correctamente

6) Valida los cambios, tal como se explica en `docs/getting-started/installation.md`.

7) Checklist antes de abrir PR
- [ ] Prefijos y IRIs consistentes (`https://example.org/dpp#`)
- [ ] `rdfs:label` y `rdfs:comment` claros (al menos @es)
- [ ] Domain/Range/SubClass correctos; equivalencias justificadas
- [ ] Shapes SHACL actualizadas y pasando
- [ ] Ejemplos actualizados (TTL y JSON-LD)
- [ ] Validaciones OWL+SHACL verdes (o warnings conocidos documentados)

### Consejos y buenas prácticas

- Unidades y medidas: usa QUDT (`qudt:unit`) en `dpp:Measurement` y IRIs válidos para unidades declaradas (p. ej. UN/CEFACT `https://vocabulary.uncefact.org/UnitMeasureCode#...`)
- EPCIS/CBV: para `dpp:bizStep` y `dpp:disposition` usa IRIs de CBV (`https://ref.gs1.org/cbv/...`)
- Tiempos/fechas: usa `xsd:dateTime` para `dpp:eventTime` y fechas de emisión
- Etiquetas: añade `rdfs:label` en español y, opcionalmente, en inglés (@en)
- Estilo TTL: agrupa secciones por temática; identación de 2 espacios; ordena propiedades de forma coherente
- SHACL: replica el patrón de Shapes existente (uso de `sh:or` cuando aplica DPP/UNTP)

