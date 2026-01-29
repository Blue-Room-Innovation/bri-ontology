# Taxonomies Catalog (Codelists)

> Controlled lists of allowed values represented as SKOS vocabularies. Used in SHACL validations to restrict values of specific properties.

## Location

All codelists are in: `ontology/codelists/*.ttl`

## Available Codelists

| Codelist               | File                       | Ontology | Associated Property     | Format            | Example Values                           |
| ---------------------- | -------------------------- | -------- | ----------------------- | ----------------- | ---------------------------------------- |
| **Delivery Type**      | `delivery-type-code.ttl`   | MARPOL   | `marpol:deliveryType`   | Alphanumeric code | `ZTO` (delivery to facility)             |
| **Discharge Means**    | `discharge-means-code.ttl` | MARPOL   | `marpol:dischargeMeans` | Alphanumeric code | `ZTE` (pump discharge)                   |
| **Residue Type**       | `residue-type-code.ttl`    | MARPOL   | `marpol:typeCode`       | Numeric code      | `01` (plastics), `02` (food waste)       |
| **Residue Subtype**    | `residue-subtype-code.ttl` | MARPOL   | `marpol:subtypeCode`    | Alphanumeric code | `A1` (PET bottles), `B2` (kitchen waste) |
| **ISO 3166-1 Alpha-2** | `iso3166-iAlpha2.ttl`      | MARPOL   | `marpol:flagState`      | ISO code          | `ES` (Spain), `DE` (Germany)             |
| **UN/LOCODE**          | `unlocode.ttl`             | MARPOL   | `marpol:arrivalPort`    | UN/LOCODE Code    | `ESBCN` (Barcelona), `NLRTM` (Rotterdam) |

## SKOS Structure

All codelists follow the SKOS pattern:

```turtle
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix : <https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/codelists/residue-type-code.ttl#> .

:ResidueTypeCodeScheme a skos:ConceptScheme ;
    skos:prefLabel "Residue Type Code Scheme"@en ;
    rdfs:comment "Classification of waste types according to MARPOL regulations"@en .

:Plastic a skos:Concept ;
    skos:notation "01" ;
    skos:prefLabel "Plastic"@en ;
    skos:definition "Plastic waste"@en ;
    skos:inScheme :ResidueTypeCodeScheme .
```

## Use in SHACL Validation

Codelists are referenced in shapes to validate values:

```turtle
# In digitalMarpolWastePassportShapes.ttl
:ResidueInformationShape a sh:NodeShape ;
    sh:targetClass marpol:ResidueInformation ;
    sh:property [
        sh:path marpol:typeCode ;
        sh:in (
            code:Plastic
            code:FoodWaste
            code:Operational
        ) ;
        sh:message "typeCode must be a value from the residue-type-code catalog"@en
    ] .
```

## Maintenance and Extension

### Add a new value to existing codelist

1. Open corresponding file in `ontology/codelists/`
2. Add new SKOS concept with `skos:notation`, `skos:prefLabel`, `skos:definition`
3. Link with `skos:inScheme` to corresponding scheme
4. Update SHACL shape if necessary (add to `sh:in` list)
5. Validate with `validate-owl.sh` and `validate-shacl.sh`

### Create new codelist

1. Create file `ontology/codelists/new-concept-code.ttl`
2. Define main `skos:ConceptScheme`
3. Add individual concepts as `skos:Concept`
4. Import in main ontology (`owl:imports`)
5. Create SHACL shape that uses it
6. Add entry to this catalog
7. Add example in `examples/`
