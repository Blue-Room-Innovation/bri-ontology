# Autogeneració d'artefactes des de SHACL

Aquest document descriu com utilitzar l'eina `autogenerate.py` per autogenerar artefactes (JSON Schema i TypeScript) a partir de shapes SHACL.

---

## 📋 Què fa aquesta eina?

Aquest script és un **orquestrador** que encadena automàticament dos scripts per implementar un pipeline complet de generació:

```
SHACL Shapes → JSON Schema → TypeScript
       ↓              ↓            ↓
shacl-to-jsonschema.py → jsonschema-to-typescript.py
              ↑                    ↑
         (Pas 1)              (Pas 2)
```

**Avantatges:**

- ✅ Execució automàtica de tots els passos
- ✅ Gestió centralitzada de múltiples fitxers
- ✅ Configuració predefinida per als passaports digitals del projecte
- ✅ Un sol comandament per generar tot

**Scripts subjacents:**

1. **[shacl-to-jsonschema.py](./shacl-to-jsonschema.md)**: Converteix SHACL → JSON Schema
2. **[jsonschema-to-typescript.py](./jsonschema-to-typescript.md)**: Converteix JSON Schema → TypeScript

> 💡 **Nota**: Pots utilitzar cada script independentment si necessites més control o personalització.

---

## ⚠️ Advertència important

Els tipus TypeScript generats:

- ✅ Proporcionen **validació estàtica** en temps de compilació
- ✅ Serveixen com a **contracte de tipus** per a desenvolupament frontend/backend
- ✅ Milloren l'**experiència de desenvolupament** (autocompletat, detecció d'errors)
- ❌ **NO capturen tota la semàntica** de SHACL
- ❌ **NO substitueixen** la validació SHACL per a contextos RDF

**SHACL segueix sent la font de veritat semàntica** (veure [ADR-005](../docs/01-adr/01.ADR-005%20Derivació%20automàtica%20de%20JSON%20Schema%20des%20de%20SHACL.md)).

---

## 🔧 Requisits

### Python

```bash
pip install -r requirements.txt
```

Dependències Python:

- `rdflib>=7.0.0`
- `pyshacl>=0.25.0`

### Node.js

```bash
npm install
```

Dependències Node.js (s'instal·len automàticament):

- `json-schema-to-typescript>=14.1.0`

**Versions recomanades:**

- Python 3.8+
- Node.js 18+

---

## 🚀 Ús bàsic

### Generació automàtica de tots els artefactes

```bash
python scripts/autogenerate.py

# O més curt, des de l'arrel del projecte
python scripts/autogenerate.py

# O amb npm (si tens les dependencies Python instal·lades globalment)
npm run autogenerate
```

Aquest comandament:

1. Executa `shacl-to-jsonschema.py` per cada shape configurat
2. Executa `jsonschema-to-typescript.py` per cada JSON Schema generat

**Genera automàticament:**

**JSON Schemas:**

- `build/digitalWastePassport.schema.json`
- `build/digitalMarpolWastePassport.schema.json`

**TypeScript:**

- `build/digitalWastePassport.ts`
- `build/digitalMarpolWastePassport.ts`

### Mode verbós

```bash
python scripts/autogenerate.py --verbose
```

Mostra informació detallada del procés de conversió, incloent-hi warnings i debugging.

---

## 🎛️ Ús independent dels scripts

Si necessites més control o vols processar fitxers específics, pots utilitzar cada script directament:

### Opció 1: Pipeline manual complet

```bash
# Pas 1: SHACL → JSON Schema
python scripts/shacl-to-jsonschema.py \
  --input shapes/customShape.ttl \
  --output build/customSchema.json

# Pas 2: JSON Schema → TypeScript
python scripts/jsonschema-to-typescript.py \
  --input build/customSchema.json \
  --output build/customTypes.ts \
  --source "shapes/customShape.ttl"
```

### Opció 2: Només un dels passos

```bash
# Si només necessites JSON Schema
python scripts/shacl-to-jsonschema.py \
  --input shapes/example.ttl \
  --output build/example.schema.json

# Si ja tens JSON Schema i només vols TypeScript
python scripts/jsonschema-to-typescript.py \
  --input build/example.schema.json \
  --output build/example.ts
```

**Vegeu:**

- [shacl-to-jsonschema.md](./shacl-to-jsonschema.md) - Documentació del pas 1
- [jsonschema-to-typescript.md](./jsonschema-to-typescript.md) - Documentació del pas 2

---

## 📦 Què es genera?

### Exemple de sortida TypeScript

Per cada shape SHACL, es generen:

**Interfícies TypeScript** amb:

- Tipus primitius (string, number, boolean, etc.)
- Propietats opcionals i requerides
- Arrays (basats en sh:minCount/sh:maxCount)
- Enumeracions (basades en sh:in)
- Tipus niats (basats en sh:class o sh:node)
- Comentaris JSDoc amb descripcions

Exemple:

```typescript
/**
 * Auto-generated TypeScript definitions from SHACL shapes
 * Source: shapes/digitalWastePassportShapes.ttl
 * DO NOT EDIT MANUALLY
 */

export interface DigitalWastePassport {
  /**
   * Identificador únic del passaport
   */
  passportId: string;

  /**
   * Data de creació del passaport
   */
  createdAt: string;

  /**
   * Tipus de residu
   */
  wasteType?: "HAZARDOUS" | "NON_HAZARDOUS" | "RECYCLABLE";

  /**
   * Materials del residu
   */
  materials?: Material[];
}

export interface Material {
  name: string;
  percentage?: number;
}
```

---

## 🔄 Integració en el workflow

### En desenvolupament local

```bash
# Després de modificar shapes SHACL
python scripts/generate-typescript.py

# Utilitzar els tipus generats en el teu projecte TypeScript
import { DigitalWastePassport } from './build/digitalWastePassport';
```

### En CI/CD

```yaml
# Exemple per GitHub Actions
- name: Generate TypeScript definitions
  run: |
    pip install -r requirements.txt
    npm install
    python scripts/generate-typescript.py

- name: Verify types
  run: |
    npx tsc --noEmit build/*.ts
```

### NPM Script

El `package.json` ja inclou un script:

```bash
npm run generate:typescript
```

---

## 🎯 Casos d'ús

### 1. Desenvolupament Frontend/Backend TypeScript

```typescript
import { DigitalWastePassport } from "./build/digitalWastePassport";

function processPassport(passport: DigitalWastePassport) {
  // TypeScript valida els tipus automàticament
  console.log(passport.passportId);
  console.log(passport.createdAt);
}
```

### 2. Validació JSON amb tipus

```typescript
import Ajv from "ajv";
import schema from "./build/digitalWastePassport.schema.json";
import { DigitalWastePassport } from "./build/digitalWastePassport";

const ajv = new Ajv();
const validate = ajv.compile<DigitalWastePassport>(schema);

if (validate(data)) {
  // 'data' és del tipus DigitalWastePassport
  console.log(data.passportId);
}
```

### 3. Generació de formularis

```typescript
import { DigitalWastePassport } from "./build/digitalWastePassport";

// Els tipus ajuden a generar formularis type-safe
const formSchema = generateForm<DigitalWastePassport>({
  // configuració del formulari amb autocompletat
});
```

---

## 🐛 Troubleshooting

### Error: "Node.js is not installed"

**Solució:**

```bash
# Instal·la Node.js des de https://nodejs.org/
# Verifica la instal·lació:
node --version
```

### Error: "json-schema-to-typescript not found"

**Solució:**

```bash
npm install
```

### Error: "Failed to parse SHACL file"

**Solució:**
Verifica que els fitxers SHACL són vàlids Turtle:

```bash
bash scripts/validate-shacl.sh
```

### Warnings durant la generació

Els warnings són normals i indiquen:

- Constraints SHACL no convertibles a JSON Schema (ex: sh:sparql)
- sh:or, sh:xone, sh:and que tenen conversió parcial
- sh:class sense shape corresponent

**Això no impedeix la generació** - els tipus es generen igualment.

---

## 📁 Estructura de fitxers

```
Ontologia/
├── shapes/                              # SHACL shapes (entrada)
│   ├── digitalWastePassportShapes.ttl
│   └── digitalMarpolWastePassportShapes.ttl
├── build/                               # Fitxers generats (sortida)
│   ├── digitalWastePassport.schema.json
│   ├── digitalWastePassport.ts
│   ├── digitalMarpolWastePassport.schema.json
│   └── digitalMarpolWastePassport.ts
├── scripts/
│   ├── autogenerate.py                 # Aquest script
│   └── shacl-to-jsonschema.py          # Utilitzat internament
└── package.json                         # Dependencies Node.js
```

---

## 🔗 Vegeu també

- [shacl-to-jsonschema.md](./shacl-to-jsonschema.md) - Generació de JSON Schema
- [ADR-005](../docs/01-adr/01.ADR-005%20Derivació%20automàtica%20de%20JSON%20Schema%20des%20de%20SHACL.md) - Decisió arquitectònica
- [json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript) - Eina utilitzada per la conversió

---

## 📝 Notes tècniques

### Per què un pipeline de 2 passos amb scripts separats?

1. **Separació de responsabilitats** - Cada script fa una sola cosa
2. **Reutilització** - Els scripts es poden utilitzar independentment
3. **Eina madura** - `json-schema-to-typescript` és molt robusta i mantiguda
4. **Flexibilitat** - Pots processar fitxers individuals o tots automàticament
5. **Mantenibilitat** - Codi més simple i fàcil de provar

### Configuració dels fitxers a processar

Els artefactes que es processen es configuren a `config.yml`.

La llista “què genero” és:

```yaml
generation:
  artifacts:
    - dwp
    - dmwp
    - recycling
```

I els paths concrets (input/output) estan explícits als conversions:

- `conversion.shacl_to_json.<id>` (SHACL → JSON Schema)
- `conversion.json_to_ts.<id>` (JSON Schema → TypeScript)

Per afegir un nou contracte, afegeix l’ID a `generation.artifacts` i defineix els dos scenarios de conversió corresponents.

### Limitacions conegudes

- **sh:sparql** - No es pot convertir (avís generat)
- **sh:or/sh:xone/sh:and** - Conversió parcial a anyOf/oneOf/allOf
- **Validació semàntica complexa** - No es captura en TypeScript
- **IRI vs. literals** - TypeScript només veu strings

Per validació completa, sempre utilitzeu els shapes SHACL originals.
