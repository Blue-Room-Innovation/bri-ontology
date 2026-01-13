# Exemples d'ús del CLI Unificat

## Validació

### Validació OWL amb opcions personalitzades

```bash
# Validar amb reasoner ELK en lloc de HermiT
npm run validate:owl -- -r ELK

# Validar amb perfil OWL2 en lloc de DL
npm run validate:owl -- -p OWL2

# Validar fitxers específics
npm run validate:owl -- -i "ontology/digitalWastePassport.ttl,ontology/digitalMarpolWastePassport.ttl"

# Sense raonament
npm run validate:owl -- -r none

# Personalitzar fitxers de sortida
npm run validate:owl -- -m my-merged.ttl -o my-reasoned.ttl

# Mode quiet per CI/CD
npm run validate:owl:quiet
```

### Validació SHACL amb fitxers personalitzats

```bash
# Validar amb output en turtle
python scripts/ontology_cli.py validate shacl \
  -d examples/digital-waste-passport-sample.ttl \
  -s shapes/digitalWastePassportShapes.ttl \
  -f turtle

# Afegir múltiples fitxers extra
python scripts/ontology_cli.py validate shacl \
  -d examples/my-data.ttl \
  -s shapes/my-shapes.ttl \
  -e "ontology/file1.ttl,ontology/file2.ttl"

# Validar JSON-LD
npm run validate:dwp:json

# Exemples predefinits
npm run validate:dwp       # Digital Waste Passport
npm run validate:marpol    # Marpol Waste Passport
```

## Generació

### Generació de TypeScript Types

```bash
# Pipeline complet: SHACL → JSON Schema → TypeScript
npm run generate:types

# Mode verbose per veure tots els passos
npm run generate:types:verbose

# Compatibilitat amb script antic
npm run autogenerate

# Directe amb Python
python scripts/ontology_cli.py generate types --verbose
```

### Generació de Wiki

```bash
# Generar wiki des d'ontologies
npm run generate:wiki

# Incloure codelists
npm run generate:wiki:with-codelists

# Mode verbose
npm run generate:wiki:verbose

# Personalitzar directoris
python scripts/ontology_cli.py generate wiki \
  --ontology-dir my-ontology \
  --output-dir my-wiki \
  --include-codelists \
  --verbose
```

## Conversió

### SHACL to JSON Schema

```bash
# Exemples predefinits
npm run convert:shacl:dwp      # Digital Waste Passport
npm run convert:shacl:marpol   # Marpol Waste Passport

# Fitxers personalitzats
python scripts/ontology_cli.py convert shacl \
  -i shapes/myShapes.ttl \
  -o build/mySchema.json \
  --verbose

# Equivalent amb script original
python scripts/shacl-to-jsonschema.py \
  --input shapes/myShapes.ttl \
  --output build/mySchema.json
```

### JSON Schema to TypeScript

```bash
# Exemples predefinits
npm run convert:ts:dwp         # Digital Waste Passport
npm run convert:ts:marpol      # Marpol Waste Passport

# Fitxers personalitzats amb banner
python scripts/ontology_cli.py convert ts \
  -i build/mySchema.json \
  -o build/myTypes.ts \
  -s shapes/myShapes.ttl \
  --verbose

# Banner personalitzat
python scripts/ontology_cli.py convert ts \
  -i build/schema.json \
  -o build/types.ts \
  --banner "Custom TypeScript types - Do not edit"

# Equivalent amb script original
python scripts/jsonschema-to-typescript.py \
  --input build/schema.json \
  --output build/types.ts \
  --source shapes/example.ttl
```

## Ús des de Python

```python
from cli import validate_owl, validate_shacl, OwlConfig, ShaclConfig
from pathlib import Path

# Configuració OWL personalitzada
owl_config = OwlConfig(
    reasoner="ELK",
    profile="OWL2",
    include_codelists=True,
    quiet=False
)
exit_code = validate_owl(owl_config)

# Configuració SHACL personalitzada
shacl_config = ShaclConfig(
    data_file=Path("examples/my-data.ttl"),
    shapes_file=Path("shapes/my-shapes.ttl"),
    output_format="json-ld"
)
exit_code = validate_shacl(shacl_config)
```

## Integració en CI/CD

### GitHub Actions

```yaml
name: Validate Ontologies

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install -r scripts/requirements.txt
          npm install
      
      - name: Validate OWL Ontologies
        run: npm run validate:owl:quiet
      
      - name: Validate Digital Waste Passport
        run: npm run validate:dwp
      
      - name: Validate Marpol Waste Passport
        run: npm run validate:marpol
      
      - name: Generate TypeScript Types
        run: npm run generate:types
```

### GitLab CI

```yaml
stages:
  - validate
  - generate

validate_owl:
  stage: validate
  script:
    - pip install -r scripts/requirements.txt
    - npm run validate:owl:quiet

validate_data:
  stage: validate
  script:
    - npm run validate:dwp
    - npm run validate:marpol

generate_types:
  stage: generate
  script:
    - npm install
    - npm run generate:types
  artifacts:
    paths:
      - build/*.ts
      - build/*.json
```

## Scripts personalitzats al package.json

Pots afegir més scripts segons les teves necessitats:

```json
{
  "scripts": {
    "validate:all": "npm run validate:owl && npm run validate:dwp && npm run validate:marpol",
    "validate:ci": "npm run validate:owl:quiet && npm run validate:dwp && npm run validate:marpol",
    "generate:all": "npm run generate:types && npm run generate:wiki",
    "build": "npm run validate:all && npm run generate:all",
    "precommit": "npm run validate:owl:quiet && npm run generate:types"
  }
}
```

## Workflows Complets

### Desenvolupament Local

```bash
# 1. Editar ontologies
vim ontology/digitalWastePassport.ttl

# 2. Validar
npm run validate:owl

# 3. Generar types
npm run generate:types

# 4. Validar exemples
npm run validate:dwp

# 5. Generar wiki
npm run generate:wiki
```

### Pipeline CI/CD Complet

```bash
# Script complet per CI/CD
#!/bin/bash
set -e

echo "📋 Validant ontologies OWL..."
npm run validate:owl:quiet

echo "🔍 Validant Digital Waste Passport..."
npm run validate:dwp

echo "🔍 Validant Marpol Waste Passport..."
npm run validate:marpol

echo "🚀 Generant TypeScript types..."
npm run generate:types

echo "📚 Generant wiki..."
npm run generate:wiki

echo "✅ Pipeline completat!"
```

## Ajuda i Documentació

```bash
# Ajuda general
npm run help
python scripts/ontology_cli.py --help

# Ajuda per comanda específica
python scripts/ontology_cli.py validate --help
python scripts/ontology_cli.py validate owl --help
python scripts/ontology_cli.py generate --help
python scripts/ontology_cli.py generate types --help
python scripts/ontology_cli.py convert --help
python scripts/ontology_cli.py convert shacl --help
```
