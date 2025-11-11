# Digital Waste Passport Shapes

## NodeShapes esenciales
- DigitalWastePassport: requiere `dct:issued`, `credentialSubject`.
- WastePassport: requiere `waste` y código de clasificación (`typeCode`).
- Waste: `schema:name`, `typeCode` (min 1), `subtypeCode` (opcional).

## Errores comunes
- Ausencia de credentialSubject.
- Falta código de tipo.

## Extensión futura
Separar shape base VerifiableCredential para reutilización cross-domain.
