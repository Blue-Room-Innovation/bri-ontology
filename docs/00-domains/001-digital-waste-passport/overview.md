# Digital Waste Passport (Resumen)

Modelo básico para describir un pasaporte digital de un residuo.

Validar:
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
```
