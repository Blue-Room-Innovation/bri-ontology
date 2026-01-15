# Docker Usage Guide

## Overview

This project includes Docker support for running all validation and generation scripts in a consistent, isolated environment with all dependencies pre-installed.

## Quick Start

### Building the Image

Build the Docker image with all dependencies:

```bash
# Using the build script (recommended)
docker/build.bat              # Windows
docker/build.sh               # Linux/Mac

# Or manually
docker build -t bri-ontology-tooling:latest -f docker/Dockerfile .
```

### Running Commands

Run any npm script inside the Docker container:

```bash
# Using the run script (recommended)
docker/run.bat config:show                      # Windows
docker/run.sh config:show                       # Linux/Mac

# Or manually
docker run --rm -v "$(pwd):/workspace" -w /workspace bri-ontology-tooling:latest npm run config:show
```

## Available Commands

### Configuration

```bash
docker/run.bat config:show
```

Shows current configuration from `config.yml`.

### Validation

```bash
# Validate OWL ontologies
docker/run.bat validate:owl

# Validate OWL with codelists
docker/run.bat validate:owl:with-codelists

# Validate all
docker/run.bat validate:all
```

### Generation

```bash
# Generate TypeScript definitions
docker/run.bat generate:types

# Generate wiki documentation
docker/run.bat generate:wiki

# Generate all artifacts
docker/run.bat generate:all
```

### Build Pipeline

```bash
# Build TypeScript types
docker/run.bat build

# Run full validation + generation pipeline
docker/run.bat build:all
```

### Version Release

```bash
# Interactive version release
docker/run.bat release:version

# Release all components at once
docker/run.bat release:all
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
├── build.bat           # Windows build helper
├── build.sh            # Unix build helper
├── run.bat             # Windows run helper
└── run.sh              # Unix run helper
```
