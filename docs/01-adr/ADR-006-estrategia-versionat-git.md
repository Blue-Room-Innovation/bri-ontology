# ADR-006: Estratègia de Versionat Git amb Carpetes Versionades i Tags

**Status:** Acceptat  
**Data:** 2026-01-15  
**Autors:** Equip BRI Ontology  
**Relacionat amb:** [ADR-003: Governança i Versionat del Model de Dades del DPP](01.ADR-003%20Governança%20i%20versionat%20del%20model%20de%20dades%20del%20DPP.md)

---

## Context

El projecte d'ontologies necessita un sistema de versionat que permeti:

1. **Versionat independent** per component (ontologies, shapes, codelists, examples)
2. **Immutabilitat** de versions publicades
3. **URIs estables** que no canviïn en cada release
4. **Compatibilitat cap enrere** durant períodes de transició
5. **Workflow Git familiar** per l'equip de desenvolupament
6. **Suport per multiple ontologies** (DWP i MARPOL) amb ritmes de maduració diferents

S'han considerat dues estratègies principals:

### Opció A: Git Tags
- **Pros:** Immutabilitat garantida per Git, workflow estàndard, releases clares
- **Contres:** Versionat global (tot el repo a la mateixa versió), refactorització massiva d'URIs a cada release, DWP i MARPOL forçats a sincronitzar versions

### Opció B: Carpetes Versionades
- **Pros:** Versionat independent per component, URIs estables dins cada versió, patró RDF estàndard (DBpedia, Schema.org), granularitat fine
- **Contres:** Redundància de fitxers (mitigat: ontologies són petites), necessita disciplina per no editar versions antigues

---

## Decisió

**Adoptarem una estratègia híbrida: Carpetes Versionades + Tags Git opcionals**

### Estructura de Carpetes

```
ontology/
├── v0.1/               # Versió 0.1 de les ontologies
│   ├── digitalWastePassport.ttl
│   ├── digitalMarpolWastePassport.ttl
│   └── wasteActors.ttl
├── v0.2/               # Versió 0.2 (futura)
└── README.md

shapes/
├── v0.1/               # Shapes per validar v0.1
│   ├── digitalWastePassportShapes.ttl
│   ├── dwp-bootstrap.shacl.ttl
│   └── ...
├── v0.2/               # Shapes per validar v0.2 (futura)
└── README.md

examples/
├── v0.1/               # Examples per v0.1
│   ├── digital-waste-passport-sample.ttl
│   └── ...
├── v0.2/               # Examples per v0.2 (futura)
└── README.md

codelists/
├── v1/                 # Codelists v1 (versionat independent)
│   ├── delivery-type-code.ttl
│   ├── iso3166-iAlpha2.ttl
│   └── ...
├── v2/                 # Codelists v2 (futura)
└── README.md

contexts/
├── 0.1/                # JSON-LD contexts (sense prefix "v")
│   └── waste-actors-context.jsonld
├── 0.2/                # Futura versió
└── README.md

build/
├── v0.1/               # Artifacts generats per v0.1
│   ├── digitalWastePassport.schema.json
│   └── digitalWastePassport.ts
└── v0.2/               # Artifacts generats per v0.2 (futura)
```

### Convencions de Nomenclatura

- **Ontologies, Shapes, Examples:** `vX.Y` (amb prefix "v")
  - Exemple: `ontology/v0.1/`, `shapes/v0.2/`
- **Codelists:** `vX` (versió major només, versionat independent)
  - Exemple: `codelists/v1/`, `codelists/v2/`
- **Contexts:** `X.Y` (sense prefix "v", compatibilitat JSON-LD)
  - Exemple: `contexts/0.1/`, `contexts/0.2/`

### Patró d'URIs

```turtle
# Ontologies
@prefix dwp: <https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/ontology/v0.1/digitalWastePassport.ttl#> .
@base <https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/ontology/v0.1/digitalWastePassport.ttl> .

# Codelists
@prefix delivery: <https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/codelists/v1/delivery-type-code.ttl#> .

# Contexts (sense "v")
"@context": "https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/contexts/0.1/waste-actors-context.jsonld"
```

**Estructura URI:**
- `https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/` (base repo)
- `main/` (branch estable)
- `{component}/{version}/` (carpeta versionada)
- `{filename}.ttl` (fitxer)

### Tags Git (Opcionals)

Els tags Git s'usen per marcar **milestones** i crear **GitHub Releases**, però NO per versionar URIs:

```bash
# Etiquetar una versió completa del projecte
git tag -a v0.1 -m "Release 0.1: First official release with versioned folders"
git push --tags

# GitHub Release conté:
# - Changelog automàtic
# - Artifacts generats (JSON Schema, TypeScript)
# - Link a documentació wiki
```

**Tags segueixen semàntica de l'ontologia principal (DWP):**
- `v0.1` = Versió 0.1 del projecte (ontology/v0.1, shapes/v0.1, etc.)
- `v0.2` = Versió 0.2 del projecte
- `codelists-v2` = Tag específic per codelists si evolucionen independentment

---

## Workflow de Release

### 1. Crear Nova Versió (Automatitzat)

Utilitzar l'script `release-version.py`:

```bash
# Release tots els components (ontology, shapes, examples)
python scripts/release-version.py --all --from v0.1 --to v0.2

# Release component individual
python scripts/release-version.py --component ontology --from v0.1 --to v0.2
python scripts/release-version.py --component codelists --from v1 --to v2
```

L'script:
1. Copia carpeta antiga → nova carpeta
2. Actualitza URIs interns per referenciar nova versió
3. Actualitza `owl:versionInfo` metadata
4. Valida consistència d'URIs

### 2. Validar Canvis

```bash
# Validar OWL ontologies (inclou codelists)
python scripts/ontology_cli.py validate owl --include-codelists

# Validar SHACL shapes amb examples
python scripts/ontology_cli.py validate shacl -d examples/v0.2/digital-waste-passport-sample.ttl

# Revisar diff
git diff ontology/v0.1 ontology/v0.2
```

### 3. Commit i Tag

```bash
# Commit amb missatge descriptiu
git add .
git commit -m "Release v0.2: Add hasRecyclingCode property (non-breaking)"

# Crear tag anotat
git tag -a v0.2 -m "Release v0.2

Changes:
- Add hasRecyclingCode optional property to Waste class
- Update SHACL shapes with new validation rules
- Regenerate JSON Schema and TypeScript types

Breaking changes: None
Migration: No action required, backward compatible"

# Push amb tags
git push origin main
git push origin v0.2
```

### 4. Crear GitHub Release

GitHub Actions (futur) o manual:
1. Anar a Releases → New Release
2. Seleccionar tag `v0.2`
3. Afegir changelog (pot ser auto-generat des de commits)
4. Adjuntar artifacts: `build/v0.2/digitalWastePassport.schema.json`, `build/v0.2/digitalWastePassport.ts`
5. Publicar

---

## Versionat Independent per Component

### Exemple: Evolució MARPOL Independent de DWP

```
# Estat inicial
ontology/v0.1/
├── digitalWastePassport.ttl          (v0.1)
└── digitalMarpolWastePassport.ttl    (v0.1)

# Després de release: només MARPOL canvia
ontology/v0.1/
├── digitalWastePassport.ttl          (v0.1 - sense canvis)
└── digitalMarpolWastePassport.ttl    (v0.1 - sense canvis)

ontology/v0.2/
└── digitalMarpolWastePassport.ttl    (v0.2 - updated)

# DWP continua usant v0.1, MARPOL passa a v0.2
```

### Exemple: Codelists amb Breaking Change

```bash
# Codelists evolucionen independentment
codelists/v1/residue-type-code.ttl    # Versió estable
codelists/v2/residue-type-code.ttl    # Nova versió amb valors addicionals

# Ontologies poden referenciar diferents versions de codelists
ontology/v0.1/ → imports codelists/v1/
ontology/v0.2/ → imports codelists/v2/ (si necessari)
```

---

## Gestió de Breaking vs Non-Breaking Changes

### Non-Breaking Changes (Increment MINOR: v0.1 → v0.2)

**Permès:**
- Afegir propietats opcionals
- Afegir classes noves
- Afegir valors nous a codelists
- Millorar rdfs:comment / rdfs:label
- Afegir shapes noves

**Workflow:**
```bash
python scripts/release-version.py --all --from v0.1 --to v0.2
# Consumers a v0.1 continuen funcionant
# Consumers nous poden usar v0.2
```

### Breaking Changes (Increment MAJOR: v0.2 → v1.0)

**Exemples:**
- Eliminar propietat
- Canviar cardinalitat (opcional → obligatori)
- Canviar tipus de dada
- Renombrar classe/propietat
- Eliminar valor de codelist

**Workflow:**
```bash
python scripts/release-version.py --all --from v0.2 --to v1.0

# Documentar breaking changes
echo "## Breaking Changes in v1.0

- Removed hasLegacyId property (deprecated in v0.8)
- Changed hasWeight cardinality from 0..1 to 1..1 (now mandatory)

Migration guide: ..." > CHANGELOG.md

# Consumers han d'actualitzar
```

### Període de Coexistència

Durant migracions, múltiples versions coexisteixen:

```
ontology/v0.2/  ← Versió estable actual
ontology/v1.0/  ← Nova versió major (breaking)

# Consumers poden migrar gradualment:
# - Sistemes nous → v1.0
# - Sistemes legacy → v0.2 (mantingut durant 6-12 mesos)
```

---

## Backports i Patches

### Backport de Security Fixes

```bash
# Problema trobat a v0.1 després de release v0.2
cd ontology/v0.1
# Editar digitalWastePassport.ttl directament
git commit -m "[BACKPORT] Fix SPARQL injection vulnerability in v0.1"

# Tag patch
git tag -a v0.1.1 -m "Security patch for v0.1"
```

**Risc:** Trenca immutabilitat de `v0.1`. Mitigació:
- CI check: bloquejar edicions a versions antigues sense `[BACKPORT]` en commit message
- Branch protection: requerir approval per edicions a carpetes `v0.*`

### Política de Backports

- **Security fixes:** Backport a totes les versions suportades
- **Bug fixes:** Backport només si crític
- **Millores:** No backport (users han d'actualitzar a nova versió)

---

## Comparativa Resum: Carpetes vs Tags

| Criteri | Carpetes Versionades (escollit) | Git Tags |
|---------|----------------------------------|----------|
| **Versionat independent** | ✅ Cada component pot tenir versió diferent | ❌ Tot el repo a la mateixa versió |
| **URIs estables** | ✅ URIs no canvien dins cada versió | ❌ Cal refactoritzar tots els URIs |
| **Immutabilitat** | ⚠️ Necessita disciplina (branch protection) | ✅ Tags immutables per Git |
| **Coexistència versions** | ✅ Múltiples versions visibles en mateix commit | ✅ Accessibles via tags diferents |
| **Patró RDF estàndard** | ✅ DBpedia, Schema.org usen carpetes | ❌ Poc comú en RDF |
| **Developer UX** | ✅ Clara separació, menys refactoring | ⚠️ Refactoring massiu a cada release |
| **Backports** | ✅ Editar carpeta antiga directament | ⚠️ Crear nous tags (v0.1.1) |
| **Desplegament** | ✅ GitHub raw URLs gratuït | ✅ GitHub raw URLs gratuït |

---

## Conseqüències

### Positives

1. **Flexibilitat:** DWP i MARPOL poden evolucionar independentment
2. **URIs estables:** `ontology/v0.1/` sempre apunta a la mateixa versió semàntica
3. **Coexistència:** Suport simultani de v0.1 i v0.2 durant migracions
4. **Estàndard RDF:** Patró familiar per comunitat Linked Data
5. **Developer-friendly:** Menys refactoring, estructura clara

### Negatives

1. **Redundància:** Fitxers duplicats entre versions (mitigat: ontologies són petites <100KB)
2. **Disciplina requerida:** Evitar edicions accidentals a versions antigues
3. **Complexitat CI/CD:** Validar múltiples versions simultàniament

### Riscos

| Risc | Probabilitat | Impacte | Mitigació |
|------|--------------|---------|-----------|
| Edició accidental v0.1 | Medium | High | Branch protection + CI checks |
| Version drift | Low | Medium | Automated tests per consistència URIs |
| Confusió developers | Medium | Low | Documentació clara + CLI tooling |

---

## Futur: Content Negotiation (Fase 2)

A llarg termini, migrar a URIs netes amb content negotiation:

```
# URIs actuals (Fase 1)
https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/ontology/v0.1/digitalWastePassport.ttl

# URIs futures (Fase 2)
https://ontology.blueroominnovation.com/dwp/0.1/
  → Accept: text/turtle → GitHub raw
  → Accept: application/ld+json → JSON-LD
  → Accept: text/html → Wiki docs

# Versionless (redirect a latest)
https://ontology.blueroominnovation.com/dwp/
  → 303 See Other → /dwp/0.2/
```

**Requeriment:** Custom server (Cloudflare Workers, Netlify Functions) amb pressupost disponible.

---

## Referències

- [ADR-003: Governança i Versionat del Model de Dades del DPP](01.ADR-003%20Governança%20i%20versionat%20del%20model%20de%20dades%20del%20DPP.md)
- [ROADMAP-MILLORES.md - Secció 6: Sistema de Versionat](../ROADMAP-MILLORES.md)
- [W3C Linked Data Best Practices](https://www.w3.org/TR/ld-bp/)
- [DBpedia Versioning Strategy](https://www.dbpedia.org/resources/ontology/)
- [Schema.org Version Management](https://schema.org/docs/developers.html#versioning)

---

## Changelog

| Versió | Data | Autor | Canvis |
|--------|------|-------|--------|
| 1.0 | 2026-01-15 | BRI Ontology Team | Decisió inicial: carpetes versionades + tags opcionals |
