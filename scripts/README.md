# Scripts d'Ontologia

Aquest directori conté tots els scripts i eines per gestionar les ontologies, validació SHACL i generació d'artefactes.

## 📁 Estructura

```
scripts/
├── ontology_cli.py                   # CLI unificat (punt d'entrada principal)
├── requirements.txt                  # Dependències Python
├── README.md                         # Aquest fitxer
├── docs/                             # Documentació
│   ├── autogenerate.md               # Doc: Pipeline TypeScript
│   ├── generate-wiki.md              # Doc: Generació wiki
│   ├── shacl-to-jsonschema.md        # Doc: Conversió SHACL
│   ├── jsonschema-to-typescript.md   # Doc: Conversió TypeScript
│   ├── validate-owl.md               # Doc: Validació OWL
│   ├── validate-shacl.md             # Doc: Validació SHACL
│   └── lib/                          # Documentació de la llibreria
│       ├── README.md                 # Documentació detallada
│       ├── EXAMPLES.md               # Exemples d'ús
│       ├── QUICKSTART.md             # Guia ràpida
│       └── CHANGELOG.md              # Historial de canvis
└── lib/                              # Codi Python (només .py)
    ├── __init__.py                   # Package initialization
    ├── utils.py                      # Utilitats comunes
    ├── validate_owl.py               # Validació d'ontologies OWL
    ├── validate_shacl.py             # Validació SHACL
    ├── autogenerate.py               # Pipeline SHACL → JSON Schema → TypeScript
    ├── generate_wiki.py              # Generació de documentació wiki
    ├── shacl_to_jsonschema.py        # Conversió SHACL → JSON Schema
    └── jsonschema_to_typescript.py   # Conversió JSON Schema → TypeScript
```

## 🚀 Ús Ràpid

### Via npm (recomanat)

```bash
# Veure totes les comandes disponibles
npm run help

# Validació
npm run validate:owl
npm run validate:dwp

# Generació
npm run generate:types
npm run generate:wiki
```

### Via CLI Python

```bash
# Ajuda general
python scripts/ontology_cli.py --help

# Validació
python scripts/ontology_cli.py validate owl
python scripts/ontology_cli.py validate shacl -d DATA -s SHAPES

# Generació
python scripts/ontology_cli.py generate types
python scripts/ontology_cli.py generate wiki

# Conversió
python scripts/ontology_cli.py convert shacl -i INPUT -o OUTPUT
python scripts/ontology_cli.py convert ts -i INPUT -o OUTPUT
```

### Scripts individuals (des de lib/)

```bash
# Generar TypeScript des de SHACL
python scripts/lib/autogenerate.py

# Generar wiki
python scripts/lib/generate_wiki.py --include-codelists

# Conversió SHACL → JSON Schema
python scripts/lib/shacl_to_jsonschema.py -i shapes/example.ttl -o build/example.schema.json

# Conversió JSON Schema → TypeScript
python scripts/lib/jsonschema_to_typescript.py -i build/example.schema.json -o build/example.ts
```

## 📚 Documentació

- **[docs/lib/README.md](docs/lib/README.md)** - Documentació detallada de la llibreria
- **[docs/lib/EXAMPLES.md](docs/lib/EXAMPLES.md)** - Exemples d'ús avançat
- **[docs/lib/QUICKSTART.md](docs/lib/QUICKSTART.md)** - Guia d'inici ràpid
- **[docs/](docs/)** - Documentació de cada script individual

## 🔧 Components Principals

### CLI Unificat (`ontology_cli.py`)

Punt d'entrada principal que proporciona una interfície consistent per a totes les operacions:

- **validate** - Validació d'ontologies i dades
- **generate** - Generació d'artefactes (TypeScript, wiki)
- **convert** - Conversions entre formats

### Scripts de Pipeline (dins de `lib/`)

Scripts especialitzats per tasques específiques:

- **autogenerate.py** - Orquestrador del pipeline complet SHACL → JSON Schema → TypeScript
- **generate_wiki.py** - Genera documentació Markdown des d'ontologies TTL
- **shacl_to_jsonschema.py** - Converteix shapes SHACL a JSON Schema
- **jsonschema_to_typescript.py** - Genera definicions TypeScript des de JSON Schema

### Llibreria (`lib/`)

Mòduls Python reutilitzables per validació i utilitats:

- **validate_owl.py** - Validació d'ontologies OWL amb ROBOT/RIOT
- **validate_shacl.py** - Validació de dades RDF contra shapes SHACL
- **utils.py** - Funcions auxiliars comunes

## 🎯 Casos d'Ús Comuns

### Desenvolupament Local

```bash
# 1. Editar ontologia
vim ontology/digitalWastePassport.ttl

# 2. Validar
npm run validate:owl

# 3. Validar exemples
npm run validate:dwp

# 4. Regenerar TypeScript
npm run generate:types
```

### CI/CD

```bash
# Validació completa
npm run validate:owl:quiet && \
npm run validate:dwp && \
npm run validate:marpol && \
npm run generate:types
```

### Afegir Nova Ontologia

```bash
# 1. Crear shape SHACL
vim shapes/myNewShape.ttl

# 2. Convertir a JSON Schema
python scripts/ontology_cli.py convert shacl \
  -i shapes/myNewShape.ttl \
  -o build/myNew.schema.json

# 3. Generar TypeScript
python scripts/ontology_cli.py convert ts \
  -i build/myNew.schema.json \
  -o build/myNew.ts
```

## ⚙️ Dependències

### Python

Instal·la les dependències Python:

```bash
pip install -r scripts/requirements.txt
```

Requeriments:
- Python 3.8+
- rdflib>=7.0.0
- pyshacl>=0.25.0
- (altres listades a requirements.txt)

### Node.js

Instal·la les dependències Node.js:

```bash
npm install
```

Requeriments:
- Node.js 18+
- json-schema-to-typescript>=14.1.0

## 🧹 Neteja i Manteniment

### Scripts eliminats (legacy)

Hem eliminat els següents scripts deprecated:

- ❌ `validate-owl.sh` - Substituït pel CLI unificat
- ❌ `validate-shacl.sh` - Substituït pel CLI unificat
- ❌ Carpeta `legacy/` - Estava buida

### Scripts dins de `lib/`

Tots els scripts de lògica estan dins de `lib/` i es poden executar directament o via CLI:

- ✅ `lib/autogenerate.py` - Pipeline complet (usat internament pel CLI)
- ✅ `lib/generate_wiki.py` - Generació wiki (usat internament pel CLI)
- ✅ `lib/shacl_to_jsonschema.py` - Conversió SHACL (usat internament pel CLI)
- ✅ `lib/jsonschema_to_typescript.py` - Conversió TypeScript (usat internament pel CLI)
- ✅ `lib/validate_owl.py` - Validació OWL (mòdul)
- ✅ `lib/validate_shacl.py` - Validació SHACL (mòdul)
- ✅ `lib/utils.py` - Utilitats comunes (mòdul)

## ✨ Avantatges de la Nova Estructura

1. ✅ **Separació neta** - Codi (`lib/`) i documentació (`docs/`) completament separats
2. ✅ **Un sol punt d'entrada** - Només `ontology_cli.py` a l'arrel
3. ✅ **lib/ només conté codi Python** - Cap fitxer de documentació dins
4. ✅ **docs/ conté tota la documentació** - Organitzada per tipus
5. ✅ **Nomenclatura consistent** - PEP 8 en noms de fitxer Python
6. ✅ **Mantenible** - Estructura clara i professional

## 📞 Suport

Per més informació, consulta:

- [Documentació principal del projecte](../README.md)
- [Guia de contribució](../docs/03-como-crear-o-editar-ontologia.md)
- [ADRs (Architecture Decision Records)](../docs/01-adr/)

---

**Última actualització**: 2026-01-13  
**Versió**: 2.0 - Estructura reorganitzada
