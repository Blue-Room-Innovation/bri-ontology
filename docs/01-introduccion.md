# 1. Introducción

El Pasaporte Digital de Residuos (Digital Waste Passport, DWP) es una estructura de datos verificable que acompaña a un residuo (o lote de residuos) durante su ciclo de vida: generación, almacenamiento, transporte, tratamiento y descarga final. Objetivos principales: trazabilidad, cumplimiento regulatorio (ambiental / MARPOL), transparencia y soporte a métricas de sostenibilidad.

Capas del modelo:
- Ontología núcleo (`digitalWastePassport.ttl`): define clases centrales (DigitalWastePassport, WastePassport, Waste) y relaciones básicas (`credentialSubject`, `waste`).
- Ontología MARPOL (`digitalMarpolWastePassport.ttl`): extiende el núcleo para escenarios marítimos (Ship, ResidueInformation, códigos de puerto, medios de descarga, tipos/subtipos de residuo).
- Codelists importados (ISO3166, UN/LOCODE, residue-type/subtype, delivery-type, discharge-means) para codificación estandarizada.
- Shapes SHACL (archivo actual `shapes/dpp-shapes.ttl` – pendiente de renombrar) para validar pasaportes y residuos.
- Ejemplos TTL/JSON-LD para DigitalWastePassport y DigitalMarpolWastePassport reproducibles.

¿Qué NO es? Una plataforma de workflow operativo. Aquí encuentras la capa semántica y tooling mínimo para validar datos.

Relación con estándares:
- UNTP: se reusa el patrón VerifiableCredential (equivalencias en `08-alineacion-untp.md`).
- EPCIS: opcional para eventos detallados de movimientos (ver `07-alineacion-epcis.md`).

Siguiente: `02-conceptos-clave.md`.
