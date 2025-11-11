# 2. Conceptos clave

Piensa en el Digital Waste Passport como un contenedor verificable que describe un residuo específico y sus atributos claves.

Entidades básicas (núcleo):
- `DigitalWastePassport`: credencial (emisión, vigencia, issuer, referencia al sujeto).
- `WastePassport` (credentialSubject): estructura interna con datos del residuo.
- `Waste`: entidad del residuo (tipo, origen, clasificación, relación con regulaciones).

Extensiones MARPOL:
- `DigitalMarpolWastePassport` / `MarpolWastePassport`: variantes especializadas para requisitos MARPOL.
- `MarpolWaste`: residuo marítimo con metadatos de viaje y entrega.
- `ResidueInformation`: detalle por tipo/subtipo, cantidades (generado, a entregar, restante).
- `Ship`: buque generador (IMO, nombre, bandera ISO 3166-1 alpha2).
- `AuthorizedParty` / `InvolvedParty`: actores (operador, agente de recogida, autoridad).

Propiedades claves iniciales:
- `credentialSubject` (DigitalWastePassport → WastePassport / MarpolWastePassport)
- `waste` (WastePassport → Waste / MarpolWastePassport → MarpolWaste)
- Códigos: `typeCode`, `subtypeCode`, `deliveryType`, `dischargeMeans`, puertos (`arrivalPort`, `nextPlannedDeliveryPort`, etc.).

Relación mental mínima:
DigitalWastePassport → credentialSubject (WastePassport) → waste (Waste) → clasificación y cantidades → actores → puertos / ubicaciones.

Con esto en mente pasa a `03-instalacion.md` para montar entorno y validar ejemplos.
