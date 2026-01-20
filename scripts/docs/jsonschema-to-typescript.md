# Conversió de JSON Schema a TypeScript

Aquest document descriu com utilitzar l'eina `jsonschema-to-typescript.py` per generar definicions TypeScript a partir de fitxers JSON Schema.

---

## 📋 Què fa aquesta eina?

Converteix fitxers JSON Schema a definicions de tipus TypeScript utilitzant la llibreria `json-schema-to-typescript` de Node.js.

Aquest script actua com a wrapper Python de la eina Node.js, proporcionant una interfície consistent amb els altres scripts del projecte.

---

## ⚠️ Context

Aquest script és el **segon pas** del pipeline de generació de TypeScript:

```
SHACL Shapes → JSON Schema → TypeScript
                  ↑              ↑
         shacl-to-jsonschema   AQUEST SCRIPT
```

Normalment utilitzaràs `autogenerate.py` que orquestra ambdós passos, però pots utilitzar aquest script independentment si ja tens JSON Schemas generats.

---

## 🔧 Requisits

### Node.js
```bash
npm install
```

Dependències Node.js:
- `json-schema-to-typescript>=14.1.0`

**Versions recomanades:**
- Node.js 18+

---

## 🚀 Ús bàsic

### Sintaxi

```bash
python scripts/jsonschema-to-typescript.py --input <schema.json> --output <types.ts>
```

### Exemples

**Convertir un JSON Schema a TypeScript:**

```bash
python scripts/jsonschema-to-typescript.py \
  --input build/digitalWastePassport.schema.json \
  --output build/digitalWastePassport.ts
```

**Amb un banner personalitzat:**

```bash
python scripts/jsonschema-to-typescript.py \
  --input build/example.schema.json \
  --output build/example.ts \
  --banner "Custom header comment"
```

**Especificar el fitxer font (per al banner per defecte):**

```bash
python scripts/jsonschema-to-typescript.py \
  --input build/example.schema.json \
  --output build/example.ts \
  --source "shapes/exampleShapes.ttl"
```

**Mode verbós:**

```bash
python scripts/jsonschema-to-typescript.py \
  --input build/example.schema.json \
  --output build/example.ts \
  --verbose
```

---

## 📝 Opcions

| Opció | Abreviatura | Descripció | Requerit |
|-------|-------------|------------|----------|
| `--input` | `-i` | Fitxer JSON Schema d'entrada | ✅ |
| `--output` | `-o` | Fitxer TypeScript de sortida | ✅ |
| `--banner` | `-b` | Comentari de banner personalitzat | ❌ |
| `--source` | `-s` | Fitxer font per incloure al banner | ❌ |
| `--verbose` | `-v` | Sortida detallada | ❌ |

---

## 🔄 Integració amb el pipeline

### Ús independent

Quan ja tens un JSON Schema generat i només vols convertir-lo a TypeScript:

```bash
# Primer pas (opcional si ja tens el JSON Schema)
python scripts/shacl-to-jsonschema.py \
  --input shapes/myShape.ttl \
  --output build/mySchema.json

# Segon pas (aquest script)
python scripts/jsonschema-to-typescript.py \
  --input build/mySchema.json \
  --output build/myTypes.ts \
  --source "shapes/myShape.ttl"
```

### Ús orquestrat

Per generar TypeScript automàticament des de SHACL, utilitza el script orquestrador:

```bash
python scripts/autogenerate.py
```

Aquest script crida automàticament a:
1. `shacl-to-jsonschema.py` (SHACL → JSON Schema)
2. `jsonschema-to-typescript.py` (JSON Schema → TypeScript)

---

## 📄 Estructura del banner per defecte

Si no especifiques un banner personalitzat, es genera automàticament:

```typescript
/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-01-13 10:30:00
 * Source: shapes/exampleShapes.ttl  // Si s'especifica --source
 */
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

### Error: "Input file not found"

**Solució:**
Verifica que el fitxer JSON Schema existeix:
```bash
ls build/*.schema.json
```

Si no existeix, genera'l primer amb:
```bash
python scripts/shacl-to-jsonschema.py -i shapes/example.ttl -o build/example.schema.json
```

### Error durant la conversió

**Causes comunes:**
- JSON Schema no és vàlid
- JSON Schema conté referències no resoltes
- JSON Schema usa funcionalitats no suportades

**Solució:**
Verifica el JSON Schema amb un validador:
```bash
npx ajv-cli validate -s build/example.schema.json -d examples/example.json
```

---

## 📦 Sortida generada

### Exemple de TypeScript generat

```typescript
/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-01-13 10:30:00
 * Source: shapes/digitalWastePassportShapes.ttl
 */

export interface DigitalWastePassport {
  "dct:issued": string;
  "dct:publisher": {
    [k: string]: unknown;
  };
  "dwp:credentialSubject": WastePassport;
  "dct:valid"?: string;
}

export interface WastePassport {
  "dwp:waste": Waste;
  "dct:identifier"?: string;
  "unece:reportingStandard"?: ReportingStandard;
}

// ... més interfícies
```

---

## 🔗 Vegeu també

- [autogenerate.md](./autogenerate.md) - Script orquestrador (pipeline complet)
- [shacl-to-jsonschema.md](./shacl-to-jsonschema.md) - Primer pas del pipeline
- [json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript) - Eina Node.js utilitzada
- [ADR-005](../docs/01-adr/01.ADR-005%20Derivació%20automàtica%20de%20JSON%20Schema%20des%20de%20SHACL.md) - Decisió arquitectònica

---

## 📊 Comparació amb altres scripts

| Script | Entrada | Sortida | Quan utilitzar |
|--------|---------|---------|----------------|
| `shacl-to-jsonschema.py` | SHACL | JSON Schema | Generar validació estructural |
| **`jsonschema-to-typescript.py`** | **JSON Schema** | **TypeScript** | **Generar tipus estàtics** |
| `autogenerate.py` | SHACL | JSON Schema + TypeScript | Pipeline complet automatitzat |

---

## 💡 Consells

1. **Utilitza sempre `--source`** per incloure la font al banner i facilitar el manteniment
2. **No editïs els fitxers `.ts` generats** - es sobreescriuran en la propera generació
3. **Utilitza `autogenerate.py`** per al cas d'ús habitual (genera tot automàticament)
4. **Utilitza aquest script directament** només si tens necessitats específiques o vols més control

---

## 🎯 Casos d'ús

### Cas 1: Regenerar només el TypeScript (JSON Schema sense canvis)

```bash
# El JSON Schema ja existeix i és vàlid, només vull regenerar el TS
python scripts/jsonschema-to-typescript.py \
  --input build/digitalWastePassport.schema.json \
  --output build/digitalWastePassport.ts
```

### Cas 2: Convertir múltiples JSON Schemas

```bash
# Per cada schema
for schema in build/*.schema.json; do
  output="${schema%.schema.json}.ts"
  python scripts/jsonschema-to-typescript.py -i "$schema" -o "$output"
done
```

### Cas 3: JSON Schema extern (no generat des de SHACL)

```bash
# Tens un JSON Schema d'una altra font
python scripts/jsonschema-to-typescript.py \
  --input external-api-schema.json \
  --output external-api-types.ts \
  --banner "External API types"
```
