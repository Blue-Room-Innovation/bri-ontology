# Ontology & Taxonomy Toolkit (Multi-Domain)

Esta documentación cubre un repositorio genérico que alojará múltiples ontologías y taxonomías. La primera familia disponible es el Pasaporte Digital de Residuos (núcleo + MARPOL). A medida que se añadan nuevos dominios, se registrarán aquí.

## Navegación principal
1. `CATALOGO-ONTOLOGIAS.md` Inventario de ontologías: propósito, alcance, madurez, prefijos.
2. `CATALOGO-TAXONOMIAS.md` ConceptSchemes SKOS y codelists disponibles (códigos, estado, evolución).
3. `01-introduccion-modelo.md` Visión de la familia Waste Passport (contexto y modelo).
4. `02-instalacion-validacion.md` Instalación y validación genérica (OWL + SHACL).
5. `03-arquitectura-build.md` Pipeline, artefactos y convenciones de modularización.
6. `04-shapes-reglas.md` Contrato SHACL y cómo leer los reportes.
7. `05-ejemplos.md` Instancias válidas / inválidas multi-formato.
8. `06-alineaciones.md` Estrategia de alineación (UNTP, EPCIS, otros futuros).
9. `07-vocabularios-warnings.md` Gestión vocabularios externos y política de imports.
10. `08-contribuir-extender.md` Flujo de extensión y control de calidad.
11. `09-roadmap.md` Próximas líneas globales (nuevos dominios, taxonomías).
12. `20-glosario.md` Términos clave unificados.

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

Empieza por `CATALOGO-ONTOLOGIAS.md` para visión global o por `01-introduccion-modelo.md` si te interesa Waste.

