# CLI Tools - Ontology Management

Aquest directori conté els mòduls per a la validació, generació i conversió d'ontologies.

## Estructura

```
scripts/
├── ontology_cli.py          # Punt d'entrada principal del CLI
├── autogenerate.py          # Pipeline de generació TypeScript
├── generate-wiki.py         # Generació de wiki (manté compatibilitat)
├── shacl-to-jsonschema.py   # Conversió SHACL→JSON Schema (manté compatibilitat)
├── jsonschema-to-typescript.py  # Conversió JSON Schema→TypeScript (manté compatibilitat)
└── cli/
    ├── __init__.py          # Package initialization
    ├── utils.py             # Utilitats comunes (run_command, which, etc.)
    ├── validate_owl.py      # Validació d'ontologies OWL
    └── validate_shacl.py    # Validació de dades contra SHACL shapes
```

## Comandes Disponibles

### Validació

#### `validate owl`

Valida ontologies OWL amb ROBOT o Apache Jena RIOT:

```bash
npm run validate:owl                    # Valida ontologies OWL
npm run validate:owl:quiet              # Mode silenciós
npm run validate:owl:with-codelists     # Inclou codelists
```

#### `validate shacl`

Valida dades RDF contra shapes SHACL:

```bash
npm run validate:dwp                    # Valida Digital Waste Passport
npm run validate:marpol                 # Valida Marpol Waste Passport
```

### Generació

#### `generate types`

Genera TypeScript des de shapes SHACL (pipeline complet):

```bash
npm run generate:types                  # Genera TypeScript types
npm run generate:types:verbose          # Mode verbose
npm run autogenerate                    # Alias (compatibilitat)
```

#### `generate wiki`

Genera documentació wiki des d'ontologies:

```bash
npm run generate:wiki                   # Genera wiki
npm run generate:wiki:with-codelists    # Inclou codelists
npm run generate:wiki:verbose           # Mode verbose
```

### Conversió

#### `convert shacl`

Converteix SHACL shapes a JSON Schema:

```bash
npm run convert:shacl:dwp               # Digital Waste Passport
npm run convert:shacl:marpol            # Marpol Waste Passport
```

#### `convert ts`

Converteix JSON Schema a TypeScript:

```bash
npm run convert:ts:dwp                  # Digital Waste Passport
npm run convert:ts:marpol               # Marpol Waste Passport
```

## Ús des de package.json

Tots els scripts estan disponibles com a comandes npm:

```bash
# Validació
npm run validate:owl
npm run validate:dwp
npm run validate:marpol

# Generació
npm run generate:types
npm run generate:wiki

# Conversió
npm run convert:shacl:dwp
npm run convert:ts:dwp

# Ajuda
npm run help
```

## Ús directe amb Python

També pots utilitzar el CLI directament:

```bash
# Validació
python scripts/ontology_cli.py validate owl [opcions]
python scripts/ontology_cli.py validate shacl -d DATA -s SHAPES [opcions]

# Generació
python scripts/ontology_cli.py generate types [--verbose]
python scripts/ontology_cli.py generate wiki [--include-codelists]

# Conversió
python scripts/ontology_cli.py convert shacl -i INPUT.ttl -o OUTPUT.json
python scripts/ontology_cli.py convert ts -i INPUT.json -o OUTPUT.ts

# Ajuda per cada comanda
python scripts/ontology_cli.py --help
python scripts/ontology_cli.py validate owl --help
python scripts/ontology_cli.py generate types --help
python scripts/ontology_cli.py convert shacl --help
```

## Mòduls

### `utils.py`

Funcions auxiliars reutilitzables:

- `which(cmd)`: Comprova si una eina està disponible al PATH
- `split_csv(value)`: Divideix strings CSV
- `print_err(msg)`: Imprimeix a stderr
- `run_command(cmd, quiet)`: Executa comandes i captura sortida
- `get_workspace_root()`: Obté el directori arrel del workspace
- `iter_ontology_files()`: Itera sobre fitxers TTL d'ontologies

### `validate_owl.py`

Validació d'ontologies OWL:

- Classe `OwlConfig`: Configuració de validació
- Funció `validate_owl()`: Valida ontologies amb ROBOT o Apache Jena RIOT
- Suporta merge, validació de perfils i raonament

### `validate_shacl.py`

Validació SHACL:

- Classe `ShaclConfig`: Configuració de validació
- Funció `validate_shacl()`: Valida dades RDF contra shapes SHACL
- Suporta múltiples formats de sortida (human, turtle, json-ld)

### `ontology_cli.py`

CLI principal que:

- Defineix l'interfície de comandes (argparse)
- Delega l'execució als mòduls específics o scripts originals
- Gestiona el flux principal del programa

## Compatibilitat

Els scripts originals (`autogenerate.py`, `generate-wiki.py`, etc.) es mantenen intactes per compatibilitat. El CLI nou els invoca directament, així que no hi ha risc de trencar funcionalitat existent.

## Avantatges de la nova estructura

1. **Unificació**: Un únic punt d'entrada per totes les operacions
2. **Consistència**: Interfície coherent per validar, generar i convertir
3. **Descobribilitat**: `npm run help` mostra totes les opcions
4. **Modularitat**: Codi organitzat per responsabilitats
5. **Extensibilitat**: Fàcil afegir noves comandes
6. **Compatibilitat**: Els scripts originals continuen funcionant
7. **Scripts npm**: Accés ràpid a operacions comunes
8. **Documentació**: Ajuda integrada per cada comanda
