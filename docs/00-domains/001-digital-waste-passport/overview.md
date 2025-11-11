# Digital Waste Passport (Resumen)

Modelo básico para describir un pasaporte digital de un residuo.

Validar (SHACL básico):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl"
```

Razonamiento OWL sobre el modelo base:
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-owl.sh --reasoner ELK"
```
