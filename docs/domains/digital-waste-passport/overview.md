# Digital Waste Passport (Core) Overview

Ontología base para credencial de residuos genérica.

## Archivo
`ontology/digitalWastePassport.ttl`

## Clases principales
- DigitalWastePassport (credencial verificable)
- WastePassport (credentialSubject con detalle)
- Waste (entidad residuo genérico)

## Propiedades clave
- credentialSubject (DigitalWastePassport → WastePassport)
- waste (WastePassport → Waste)

## Alineaciones externas
- DigitalWastePassport ⊑ unece:VerifiableCredential
- WastePassport ≡ unece-dpp:ProductPassport
- Waste ≡ unece:Product

## Ejemplo
`examples/digital-waste-passport-sample.ttl`

## Shapes relacionadas
Ver `domains/digital-waste-passport/shapes.md`.
