# Digital MARPOL Waste Passport

> Extensión especializada del Digital Waste Passport para residuos marítimos bajo la regulación MARPOL (International Convention for the Prevention of Pollution from Ships).

## Propósito

Modelar información específica de residuos generados y gestionados en el contexto marítimo, cumpliendo con:

- **MARPOL Anexo V**: Prevención de contaminación por basuras de buques
- **Directiva (UE) 2019/883**: Instalaciones receptoras portuarias
- **Sistema WASDIS**: Waste Discharge Information System para puertos europeos

## Base Conceptual

Extiende `digitalWastePassport.ttl` añadiendo:
- Información de buques (IMO, bandera, nombre)
- Puertos de origen/destino (UN/LOCODE)
- Tipos específicos de residuos marítimos
- Métodos de descarga y entrega
- Partes involucradas (operador, agente de residuos)
- Metadata WASDIS para reporting

## Clases Principales

### `marpol:DigitalMarpolWastePassport`
Credencial verificable específica para residuos MARPOL.

**Hereda de:** `dwp:DigitalWastePassport`

### `marpol:MarpolWastePassport`
Pasaporte con datos regulatorios marítimos.

**Hereda de:** `dwp:WastePassport`

### `marpol:MarpolWaste`
Residuo con contexto marítimo completo.

**Propiedades clave:**
- `marpol:ship` - Información del buque generador
- `marpol:residue` - Array de tipos de residuos con cantidades
- `marpol:arrivalPort` - Puerto de llegada (UN/LOCODE)
- `marpol:deliveryType` - Tipo de entrega (codelist)
- `marpol:involvedParty` - Operador del buque
- `marpol:wasteAgent` - Empresa autorizada de recolección
- `marpol:message` - Metadata WASDIS

### `marpol:Ship`
Información del buque.

**Propiedades:**
- `marpol:imoNumber` - Número IMO único del buque
- `marpol:vesselName` - Nombre del buque
- `marpol:flagState` - Bandera/país de registro (ISO 3166-1 Alpha-2)

### `marpol:ResidueInformation`
Detalle de un tipo de residuo específico con cantidades.

**Propiedades:**
- `marpol:typeCode` - Tipo (codelist: `residue-type-code`)
- `marpol:subtypeCode` - Subtipo (codelist: `residue-subtype-code`)
- `marpol:quantityToDeliver` - Cantidad a entregar (Measure)
- `marpol:quantityRemainingOnBoard` - Cantidad restante a bordo (Measure)
- `marpol:estimatedGenerated` - Estimación de generación (Measure)
- `marpol:maxCapacity` - Capacidad máxima de almacenamiento (Measure)
- `marpol:dischargeMeans` - Método de descarga (codelist: `discharge-means-code`)

## Codelists Específicas

- `residue-type-code.ttl` - Tipos de residuo MARPOL
- `residue-subtype-code.ttl` - Subtipos específicos
- `discharge-means-code.ttl` - Métodos de descarga
- `delivery-type-code.ttl` - Tipos de entrega en puerto
- `iso3166-iAlpha2.ttl` - Códigos de países (banderas)
- `unlocode.ttl` - Códigos de puertos UN/LOCODE

## Ejemplo JSON-LD Simplificado

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
            "unece:value": {"@value": "120", "@type": "xsd:decimal"},
            "unece:unitCode": "KGM"
          }
        }
      ]
    }
  }
}
```

## Archivos Relacionados

- **Ontología**: `ontology/digitalMarpolWastePassport.ttl`
- **Shapes**: `shapes/digitalMarpolWastePassportShapes.ttl`
- **Ejemplos**:
  - `examples/digital-marpol-waste-passport-sample.ttl`
  - `examples/digital-marpol-waste-passport-sample.jsonld`
- **Codelists**: `ontology/codelists/*.ttl` (6 listas controladas)


### Validar ejemplo contra shapes SHACL
```powershell
scripts/validate-shacl.sh -d examples/digital-marpol-waste-passport-sample.ttl
```

## Referencias Normativas

- **MARPOL Anexo V**: [IMO MARPOL](https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx)
- **Directiva (UE) 2019/883**: Instalaciones receptoras portuarias
- **UN/LOCODE**: [United Nations Code for Trade and Transport Locations](https://unece.org/trade/cefact/unlocode-code-list-country-and-territory)
