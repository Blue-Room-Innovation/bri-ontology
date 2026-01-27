# Digital MARPOL Waste Passport

> Specialized extension of the Digital Waste Passport for maritime waste under MARPOL regulation (International Convention for the Prevention of Pollution from Ships).

## Direct URLs

- **Ontology**: [digitalMarpolWastePassport.ttl](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalMarpolWastePassport.ttl)
- **SHACL Shapes**: [digitalMarpolWastePassportShapes.ttl](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/shapes/digitalMarpolWastePassportShapes.ttl)
- **Turtle Example**: [digital-marpol-waste-passport-sample.ttl](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/examples/digital-marpol-waste-passport-sample.ttl)
- **JSON-LD Example**: [digital-marpol-waste-passport-sample.jsonld](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/examples/digital-marpol-waste-passport-sample.jsonld)
- **Codelists**: See `ontology/codelists/*.ttl` (6 controlled lists)

## Purpose

Model specific information for waste generated and managed in the maritime context, complying with:

- **MARPOL Annex V**: Prevention of pollution by garbage from ships
- **Directive (EU) 2019/883**: Port reception facilities
- **WASDIS System**: Waste Discharge Information System for European ports

## Conceptual Base

Extends `digitalWastePassport.ttl` adding:

- Ship information (IMO, flag, name)
- Origin/destination ports (UN/LOCODE)
- Specific types of maritime waste
- Discharge and delivery methods
- Involved parties (operator, waste agent)
- WASDIS metadata for reporting

## Main Classes

### `marpol:DigitalMarpolWastePassport`

Verifiable credential specific for MARPOL waste.

**Inherits from:** `dwp:DigitalWastePassport`

### `marpol:MarpolWastePassport`

Passport with maritime regulatory data.

**Inherits from:** `dwp:WastePassport`

### `marpol:MarpolWaste`

Waste with complete maritime context.

**Key properties:**

- `marpol:ship` - Information of the generating ship
- `marpol:residue` - Array of waste types with quantities
- `marpol:arrivalPort` - Arrival port (UN/LOCODE)
- `marpol:deliveryType` - Delivery type (codelist)
- `marpol:involvedParty` - Ship operator
- `marpol:wasteAgent` - Authorized collection company
- `marpol:message` - WASDIS metadata

### `marpol:Ship`

Ship information.

**Properties:**

- `marpol:imoNumber` - Unique IMO number of the ship
- `marpol:vesselName` - Ship name
- `marpol:flagState` - Flag/country of registry (ISO 3166-1 Alpha-2)

### `marpol:ResidueInformation`

Detail of a specific waste type with quantities.

**Properties:**

- `marpol:typeCode` - Type (codelist: `residue-type-code`)
- `marpol:subtypeCode` - Subtype (codelist: `residue-subtype-code`)
- `marpol:quantityToDeliver` - Quantity to deliver (Measure)
- `marpol:quantityRemainingOnBoard` - Quantity remaining on board (Measure)
- `marpol:estimatedGenerated` - Generation estimate (Measure)
- `marpol:maxCapacity` - Maximum storage capacity (Measure)
- `marpol:dischargeMeans` - Discharge method (codelist: `discharge-means-code`)

## Specific Codelists

- `residue-type-code.ttl` - MARPOL waste types
- `residue-subtype-code.ttl` - Specific subtypes
- `discharge-means-code.ttl` - Discharge methods
- `delivery-type-code.ttl` - Port delivery types
- `iso3166-iAlpha2.ttl` - Country codes (flags)
- `unlocode.ttl` - UN/LOCODE port codes

## Simplified JSON-LD Example

```json
{
  "@context": {
    "marpol": "https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalMarpolWastePassport.ttl#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@id": "ex:marpolPassport001",
  "@type": "marpol:DigitalMarpolWastePassport",
  "marpol:credentialSubject": {
    "@type": "marpol:MarpolWastePassport",
    "marpol:waste": {
      "@type": "marpol:MarpolWaste",
      "marpol:ship": {
        "@type": "marpol:Ship",
        "marpol:imoNumber": "IMO1234567",
        "marpol:vesselName": "MV Ocean Trader",
        "marpol:flagState": "ES"
      },
      "marpol:arrivalPort": "ESBCN",
      "marpol:deliveryType": "ZTO",
      "marpol:residue": [
        {
          "@type": "marpol:ResidueInformation",
          "marpol:typeCode": "01",
          "marpol:quantityToDeliver": {
            "@type": "unece:Measure",
            "unece:value": { "@value": "120", "@type": "xsd:decimal" },
            "unece:unitCode": "KGM"
          }
        }
      ]
    }
  }
}
```

## Related Files

- **Ontology**: `ontology/digitalMarpolWastePassport.ttl`
- **Shapes**: `shapes/digitalMarpolWastePassportShapes.ttl`
- **Examples**:
  - `examples/digital-marpol-waste-passport-sample.ttl`
  - `examples/digital-marpol-waste-passport-sample.jsonld`
- **Codelists**: `ontology/codelists/*.ttl` (6 controlled lists)

### Validate example against SHACL shapes

```powershell
scripts/validate-shacl.sh -d examples/digital-marpol-waste-passport-sample.ttl
```

## Regulatory References

- **MARPOL Annex V**: [IMO MARPOL](<https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx>)
- **Directive (EU) 2019/883**: Port reception facilities
- **UN/LOCODE**: [United Nations Code for Trade and Transport Locations](https://unece.org/trade/cefact/unlocode-code-list-country-and-territory)

## Design Resources

- **Model design**: [MARPOL Waste Passport on Jargon.sh](https://jargon.sh/user/sysadmin/MarpolWastePassport)
