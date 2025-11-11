# 4. Shapes y reglas

Contrato validable (SHACL) en `shapes/waste-shapes.ttl`.

Núcleo:
- `DigitalWastePassport`: requiere `dct:issued`, `credentialSubject`.
- `WastePassport`: requiere `waste` y al menos un código de clasificación.
- `Waste`: `schema:name`, `typeCode` (y opcional `subtypeCode`).

MARPOL:
- `DigitalMarpolWastePassport` / `MarpolWastePassport`: mismas reglas + enlace a `MarpolWaste`.
- `MarpolWaste`: uno o más `ResidueInformation` + referencia a `Ship`.
- `ResidueInformation`: `typeCode`, alguna cantidad (`quantityToDeliver` | `estimatedGenerated`), y si aplica `dischargeMeans`.
- `Ship`: `imoNumber`, `flag` (ISO3166-1 alpha2), `name`.

Errores comunes:
- Falta `credentialSubject`.
- Pasaporte sin relación `waste`.
- Código fuera de codelist (`sh:in`).
- Datatype incorrecto en fechas.

Interpretación de reportes SHACL:
- `Conforms: False` → revisar cada violación (propiedad, constraint, nodo foco).

Siguiente: `05-ejemplos.md`.