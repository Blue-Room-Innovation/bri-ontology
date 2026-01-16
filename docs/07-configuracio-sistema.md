# Configuration System

This project uses a centralized configuration file (`config.yml`) to manage versions and paths across all scripts and tools.

## 📁 Configuration File: `config.yml`

All version numbers, paths, and component settings are defined in the root `config.yml` file. This eliminates hardcoded versions in scripts and makes version management simpler.

### Key Configuration Sections

```yaml
# Current versions for each component
ontology_version: "v0.1"
shapes_version: "v0.1"
examples_version: "v0.1"
codelists_version: "v1"
contexts_version: "0.1"
build_version: "v0.1"

# Component definitions
ontologies:
  - name: "digitalWastePassport"
    file: "digitalWastePassport.ttl"
    ...

# Generation pipeline
generation:
  artifacts:
    - name: "digitalWastePassport"
      shape_file: "digitalWastePassportShapes.ttl"
      ...
```

## 🔧 Using Configuration in Scripts

### Python Scripts

```python
from lib.config import load_config

# Load configuration
config = load_config()

# Access version numbers
print(config.ontology_version)  # "v0.1"
print(config.shapes_version)     # "v0.1"
print(config.codelists_version)  # "v1"

# Get versioned paths
ontology_path = config.get_ontology_path("digitalWastePassport.ttl")
# Returns: "ontology/v0.1/digitalWastePassport.ttl"

shapes_path = config.get_shapes_path("digitalWastePassportShapes.ttl")
# Returns: "shapes/v0.1/digitalWastePassportShapes.ttl"

# Get GitHub raw URLs
url = config.get_github_raw_url("ontology", "digitalWastePassport.ttl")
# Returns: "https://raw.githubusercontent.com/.../main/ontology/v0.1/digitalWastePassport.ttl"

# Access component configurations
for artifact in config.get_generation_artifacts():
    print(artifact['name'], artifact['shape_file'])
```

### NPM Scripts

All npm scripts in `package.json` automatically use the current configuration:

```bash
# Validate using configured versions
npm run validate:owl:with-codelists

# Generate using configured artifacts
npm run generate:types

# Show current configuration
npm run config:show
```

## 🔄 Updating Versions

When you create a new version, update `config.yml` instead of modifying scripts:

### Option 1: Manual Update

Edit `config.yml`:

```yaml
# Change versions
ontology_version: "v0.2"  # was "v0.1"
shapes_version: "v0.2"    # was "v0.1"
build_version: "v0.2"     # was "v0.1"
```

All scripts will automatically use the new versions on next run.

### Option 2: Using Release Script

The `release-version.py` script handles folder copying and URI updates, but you still need to update `config.yml` after release:

```bash
# 1. Create new version folders
python scripts/release-version.py --all --from v0.1 --to v0.2

# 2. Update config.yml to point to new versions
# Edit: ontology_version: "v0.2"
#       shapes_version: "v0.2"
#       build_version: "v0.2"

# 3. Run scripts with new configuration
npm run validate:owl:with-codelists
npm run generate:types
```

## 📋 Configuration Reference

### Component Versions

| Key | Description | Example | Notes |
|-----|-------------|---------|-------|
| `ontology_version` | Ontologies version | `v0.1` | With "v" prefix |
| `shapes_version` | SHACL shapes version | `v0.1` | With "v" prefix |
| `examples_version` | Examples version | `v0.1` | With "v" prefix |
| `codelists_version` | Codelists version | `v1` | Major version only |
| `contexts_version` | JSON-LD contexts version | `0.1` | **Without** "v" prefix |
| `build_version` | Build output version | `v0.1` | With "v" prefix |

### Path Helpers

```python
config.get_ontology_path(filename)   # ontology/{version}/{filename}
config.get_shapes_path(filename)     # shapes/{version}/{filename}
config.get_examples_path(filename)   # examples/{version}/{filename}
config.get_codelists_path(filename)  # codelists/{version}/{filename}
config.get_contexts_path(filename)   # contexts/{version}/{filename}
config.get_build_path(filename)      # build/{version}/{filename}
```

### Component Lists

```python
config.get_ontology_configs()        # List of ontology definitions
config.get_shape_configs()           # List of shape definitions
config.get_generation_artifacts()    # List of artifacts to generate
config.get_validation_examples()     # List of SHACL validation examples
```

## 🎯 Benefits

1. **Single Source of Truth**: All versions defined in one place
2. **No Hardcoded Values**: Scripts dynamically read configuration
3. **Easy Version Updates**: Change config.yml, not 20+ files
4. **Consistent Paths**: Automatic path resolution across all tools
5. **Type Safety**: Config class provides typed access
6. **Discoverability**: `npm run config:show` displays current settings

## 🚀 Quick Commands

```bash
# Show current configuration
npm run config:show

# Or directly
python -c "from scripts.lib.config import load_config; print(load_config())"

# Validate with current config
npm run validate:owl:with-codelists

# Generate with current config
npm run generate:types

# Build everything
npm run build:all
```

## 📝 Adding New Components

To add a new ontology or shape, edit `config.yml`:

```yaml
ontologies:
  - name: "myNewOntology"
    file: "myNewOntology.ttl"
    display_name: "My New Ontology"
    description: "Description here"

generation:
  artifacts:
    - name: "myNewOntology"
      shape_file: "myNewOntologyShapes.ttl"
      json_schema: "myNewOntology.schema.json"
      typescript: "myNewOntology.ts"
```

Scripts will automatically include the new component in processing.

## 🔍 Troubleshooting

### Config file not found

```
FileNotFoundError: Configuration file not found: /path/to/config.yml
```

**Solution**: Ensure `config.yml` exists in the workspace root (parent of `scripts/` directory).

### Import error

```
ImportError: cannot import name 'load_config'
```

**Solution**: Install dependencies:
```bash
pip install -r scripts/requirements.txt
```

### Cached configuration

If changes to `config.yml` don't take effect, the config might be cached. Restart your Python process or clear the singleton:

```python
from lib.config import Config
Config._instance = None  # Clear cache
config = Config.load()   # Reload
```

## 📚 See Also

- [ADR-006: Estratègia de Versionat Git](docs/01-adr/ADR-006-estrategia-versionat-git.md)
- [Release Process Documentation](scripts/MIGRATION.md)
- [Config Module API](scripts/lib/config.py)
