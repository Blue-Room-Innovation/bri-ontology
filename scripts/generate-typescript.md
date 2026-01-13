# Generació de TypeScript des de SHACL

Aquest document descriu com utilitzar l'eina `generate-typescript.py` per generar definicions TypeScript a partir de shapes SHACL.

---

## 📋 Què fa aquesta eina?

Aquest script implementa un pipeline de generació en **2 passos**:

```
SHACL Shapes → JSON Schema → TypeScript
```

1. **Pas 1**: Converteix shapes SHACL a JSON Schema (reutilitza `shacl-to-jsonschema.py`)
2. **Pas 2**: Converteix JSON Schema a definicions TypeScript (utilitza `json-schema-to-typescript`)

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

### Generació automàtica de tots els schemas

```bash
python scripts/generate-typescript.py
```

Aquest comandament genera:

**JSON Schemas:**
- `build/digitalWastePassport.schema.json`
- `build/digitalMarpolWastePassport.schema.json`

**TypeScript:**
- `build/digitalWastePassport.ts`
- `build/digitalMarpolWastePassport.ts`

### Mode verbós

```bash
python scripts/generate-typescript.py --verbose
```

Mostra informació detallada del procés de conversió, incloent-hi warnings i debugging.

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
import { DigitalWastePassport } from './build/digitalWastePassport';

function processPassport(passport: DigitalWastePassport) {
  // TypeScript valida els tipus automàticament
  console.log(passport.passportId);
  console.log(passport.createdAt);
}
```

### 2. Validació JSON amb tipus

```typescript
import Ajv from 'ajv';
import schema from './build/digitalWastePassport.schema.json';
import { DigitalWastePassport } from './build/digitalWastePassport';

const ajv = new Ajv();
const validate = ajv.compile<DigitalWastePassport>(schema);

if (validate(data)) {
  // 'data' és del tipus DigitalWastePassport
  console.log(data.passportId);
}
```

### 3. Generació de formularis

```typescript
import { DigitalWastePassport } from './build/digitalWastePassport';

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
│   ├── generate-typescript.py          # Aquest script
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

### Per què un pipeline de 2 passos?

1. **Reutilització** - Aprofita l'script SHACL→JSON Schema existent
2. **Eina madura** - `json-schema-to-typescript` és molt robusta i mantiguda
3. **Separació de responsabilitats** - Cada eina fa una cosa i la fa bé
4. **Flexibilitat** - Els JSON Schemas intermedis són útils per altres propòsits

### Limitacions conegudes

- **sh:sparql** - No es pot convertir (avís generat)
- **sh:or/sh:xone/sh:and** - Conversió parcial a anyOf/oneOf/allOf
- **Validació semàntica complexa** - No es captura en TypeScript
- **IRI vs. literals** - TypeScript només veu strings

Per validació completa, sempre utilitzeu els shapes SHACL originals.
