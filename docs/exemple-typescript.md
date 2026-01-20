# Exemple d'ús dels tipus TypeScript generats

Aquest exemple mostra com utilitzar els tipus TypeScript autogenerats a partir dels shapes SHACL.

## Instal·lació

```bash
# Python dependencies
pip install -r scripts/requirements.txt

# Node.js dependencies
npm install

# Generar els tipus TypeScript
python scripts/autogenerate.py
```

## Ús bàsic

```typescript
import { DigitalWastePassport, WastePassport, Waste } from './build/digitalWastePassport';

// Els tipus TypeScript validen l'estructura automàticament
const wastePassport: DigitalWastePassport = {
  "dct:issued": "2026-01-13T10:00:00Z",
  "dct:publisher": {
    name: "Blue Room Innovation",
    id: "B12345678"
  },
  "dwp:credentialSubject": {
    "dwp:waste": {
      "unece:name": "Electronic Waste",
      "unece:productName": "Old Computers",
      "unece:productDescription": "Batch of old desktop computers",
      "unece:originCountry": "https://vocabulary.uncefact.org/CountryId#ES",
      "unece:weightQuantity": 150,
      "unece:declaredUnit": "https://vocabulary.uncefact.org/UnitMeasureCode#KGM"
    }
  }
};

// TypeScript detectarà errors de tipus automàticament
// const invalid: DigitalWastePassport = {
//   "dct:issued": 12345, // ❌ Error: hauria de ser string
//   // ❌ Error: falta "dct:publisher" (required)
// };
```

## Validació JSON Schema + TypeScript

```typescript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from './build/digitalWastePassport.schema.json';
import { DigitalWastePassport } from './build/digitalWastePassport';

// Configurar validador JSON Schema
const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile<DigitalWastePassport>(schema);

// Dades a validar
const data = {
  "dct:issued": "2026-01-13T10:00:00Z",
  "dct:publisher": { name: "Test" },
  "dwp:credentialSubject": {
    "dwp:waste": {
      "unece:name": "Test Waste",
      "unece:productName": "Test Product"
    }
  }
};

// Validar en runtime
if (validate(data)) {
  // data és del tipus DigitalWastePassport i ha passat validació runtime
  console.log('Valid passport:', data["dct:issued"]);
  processPassport(data); // TypeScript sap que és DigitalWastePassport
} else {
  console.error('Validation errors:', validate.errors);
}

function processPassport(passport: DigitalWastePassport) {
  // Autocompletat i type checking funcionaran aquí
  console.log(`Issued: ${passport["dct:issued"]}`);
  console.log(`Waste: ${passport["dwp:credentialSubject"]["dwp:waste"]["unece:name"]}`);
}
```

## Integració amb API REST

```typescript
import express from 'express';
import { DigitalWastePassport } from './build/digitalWastePassport';

const app = express();
app.use(express.json());

// POST endpoint amb tipus type-safe
app.post('/api/passports', (req, res) => {
  const passport: DigitalWastePassport = req.body;
  
  // TypeScript valida l'estructura en temps de desenvolupament
  // Afegir validació JSON Schema per runtime (veure exemple anterior)
  
  // Processar el passaport
  console.log(`Received passport issued at: ${passport["dct:issued"]}`);
  
  res.json({ success: true });
});
```

## Generació de formularis

```typescript
import { DigitalWastePassport } from './build/digitalWastePassport';

// Exemple amb React Hook Form + TypeScript
import { useForm } from 'react-hook-form';

function WastePassportForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<DigitalWastePassport>();
  
  const onSubmit = (data: DigitalWastePassport) => {
    // 'data' està completament tipat
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register("dct:issued", { required: true })} 
        type="datetime-local"
      />
      {errors["dct:issued"] && <span>Aquest camp és obligatori</span>}
      
      <input 
        {...register("dwp:credentialSubject.dwp:waste.unece:name", { required: true })} 
        type="text"
        placeholder="Nom del residu"
      />
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Notes importants

- **Validació completa**: Els tipus TypeScript només proporcionen validació estàtica. Per validació runtime, utilitzeu JSON Schema amb Ajv o similar.
- **Semàntica**: Els tipus TypeScript NO capturen tota la semàntica SHACL. Per validació semàntica completa, utilitzeu els shapes SHACL originals amb pyshacl o similar.
- **Manteniment**: Els tipus es regeneren automàticament quan canvieu els shapes SHACL. No editeu els fitxers `.ts` generats manualment.

## Regenerar els tipus

```bash
# Després de modificar els shapes SHACL
python scripts/autogenerate.py
```
