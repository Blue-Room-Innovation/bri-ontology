# Digital MARPOL Waste Passport Shapes

## NodeShapes específicos
- DigitalMarpolWastePassport: mismo requisito de `credentialSubject`.
- MarpolWastePassport: referencia a `MarpolWaste`.
- MarpolWaste: ≥1 ResidueInformation, ship (1), opcional wasteAgent / involvedParty.
- ResidueInformation: typeCode (1), cantidad (quantityToDeliver | estimatedGenerated), dischargeMeans (opcional), quantityRemainingOnBoard (opcional).
- Ship: imoNumber, flag (ISO3166), name.

## Códigos
- deliveryType (codelist delivery-type-code)
- dischargeMeans (codelist discharge-means-code)
- typeCode / subtypeCode (residue-type / residue-subtype)

## Errores habituales
- Falta ResidueInformation.
- Cantidades sin Measure externo definido.
- Código fuera de lista.

## Extensión sugerida
Añadir shape para mensajes WASDIS (trace metadata) y validación cardinalidades de puertos.
