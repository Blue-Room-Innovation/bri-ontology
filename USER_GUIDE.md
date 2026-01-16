# DataSpace Ontology Tools - User Guide

> **Professional guide for developers working with semantic ontologies, SHACL validation, and automated artifact generation**

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Getting Started](#getting-started)
4. [Available Tools](#available-tools)
5. [Common Workflows](#common-workflows)
6. [CLI Reference](#cli-reference)
7. [Output Artifacts](#output-artifacts)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## Introduction

### What is this project?

This project provides a **comprehensive toolchain** for managing semantic ontologies in the DataSpace domain. It automates the validation, generation, and conversion of ontology-related artifacts, enabling developers to:

- ✅ **Validate** OWL ontologies and SHACL constraints
- 🔄 **Generate** TypeScript type definitions from SHACL shapes
- 📚 **Produce** human-readable wiki documentation
- 🔀 **Convert** between formats (SHACL → JSON Schema → TypeScript)

### Why Docker?

The entire toolchain runs in **Docker** to ensure:
- **Consistency**: Same environment for all developers
- **Isolation**: No conflicts with local Python/Java installations
- **Portability**: Works on Windows, macOS, and Linux
- **Dependencies**: Automatic management of ROBOT, pyshacl, rdflib, etc.

### Key Technologies

- **OWL 2 (Web Ontology Language)**: Semantic data modeling
- **SHACL (Shapes Constraint Language)**: Data validation constraints
- **ROBOT**: OWL ontology validation and reasoning tool
- **pyshacl**: SHACL validation library
- **RDF/Turtle**: Standard RDF serialization formats
- **JSON Schema**: Data validation and documentation
- **TypeScript**: Type-safe development

---

## Architecture Overview

### Project Structure

```
Ontologia/
├── ontology/v0.1/           # OWL ontology definitions (TTL)
│   ├── digitalWastePassport.ttl
│   ├── digitalMarpolWastePassport.ttl
│   └── wasteActors.ttl
│
├── shapes/v0.1/             # SHACL constraint definitions
│   ├── digitalWastePassportShapes.ttl
│   ├── digitalMarpolWastePassportShapes.ttl
│   └── *.shacl.ttl
│
├── codelists/v0.1/          # Code list ontologies (enums)
│   ├── residue-type-code.ttl
│   ├── iso3166-iAlpha2.ttl
│   └── unlocode.ttl
│
├── contexts/v0.1/           # JSON-LD context files
│   └── waste-actors-context.jsonld
│
├── examples/v0.1/           # Sample data files
│   ├── digital-waste-passport-sample.ttl
│   └── invalid-waste-passport-sample.ttl
│
├── build/v0.1/              # Generated artifacts (output)
│   ├── *.schema.json        # JSON Schemas
│   ├── *.ts                 # TypeScript definitions
│   ├── merged-ontology.ttl  # Merged OWL ontologies
│   └── reasoned-ontology.ttl # Reasoned ontology
│
├── docs/wiki/               # Generated documentation
│   ├── index.md
│   ├── digitalWastePassport/
│   └── digitalMarpolWastePassport/
│
├── scripts/                 # Python CLI tools
│   ├── ontology_cli.py      # Main CLI entry point
│   └── lib/                 # Supporting modules
│
├── docker/                  # Docker integration
│   ├── Dockerfile           # Image definition
│   └── docker.js            # Node wrapper for Docker
│
├── config.yml               # Version configuration
├── package.json             # NPM scripts
└── VALIDATION.md            # Quick validation checklist
```

### Data Flow

```
┌──────────────┐
│  OWL Files   │ (ontology/*.ttl)
│  (Semantic)  │
└──────┬───────┘
       │
       ├─► ROBOT Validation ──► merged-ontology.ttl
       │                     ──► reasoned-ontology.ttl
       │
       ▼
┌──────────────┐
│ SHACL Shapes │ (shapes/*.ttl)
│ (Constraints)│
└──────┬───────┘
       │
       ├─► pyshacl ──► Validation Reports
       │
       ├─► shacl-to-jsonschema ──► *.schema.json
       │                         │
       │                         ├─► json-schema-to-typescript ──► *.ts
       │                         │
       │                         └─► TypeScript Definitions
       │
       └─► wiki-generator ──► docs/wiki/*.md
                           ──► Diagrams (Mermaid)
```

---

## Getting Started

### Prerequisites

1. **Docker Desktop** installed and running
2. **Node.js 18+** installed
3. **Git** for version control

### Initial Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd Ontologia

# 2. Build the Docker image (first time only, ~5-10 minutes)
npm run docker:build

# 3. Verify configuration
npm run config:show

# 4. Test the CLI
npm run help
```

### Verify Installation

```bash
# Expected output:
📋 Current Configuration
==================================================
Ontology version:  v0.1
Shapes version:    v0.1
Build version:     v0.1
```

---

## Available Tools

### 1. OWL Ontology Validation

**Purpose**: Verify that your OWL ontologies are syntactically and semantically correct.

#### Basic Validation
```bash
npm run validate:owl
```

**What it does**:
- Validates OWL 2 DL profile compliance
- Runs HermiT reasoner
- Generates merged and reasoned ontologies
- Reports errors and warnings

**Output**:
```
[OWL] Ontologies (3):
  - ontology/v0.1/digitalWastePassport.ttl
  - ontology/v0.1/digitalMarpolWastePassport.ttl
  - ontology/v0.1/wasteActors.ttl
[OWL] Profile  : DL
[OWL] Reasoner : HermiT
✅ OWL 2 DL Profile Report: [Ontology and imports closure in profile]
```

#### Quiet Mode
```bash
npm run validate:owl:quiet
```
Suppresses verbose output, only shows errors.

#### Include Codelists
```bash
npm run validate:owl:with-codelists
```
Validates ontologies + all codelists (9 files total).

**Use case**: Run before committing changes to ensure ontology integrity.

---

### 2. SHACL Validation

**Purpose**: Validate RDF data against SHACL constraint shapes using configurable scenarios.

#### Understanding Scenarios

All SHACL validation scenarios are defined in `config.yml` under `validation.shacl.scenarios`. This makes it easy to:
- Add new validation scenarios without modifying code
- Reuse common validation patterns
- Document what each validation does
- Run validations consistently across the team

#### List Available Scenarios
```bash
npm run validate:shacl:list
```

**Output**:
```
📋 Available SHACL Validation Scenarios
============================================================

🔹 dwp (default)
   Name: Digital Waste Passport
   Description: Validates DWP sample data against DWP shapes
   Data: examples/v0.1/digital-waste-passport-sample.ttl
   Shapes: shapes/v0.1/digitalWastePassportShapes.ttl

🔹 dmwp
   Name: Digital MARPOL Waste Passport
   Description: Validates MARPOL sample data against MARPOL shapes
   Data: examples/v0.1/digital-marpol-waste-passport-sample.ttl
   Shapes: shapes/v0.1/digitalMarpolWastePassportShapes.ttl
```

#### Run Default Scenario
```bash
# Uses the scenario marked as 'default' in config.yml
npm run validate:shacl
```

#### Run Specific Scenario
```bash
# Run by scenario name
node docker/docker.js run cli validate shacl dwp
node docker/docker.js run cli validate shacl dmwp
node docker/docker.js run cli validate shacl <your-scenario-name>
```

#### Override Scenario Values
```bash
# Use scenario 'dwp' but with different data file
node docker/docker.js run cli validate shacl dwp -d examples/v0.1/custom-data.ttl

# Use scenario but change format
node docker/docker.js run cli validate shacl dmwp -f json-ld
```

#### Custom Validation (No Scenario)
```bash
# Provide all parameters manually
node docker/docker.js run cli validate shacl \
  -d examples/v0.1/my-data.ttl \
  -s shapes/v0.1/my-shapes.ttl \
  -f human
```

#### Adding New Scenarios

Edit `config.yml` and add your scenario under `validation.shacl.scenarios`:

```yaml
validation:
  shacl:
    default: "dwp"  # Which scenario to use by default
    
    scenarios:
      dwp:
        name: "Digital Waste Passport"
        description: "Validates DWP sample data against DWP shapes"
        data: "examples/v0.1/digital-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"
        format: "human"
        extras: ""
      
      # Add your own scenario here
      my-test:
        name: "My Custom Test"
        description: "Tests my custom data against specific shapes"
        data: "examples/v0.1/my-custom-data.ttl"
        shapes: "shapes/v0.1/my-custom-shapes.ttl"
        format: "human"
        extras: "ontology/v0.1/digitalWastePassport.ttl"  # Optional extra context
```

Then run it:
```bash
node docker/docker.js run cli validate shacl my-test
```

#### Format Options
- `human` (default): Human-readable report
- `text`: Plain text
- `turtle`: RDF/Turtle format
- `json-ld`: JSON-LD format

#### Example Output
```
[SHACL] Using scenario 'dwp': Digital Waste Passport
[SHACL] Data   : examples/v0.1/digital-waste-passport-sample.ttl
[SHACL] Shapes : shapes/v0.1/digitalWastePassportShapes.ttl
[SHACL] Format : human
✅ Conforms: True
```

**Use case**: Validate incoming data before ingestion, test shape changes, ensure data quality.

**Best practices**:
- Define a scenario for each common validation pattern
- Use descriptive names and descriptions
- Set one scenario as default for CI/CD pipelines
- Document special requirements in the description field

---

### 3. TypeScript Generation

**Purpose**: Auto-generate TypeScript type definitions from SHACL shapes.

#### Standard Generation
```bash
npm run generate:types
```

**What it does**:
1. Reads SHACL shapes from `shapes/v0.1/`
2. Converts to JSON Schema
3. Generates TypeScript interfaces
4. Outputs to `build/v0.1/*.ts`

**Output**:
```
📦 Processing digitalWastePassport...
  Step 1/2: SHACL → JSON Schema
  Step 2/2: JSON Schema → TypeScript
✅ Generated digitalWastePassport.ts

📦 Processing digitalMarpolWastePassport...
✅ Generated digitalMarpolWastePassport.ts

📄 Generated files:
  - build/v0.1/digitalWastePassport.schema.json
  - build/v0.1/digitalWastePassport.ts
  - build/v0.1/digitalMarpolWastePassport.schema.json
  - build/v0.1/digitalMarpolWastePassport.ts
```

#### Verbose Mode
```bash
npm run generate:types:verbose
```
Shows detailed debug information.

#### Generated TypeScript Example
```typescript
/**
 * Auto-generated TypeScript definitions
 * Source: shapes/v0.1/digitalWastePassportShapes.ttl
 */

export interface DigitalWastePassport {
  "dct:issued": string;           // ISO 8601 date-time
  "dct:publisher": {
    [k: string]: unknown;
  };
  "dwp:credentialSubject": WastePassport;
}

export interface WastePassport {
  "dwp:waste": Waste;
}
```

**Use case**: Type-safe development in TypeScript/JavaScript applications.

---

### 4. Wiki Documentation Generation

**Purpose**: Auto-generate human-readable documentation from ontologies.

#### Standard Generation
```bash
npm run generate:wiki
```

**What it generates**:
- `docs/wiki/index.md`: Overview table
- `docs/wiki/<ontology>/README.md`: Class and property documentation
- `docs/wiki/<ontology>/SHAPES.md`: SHACL constraints documentation
- `docs/wiki/<ontology>/diagram.svg`: Visual class diagrams (Mermaid)

**Output structure**:
```
docs/wiki/
├── index.md                      # Summary table
├── digitalWastePassport/
│   ├── README.md                 # Ontology documentation
│   ├── SHAPES.md                 # SHACL constraints
│   └── diagram.svg               # Class diagram
└── digitalMarpolWastePassport/
    └── ...
```

#### Include Codelists
```bash
npm run generate:wiki:with-codelists
```
Adds codelist documentation to the wiki.

#### Verbose Mode
```bash
npm run generate:wiki:verbose
```
Shows detailed parsing and generation logs.

#### Example Wiki Output

**index.md**:
```markdown
# Índice de Ontologías

| Ontología | #Clases | #ObjProps | #DataProps | #Shapes |
|-----------|---------|-----------|-----------|---------|
| digitalMarpolWastePassport | 14 | 13 | 20 | 7 |
| digitalWastePassport | 6 | 2 | 0 | 5 |
| wasteActors | 3 | 4 | 9 | 0 |
```

**README.md**:
```markdown
# digitalWastePassport Ontology

## Classes

### DigitalWastePassport
The Digital Waste Passport is a comprehensive data structure...

**Datatype properties**: 
**Object properties**: credentialSubject
**Subclass of**: VerifiableCredential
```

**Use case**: Share ontology documentation with stakeholders, onboard new developers.

---

### 5. Conversion Tools

#### SHACL to JSON Schema
```bash
node docker/docker.js run cli convert shacl \
  -i shapes/v0.1/digitalWastePassportShapes.ttl \
  -o build/v0.1/custom-output.schema.json
```

**Use case**: Integrate with JSON Schema validators in other systems.

#### JSON Schema to TypeScript
```bash
node docker/docker.js run cli convert ts \
  -i build/v0.1/custom-output.schema.json \
  -o build/v0.1/custom-output.ts
```

**Use case**: Generate TypeScript types from existing JSON Schemas.

---

### 6. Build Pipelines

#### Quick Build (Types Only)
```bash
npm run build
```
Equivalent to `npm run generate:types`.

#### Full Build (Validate + Generate)
```bash
npm run build:all
```
Runs:
1. `validate:owl:with-codelists`
2. `generate:types`
3. `generate:wiki`

**Use case**: Pre-commit verification, CI/CD pipelines.

#### Generate All Artifacts
```bash
npm run generate:all
```
Generates both TypeScript types and wiki documentation.

---

## Common Workflows

### Workflow 1: Creating a New Ontology

```bash
# 1. Create your ontology file
# ontology/v0.1/myNewOntology.ttl

# 2. Create corresponding SHACL shapes
# shapes/v0.1/myNewOntologyShapes.ttl

# 3. Validate OWL syntax
npm run validate:owl

# 4. Create sample data
# examples/v0.1/my-new-ontology-sample.ttl

# 5. Validate sample against shapes
node docker/docker.js run cli validate shacl \
  -d examples/v0.1/my-new-ontology-sample.ttl \
  -s shapes/v0.1/myNewOntologyShapes.ttl

# 6. Generate TypeScript types
npm run generate:types

# 7. Generate documentation
npm run generate:wiki

# 8. Verify outputs
ls build/v0.1/
ls docs/wiki/myNewOntology/
```

### Workflow 2: Updating Existing Shapes

```bash
# 1. Edit SHACL shapes
# vim shapes/v0.1/digitalWastePassportShapes.ttl

# 2. Validate changes don't break syntax
npm run validate:owl

# 3. Test with existing examples
node docker/docker.js run cli validate shacl \
  -d examples/v0.1/digital-waste-passport-sample.ttl \
  -s shapes/v0.1/digitalWastePassportShapes.ttl

# 4. Regenerate artifacts
npm run generate:all

# 5. Check TypeScript changes
git diff build/v0.1/digitalWastePassport.ts
```

### Workflow 3: CI/CD Integration

```bash
# Full validation pipeline
npm run build:all

# Exit codes:
# 0 = success
# 1 = validation failed
```

**GitHub Actions example**:
```yaml
- name: Build Docker image
  run: npm run docker:build

- name: Validate and build artifacts
  run: npm run build:all

- name: Check for uncommitted changes
  run: git diff --exit-code build/ docs/wiki/
```

### Workflow 4: Testing Data Quality

```bash
# Validate all examples
for file in examples/v0.1/*-sample.ttl; do
  echo "Testing $file"
  node docker/docker.js run cli validate shacl \
    -d "$file" \
    -s shapes/v0.1/digitalWastePassportShapes.ttl
done

# Expected: All valid samples pass, invalid samples fail
```

---

## CLI Reference

### Full CLI Help

```bash
# Main help
node docker/docker.js run cli --help

# Subcommand help
node docker/docker.js run cli validate --help
node docker/docker.js run cli generate --help
node docker/docker.js run cli convert --help
```

### Validate Commands

#### `validate owl`
```bash
node docker/docker.js run cli validate owl [OPTIONS]

Options:
  -i, --inputs INPUTS_CSV       Comma-separated list of TTL files
  --include-codelists           Include codelists/v*/ in auto-discovery
  --no-auto                     Disable auto-discovery
  -r, --reasoner {HermiT,ELK,none}
  -p, --profile {DL,OWL2}
  --build-dir BUILD_DIR         Build output directory
  -m, --merged MERGED           Merged output filename
  -o, --output OUTPUT           Reasoned output filename
  -q, --quiet                   Reduce output
```

#### `validate shacl`
```bash
node docker/docker.js run cli validate shacl [OPTIONS]

Options:
  -d, --data DATA               Data graph file (required)
  -s, --shapes SHAPES           Shapes file (required)
  -e, --extras EXTRAS_CSV       CSV list of extra TTL files
  -f, --format {human,text,turtle,json-ld}
```

### Generate Commands

#### `generate types`
```bash
node docker/docker.js run cli generate types [OPTIONS]

Options:
  -v, --verbose                 Enable verbose output
```

#### `generate wiki`
```bash
node docker/docker.js run cli generate wiki [OPTIONS]

Options:
  --ontology-dir ONTOLOGY_DIR   Ontology directory (default: ontology)
  --output-dir OUTPUT_DIR       Output directory (default: docs/wiki)
  --include-codelists           Include codelists in wiki generation
  --include-shapes              Include shapes count in index
  -v, --verbose                 Enable verbose output
```

### Convert Commands

#### `convert shacl`
```bash
node docker/docker.js run cli convert shacl [OPTIONS]

Options:
  -i, --input INPUT             Input SHACL shapes file (TTL) (required)
  -o, --output OUTPUT           Output JSON Schema file (required)
  -v, --verbose                 Enable verbose output
```

#### `convert ts`
```bash
node docker/docker.js run cli convert ts [OPTIONS]

Options:
  -i, --input INPUT             Input JSON Schema file (required)
  -o, --output OUTPUT           Output TypeScript file (required)
  -b, --banner BANNER           Custom banner comment
  -s, --source SOURCE           Source file name for default banner
  -v, --verbose                 Enable verbose output
```

---

## Output Artifacts

### TypeScript Definitions (`build/v0.1/*.ts`)

**Purpose**: Type-safe development in TypeScript/JavaScript

**Structure**:
```typescript
export interface DigitalWastePassport {
  "dct:issued": string;
  "dct:publisher": Organization;
  "dwp:credentialSubject": WastePassport;
}
```

**Usage**:
```typescript
import { DigitalWastePassport } from './build/v0.1/digitalWastePassport';

const passport: DigitalWastePassport = {
  "dct:issued": "2026-01-16T12:00:00Z",
  "dct:publisher": { ... },
  "dwp:credentialSubject": { ... }
};
```

### JSON Schemas (`build/v0.1/*.schema.json`)

**Purpose**: Data validation, OpenAPI integration, documentation

**Structure**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Digital Waste Passport",
  "type": "object",
  "properties": {
    "dct:issued": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["dct:issued"]
}
```

**Usage with AJV**:
```javascript
const Ajv = require('ajv');
const schema = require('./build/v0.1/digitalWastePassport.schema.json');

const ajv = new Ajv();
const validate = ajv.compile(schema);
const isValid = validate(data);
```

### Merged Ontology (`build/v0.1/merged-ontology.ttl`)

**Purpose**: All ontologies combined into a single file

**Use cases**:
- Import into Protégé for visualization
- Load into triple stores
- Full semantic graph analysis

### Reasoned Ontology (`build/v0.1/reasoned-ontology.ttl`)

**Purpose**: Ontology with inferred axioms from reasoner

**Use cases**:
- Advanced semantic queries
- Consistency checking
- Class hierarchy inference

### Wiki Documentation (`docs/wiki/`)

**Purpose**: Human-readable ontology documentation

**Contents**:
- Class definitions and descriptions
- Property relationships
- SHACL constraint documentation
- Visual diagrams (Mermaid)

**Use cases**:
- Onboarding documentation
- Stakeholder communication
- API documentation

---

## Troubleshooting

### Docker Issues

#### Docker build fails
```bash
# Check Docker is running
docker ps

# Clean Docker cache
docker system prune -a

# Rebuild image
npm run docker:build
```

#### Docker commands fail with "Cannot connect to daemon"
```bash
# Start Docker Desktop
# Wait for "Docker Desktop is running" notification

# Verify
docker version
```

#### Slow Docker builds
```bash
# Use BuildKit for faster builds
$env:DOCKER_BUILDKIT=1
npm run docker:build
```

### Validation Errors

#### OWL validation fails with "Prefix not bound"
**Cause**: Missing prefix declaration in TTL file

**Solution**:
```turtle
@prefix myprefix: <http://example.org/> .
```

#### SHACL validation fails with "Unknown namespace"
**Cause**: Data file uses prefixes not declared in shapes

**Solution**: Add missing prefixes to shapes file or use `-e` flag:
```bash
node docker/docker.js run cli validate shacl \
  -d data.ttl \
  -s shapes.ttl \
  -e ontology/v0.1/digitalWastePassport.ttl
```

### Generation Issues

#### TypeScript generation fails
**Cause**: Invalid SHACL shapes syntax

**Solution**:
1. Validate SHACL shapes first:
```bash
npm run validate:owl
```
2. Check shapes file for syntax errors
3. Ensure required prefixes are declared

#### Wiki generation shows warnings
**Cause**: SHACL shapes contain TODO or invalid syntax

**Solution**: Fix or complete the shapes file:
```turtle
# Bad:
TODO: Add constraints here

# Good:
ex:MyShape a sh:NodeShape ;
    sh:targetClass ex:MyClass .
```

### Output Issues

#### Build artifacts not appearing
**Cause**: Docker volume mount issues

**Solution**:
```bash
# Check Docker Desktop settings
# Settings → Resources → File Sharing
# Ensure C:\Users\<user>\repos is shared

# Rebuild container
npm run docker:build
```

#### Generated files have wrong timestamps
**Cause**: Time zone differences between host and container

**Solution**: This is cosmetic and doesn't affect functionality.

### Windows-Specific Issues

#### PowerShell flag issues with `npm run`
**Cause**: PowerShell consumes flags after `--`

**Solution**: Use direct Docker wrapper:
```bash
# Bad (PowerShell):
npm run cli -- validate shacl -d file.ttl -s shapes.ttl

# Good (Windows):
node docker/docker.js run cli validate shacl -d file.ttl -s shapes.ttl
```

---

## Best Practices

### 1. Configuration Management (config.yml as Single Source of Truth)

The `config.yml` file is the **central configuration** for all ontology operations. Instead of hardcoding values or modifying scripts, define everything here.

#### Adding New SHACL Validation Scenarios

**Why?** Create reusable validation patterns without touching code.

**How?** Edit `config.yml`:

```yaml
validation:
  shacl:
    default: "dwp"  # Scenario used when no name specified
    
    scenarios:
      # Existing scenarios
      dwp: { ... }
      dmwp: { ... }
      
      # Add your new scenario
      my-integration-test:
        name: "Integration Test - Port Operations"
        description: "Validates port waste collection data with actors"
        data: "examples/v0.1/port-integration-test.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"
        format: "human"
        extras: "ontology/v0.1/wasteActors.ttl"  # Extra context if needed
      
      my-ci-test:
        name: "CI Pipeline - Smoke Test"
        description: "Quick validation for CI/CD pipeline"
        data: "examples/v0.1/minimal-valid-sample.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"
        format: "text"
        extras: ""
```

**Usage**:
```bash
# List all scenarios (including your new ones)
npm run validate:shacl:list

# Run your new scenario
node docker/docker.js run cli validate shacl my-integration-test
node docker/docker.js run cli validate shacl my-ci-test
```

**Benefits**:
- ✅ No code changes needed
- ✅ Self-documenting (name + description)
- ✅ Version controlled with the project
- ✅ Easy to share with team
- ✅ CI/CD friendly

#### Organizing Scenarios by Purpose

```yaml
validation:
  shacl:
    scenarios:
      # Development scenarios
      dwp-dev:
        name: "Development - Quick DWP Test"
        data: "examples/v0.1/digital-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"
      
      # Integration scenarios
      dwp-integration:
        name: "Integration - Full Context"
        data: "examples/v0.1/digital-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"
        extras: "ontology/v0.1/wasteActors.ttl,codelists/v0.1/residue-type-code.ttl"
      
      # CI/CD scenarios
      dwp-ci-fast:
        name: "CI - Fast Validation"
        data: "examples/v0.1/minimal-dwp.ttl"
        shapes: "shapes/v0.1/dwp-bootstrap.shacl.ttl"  # Subset of constraints
      
      # Production scenarios
      dwp-prod:
        name: "Production - Full Validation"
        data: "examples/v0.1/production-sample.ttl"
        shapes: "shapes/v0.1/dwp-governed.shacl.ttl"  # All constraints
        format: "json-ld"  # Machine-readable for automation
```

### 2. Version Management

```yaml
# config.yml
ontology_version: v0.1
shapes_version: v0.1
build_version: v0.1
```

- Keep versions synchronized across ontology, shapes, and build
- Use semantic versioning for breaking changes
- Document version changes in commit messages

### 2. Ontology Design

- ✅ Use standard prefixes (dct, schema, rdf, rdfs, owl)
- ✅ Provide rdfs:label and rdfs:comment for all classes/properties
- ✅ Keep ontologies modular (one domain per file)
- ❌ Avoid circular dependencies between ontologies
- ❌ Don't mix schema design with instance data

### 3. SHACL Constraints

```turtle
# Good: Clear, specific constraints
ex:WastePassportShape a sh:NodeShape ;
    sh:targetClass ex:WastePassport ;
    sh:property [
        sh:path dct:issued ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:datatype xsd:dateTime ;
        sh:message "Must have exactly one dct:issued date" ;
    ] .

# Bad: Vague, no message
ex:WastePassportShape a sh:NodeShape ;
    sh:property [
        sh:path dct:issued ;
    ] .
```

- Always include `sh:message` for validation errors
- Use `sh:closed true` to prevent unexpected properties
- Test with both valid and invalid examples

### 4. Testing Strategy

```bash
# 1. Unit test: Each shape individually
node docker/docker.js run cli validate shacl \
  -d examples/v0.1/waste-passport-sample.ttl \
  -s shapes/v0.1/digitalWastePassportShapes.ttl

# 2. Integration test: Full build pipeline
npm run build:all

# 3. Negative testing: Validate invalid examples fail
node docker/docker.js run cli validate shacl \
  -d examples/v0.1/invalid-waste-passport-sample.ttl \
  -s shapes/v0.1/digitalWastePassportShapes.ttl
# Expected: exit code 1
```

### 5. Git Workflow

```bash
# Before committing changes
npm run build:all

# Stage all generated artifacts
git add build/ docs/wiki/

# Commit with descriptive message
git commit -m "feat: add vessel capacity constraint to MARPOL passport"

# Push
git push origin feature-branch
```

### 6. Documentation Maintenance

- Update wiki when ontology changes
- Keep examples synchronized with shapes
- Document breaking changes in CHANGELOG.md
- Review generated TypeScript types for correctness

### 7. Performance Optimization

```bash
# Cache Docker layers
npm run docker:build  # First time: ~10 minutes
npm run docker:build  # Subsequent: ~30 seconds

# Parallel validation (if needed)
npm run validate:owl &
npm run generate:types &
wait
```

### 8. Collaboration

- Use `config.yml` for team-wide settings
- Share Docker image via registry (optional)
- Document custom shapes in SHAPES.md
- Provide real-world examples in examples/

---

## Quick Reference

### Essential Commands

```bash
# Setup
npm run docker:build              # Build Docker image (first time)
npm run config:show               # Verify configuration

# Validation
npm run validate:owl              # Validate OWL ontologies
npm run validate:owl:with-codelists  # Include codelists
npm run validate:shacl            # SHACL validation (uses default scenario)
npm run validate:shacl:list       # List all available SHACL scenarios

# Run specific SHACL scenario
node docker/docker.js run cli validate shacl dwp
node docker/docker.js run cli validate shacl dmwp
node docker/docker.js run cli validate shacl <scenario-name>

# Generation
npm run generate:types            # Generate TypeScript types
npm run generate:wiki             # Generate documentation
npm run generate:all              # Generate everything

# Build
npm run build                     # Quick build (types only)
npm run build:all                 # Full build (validate + generate)

# Help
npm run help                      # CLI overview
node docker/docker.js run cli --help  # Full CLI help
```

### File Locations

| Type | Location | Generated? |
|------|----------|------------|
| Ontologies | `ontology/v0.1/*.ttl` | ❌ Manual |
| SHACL Shapes | `shapes/v0.1/*.ttl` | ❌ Manual |
| Examples | `examples/v0.1/*.ttl` | ❌ Manual |
| TypeScript | `build/v0.1/*.ts` | ✅ Auto |
| JSON Schema | `build/v0.1/*.schema.json` | ✅ Auto |
| Wiki | `docs/wiki/` | ✅ Auto |
| Merged OWL | `build/v0.1/merged-ontology.ttl` | ✅ Auto |

### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Validation failed / Error occurred |

### Support Resources

- **Configuration**: `config.yml`
- **Validation Checklist**: `VALIDATION.md`
- **Migration Guide**: `scripts/MIGRATION.md`
- **ADRs (Architecture Decision Records)**: `docs/01-adr/`
- **Docker Guide**: `docker/README.md`

---

## Appendix: Docker Integration Details

### How Docker Wrapper Works

The `docker/docker.js` script:
1. Builds/pulls the Docker image if needed
2. Mounts workspace directory as volume
3. Runs commands inside container
4. Returns output to host terminal

### Docker Commands

```bash
# Build image
npm run docker:build

# Interactive shell access
npm run docker:shell

# Run custom CLI command
node docker/docker.js run cli <command> <args>

# Run arbitrary npm script
node docker/docker.js run <npm-script-name>
```

### Docker Image Contents

- **Base**: `node:20-bookworm-slim`
- **Python**: 3.11 + virtual environment
- **Java**: OpenJDK 17 (for ROBOT)
- **Tools**: ROBOT CLI, pyshacl, rdflib, json-schema-to-typescript
- **Working Dir**: `/workspace`

### Volume Mounts

```
Host                                Container
────────────────────────────────────────────────────────
<workspace>/                   →    /workspace/
<workspace>/build/v0.1/        ←    /workspace/build/v0.1/
<workspace>/docs/wiki/         ←    /workspace/docs/wiki/
```

Changes in container reflect immediately on host.

---

## Conclusion

This toolchain provides a **production-ready** solution for semantic ontology management. By combining Docker isolation, automated validation, and artifact generation, it enables teams to:

- 🚀 **Move faster**: Automated pipelines reduce manual work
- 🔒 **Stay safe**: Multi-layer validation catches errors early  
- 📖 **Communicate better**: Auto-generated docs keep everyone aligned
- 🔧 **Scale easily**: Docker ensures consistency across environments

For questions, issues, or contributions, refer to the project's GitHub repository.

**Happy ontology engineering! 🎉**
