# Generació de JSON Schema des de SHACL

Aquest document descriu com utilitzar l'eina `shacl-to-jsonschema.py` per generar esquemes JSON Schema a partir de shapes SHACL.

---

## ⚠️ Advertència important

**JSON Schema generat NO és una conversió semàntica completa.**

- ✅ Proporciona **validació estructural** de documents JSON
- ✅ Serveix com a **contracte d'API** i per a generació de tipus TypeScript
- ❌ **NO captura tota la semàntica** de SHACL
- ❌ **NO substitueix** la validació SHACL per a contextos RDF

**SHACL segueix sent la font de veritat semàntica** (veure [ADR-005](../docs/01-adr/01.ADR-005%20Derivació%20automàtica%20de%20JSON%20Schema%20des%20de%20SHACL.md)).

---

## Requisits

```bash
pip install -r requirements.txt
```

Dependències necessàries:
- `rdflib>=7.0.0`
- `pyshacl>=0.25.0`

---

## Ús bàsic

### Sintaxi

```bash
python scripts/shacl-to-jsonschema.py --input <fitxer-shacl.ttl> --output <fitxer-schema.json>
```

### Exemples

**Generar JSON Schema per Digital Waste Passport:**

```bash
python scripts/shacl-to-jsonschema.py \
  --input shapes/digitalWastePassportShapes.ttl \
  --output build/digitalWastePassport.schema.json
```

**Generar JSON Schema per Digital MARPOL Waste Passport:**

```bash
python scripts/shacl-to-jsonschema.py \
  --input shapes/digitalMarpolWastePassportShapes.ttl \
  --output build/digitalMarpolWastePassport.schema.json
```

**Generar tots els esquemes (Windows PowerShell):**

```powershell
python scripts/shacl-to-jsonschema.py -i shapes/digitalWastePassportShapes.ttl -o build/digitalWastePassport.schema.json
python scripts/shacl-to-jsonschema.py -i shapes/digitalMarpolWastePassportShapes.ttl -o build/digitalMarpolWastePassport.schema.json
```

---

## Opcions

| Opció                  | Descripció                              |
| ---------------------- | --------------------------------------- |
| `-i`, `--input`        | Fitxer SHACL d'entrada (format Turtle) |
| `-o`, `--output`       | Fitxer JSON Schema de sortida           |
| `-v`, `--verbose`      | Activa sortida detallada (debug)        |
| `-h`, `--help`         | Mostra ajuda                            |

---

## Regles de conversió

### Suportades

| SHACL                   | JSON Schema                    | Notes                                |
| ----------------------- | ------------------------------ | ------------------------------------ |
| `sh:datatype xsd:string`| `"type": "string"`             | Tipus bàsics                         |
| `sh:datatype xsd:integer` | `"type": "integer"`          | Números enters                       |
| `sh:datatype xsd:decimal` | `"type": "number"`           | Números decimals                     |
| `sh:datatype xsd:boolean` | `"type": "boolean"`          | Booleà                               |
| `sh:datatype xsd:dateTime` | `"type": "string", "format": "date-time"` | Dates amb format |
| `sh:minCount 1`         | `"required": ["prop"]`         | Propietat obligatòria                |
| `sh:maxCount > 1`       | `"type": "array"`              | Múltiples valors                     |
| `sh:minCount`, `sh:maxCount` | `"minItems"`, `"maxItems"` | Cardinalitat d'arrays                |
| `sh:class`              | `"$ref": "#/definitions/ClassName"` | Referència a objecte            |
| `sh:in (...)`           | `"enum": [...]`                | Valors permesos                      |
| `sh:minInclusive`       | `"minimum"`                    | Valor mínim (inclusiu)               |
| `sh:maxInclusive`       | `"maximum"`                    | Valor màxim (inclusiu)               |
| `sh:minExclusive`       | `"exclusiveMinimum"`           | Valor mínim (exclusiu)               |
| `sh:maxExclusive`       | `"exclusiveMaximum"`           | Valor màxim (exclusiu)               |
| `sh:minLength`          | `"minLength"`                  | Longitud mínima de cadena            |
| `sh:maxLength`          | `"maxLength"`                  | Longitud màxima de cadena            |
| `sh:pattern`            | `"pattern"`                    | Expressió regular                    |
| `sh:closed true`        | `"additionalProperties": false"` | Propietats tancades                |

### No suportades (generen warnings)

| SHACL              | Motiu                                                     |
| ------------------ | --------------------------------------------------------- |
| `sh:sparql`        | ❌ Lògica complexa no expressable en JSON Schema          |
| `sh:node` (complex)| ❌ Shapes anidades complexes amb lògica no trivial        |
| `sh:or` (parcial)  | ⚠️ Conversió parcial a `anyOf` (pot perdre semàntica)     |
| `sh:xone` (parcial)| ⚠️ Conversió parcial a `oneOf` (pot perdre semàntica)     |
| `sh:and` (parcial) | ⚠️ Conversió parcial a `allOf` (pot perdre semàntica)     |

---

## Sortida

El script genera un fitxer JSON Schema amb l'estructura següent:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated JSON Schema from SHACL",
  "description": "This schema was automatically generated from SHACL shapes...",
  "$comment": "Auto-generated by shacl-to-jsonschema.py - DO NOT EDIT MANUALLY",
  "definitions": {
    "DigitalWastePassport": {
      "type": "object",
      "title": "Digital Waste Passport",
      "properties": {
        "dct:issued": {
          "type": "string",
          "format": "date-time",
          "description": "Debe tener una fecha de emisión"
        },
        ...
      },
      "required": ["dct:issued", "dct:publisher"],
      "additionalProperties": false
    }
  },
  "$ref": "#/definitions/DigitalWastePassport"
}
```

### Comentaris en el JSON Schema

Cada definició inclou comentaris `$comment` indicant la seva procedència:

```json
{
  "$comment": "Generated from SHACL shape dwp:WasteShape"
}
```

---

## Validació de documents JSON

Un cop generat el JSON Schema, podeu utilitzar-lo per validar documents JSON:

### Amb Python (ajv-equivalent: jsonschema)

```bash
pip install jsonschema
```

```python
import json
import jsonschema

# Carregar schema
with open("build/digitalWastePassport.schema.json") as f:
    schema = json.load(f)

# Carregar document a validar
with open("examples/digital-waste-passport-sample.jsonld") as f:
    document = json.load(f)

# Validar
try:
    jsonschema.validate(instance=document, schema=schema)
    print("✅ Vàlid segons JSON Schema")
except jsonschema.ValidationError as e:
    print(f"❌ Error de validació: {e.message}")
```

### Amb Node.js (ajv)

```bash
npm install ajv ajv-formats
```

```javascript
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("fs");

const ajv = new Ajv();
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync("build/digitalWastePassport.schema.json"));
const document = JSON.parse(fs.readFileSync("examples/digital-waste-passport-sample.jsonld"));

const validate = ajv.compile(schema);
const valid = validate(document);

if (valid) {
  console.log("✅ Vàlid segons JSON Schema");
} else {
  console.log("❌ Errors de validació:", validate.errors);
}
```

---

## Integració en CI/CD

### GitHub Actions

```yaml
name: Validate Data Model

on: [push, pull_request]

jobs:
  generate-schemas:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r scripts/requirements.txt
      
      - name: Generate JSON Schemas
        run: |
          python scripts/shacl-to-jsonschema.py \
            -i shapes/digitalWastePassportShapes.ttl \
            -o build/digitalWastePassport.schema.json
          
          python scripts/shacl-to-jsonschema.py \
            -i shapes/digitalMarpolWastePassportShapes.ttl \
            -o build/digitalMarpolWastePassport.schema.json
      
      - name: Validate examples with JSON Schema
        run: |
          python scripts/validate-with-jsonschema.py \
            --schema build/digitalWastePassport.schema.json \
            --document examples/digital-waste-passport-sample.jsonld
```

---

## Warnings i errors

### Codis de sortida

| Codi | Significat                                      |
| ---- | ----------------------------------------------- |
| 0    | Conversió correcta sense warnings               |
| 1    | Error crític (fitxer no trobat, parse error)    |
| 2    | Conversió completada però amb warnings          |

### Exemples de warnings

```
WARNING: sh:sparql found in unece:name - CANNOT be converted to JSON Schema
WARNING: sh:or found in dwp:waste - partial conversion to anyOf
```

Aquests warnings indiquen que algunes construccions SHACL no s'han pogut convertir completament.

**Acció recomanada:**
- ✅ Si el warning és esperat (sh:sparql, lògica complexa), ignorar-lo
- ⚠️ Si el warning és inesperat, revisar el SHACL original

---

## Preguntes freqüents (FAQ)

### ❓ JSON Schema pot reemplaçar SHACL?

**No.** JSON Schema només valida **estructura**, no **semàntica**. SHACL segueix sent necessari per:
- Validar relacions entre entitats
- Aplicar lògica de negoci complexa (sh:sparql)
- Garantir interoperabilitat semàntica en dataspaces

### ❓ Puc editar manualment el JSON Schema generat?

**No.** El JSON Schema és un **artefacte derivat**. Qualsevol canvi s'ha de fer en SHACL i regenerar.

### ❓ Què passa si SHACL té sh:sparql?

El script genera un **warning** i continua. La restricció sh:sparql no es pot expressar en JSON Schema, així que:
- ✅ La validació JSON Schema passa
- ❌ La validació SHACL pot fallar

**Solució:** Executar sempre validació SHACL després de JSON Schema per a casos crítics.

### ❓ Com gestiono propietats amb múltiples tipus?

SHACL permet `sh:or` per múltiples opcions. JSON Schema ho mapeja a `anyOf`, però pot perdre semàntica. Revisar el JSON Schema generat i ajustar SHACL si cal.

---

## Referències

- [ADR-005: Derivació automàtica de JSON Schema des de SHACL](../docs/01-adr/01.ADR-005%20Derivació%20automàtica%20de%20JSON%20Schema%20des%20de%20SHACL.md)
- [ADR-001: SHACL com a font de veritat semàntica](../docs/01-adr/01.ADR-001%20SHACL%20com%20a%20font%20de%20veritat%20semàntica%20i%20pipeline%20de%20validació%20per%20capes)
- [JSON Schema Specification](https://json-schema.org/)
- [SHACL W3C Specification](https://www.w3.org/TR/shacl/)

---

## Autor i manteniment

**Blue Room Innovation**  
Data: 2026-01-08  
Versió: 1.0
