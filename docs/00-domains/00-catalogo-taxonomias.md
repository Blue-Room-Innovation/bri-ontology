# Catálogo de Taxonomías (Codelists)

> Listas controladas de valores permitidos representadas como vocabularios SKOS. Se usan en validaciones SHACL para restringir valores de propiedades específicas.

## Ubicación
Todas las codelists están en: `ontology/codelists/*.ttl`

## Codelists Disponibles

| Codelist | Archivo | Ontología | Propiedad Asociada | Formato | Valores Ejemplo |
|----------|---------|-----------|-------------------|---------|------------------|
| **Delivery Type** | `delivery-type-code.ttl` | MARPOL | `marpol:deliveryType` | Código alfanumérico | `ZTO` (entrega a instalación) |
| **Discharge Means** | `discharge-means-code.ttl` | MARPOL | `marpol:dischargeMeans` | Código alfanumérico | `ZTE` (descarga por bomba) |
| **Residue Type** | `residue-type-code.ttl` | MARPOL | `marpol:typeCode` | Código numérico | `01` (plásticos), `02` (residuos alimentarios) |
| **Residue Subtype** | `residue-subtype-code.ttl` | MARPOL | `marpol:subtypeCode` | Código alfanumérico | `A1` (botellas PET), `B2` (residuos de cocina) |
| **ISO 3166-1 Alpha-2** | `iso3166-iAlpha2.ttl` | MARPOL | `marpol:flagState` | Código ISO | `ES` (España), `DE` (Alemania) |
| **UN/LOCODE** | `unlocode.ttl` | MARPOL | `marpol:arrivalPort` | Código UN/LOCODE | `ESBCN` (Barcelona), `NLRTM` (Rotterdam) |

## Estructura SKOS

Todas las codelists siguen el patrón SKOS:

```turtle
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix : <https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/codelists/residue-type-code.ttl#> .

:ResidueTypeCodeScheme a skos:ConceptScheme ;
    skos:prefLabel "Residue Type Code Scheme"@en ;
    rdfs:comment "Clasificación de tipos de residuos según normativa MARPOL"@es .

:Plastic a skos:Concept ;
    skos:notation "01" ;
    skos:prefLabel "Plastic"@en ;
    skos:definition "Residuos plásticos"@es ;
    skos:inScheme :ResidueTypeCodeScheme .
```

## Uso en Validación SHACL

Las codelists se referencian en shapes para validar valores:

```turtle
# En digitalMarpolWastePassportShapes.ttl
:ResidueInformationShape a sh:NodeShape ;
    sh:targetClass marpol:ResidueInformation ;
    sh:property [
        sh:path marpol:typeCode ;
        sh:in ( 
            code:Plastic 
            code:FoodWaste 
            code:Operational 
        ) ;
        sh:message "typeCode debe ser un valor del catálogo residue-type-code"@es
    ] .
```

## Mantenimiento y Extensión

### Añadir un nuevo valor a codelist existente
1. Abrir archivo correspondiente en `ontology/codelists/`
2. Añadir nuevo concepto SKOS con `skos:notation`, `skos:prefLabel`, `skos:definition`
3. Vincular con `skos:inScheme` al esquema correspondiente
4. Actualizar shape SHACL si es necesario (añadir a lista `sh:in`)
5. Validar con `validate-owl.sh` y `validate-shacl.sh`

### Crear nueva codelist
1. Crear archivo `ontology/codelists/nuevo-concepto-code.ttl`
2. Definir `skos:ConceptScheme` principal
3. Añadir conceptos individuales como `skos:Concept`
4. Importar en ontología principal (`owl:imports`)
5. Crear shape SHACL que la use
6. Añadir entrada a este catálogo
7. Añadir ejemplo en `examples/`
