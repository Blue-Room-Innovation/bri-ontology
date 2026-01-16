# Guia de Migració - Nova Estructura de Scripts

## 📋 Canvis Principals

Tots els scripts s'han mogut dins de la carpeta `lib/` per tenir una estructura més neta i modular.

### Abans → Després

```
scripts/
├── ontology_cli.py ✅ (igual)
├── autogenerate.py ❌ → lib/autogenerate.py ✅
├── generate-wiki.py ❌ → lib/generate_wiki.py ✅
├── shacl-to-jsonschema.py ❌ → lib/shacl_to_jsonschema.py ✅
└── jsonschema-to-typescript.py ❌ → lib/jsonschema_to_typescript.py ✅
```

## 🔄 Com Actualitzar els teus Scripts

### Si executaves els scripts directament

**ABANS:**
```bash
python scripts/autogenerate.py
python scripts/generate-wiki.py --include-codelists
python scripts/shacl-to-jsonschema.py -i shapes/example.ttl -o build/example.json
python scripts/jsonschema-to-typescript.py -i build/example.json -o build/example.ts
```

**DESPRÉS:**
```bash
python scripts/lib/autogenerate.py
python scripts/lib/generate_wiki.py --include-codelists
python scripts/lib/shacl_to_jsonschema.py -i shapes/example.ttl -o build/example.json
python scripts/lib/jsonschema_to_typescript.py -i build/example.json -o build/example.ts
```

### Si usaves el CLI (NO cal canviar res!)

✅ El CLI segueix funcionant exactament igual:

```bash
# Totes aquestes comandes continuen funcionant sense canvis
python scripts/ontology_cli.py validate owl
python scripts/ontology_cli.py generate types
python scripts/ontology_cli.py convert shacl -i INPUT -o OUTPUT

# I via npm també
npm run validate:owl
npm run generate:types
npm run convert:shacl:dwp
```

### Si usaves scripts npm (NO cal canviar res!)

✅ Tots els scripts npm segueixen funcionant:

```bash
npm run validate:owl
npm run validate:dwp
npm run generate:types
npm run generate:wiki
npm run convert:shacl:dwp
npm run convert:ts:dwp
```

## 📝 Canvis de Nomenclatura

Els noms de fitxer Python ara segueixen el PEP 8 (underscore en lloc de guions):

| Antic | Nou |
|-------|-----|
| `generate-wiki.py` | `generate_wiki.py` |
| `shacl-to-jsonschema.py` | `shacl_to_jsonschema.py` |
| `jsonschema-to-typescript.py` | `jsonschema_to_typescript.py` |

## 🎯 Recomanacions

1. **Usa el CLI sempre que sigui possible:**
   ```bash
   python scripts/ontology_cli.py [comando]
   ```

2. **O millor encara, usa npm:**
   ```bash
   npm run [comando]
   ```

3. **Només executa scripts directament des de `lib/` si necessites opcions molt específiques**

## ❓ Preguntes Freqüents

### Per què aquest canvi?

Per tenir una estructura més neta i professional:
- ✅ Separació clara entre punt d'entrada (CLI) i lògica (lib)
- ✅ Més fàcil de mantenir i entendre
- ✅ Segueix convencions estàndard de projectes Python

### S'ha trencat alguna cosa?

No! El CLI i els scripts npm segueixen funcionant exactament igual. Només canvien les rutes si executaves els scripts Python directament.

### He de canviar els meus scripts de CI/CD?

Només si executaves els scripts Python directament amb rutes absolutes. Si usaves npm o el CLI, no cal canviar res.

### Com actualitzo les meves importacions?

Si tenies imports als scripts, canvia:
```python
# ABANS
from autogenerate import ...

# DESPRÉS
from lib.autogenerate import ...
```

## 🚀 Estructura Final

```
scripts/
├── ontology_cli.py          # CLI principal (únic punt d'entrada)
├── requirements.txt         # Dependències
├── README.md               # Documentació
├── docs/                   # TOTA la documentació
│   ├── *.md                # Documentació de scripts individuals
│   └── lib/                # Documentació de la llibreria
│       └── *.md
└── lib/                    # NOMÉS codi Python
    ├── __init__.py
    ├── utils.py
    ├── validate_owl.py
    ├── validate_shacl.py
    ├── autogenerate.py
    ├── generate_wiki.py
    ├── shacl_to_jsonschema.py
    └── jsonschema_to_typescript.py
```

---

**Data de migració**: 2026-01-13  
**Versió**: 2.1 - Estructura refinada
