# Ontology & Taxonomy Toolkit (Multi-Domain)

Esta documentación cubre un repositorio genérico que alojará múltiples ontologías y taxonomías. La primera familia disponible es el Pasaporte Digital de Residuos (núcleo + MARPOL). A medida que se añadan nuevos dominios, se registrarán aquí.

## Navegación principal
Genérico:
1. `CATALOGO-ONTOLOGIAS.md` Inventario de ontologías.
2. `CATALOGO-TAXONOMIAS.md` Inventario de taxonomías y codelists.
3. `overview.md` Visión multi-dominio.
4. `installation-validation.md` Instalación y validación genérica.
5. `architecture-build.md` Pipeline y artefactos.
6. `shapes-contract.md` Principios SHACL transversales.
7. `08-contribuir-extender.md` Contribución y extensión (flujo general).
8. `09-roadmap.md` Roadmap global.
9. `20-glosario.md` Glosario.

Dominios Waste:
- Core: `domains/digital-waste-passport/overview.md`, `shapes.md`, `examples.md`, `vocabularies.md`, `roadmap.md`
- MARPOL: `domains/digital-marpol-waste-passport/overview.md`, `shapes.md`, `examples.md`, `vocabularies.md`, `roadmap.md`

## Familias actuales
- Waste Passport Core (`digitalWastePassport.ttl`)
- MARPOL Waste Extension (`digitalMarpolWastePassport.ttl`)
- Codelists Waste (delivery-type, discharge-means, residue-type/subtype, ISO3166, UN/LOCODE)
- Third-party (referencia externa): tractusx `asset_taxonomy.ttl`

## Próximos pasos para nuevos dominios
1. Añadir archivo ontología `ontology/<dominio>.ttl` con comentario y `owl:versionInfo`.
2. Registrar en `CATALOGO-ONTOLOGIAS.md` (propósito + prefijo base + estado).
3. Crear taxonomías SKOS si aplica → registrar en `CATALOGO-TAXONOMIAS.md`.
4. Añadir ejemplos mínimos y shapes si el dominio aporta instancias.

Ejemplos rápidos actuales:
- Núcleo Waste: `examples/digital-waste-passport-sample.ttl`
- MARPOL Waste: `examples/digital-marpol-waste-passport-sample.ttl`

Empieza por `CATALOGO-ONTOLOGIAS.md` para visión global o por el core `domains/digital-waste-passport/overview.md` si te interesa Waste.

