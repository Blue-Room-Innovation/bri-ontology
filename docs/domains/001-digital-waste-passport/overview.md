# Digital Waste Passport

> Base ontology for digital waste passports, based on the UNECE UN Transparency Protocol (UNTP) model for Product Passports.

## Direct URLs

- **Ontology**: [digitalWastePassport.ttl](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalWastePassport.ttl)
- **SHACL Shapes**: [digitalWastePassportShapes.ttl](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/shapes/digitalWastePassportShapes.ttl)
- **Turtle Example**: [digital-waste-passport-sample.ttl](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/examples/digital-waste-passport-sample.ttl)
- **JSON-LD Example**: [digital-waste-passport-sample.jsonld](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/examples/digital-waste-passport-sample.jsonld)

## Purpose

Provide a standard semantic vocabulary to represent verifiable information about waste throughout its lifecycle, from generation to final disposition, facilitating:

- **Traceability**: Tracking the origin, composition and movement of waste
- **Interoperability**: Data exchange between heterogeneous systems
- **Verifiability**: Cryptographic validation through verifiable credentials
- **Compliance**: Documentation for environmental regulations

## UNECE Base

This ontology extends:

- `unece:VerifiableCredential` - W3C credentials model adapted by UNECE
- `unece-dpp:ProductPassport` - Digital Product Passport (DPP)
- `unece:Product` - Product model with standard attributes

**UNECE References:**

- Namespace core: `https://test.uncefact.org/vocabulary/untp/core/0/`
- Namespace DPP: `https://test.uncefact.org/vocabulary/untp/dpp/0/`

## Main Classes

### `dwp:DigitalWastePassport`

Verifiable credential that encapsulates the waste passport.

**Inherits from:** `unece:VerifiableCredential`
**Key properties:**

- `dwp:credentialSubject` → Reference to `WastePassport`

### `dwp:WastePassport`

Passport document with waste metadata.

**Inherits from:** `unece-dpp:ProductPassport`
**Key properties:**

- `dwp:waste` → Reference to `Waste` object

### `dwp:Waste`

Waste representation as a product.

**Inherits from:** `unece:Product`

## Minimal JSON-LD Example

```json
{
  "@context": {
    "dwp": "https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalWastePassport.ttl#",
    "unece": "https://test.uncefact.org/vocabulary/untp/core/0/",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@id": "ex:passport001",
  "@type": "dwp:DigitalWastePassport",
  "dwp:credentialSubject": {
    "@id": "ex:wastePassport001",
    "@type": "dwp:WastePassport",
    "dwp:waste": {
      "@id": "ex:waste001",
      "@type": "dwp:Waste",
      "unece:productName": "Electronic Waste Batch 2024-Q4",
      "unece:weightQuantity": { "@value": "850", "@type": "xsd:decimal" },
      "unece:declaredUnit": {
        "@id": "https://vocabulary.uncefact.org/UnitMeasureCode#KGM"
      },
      "unece:originCountry": {
        "@id": "https://vocabulary.uncefact.org/CountryId#ES"
      }
    }
  }
}
```

## Related Files

- **Ontology**: `ontology/digitalWastePassport.ttl`
- **Shapes**: `shapes/digitalWastePassportShapes.ttl`
- **Examples**:
  - `examples/digital-waste-passport-sample.ttl`
  - `examples/digital-waste-passport-sample.jsonld`

## References and Resources

- **Model design**: [Digital Product Passport on Jargon.sh](https://jargon.sh/user/blueroominnovationontology/DigitalProductPassport)
