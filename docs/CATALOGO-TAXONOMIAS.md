# Catálogo de Taxonomías y Codelists

Inventario de esquemas SKOS y listas controladas. Cada entrada debe incluir: tipo (codelist / concept scheme), propósito, dominio, cardinalidad esperada y política de evolución.

## Convenciones
- Cada codelist = `skos:ConceptScheme` + conceptos `skos:Concept`.
- Archivo en `ontology/codelists/` salvo taxonomías complejas (usar `taxonomy/` futuro).
- Identificadores de concepto: URI legible (`.../DeliveryTypeCode/<code>` si aplica).
- Evolución: añadir conceptos nuevos como `skos:broader` / `skos:narrower` cuando haya jerarquía.

## Codelists actuales

### Delivery Type Code
- Archivo: `ontology/codelists/delivery-type-code.ttl`
- Propósito: Tipos de entrega / recogida de residuo.
- Dominio: MARPOL / logística de residuos.
- Uso en ontología: propiedad `deliveryType` (MARPOL).
- Validación: shape con `sh:in` (pendiente de refinar con SPARQL ASK opcional).
- Evolución: añadir códigos locales nuevos documentando definición.

### Discharge Means Code
- Archivo: `ontology/codelists/discharge-means-code.ttl`
- Propósito: Medios de descarga del residuo.
- Dominio: MARPOL.
- Uso: propiedad `dischargeMeans`.
- Evolución: puede ampliarse con medios emergentes (ej. recuperación avanzada).

### Residue Type Code / Residue Subtype Code
- Archivos: `ontology/codelists/residue-type-code.ttl`, `ontology/codelists/residue-subtype-code.ttl`
- Propósito: Clasificación primaria y secundaria del residuo.
- Dominio: Núcleo + MARPOL.
- Uso: propiedades `typeCode`, `subtypeCode`.
- Evolución: mantener sinónimos via `skos:altLabel`.

### ISO 3166-1 Alpha2
- Archivo: `ontology/codelists/iso3166-iAlpha2.ttl`
- Propósito: Países (bandera buque, jurisdicción).
- Uso: `flag` en `Ship`.
- Evolución: estable (seguir actualizaciones ISO oficiales).

### UN/LOCODE
- Archivo: `ontology/codelists/unlocode.ttl`
- Propósito: Puertos y localizaciones logísticas.
- Uso: `arrivalPort`, `nextPlannedDeliveryPort` (si se añade), etc.
- Evolución: se recomienda subset si tamaño completo es grande.

## Futuras Taxonomías (Roadmap)
Ver `docs/09-roadmap.md` para esquemas plan (estado manejo, método tratamiento, alcance regulatorio).

## Política de Gestión
- Alta frecuencia de warnings por IRIs externas → crear stubs si no se desea import completo.
- Import completo sólo cuando se requieran inferencias jerárquicas (ej. broader/narrower complejos).
- Cambios mayores: registrar en CHANGELOG y actualizar versión ontología afectada.

Para añadir nueva taxonomía SKOS → seguir plantilla de `residue-type-code.ttl` y registrar aquí.
