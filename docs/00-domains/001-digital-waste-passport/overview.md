# Digital Waste Passport

> Ontología base para pasaportes digitales de residuos, basada en el modelo UNECE UN Transparency Protocol (UNTP) para Product Passports.

## Propósito

Proporcionar un vocabulario semántico estándar para representar información verificable sobre residuos a lo largo de su ciclo de vida, desde generación hasta disposición final, facilitando:

- **Trazabilidad**: Seguimiento del origen, composición y movimiento del residuo
- **Interoperabilidad**: Intercambio de datos entre sistemas heterogéneos
- **Verificabilidad**: Validación criptográfica mediante credenciales verificables
- **Cumplimiento**: Documentación para regulaciones ambientales

## Base UNECE

Esta ontología extiende:
- `unece:VerifiableCredential` - Modelo de credenciales del W3C adaptado por UNECE
- `unece-dpp:ProductPassport` - Pasaporte de producto digital (DPP)
- `unece:Product` - Modelo de producto con atributos estándar

**Referencias UNECE:**
- Namespace core: `https://test.uncefact.org/vocabulary/untp/core/0/`
- Namespace DPP: `https://test.uncefact.org/vocabulary/untp/dpp/0/`

## Clases Principales

### `dwp:DigitalWastePassport`
Credencial verificable que encapsula el pasaporte de residuo.

**Hereda de:** `unece:VerifiableCredential`
**Propiedades clave:**
- `dwp:credentialSubject` → Referencia al `WastePassport`

### `dwp:WastePassport`
Documento de pasaporte con metadatos del residuo.

**Hereda de:** `unece-dpp:ProductPassport`
**Propiedades clave:**
- `dwp:waste` → Referencia al objeto `Waste`

### `dwp:Waste`
Representación del residuo como producto.

**Hereda de:** `unece:Product`

## Ejemplo JSON-LD Mínimo

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
      "unece:weightQuantity": {"@value": "850", "@type": "xsd:decimal"},
      "unece:declaredUnit": {"@id": "https://vocabulary.uncefact.org/UnitMeasureCode#KGM"},
      "unece:originCountry": {"@id": "https://vocabulary.uncefact.org/CountryId#ES"}
    }
  }
}
```

## Archivos Relacionados

- **Ontología**: `ontology/digitalWastePassport.ttl`
- **Shapes**: `shapes/digitalWastePassportShapes.ttl`
- **Ejemplos**: 
  - `examples/digital-waste-passport-sample.ttl`
  - `examples/digital-waste-passport-sample.jsonld`


