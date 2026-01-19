# Configuration Guide - config.yml

> **Complete guide to configuring ontology validation, generation, and conversion workflows**

## Table of Contents

1. [Overview](#overview)
2. [Validation Configuration](#validation-configuration)
3. [Conversion Configuration](#conversion-configuration)
4. [Adding New Scenarios](#adding-new-scenarios)
5. [Examples](#examples)

---

## Overview

The `config.yml` file is the **single source of truth** for all ontology operations. Instead of hardcoding values in scripts or package.json, define everything here.

### Benefits

- ✅ **No code changes**: Add new validations without touching Python/JavaScript
- ✅ **Self-documenting**: Names and descriptions make intent clear
- ✅ **Version controlled**: Configuration evolves with your ontology
- ✅ **Team-friendly**: Easy to share and review changes
- ✅ **CI/CD ready**: Reference scenarios by name in pipelines

---

## Validation Configuration

### Structure

```yaml
validation:
  shacl:
    scenarios:
      <scenario-name>:
        name: "Display Name"
        description: "What this scenario validates"
        data: "path/to/data.ttl"
        shapes: "path/to/shapes.ttl"
        format: "human|text|turtle|json-ld"
        extras: "optional,comma,separated,files.ttl"
```

### Running Scenarios

When you run `npm run validate:shacl` without a name, the CLI validates **all** scenarios configured under `validation.shacl.scenarios`.

### Scenario Fields

| Field         | Required | Description                                        | Example                                      |
| ------------- | -------- | -------------------------------------------------- | -------------------------------------------- |
| `name`        | Yes      | Human-readable display name                        | `"Digital Waste Passport"`                   |
| `description` | Yes      | What this scenario validates                       | `"Validates DWP sample data"`                |
| `data`        | Yes      | Path to RDF data file (relative to workspace root) | `"examples/v0.1/sample.ttl"`                 |
| `shapes`      | Yes      | Path to SHACL shapes file                          | `"shapes/v0.1/shapes.ttl"`                   |
| `format`      | No       | Output format (default: `human`)                   | `"human"`, `"text"`, `"turtle"`, `"json-ld"` |
| `extras`      | No       | Comma-separated list of extra context files        | `"ontology/v0.1/actors.ttl"`                 |

---

## Conversion Configuration

### SHACL to JSON Schema

Define conversions from SHACL shapes to JSON Schema:

```yaml
conversion:
  shacl_to_json:
    <conversion-name>:
      name: "Display Name"
      input: "shapes/v0.1/input.ttl"
      output: "build/v0.1/output.schema.json"
```

### JSON Schema to TypeScript

Define conversions from JSON Schema to TypeScript:

```yaml
conversion:
  json_to_ts:
    <conversion-name>:
      name: "Display Name"
      input: "build/v0.1/input.schema.json"
      output: "build/v0.1/output.ts"
      source: "shapes/v0.1/original-shapes.ttl" # For documentation banner
```

---

## Adding New Scenarios

### Example 1: Add a Development Test Scenario

```yaml
validation:
  shacl:
    scenarios:
      # ... existing scenarios ...

      dwp-dev:
        name: "DWP Development Test"
        description: "Quick validation for local development"
        data: "examples/v0.1/digital-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"
        format: "human"
        extras: ""
```

**Run it**:

```bash
node docker/docker.js run cli validate shacl dwp-dev
```

### Example 2: Add an Integration Test with Extra Context

```yaml
validation:
  shacl:
    scenarios:
      dwp-integration:
        name: "DWP Integration Test"
        description: "Full validation with actors and codelists"
        data: "examples/v0.1/digital-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"
        format: "human"
        extras: "ontology/v0.1/wasteActors.ttl,codelists/v0.1/residue-type-code.ttl"
```

**Run it**:

```bash
node docker/docker.js run cli validate shacl dwp-integration
```

### Example 3: Add a CI/CD Fast Test

```yaml
validation:
  shacl:
    scenarios:
      ci-smoke-test:
        name: "CI Smoke Test"
        description: "Fast validation for CI pipeline"
        data: "examples/v0.1/minimal-valid-sample.ttl"
        shapes: "shapes/v0.1/dwp-bootstrap.shacl.ttl"
        format: "text" # Machine-readable
        extras: ""
```

**Use in CI**:

```yaml
# .github/workflows/ci.yml
- name: Quick Validation
  run: node docker/docker.js run cli validate shacl ci-smoke-test
```

### Example 4: Add Multiple Test Scenarios

```yaml
validation:
  shacl:
    scenarios:
      # Valid data tests
      dwp-valid-basic:
        name: "DWP Valid - Basic"
        data: "examples/v0.1/valid-basic.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"

      dwp-valid-complex:
        name: "DWP Valid - Complex"
        data: "examples/v0.1/valid-complex.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"

      # Invalid data tests (should fail)
      dwp-invalid-missing-issued:
        name: "DWP Invalid - Missing dct:issued"
        data: "examples/v0.1/invalid-no-issued.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"

      dwp-invalid-wrong-type:
        name: "DWP Invalid - Wrong Data Type"
        data: "examples/v0.1/invalid-wrong-type.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"
```

**Run all tests**:

```bash
# List scenarios
npm run validate:shacl:list

# Run each test
node docker/docker.js run cli validate shacl dwp-valid-basic
node docker/docker.js run cli validate shacl dwp-valid-complex
node docker/docker.js run cli validate shacl dwp-invalid-missing-issued
```

---

## Examples

### Complete Validation Configuration

```yaml
validation:
  # OWL validation settings
  owl:
    reasoner: "HermiT"
    profile: "DL"
    include_codelists: true

  # SHACL validation scenarios
  shacl:
    scenarios:
      # Production scenarios
      dwp:
        name: "Digital Waste Passport"
        description: "Validates DWP sample data against DWP shapes"
        data: "examples/v0.1/digital-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/digitalWastePassportShapes.ttl"
        format: "human"
        extras: ""

      dmwp:
        name: "Digital MARPOL Waste Passport"
        description: "Validates MARPOL sample data against MARPOL shapes"
        data: "examples/v0.1/digital-marpol-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/digitalMarpolWastePassportShapes.ttl"
        format: "human"
        extras: ""

      # Development scenarios
      dwp-dev:
        name: "DWP Development"
        description: "Quick test for local development"
        data: "examples/v0.1/digital-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/dwp-bootstrap.shacl.ttl"
        format: "human"
        extras: ""

      # Integration scenarios
      dwp-full:
        name: "DWP Full Integration"
        description: "Complete validation with all dependencies"
        data: "examples/v0.1/digital-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/dwp-governed.shacl.ttl"
        format: "human"
        extras: "ontology/v0.1/wasteActors.ttl,codelists/v0.1/residue-type-code.ttl"

      # CI/CD scenarios
      ci-fast:
        name: "CI Fast Test"
        description: "Minimal validation for CI pipeline"
        data: "examples/v0.1/minimal-sample.ttl"
        shapes: "shapes/v0.1/dwp-bootstrap.shacl.ttl"
        format: "text"
        extras: ""

      ci-full:
        name: "CI Full Test"
        description: "Complete validation for release pipeline"
        data: "examples/v0.1/digital-waste-passport-sample.ttl"
        shapes: "shapes/v0.1/dwp-governed.shacl.ttl"
        format: "json-ld"
        extras: "ontology/v0.1/wasteActors.ttl"
```

### Complete Conversion Configuration

```yaml
conversion:
  # SHACL → JSON Schema
  shacl_to_json:
    dwp:
      name: "Digital Waste Passport"
      input: "shapes/v0.1/digitalWastePassportShapes.ttl"
      output: "build/v0.1/digitalWastePassport.schema.json"

    dmwp:
      name: "Digital MARPOL Waste Passport"
      input: "shapes/v0.1/digitalMarpolWastePassportShapes.ttl"
      output: "build/v0.1/digitalMarpolWastePassport.schema.json"

    actors:
      name: "Waste Actors"
      input: "shapes/v0.1/waste-actors.shacl.ttl"
      output: "build/v0.1/wasteActors.schema.json"

  # JSON Schema → TypeScript
  json_to_ts:
    dwp:
      name: "Digital Waste Passport"
      input: "build/v0.1/digitalWastePassport.schema.json"
      output: "build/v0.1/digitalWastePassport.ts"
      source: "shapes/v0.1/digitalWastePassportShapes.ttl"

    dmwp:
      name: "Digital MARPOL Waste Passport"
      input: "build/v0.1/digitalMarpolWastePassport.schema.json"
      output: "build/v0.1/digitalMarpolWastePassport.ts"
      source: "shapes/v0.1/digitalMarpolWastePassportShapes.ttl"
```

---

## Best Practices

### 1. Naming Conventions

Use consistent prefixes for scenario names:

- **Production**: `dwp`, `dmwp` (short, memorable)
- **Development**: `dwp-dev`, `dmwp-dev`
- **Integration**: `dwp-integration`, `dwp-full`
- **CI/CD**: `ci-fast`, `ci-full`, `ci-smoke-test`
- **Testing**: `dwp-valid-*`, `dwp-invalid-*`

### 2. Descriptions

Make descriptions actionable:

✅ **Good**: "Validates DWP sample with full governance constraints"  
❌ **Bad**: "Test"

### 3. Organization

Group related scenarios:

```yaml
scenarios:
  # === Production Scenarios ===
  dwp: { ... }
  dmwp: { ... }

  # === Development Scenarios ===
  dwp-dev: { ... }
  dmwp-dev: { ... }

  # === CI/CD Scenarios ===
  ci-fast: { ... }
  ci-full: { ... }
```

### 4. Documentation

Add comments explaining complex scenarios:

```yaml
scenarios:
  dwp-integration:
    name: "DWP Integration Test"
    description: "Validates with actors and codelists"
    # This scenario includes wasteActors for organization validation
    # and residue-type-code for waste classification checks
    extras: "ontology/v0.1/wasteActors.ttl,codelists/v0.1/residue-type-code.ttl"
```

### 5. Testing

Always test new scenarios after adding them:

```bash
# List to verify it appears
npm run validate:shacl:list

# Run to test it works
node docker/docker.js run cli validate shacl <your-scenario-name>
```

---

## Troubleshooting

### Scenario not found

```
❌ ERROR: Scenario 'my-test' not found in config.yml
Available scenarios: dwp, dmwp
```

**Solution**: Check spelling, ensure scenario exists in `validation.shacl.scenarios`

### File not found

```
❌ ERROR: Data file not found: examples/v0.1/missing.ttl
```

**Solution**: Check path is relative to workspace root, verify file exists

### No scenarios configured

```
❌ No scenarios configured in config.yml
```

**Solution**: Add at least one scenario under `validation.shacl.scenarios`

---

## Migration from Old Config

If you have old `defaults.shacl` configuration, migrate to scenarios:

**Old format**:

```yaml
defaults:
  shacl:
    data: "examples/v0.1/sample.ttl"
    shapes: "shapes/v0.1/shapes.ttl"
```

**New format**:

```yaml
validation:
  shacl:
    default: "my-default"
    scenarios:
      my-default:
        name: "Default Validation"
        description: "Standard validation scenario"
        data: "examples/v0.1/sample.ttl"
        shapes: "shapes/v0.1/shapes.ttl"
        format: "human"
        extras: ""
```

---

## Summary

The `config.yml` approach gives you:

- ✅ **Flexibility**: Add scenarios without code changes
- ✅ **Clarity**: Self-documenting configuration
- ✅ **Consistency**: Same structure for all scenarios
- ✅ **Scalability**: Easy to add more scenarios as needed
- ✅ **Maintainability**: Version controlled, reviewable changes

For more examples, see the [USER_GUIDE.md](../USER_GUIDE.md).
