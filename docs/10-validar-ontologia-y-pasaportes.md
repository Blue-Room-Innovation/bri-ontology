# 10. Validar ontología y pasaportes

Scripts Docker:
 OWL: `validate-owl`
 SHACL: `validate-shacl <archivo.ttl>` (válidos e inválidos)

Ejemplos:
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
 Ejemplos válidos:
 docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
 docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-marpol-waste-passport-sample.ttl"

 Ejemplos inválidos (se espera reporte de violaciones):
 ```powershell
 docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/invalid-waste-passport-sample.ttl"
 ```
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-marpol-waste-passport-sample.ttl"
 pySHACL directo (válido): `python -m pyshacl -s shapes/waste-shapes.ttl -m rdfs -i examples/digital-waste-passport-sample.ttl`
 pySHACL directo (inválido): `python -m pyshacl -s shapes/waste-shapes.ttl -m rdfs -i examples/invalid-waste-passport-sample.ttl`

Modo nativo:
- ROBOT (ver `04-validacion-express.md`).
- pySHACL directo: `python -m pyshacl -s shapes/waste-shapes.ttl -m rdfs -i examples/digital-waste-passport-sample.ttl`

Consejo: primero OWL (estructura), luego SHACL (instancias concretas).

Interpretación de salida: `11-interpretar-resultados.md`.
