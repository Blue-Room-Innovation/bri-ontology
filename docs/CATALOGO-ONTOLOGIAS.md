# Catálogo de Ontologías

Registro central de ontologías incluidas en este repositorio multi-dominio. Cada entrada debe indicar: prefijo base, alcance, estado de madurez, dependencias y alineaciones principales.

## Convenciones
- Prefijo base: `https://ontology.circularpass.io/<slug>/`
- Versionado semántico en `owl:versionInfo`.
- Comentario inicial (`rdfs:comment`) describe propósito y contexto regulatorio / de negocio.
- Alineaciones externas SOLO si semántica exacta (subClassOf / equivalence). Usar SKOS mappings si aproximada.
- Estado: `experimental`, `beta`, `stable`, `deprecated`.

## Ontologías

### Waste Passport Core
- Archivo: `ontology/digitalWastePassport.ttl`
- Prefijo base: `https://ontology.circularpass.io/digital-waste-passport/`
- Propósito: modelo núcleo para credencial verificable sobre residuos (DigitalWastePassport, WastePassport, Waste).
- Estado: `beta` (estable estructuralmente, pendiente ampliaciones residuo / métricas).
- Alineaciones: `DigitalWastePassport ⊑ unece:VerifiableCredential`, `WastePassport ≡ unece-dpp:ProductPassport`, `Waste ≡ unece:Product`.
- Shapes: integrados en `shapes/waste-shapes.ttl` (secciones núcleo).
- Ejemplos: `examples/digital-waste-passport-sample.ttl`, JSON-LD homólogo.

### MARPOL Waste Extension
- Archivo: `ontology/digitalMarpolWastePassport.ttl`
- Prefijo base: `https://ontology.circularpass.io/digital-marpol-waste-passport/`
- Propósito: extender núcleo para requisitos MARPOL (Ship, MarpolWaste, ResidueInformation, cantidades y puertos).
- Estado: `beta` (ampliable en actores y eventos asociados).
- Importa codelists: delivery-type, discharge-means, residue-type/subtype, iso3166, unlocode.
- Alineaciones externas: sin equivalentes directos UNTP (usar SKOS mapping futuro).
- Shapes: mismas shapes base + reglas específicas residuo marítimo.
- Ejemplos: `examples/digital-marpol-waste-passport-sample.ttl`, JSON-LD homólogo.


Para añadir una ontología nueva, sigue `docs/08-contribuir-extender.md` y actualiza este catálogo.