# Docker Usage Guide

## Overview

This project includes Docker support for running all validation and generation scripts in a consistent, isolated environment with all dependencies pre-installed.

## Quick Start

### Building the Image

Build the Docker image with all dependencies:

```bash
# Using npm (cross-platform, recommended)
npm run docker:build

# Or directly with Node.js
node docker/docker.js build
```

### Running Commands

Run any npm script inside the Docker container:

```bash
# Using npm scripts
npm run docker:run config:show
npm run docker:run validate:owl:with-codelists
npm run docker:run generate:types
npm run docker:run build:all

# Or directly with Node.js (same thing)
node docker/docker.js run config:show
node docker/docker.js run generate:types

# Open interactive shell
npm run docker:shell
node docker/docker.js shell
```

## Available Commands

### Configuration

```bash
npm run docker:run config:show
```

Shows current configuration from `config.yml`.

### Validation

```bash
# Validate OWL ontologies
npm run docker:run validate:owl

# Validate OWL with codelists
npm run docker:run validate:owl:with-codelists

# Validate all
npm run docker:run validate:all
```

### Generation

```bash
# Generate TypeScript definitions
npm run docker:run generate:types

# Generate wiki documentation
npm run docker:run generate:wiki

# Generate all artifacts
npm run docker:run generate:all
```

### Build Pipeline

```bash
# Build TypeScript types
npm run docker:run build

# Run full validation + generation pipeline
npm run docker:run build:all
```

### Version Release

```bash
# Interactive version release
npm run docker:run release:version

# Release all components at once
npm run docker:run release:all
```

## What's Inside the Docker Image

The Docker image includes:

- **Base**: Node.js 20 (Debian Bookworm Slim)
- **Python**: Python 3.11 with venv
- **Java**: OpenJDK 17 JRE (for ROBOT)
- **Tools**:
  - ROBOT (ontology reasoner/validator)
  - GraphViz (visualization)
- **Python packages**:
  - rdflib (RDF processing)
  - pyshacl (SHACL validation)
  - PyYAML (configuration)
- **Node packages**:
  - json-schema-to-typescript
  - All package.json dependencies

## Benefits of Using Docker

1. **Consistency**: Same environment on all machines (Windows, Mac, Linux)
2. **Isolation**: No conflicts with local Python/Node installations
3. **Reproducibility**: CI/CD and local builds use identical setup
4. **Easy Setup**: No need to manually install Python packages, Java, ROBOT, etc.
5. **Clean**: No pollution of your local environment

## CI/CD Integration

The Docker image is automatically built and used in GitHub Actions workflows (`.github/workflows/validate.yml`).

## Local vs Docker Execution

Both work identically:

**Local execution** (requires local setup):
```bash
npm run config:show
```

**Docker execution** (self-contained):
```bash
docker/run.bat config:show
```

Both use the same configuration system (`config.yml`) and produce identical output.

## Troubleshooting

### Build fails

- Ensure Docker is running
- Check internet connection (downloads dependencies)
- Try rebuilding: `docker build --no-cache -t bri-ontology-tooling:latest -f docker/Dockerfile .`

### Permission errors on Linux/Mac

- Ensure scripts are executable: `chmod +x docker/*.sh scripts/*.sh`

### Volume mount issues on Windows

- Use absolute paths: `docker run --rm -v "C:\full\path\to\project:/workspace" ...`
- Ensure Docker Desktop has access to your drive (Settings → Resources → File Sharing)

## Advanced Usage

### Interactive Shell

Get a bash shell inside the container:

```bash
docker run --rm -it -v "$(pwd):/workspace" -w /workspace bri-ontology-tooling:latest bash
```

### Run Custom Python Scripts

```bash
docker run --rm -v "$(pwd):/workspace" -w /workspace bri-ontology-tooling:latest python scripts/your_script.py
```

### Debug Build

See detailed build output:

```bash
docker build --progress=plain -t bri-ontology-tooling:latest -f docker/Dockerfile .
```

## File Structure

```
docker/
├── Dockerfile          # Image definition
└── docker.js           # Cross-platform build/run wrapper (Node.js)
```
