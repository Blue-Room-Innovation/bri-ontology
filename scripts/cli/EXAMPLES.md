# Exemples d'ús del CLI refactoritzat

## Validació OWL amb opcions personalitzades

```bash
# Validar amb reasoner ELK en lloc de HermiT
npm run validate:owl -- -r ELK

# Validar amb perfil OWL2 en lloc de DL
npm run validate:owl -- -p OWL2

# Validar fitxers específics
npm run validate:owl -- -i "ontology/digitalWastePassport.ttl,ontology/digitalMarpolWastePassport.ttl"

# Sense raonament
npm run validate:owl -- -r none

# Personalitzar fitxers de sortida
npm run validate:owl -- -m my-merged.ttl -o my-reasoned.ttl
```

## Validació SHACL amb fitxers personalitzats

```bash
# Validar amb output en turtle
npm run validate:shacl -- -d examples/digital-waste-passport-sample.ttl -s shapes/digitalWastePassportShapes.ttl -f turtle

# Afegir múltiples fitxers extra
npm run validate:shacl -- -d examples/my-data.ttl -s shapes/my-shapes.ttl -e "ontology/file1.ttl,ontology/file2.ttl"
```

## Ús des de Python

```python
from cli import validate_owl, validate_shacl, OwlConfig, ShaclConfig
from pathlib import Path

# Configuració OWL personalitzada
owl_config = OwlConfig(
    reasoner="ELK",
    profile="OWL2",
    include_codelists=True,
    quiet=False
)
exit_code = validate_owl(owl_config)

# Configuració SHACL personalitzada
shacl_config = ShaclConfig(
    data_file=Path("examples/my-data.ttl"),
    shapes_file=Path("shapes/my-shapes.ttl"),
    output_format="json-ld"
)
exit_code = validate_shacl(shacl_config)
```

## Integració en CI/CD

```yaml
# Exemple per a GitHub Actions
- name: Validate Ontologies
  run: npm run validate:owl:quiet
  
- name: Validate Digital Waste Passport
  run: npm run validate:dwp
  
- name: Validate Marpol Waste Passport
  run: npm run validate:marpol
```

## Scripts personalitzats al package.json

Pots afegir més scripts segons les teves necessitats:

```json
{
  "scripts": {
    "validate:all": "npm run validate:owl && npm run validate:dwp && npm run validate:marpol",
    "validate:ci": "npm run validate:owl:quiet && npm run validate:dwp && npm run validate:marpol",
    "validate:custom": "python scripts/ontology_cli.py validate shacl -d my-data.ttl -s my-shapes.ttl"
  }
}
```
