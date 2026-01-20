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
| `sh:class`              | `"$ref": "#/definitions/ShapeName"` | Referència a Shape (veure detalls avall) |
| `sh:node`               | `"$ref": "#/definitions/ShapeName"` | Referència directa a Shape      |
| `sh:in (...)`           | `"enum": [...]`                | Valors permesos                      |
| `sh:minInclusive`       | `"minimum"`                    | Valor mínim (inclusiu)               |
| `sh:maxInclusive`       | `"maximum"`                    | Valor màxim (inclusiu)               |
| `sh:minExclusive`       | `"exclusiveMinimum"`           | Valor mínim (exclusiu)               |
| `sh:maxExclusive`       | `"exclusiveMaximum"`           | Valor màxim (exclusiu)               |
| `sh:minLength`          | `"minLength"`                  | Longitud mínima de cadena            |
| `sh:maxLength`          | `"maxLength"`                  | Longitud màxima de cadena            |
| `sh:pattern`            | `"pattern"`                    | Expressió regular                    |
| `sh:closed true`        | `"additionalProperties": false"` | Propietats tancades                |

### Com funciona `sh:class` → `$ref`

**⚠️ Important:** El script **no apunta a l'ontologia**, sinó als **Shapes SHACL**.

#### Per què?

En SHACL, quan escrius:

```turtle
sh:property [
  sh:path dwp:credentialSubject ;
  sh:class dwp:WastePassport ;  # Apunta a la CLASSE de l'ontologia
] ;
```

Estàs dient: "El valor d'aquesta propietat ha de ser una instància de la classe `dwp:WastePassport`".

Però en JSON Schema necessitem definir **l'estructura** d'aquest objecte, no només el seu tipus. Per això, el script:

1. **Busca el Shape** que valida aquesta classe:
   ```turtle
   dwp:WastePassportShape a sh:NodeShape ;
     sh:targetClass dwp:WastePassport ;  # Aquest Shape valida WastePassport
     sh:property [...] ;
   ```

2. **Genera la referència** al Shape en JSON Schema:
   ```json
   {
     "$ref": "#/definitions/WastePassportShape"
   }
   ```

#### Procés de resolució

El script construeix un **mapa de classes a Shapes** basant-se en `sh:targetClass`:

```
dwp:WastePassport      → dwp:WastePassportShape
dwp:Waste              → dwp:WasteShape
unece:Standard         → unece:StandardShape
unece:MaterialConstituent → unece:MaterialConstituentShape
```

Quan troba `sh:class X`, busca automàticament el Shape amb `sh:targetClass X`.

#### Què passa si no troba el Shape?

Si una classe no té un Shape definit (per exemple, classes externes), el script:

1. **Genera un warning:**
   ```
   WARNING: No shape found with sh:targetClass https://ontology.untp.io/core/Measure for property dmwp:quantityToDeliver
   ```

2. **Afegeix un comentari** en el JSON Schema en lloc del `$ref`:
   ```json
   {
     "dmwp:quantityToDeliver": {
       "$comment": "sh:class https://ontology.untp.io/core/Measure - no corresponding shape found"
     }
   }
   ```

**Això significa que:**
- ✅ El script continua funcionant
- ⚠️ La propietat no tindrà validació estructural en JSON Schema
- ⚠️ Cal definir un Shape per aquesta classe si vols validació completa

#### Exemple pràctic

**SHACL:**
```turtle
dwp:DigitalWastePassportShape a sh:NodeShape ;
  sh:targetClass dwp:DigitalWastePassport ;
  sh:property [
    sh:path dwp:credentialSubject ;
    sh:class dwp:WastePassport ;  # ← Apunta a la CLASSE
  ] ;

dwp:WastePassportShape a sh:NodeShape ;
  sh:targetClass dwp:WastePassport ;  # ← El script mapeja això
  sh:property [...] ;
```

**JSON Schema generat:**
```json
{
  "DigitalWastePassportShape": {
    "properties": {
      "dwp:credentialSubject": {
        "$ref": "#/definitions/WastePassportShape"  // ← Referència al Shape
      }
    }
  },
  "WastePassportShape": {
    "properties": { ... }
  }
}
```

### Diferència entre `sh:class` i `sh:node`

| Construcció | Significat en SHACL | Com es genera JSON Schema |
|-------------|---------------------|---------------------------|
| `sh:class dwp:WastePassport` | El valor és una instància de la classe `dwp:WastePassport` | Busca el Shape amb `sh:targetClass dwp:WastePassport` |
| `sh:node dwp:WastePassportShape` | El valor ha de complir el Shape `dwp:WastePassportShape` | Usa directament `dwp:WastePassportShape` |

**Recomanació:** Usa `sh:class` per seguir els estàndards SHACL. El script s'encarrega de la resolució automàticament.

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

### Tipus de warnings

#### 1. Shape no trobat per una classe (`sh:class`)

```
WARNING: No shape found with sh:targetClass https://ontology.untp.io/core/Measure for property dmwp:quantityToDeliver
```

**Què significa:**
- Has utilitzat `sh:class X` en una propietat
- No existeix cap Shape amb `sh:targetClass X` en el fitxer SHACL

**Què genera en el JSON Schema:**
```json
{
  "dmwp:quantityToDeliver": {
    "$comment": "sh:class https://ontology.untp.io/core/Measure - no corresponding shape found"
  }
}
```

**Causes comunes:**
1. **Classe externa:** La classe és d'una ontologia externa (ex: UNTP Core) que no tens en el teu SHACL
2. **Shape faltant:** Has oblidat definir el Shape per aquesta classe
3. **Typo en `sh:targetClass`:** El nom de la classe en `sh:targetClass` no coincideix exactament

**Solucions:**
- ✅ **Si és una classe externa:** Ignora el warning. La validació estructural no estarà disponible en JSON Schema, però això és esperat.
- ✅ **Si és una classe pròpia:** Defineix un Shape amb `sh:targetClass` apuntant a aquesta classe:
  ```turtle
  myns:MyClassShape a sh:NodeShape ;
    sh:targetClass myns:MyClass ;
    sh:property [...] ;
  ```

#### 2. Construcció SHACL no convertible (`sh:sparql`)

```
WARNING: sh:sparql found in dwp:waste - CANNOT be converted to JSON Schema
```

**Què significa:**
- El Shape conté lògica SPARQL que no es pot expressar en JSON Schema

**Què genera en el JSON Schema:**
```json
{
  "dwp:waste": {
    "$comment": "Contains sh:sparql constraint not convertible to JSON Schema",
    "type": "object"
  }
}
```

**Acció recomanada:**
- ✅ **Aquest warning és esperat** si uses `sh:sparql` per validacions complexes
- ⚠️ Recorda que JSON Schema només valida estructura, no aquesta lògica
- ✅ Continua executant validació SHACL per garantir totes les regles

#### 3. Conversió parcial de lògica (`sh:or`, `sh:and`, `sh:xone`)

```
WARNING: sh:or found in dwp:status - partial conversion to anyOf
```

**Què significa:**
- El Shape usa lògica combinatòria (`sh:or`, `sh:and`, `sh:xone`)
- JSON Schema té equivalents (`anyOf`, `allOf`, `oneOf`) però pot perdre semàntica

**Acció recomanada:**
- ⚠️ Revisa el JSON Schema generat per assegurar que la conversió és adequada
- ✅ Si la conversió no és suficient, simplifica el SHACL o mantén la validació SHACL

### Exemples de resolució de problemes

#### Problema: Warning "No shape found" per classe pròpia

```turtle
# ❌ MAL: Fas servir sh:class però no hi ha Shape
dwp:OrderShape a sh:NodeShape ;
  sh:property [
    sh:path dwp:customer ;
    sh:class dwp:Customer ;  # ← No hi ha dwp:CustomerShape definit
  ] ;
```

**Solució:**
```turtle
# ✅ SOLUCIÓ: Defineix el Shape corresponent
dwp:CustomerShape a sh:NodeShape ;
  sh:targetClass dwp:Customer ;  # ← Això connecta la classe amb el Shape
  sh:property [
    sh:path schema:name ;
    sh:datatype xsd:string ;
  ] ;
```

#### Problema: Confusió entre classe i Shape

```turtle
# ❌ MAL: Tries fer referència directa al Shape
dwp:OrderShape a sh:NodeShape ;
  sh:property [
    sh:path dwp:customer ;
    sh:class dwp:CustomerShape ;  # ← Incorrecte! És un Shape, no una classe
  ] ;
```

**Solució 1 (recomanada):**
```turtle
# ✅ Usa sh:class amb la classe de l'ontologia
dwp:OrderShape a sh:NodeShape ;
  sh:property [
    sh:path dwp:customer ;
    sh:class dwp:Customer ;  # ← Classe de l'ontologia
  ] ;

dwp:CustomerShape a sh:NodeShape ;
  sh:targetClass dwp:Customer ;  # ← El script fa el mapping automàtic
```

**Solució 2 (alternativa):**
```turtle
# ✅ Usa sh:node per referenciar directament el Shape
dwp:OrderShape a sh:NodeShape ;
  sh:property [
    sh:path dwp:customer ;
    sh:node dwp:CustomerShape ;  # ← Referència directa al Shape
  ] ;
```

### Exemples de warnings

### Interpretació dels warnings en la sortida

Quan executis el script, podràs veure warnings com aquests:

```
INFO: Starting SHACL to JSON Schema conversion...
INFO: Found 7 NodeShapes
INFO: Converting shape: DigitalMarpolWastePassportShape
INFO: Converting shape: MarpolWastePassportShape
WARNING: Conversion completed with 4 warnings:
WARNING:   - No shape found with sh:targetClass https://ontology.untp.io/core/Measure for property dmwp:quantityToDeliver
WARNING:   - No shape found with sh:targetClass https://ontology.untp.io/core/Measure for property dmwp:quantityRemainingOnBoard
WARNING:   - No shape found with sh:targetClass https://ontology.untp.io/core/Measure for property dmwp:estimatedGenerated
WARNING:   - No shape found with sh:targetClass https://ontology.untp.io/core/Measure for property dmwp:maxCapacity
INFO: Writing JSON Schema to: build/digitalMarpolWastePassport.schema.json
INFO: ✅ Conversion complete
```

**Interpretació:**
- ✅ El script ha completat la conversió correctament
- ⚠️ Hi ha 4 propietats que usen la classe externa `https://ontology.untp.io/core/Measure`
- ⚠️ Com aquesta classe no té Shape definit al fitxer, aquestes propietats no tindran validació estructural
- ✅ La resta de Shapes s'han convertit correctament

**Què fer:**
- Si les classes són **externes** (d'altres ontologies): És normal, ignora els warnings
- Si les classes són **pròpies**: Defineix els Shapes corresponents

---

## Bones pràctiques per evitar warnings

### 1. Un Shape per cada classe

Per cada classe de la teva ontologia que utilitzis en `sh:class`, defineix el seu Shape:

```turtle
# Ontologia (defines les classes)
dwp:WastePassport a owl:Class .
dwp:Waste a owl:Class .

# SHACL (defines els Shapes)
dwp:WastePassportShape a sh:NodeShape ;
  sh:targetClass dwp:WastePassport ;  # ← Connecta classe amb Shape
  sh:property [...] ;

dwp:WasteShape a sh:NodeShape ;
  sh:targetClass dwp:Waste ;  # ← Connecta classe amb Shape
  sh:property [...] ;
```

### 2. Consistència en la nomenclatura

Encara que el script no requereix cap convenció específica, seguir un patró ajuda a mantenir el codi:

```turtle
# ✅ BÉ: Nomenclatura consistent
dwp:Person a owl:Class .
dwp:PersonShape a sh:NodeShape ;
  sh:targetClass dwp:Person ;

# ✅ TAMBÉ BÉ: Altres convencions
dwp:Product a owl:Class .
dwp:Product_Constraint a sh:NodeShape ;
  sh:targetClass dwp:Product ;
```

El que importa és que **`sh:targetClass` apunti correctament a la classe**.

### 3. Documenta classes externes

Si uses classes externes que no tens Shapes, documenta-ho:

```turtle
# Classe externa d'UNTP Core - no té Shape definit aquí
# WARNING esperat: "No shape found for https://ontology.untp.io/core/Measure"
dmwp:MarpolWasteShape a sh:NodeShape ;
  sh:property [
    sh:path dmwp:quantityToDeliver ;
    sh:class <https://ontology.untp.io/core/Measure> ;  # Classe externa
  ] ;
```

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
