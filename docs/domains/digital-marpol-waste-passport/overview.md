# Digital MARPOL Waste Passport Overview

Extiende el core para residuos regulados MARPOL.

## Archivo
`ontology/digitalMarpolWastePassport.ttl`

## Clases nuevas
- DigitalMarpolWastePassport / MarpolWastePassport
- MarpolWaste
- ResidueInformation
- Ship, AuthorizedParty, InvolvedParty
- WasdisMetadata (si aplica)

## Propiedades clave adicionales
- residue (MarpolWaste → ResidueInformation)
- ship (MarpolWaste → Ship)
- quantityToDeliver / quantityRemainingOnBoard / estimatedGenerated
- deliveryType, dischargeMeans (códigos logísticos)
- arrivalPort, flag

## Dependencia
Hereda patrón de credencial y sujeto del core (credentialSubject / waste) adaptado a MARPOL.

## Ejemplo
`examples/digital-marpol-waste-passport-sample.ttl`

Más detalle en `domains/digital-marpol-waste-passport/shapes.md`.
