# Digital Waste Passport Examples

Ejemplo TTL: `examples/digital-waste-passport-sample.ttl`
Ejemplo JSON-LD: `examples/digital-waste-passport-sample.jsonld`

Validación SHACL (core):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
```
