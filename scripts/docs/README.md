# Documentació dels Scripts

Aquest directori conté tota la documentació del sistema de scripts d'ontologies.

## 📁 Estructura

```
docs/
├── autogenerate.md               # Pipeline SHACL → JSON Schema → TypeScript
├── generate-wiki.md              # Generació de documentació wiki
├── shacl-to-jsonschema.md        # Conversió SHACL → JSON Schema
├── jsonschema-to-typescript.md   # Conversió JSON Schema → TypeScript
├── validate-owl.md               # Validació d'ontologies OWL
├── validate-shacl.md             # Validació SHACL
└── lib/                          # Documentació de la llibreria Python
    ├── README.md                 # Documentació completa del package lib
    ├── EXAMPLES.md               # Exemples d'ús avançat
    ├── QUICKSTART.md             # Guia d'inici ràpid
    └── CHANGELOG.md              # Historial de canvis
```

## 📚 Documentació per Script

### Pipeline i Generació

- **[autogenerate.md](autogenerate.md)** - Com executar el pipeline complet SHACL → TypeScript
- **[generate-wiki.md](generate-wiki.md)** - Generació de documentació wiki des d'ontologies

### Conversió

- **[shacl-to-jsonschema.md](shacl-to-jsonschema.md)** - Conversió de SHACL shapes a JSON Schema
- **[jsonschema-to-typescript.md](jsonschema-to-typescript.md)** - Generació de definicions TypeScript

### Validació

- **[validate-owl.md](validate-owl.md)** - Validació d'ontologies OWL amb ROBOT/RIOT
- **[validate-shacl.md](validate-shacl.md)** - Validació de dades RDF contra shapes SHACL

## 📖 Documentació de la Llibreria

La documentació específica del package Python `lib/` es troba a:

- **[lib/README.md](lib/README.md)** - Visió general completa del CLI i els mòduls
- **[lib/QUICKSTART.md](lib/QUICKSTART.md)** - Guia d'inici ràpid amb exemples
- **[lib/EXAMPLES.md](lib/EXAMPLES.md)** - Exemples d'ús avançat i casos d'ús
- **[lib/CHANGELOG.md](lib/CHANGELOG.md)** - Historial de canvis i refactoritzacions

## 🚀 Inici Ràpid

Per començar ràpidament, consulta:

1. **[../README.md](../README.md)** - Visió general dels scripts
2. **[lib/QUICKSTART.md](lib/QUICKSTART.md)** - Guia ràpida del CLI
3. **[lib/EXAMPLES.md](lib/EXAMPLES.md)** - Exemples pràctics

## 🔗 Vegeu També

- [Scripts README](../README.md) - Visió general del sistema de scripts
- [Guia de Migració](../MIGRATION.md) - Com actualitzar des de l'estructura anterior
- [Documentació Principal del Projecte](../../README.md)

---

**Última actualització**: 2026-01-13
