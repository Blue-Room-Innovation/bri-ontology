# CLI Tools - Ontology Validation

Aquest directori conté els mòduls per a la validació d'ontologies OWL i SHACL.

## Estructura

```
scripts/
├── ontology_cli.py          # Punt d'entrada principal del CLI
└── cli/
    ├── __init__.py          # Package initialization
    ├── utils.py             # Utilitats comunes (run_command, which, etc.)
    ├── validate_owl.py      # Validació d'ontologies OWL
    └── validate_shacl.py    # Validació de dades contra SHACL shapes
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
- Delega l'execució als mòduls específics
- Gestiona el flux principal del programa

## Ús des de package.json

El `package.json` inclou scripts predefinits per facilitar l'ús:

```bash
# Validació OWL
npm run validate:owl                    # Valida ontologies OWL
npm run validate:owl:quiet              # Validació silenciosa
npm run validate:owl:with-codelists     # Inclou codelists

# Validació SHACL - Digital Waste Passport
npm run validate:dwp                    # Valida exemple DWP (TTL)
npm run validate:dwp:json               # Valida exemple DWP (JSON-LD)

# Validació SHACL - Marpol Waste Passport
npm run validate:marpol                 # Valida exemple Marpol (TTL)
npm run validate:marpol:json            # Valida exemple Marpol (JSON-LD)

# Ajuda
npm run help                            # Mostra ajuda del CLI
```

## Ús directe

També pots utilitzar el CLI directament amb Python:

```bash
# Validació OWL
python scripts/ontology_cli.py validate owl [opcions]

# Validació SHACL
python scripts/ontology_cli.py validate shacl -d DATA -s SHAPES [opcions]

# Ajuda completa
python scripts/ontology_cli.py --help
python scripts/ontology_cli.py validate owl --help
python scripts/ontology_cli.py validate shacl --help
```

## Avantatges de la nova estructura

1. **Modularitat**: Cada mòdul té una responsabilitat clara
2. **Reutilització**: Funcions comunes en `utils.py`
3. **Mantenibilitat**: Codi més fàcil de mantenir i testejar
4. **Extensibilitat**: Fàcil afegir nous tipus de validació
5. **Documentació**: Docstrings per a totes les funcions i classes
6. **Type hints**: Millor suport d'IDE i detecció d'errors
7. **Scripts npm**: Accessibilitat des del package.json
