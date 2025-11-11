# Digital MARPOL Waste Passport Examples

Ejemplo TTL: `examples/digital-marpol-waste-passport-sample.ttl`
Ejemplo JSON-LD: `examples/digital-marpol-waste-passport-sample.jsonld`

Validación SHACL (MARPOL):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-marpol-waste-passport-sample.ttl"
```

Comparar con core para diferencias en ResidueInformation y Ship.
