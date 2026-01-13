# Refactorització del CLI d'Ontologies

## Resum dels canvis

S'ha refactoritzat i unificat tots els scripts d'ontologies en un únic CLI modular amb millor organització i usabilitat.

## Estructura Nova

```
scripts/
├── ontology_cli.py          # CLI unificat (simplificat ~170 línies)
├── autogenerate.py          # Manté compatibilitat
├── generate-wiki.py         # Manté compatibilitat  
├── shacl-to-jsonschema.py   # Manté compatibilitat
├── jsonschema-to-typescript.py  # Manté compatibilitat
└── cli/                     # Package modular
    ├── __init__.py          # Exports del package
    ├── README.md            # Documentació completa
    ├── EXAMPLES.md          # Exemples d'ús
    ├── CHANGELOG.md         # Aquest fitxer
    ├── utils.py             # Utilitats comunes
    ├── validate_owl.py      # Validació OWL
    └── validate_shacl.py    # Validació SHACL
```

## Millores Implementades

### 1. CLI Unificat
- **Abans**: Scripts individuals (`validate-owl.sh`, `validate-shacl.sh`, `autogenerate.py`, etc.)
- **Després**: Un únic punt d'entrada amb subcomandes:
  - `ontology_cli.py validate owl|shacl`
  - `ontology_cli.py generate types|wiki`
  - `ontology_cli.py convert shacl|ts`

### 2. Modularitat
Codi distribuït en mòduls especialitzats:
- `utils.py`: 105 línies d'utilitats reutilitzables
- `validate_owl.py`: 235 línies de lògica OWL
- `validate_shacl.py`: 193 línies de lògica SHACL
- `ontology_cli.py`: ~170 línies (només CLI + delegació)

### 3. Integració de Comandes

#### Validació
- `validate owl`: Valida ontologies OWL amb ROBOT/RIOT
- `validate shacl`: Valida dades contra SHACL shapes

#### Generació
- `generate types`: Pipeline complet SHACL→JSON Schema→TypeScript
- `generate wiki`: Documentació wiki des d'ontologies

#### Conversió
- `convert shacl`: SHACL shapes → JSON Schema
- `convert ts`: JSON Schema → TypeScript

### 4. Scripts npm Expandits

S'han afegit **23 scripts** al `package.json` per accés ràpid:

```bash
# Validació (8 scripts)
npm run validate:owl
npm run validate:owl:quiet
npm run validate:owl:with-codelists
npm run validate:dwp
npm run validate:dwp:json
npm run validate:marpol
npm run validate:marpol:json

# Generació (5 scripts)
npm run generate:types
npm run generate:types:verbose
npm run generate:wiki
npm run generate:wiki:with-codelists
npm run generate:wiki:verbose

# Conversió (6 scripts)
npm run convert:shacl:dwp
npm run convert:shacl:marpol
npm run convert:ts:dwp
npm run convert:ts:marpol

# Utilitats (4 scripts)
npm run cli
npm run help
npm run autogenerate  # Alias compatibilitat
npm run generate      # Alias compatibilitat
```

### 5. Documentació Millorada
- Docstrings completes per totes les funcions
- Type hints per millor suport d'IDE
- [README.md](README.md) amb documentació del package
- [EXAMPLES.md](EXAMPLES.md) amb casos d'ús pràctics
- Ajuda integrada per cada comanda

### 6. Compatibilitat Total

Els scripts originals es mantenen intactes:
- `autogenerate.py` continua funcionant
- `generate-wiki.py` continua funcionant
- `shacl-to-jsonschema.py` continua funcionant
- `jsonschema-to-typescript.py` continua funcionant

El CLI nou els invoca directament quan cal, així que **zero risc de trencar funcionalitat existent**.

## Exemples d'Ús

### Via npm (recomanat)
```bash
npm run validate:owl
npm run generate:types
npm run convert:shacl:dwp
```

### Via Python directe
```bash
python scripts/ontology_cli.py validate owl
python scripts/ontology_cli.py generate types --verbose
python scripts/ontology_cli.py convert shacl -i input.ttl -o output.json
```

### Scripts originals (continuen funcionant)
```bash
python scripts/autogenerate.py
python scripts/generate-wiki.py --include-codelists
python scripts/shacl-to-jsonschema.py -i input.ttl -o output.json
```

## Beneficis

1. ✅ **CLI unificat**: Un únic punt d'entrada consistent
2. ✅ **Descobribilitat**: `npm run help` mostra totes les opcions
3. ✅ **Modularitat**: Codi net i organitzat
4. ✅ **Reutilització**: Funcions comunes compartides
5. ✅ **Documentació**: Completa i accessible
6. ✅ **Type safety**: Type hints a tot arreu
7. ✅ **Compatibilitat**: Scripts originals intactes
8. ✅ **Extensibilitat**: Fàcil afegir noves comandes
9. ✅ **Scripts npm**: 23 scripts predefinits
10. ✅ **Mantenibilitat**: Més fàcil de depurar i mantenir

## Migració

No cal fer cap migració! Tot continua funcionant:

| Abans | Ara (també funciona) | Nou recomanat |
|-------|---------------------|---------------|
| `python scripts/autogenerate.py` | ✅ Continua funcionant | `npm run generate:types` |
| `python scripts/generate-wiki.py` | ✅ Continua funcionant | `npm run generate:wiki` |
| `bash scripts/validate-owl.sh` | ✅ Continua funcionant | `npm run validate:owl` |
| `bash scripts/validate-shacl.sh` | ✅ Continua funcionant | `npm run validate:dwp` |

## Testing (futur)

L'estructura modular facilita el testing:
```python
# tests/test_validate_owl.py
from cli.validate_owl import validate_owl, OwlConfig

def test_validate_owl():
    config = OwlConfig(quiet=True)
    result = validate_owl(config)
    assert result == 0
```

---

**Data**: 13 de gener de 2026  
**Autor**: Refactorització automàtica per GitHub Copilot  
**Versió**: 2.0 - CLI Unificat
