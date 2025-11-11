# 13. Shapes referencia

Reglas núcleo (Waste Passport):
- `DigitalWastePassport`: requiere `dct:issued`, `credentialSubject`, issuer (`dct:publisher` o equivalente) y referencia `waste` indirecta vía WastePassport.
- `WastePassport`: exige relación `waste` y mínimo un atributo identificador del residuo (ej. código de tipo).
- `Waste`: debe incluir al menos `schema:name` y clasificación (`typeCode` + opcional `subtypeCode`).

MARPOL:
- `DigitalMarpolWastePassport` / `MarpolWastePassport`: mismas reglas núcleo + presencia de `waste` hacia `MarpolWaste`.
- `ResidueInformation`: cantidad (`quantityToDeliver` o `estimatedGenerated`), método (`dischargeMeans`), tipo (`typeCode`).
- `Ship`: `imoNumber`, `flag`, `name` mínimos.

Eventos EPCIS (si aplican): `eventTime` + `bizStep` obligatorios; ObjectEvent con lista de EPCs.

Uso: shapes = contrato validable. Cualquier ausencia dispara violaciones SHACL (`sh:minCount`, `sh:in`, `sh:datatype`).
