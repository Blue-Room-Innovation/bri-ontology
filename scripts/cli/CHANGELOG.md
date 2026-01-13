# Refactorització del CLI d'Ontologies

## Resum dels canvis

S'ha refactoritzat `ontology_cli.py` per millorar la modularitat, mantenibilitat i usabilitat del codi.

## Estructura Nova

```
scripts/
├── ontology_cli.py          # CLI principal (simplificat)
└── cli/                     # Package modular
    ├── __init__.py          # Exports del package
    ├── README.md            # Documentació del package
    ├── EXAMPLES.md          # Exemples d'ús
    ├── utils.py             # Utilitats comunes
    ├── validate_owl.py      # Validació OWL
    └── validate_shacl.py    # Validació SHACL
```

## Millores Implementades

### 1. Modularitat
- **Abans**: Tot el codi en un únic fitxer de ~260 línies
- **Després**: Codi distribuït en 5 fitxers especialitzats
  - `utils.py`: 105 línies d'utilitats reutilitzables
  - `validate_owl.py`: 235 línies de lògica OWL
  - `validate_shacl.py`: 193 línies de lògica SHACL
  - `ontology_cli.py`: ~100 línies (només CLI)

### 2. Separació de Responsabilitats
Cada mòdul té una responsabilitat clara:
- `utils.py`: Funcions auxiliars generals
- `validate_owl.py`: Validació d'ontologies OWL
- `validate_shacl.py`: Validació SHACL
- `ontology_cli.py`: Interfície de comandes

### 3. Documentació
- Docstrings completes per totes les funcions
- Type hints per millor suport d'IDE
- README amb documentació del package
- EXAMPLES amb casos d'ús pràctics

### 4. Reutilització
Les utilitats comunes són accessibles des de qualsevol mòdul:
```python
from cli import validate_owl, validate_shacl, OwlConfig, ShaclConfig
from cli.utils import which, run_command, get_workspace_root
```

### 5. Scripts npm
S'han afegit scripts al `package.json` per facilitar l'ús:
```bash
npm run validate:owl              # Validació OWL
npm run validate:dwp              # Validació Digital Waste Passport
npm run validate:marpol           # Validació Marpol Waste Passport
npm run help                      # Ajuda
```

## Compatibilitat

El CLI manté total compatibilitat amb la versió anterior:
```bash
# Aquests comandes continuen funcionant igual
python scripts/ontology_cli.py validate owl
python scripts/ontology_cli.py validate shacl -d DATA -s SHAPES
```

## Extensibilitat

Ara és molt més fàcil afegir noves funcionalitats:

1. **Nou tipus de validació**: 
   - Crear `cli/validate_xxx.py` amb la lògica
   - Afegir al parser en `ontology_cli.py`
   - Exportar des de `cli/__init__.py`

2. **Nova utilitat comuna**:
   - Afegir funció a `cli/utils.py`
   - Utilitzar des de qualsevol mòdul

3. **Nou script npm**:
   - Afegir al `package.json`

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

## Beneficis

1. ✅ **Codi més net i llegible**
2. ✅ **Fàcil de mantenir i depurar**
3. ✅ **Reutilització de codi**
4. ✅ **Millor documentació**
5. ✅ **Extensibilitat**
6. ✅ **Type safety amb type hints**
7. ✅ **Integració amb npm/node tooling**
8. ✅ **Preparat per a testing unitari**

## Compatibilitat amb Scripts Antics

Els scripts bash/sh antics (`validate-owl.sh`, `validate-shacl.sh`) poden continuar existint, però ara també tens l'opció d'utilitzar:
- Python directament: `python scripts/ontology_cli.py`
- NPM: `npm run validate:owl`
- Import Python: `from cli import validate_owl`

---

**Data**: 13 de gener de 2026  
**Autor**: Refactorització automàtica per GitHub Copilot
