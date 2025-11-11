# Instalación & Validación (Genérico)

Herramientas:
- Docker image: `bri-ontology-tooling` (ROBOT + pySHACL).
- Alternativa nativa: Java 17 + Python 3.11.

Validar OWL (merge + reasoning dominios seleccionados):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
```

Validar SHACL (ejemplo core Waste):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
```

Validar SHACL (ejemplo MARPOL):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-marpol-waste-passport-sample.ttl"
```

pySHACL directo:
```powershell
python -m pyshacl -s shapes/waste-shapes.ttl -m rdfs -i examples/digital-waste-passport-sample.ttl
```

Salida SHACL:
- Conforms True → correcto
- Conforms False → revisar reporte y shapes del dominio
