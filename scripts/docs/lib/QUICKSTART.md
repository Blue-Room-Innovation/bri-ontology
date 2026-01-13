# Guia Ràpida del CLI Unificat

## 🚀 Inici Ràpid

```bash
# Veure totes les comandes disponibles
npm run help

# Validar ontologies
npm run validate:owl

# Validar exemples de dades
npm run validate:dwp
npm run validate:marpol

# Generar TypeScript types
npm run generate:types

# Generar wiki
npm run generate:wiki
```

## 📋 Comandes Principals

### Validació

| Comanda | Descripció |
|---------|------------|
| `npm run validate:owl` | Valida ontologies OWL amb ROBOT |
| `npm run validate:dwp` | Valida Digital Waste Passport |
| `npm run validate:marpol` | Valida Marpol Waste Passport |

### Generació

| Comanda | Descripció |
|---------|------------|
| `npm run generate:types` | Genera TypeScript des de SHACL |
| `npm run generate:wiki` | Genera documentació wiki |

### Conversió

| Comanda | Descripció |
|---------|------------|
| `npm run convert:shacl:dwp` | SHACL → JSON Schema |
| `npm run convert:ts:dwp` | JSON Schema → TypeScript |

## 📚 Documentació Completa

- [scripts/cli/README.md](README.md) - Documentació detallada del CLI
- [scripts/cli/EXAMPLES.md](EXAMPLES.md) - Exemples pràctics d'ús
- [scripts/cli/CHANGELOG.md](CHANGELOG.md) - Canvis i millores implementades

## 🔧 Ús Avançat

```bash
# CLI directe amb Python
python scripts/ontology_cli.py validate owl --help
python scripts/ontology_cli.py generate types --verbose
python scripts/ontology_cli.py convert shacl -i input.ttl -o output.json

# Opcions personalitzades
npm run validate:owl -- -r ELK -p OWL2
npm run validate:dwp -- -f json-ld

# Scripts originals (compatibilitat)
python scripts/autogenerate.py
python scripts/generate-wiki.py --include-codelists
```

## 🎯 Scripts Disponibles

Tots els scripts disponibles al `package.json`:

```bash
npm run cli                           # CLI interactiu
npm run help                          # Ajuda completa

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

# Compatibilitat
npm run autogenerate                  # Alias de generate:types
npm run generate                      # Alias de generate:types
```

## 💡 Casos d'Ús Comuns

### Desenvolupament Local
```bash
# 1. Modificar ontologia
vim ontology/digitalWastePassport.ttl

# 2. Validar
npm run validate:owl

# 3. Validar exemples
npm run validate:dwp

# 4. Regenerar types si cal
npm run generate:types
```

### CI/CD
```bash
# Validació completa per CI
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

## 🏗️ Arquitectura

```
scripts/ontology_cli.py          → CLI unificat
├── validate owl|shacl           → Validació
├── generate types|wiki          → Generació  
└── convert shacl|ts             → Conversió
    ↓
scripts/cli/                     → Mòduls
├── validate_owl.py              → Lògica OWL
├── validate_shacl.py            → Lògica SHACL
└── utils.py                     → Utilitats comunes
    ↓
Scripts originals (compatibilitat)
├── autogenerate.py
├── generate-wiki.py
├── shacl-to-jsonschema.py
└── jsonschema-to-typescript.py
```

## ✅ Avantatges

- ✨ **Unificat**: Un sol CLI per tot
- 📖 **Descobrible**: `npm run help` mostra tot
- 🔧 **Modular**: Codi ben organitzat
- 🔄 **Compatible**: Scripts originals intactes
- 🚀 **Ràpid**: Scripts npm predefinits
- 📚 **Documentat**: Ajuda integrada

---

Per més detalls, consulta la [documentació completa](README.md).
