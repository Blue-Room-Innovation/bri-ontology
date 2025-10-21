# TODO: Taxonomías (Tractus‑X vs. DPP propio)

Este documento resume qué aporta la taxonomía de Tractus‑X, por qué y cómo se usa, y qué deberíamos crear nosotros con sus motivos. Incluye ejemplos técnicos sencillos para facilitar la comprensión e implementación.

## 1) Qué tiene Tractus‑X (Asset Taxonomy)

- Propósito: clasificar “activos”/ofertas de datos y APIs del ecosistema para facilitar descubrimiento, filtrado y alineación semántica.
- Tecnología: SKOS (`skos:ConceptScheme` + `skos:Concept`) con jerarquía `skos:broader`.
- Ámbito: conceptos como `DigitalTwinRegistry`, `Submodel`, notificaciones de calidad, PCF Exchange, etc.
- Uso típico: etiquetar un recurso (p.ej., una oferta de datos, API o asset) con un concepto de la taxonomía para permitir búsquedas y políticas homogéneas (a menudo junto a perfiles DCAT mediante `dcat:theme` o `dct:subject`).

Ejemplo (esquema y conceptos, sintetizado del fichero original):

```turtle
@prefix cx-taxo: <https://w3id.org/catenax/taxonomy#> .
@prefix skos:    <http://www.w3.org/2004/02/skos/core#> .
@prefix xsd:     <http://www.w3.org/2001/XMLSchema#> .

<https://w3id.org/catenax/taxonomy> a skos:ConceptScheme ;
  skos:prefLabel "Asset Taxonomy"@en ;
  skos:definition "Taxonomy of assets and APIs"@en ;
  skos:note "Used across CX assets for consistent tagging"@en .

cx-taxo:Asset a skos:Concept ;
  skos:inScheme <https://w3id.org/catenax/taxonomy> ;
  skos:prefLabel "Asset"@en .

cx-taxo:DigitalTwinRegistry a skos:Concept ;
  skos:broader cx-taxo:Asset ;
  skos:prefLabel "Digital Twin Registry"@en .
```

Ejemplo (etiquetar un recurso de catálogo/asset):

```turtle
@prefix ex:    <https://example.org/res/> .
@prefix dct:   <http://purl.org/dc/terms/> .
@prefix dcat:  <http://www.w3.org/ns/dcat#> .
@prefix cx-taxo: <https://w3id.org/catenax/taxonomy#> .

ex:MyDTRAsset a dcat:Resource ;
  dct:subject cx-taxo:DigitalTwinRegistry ;   # Alternativa: dcat:theme
  dcat:theme  cx-taxo:DigitalTwinRegistry .
```

Beneficios clave:
- Descubribilidad: búsquedas/filtrados coherentes por tipo de asset.
- Gobernanza: nombres controlados y jerarquías auditables.
- Interoperabilidad: encaja bien con DCAT/DCAT‑AP y catálogos de ofertas.

## 2) Qué tenemos nosotros ahora

- Ontología DPP (OWL): `ontology/dpp.ttl` define clases/propiedades núcleo.
- Taxonomía SKOS mínima: `dpp:LifecycleStageScheme` con conceptos (Fabricación, Uso, Reciclaje, etc.).
- Puntos que sugieren taxonomías adicionales (rango genérico actualmente):
  - `dpp:productCategory`, `dpp:granularityLevel`, `dpp:operationalScope`, `dpp:declaredUnit`.
- Conclusión: tenemos una taxonomía focalizada en etapas de ciclo de vida, pero no una “asset taxonomy” dedicada como Tractus‑X ni esquemas SKOS para las categorías de dominio citadas.

Ejemplo (lo que ya tenemos, simplificado):

```turtle
@prefix dpp:  <https://example.org/dpp#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .

dpp:LifecycleStageScheme a skos:ConceptScheme ;
  skos:prefLabel "Etapas del Ciclo de Vida"@es .

dpp:Manufacturing a skos:Concept ; skos:prefLabel "Fabricación"@es ; skos:inScheme dpp:LifecycleStageScheme .
```

## 3) Qué deberíamos hacer nosotros y por qué

Objetivo general: añadir taxonomías SKOS para cubrir clasificación de activos y de dominios DPP, reforzando validación y usabilidad.

3.1. Asset taxonomy (opcional según nuestros casos de uso)
- Motivo: si publicamos/gestionamos “activos” (APIs, datasets/ofertas), replicar el patrón de Tractus‑X facilita el etiquetado y el descubrimiento.
- Acción: crear `taxonomy/asset_taxonomy.ttl` con `skos:ConceptScheme` y una jerarquía adaptada a nuestro catálogo (no es necesario copiar toda la de CX, sólo lo relevante).
- Ejemplo de uso:

```turtle
@prefix my-asset: <https://example.org/taxonomy/asset#> .
@prefix skos:     <http://www.w3.org/2004/02/skos/core#> .
@prefix dcat:     <http://www.w3.org/ns/dcat#> .
@prefix ex:       <https://example.org/res/> .

<https://example.org/taxonomy/asset> a skos:ConceptScheme ;
  skos:prefLabel "Asset Taxonomy (DPP)"@es .

my-asset:Asset a skos:Concept ; skos:inScheme <https://example.org/taxonomy/asset> ; skos:prefLabel "Asset"@es .
my-asset:DPPApi a skos:Concept ; skos:broader my-asset:Asset ; skos:prefLabel "API DPP"@es .

ex:MiOfertaDPP a dcat:Resource ;
  dcat:theme my-asset:DPPApi .
```

3.2. Taxonomías de dominio para DPP
- Motivo: nuestros datos piden listas controladas para evitar valores libres y mejorar validación/búsqueda.
- Acciones:
  - `taxonomy/product_category.ttl` → categorías de producto.
  - `taxonomy/granularity_level.ttl` → nivel de granularidad (p.ej., producto, lote, serie, componente).
  - `taxonomy/operational_scope.ttl` → alcance operativo para scorecards/emisiones.
  - `taxonomy/units.ttl` (opcional) → si no usamos QUDT directamente, taxonomía de unidades/constantes declaradas.

Ejemplo (product category) y enlace desde instancias DPP:

```turtle
@prefix dpp:   <https://example.org/dpp#> .
@prefix ex:    <https://example.org/res/> .
@prefix pcat:  <https://example.org/taxonomy/product-category#> .
@prefix skos:  <http://www.w3.org/2004/02/skos/core#> .

<https://example.org/taxonomy/product-category> a skos:ConceptScheme ;
  skos:prefLabel "Categorías de producto"@es .

pcat:AutomotiveComponent a skos:Concept ;
  skos:inScheme <https://example.org/taxonomy/product-category> ;
  skos:prefLabel "Componente automoción"@es .

ex:Producto123 a dpp:Product ;
  dpp:productCategory pcat:AutomotiveComponent .
```

3.3. Validación con SHACL
- Motivo: garantizar que las referencias apunten a conceptos SKOS del esquema correcto.
- Acción: extender `shapes/dpp-shapes.ttl` para restringir `dpp:productCategory` (y similares) a recursos que sean `skos:Concept` con `skos:inScheme` esperado.

Ejemplo (shape mínimo):

```turtle
@prefix sh:   <http://www.w3.org/ns/shacl#> .
@prefix dpp:  <https://example.org/dpp#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .

[] a sh:NodeShape ;
  sh:targetClass dpp:Product ;
  sh:property [
    sh:path dpp:productCategory ;
    sh:class skos:Concept ;
    sh:nodeKind sh:IRI ;
  ] .
```

3.4. Documentación y gobierno
- Añadir guía breve en `docs/` explicando dónde viven las taxonomías, cómo proponer cambios y versiones.
- Decidir si versionamos IRIs (recomendado para esquemas estables) y cómo se publican.

## 4) Comparación simple (resumen)

- Tractus‑X: “Asset Taxonomy” generalista para clasificar assets y APIs del ecosistema.
- Nosotros: ontología DPP sólida + taxonomía SKOS mínima (etapas de ciclo de vida).
- Falta: taxonomías dedicadas para “asset” (si aplica) y para `productCategory`, `granularityLevel`, `operationalScope` (y unidades si no se delega en QUDT).
- Próximo paso recomendado: crear las taxonomías SKOS de dominio y, si procede, una asset taxonomy acotada a nuestro catálogo.

---

Checklist de acciones (prioridad sugerida)
1) Crear `taxonomy/product_category.ttl` y enlazar desde `dpp:productCategory`.
2) Crear `taxonomy/granularity_level.ttl` y enlazar desde `dpp:granularityLevel`.
3) Crear `taxonomy/operational_scope.ttl` y enlazar desde `dpp:operationalScope`.
4) (Opcional) `taxonomy/asset_taxonomy.ttl` si clasificamos assets/APIs.
5) Extender `shapes/dpp-shapes.ttl` con validaciones SHACL para estas propiedades.
6) Añadir ejemplos en `examples/` y una guía breve en `docs/`.

