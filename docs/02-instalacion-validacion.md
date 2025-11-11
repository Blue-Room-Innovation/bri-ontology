# 2. Instalación y validación rápida

Requisitos Docker: Docker Desktop / Engine.

Imagen tooling (ROBOT + pySHACL): `bri-ontology-tooling`.

Validar OWL (merge + reasoning):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
```

Validar SHACL (núcleo):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
```

Validar SHACL (MARPOL):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-marpol-waste-passport-sample.ttl"
```

pySHACL nativo (si tienes Python):
```powershell
python -m pyshacl -s shapes/waste-shapes.ttl -m rdfs -i examples/digital-waste-passport-sample.ttl
```

Resultado esperado en ejemplos válidos: `Conforms: True`.
Si ves warnings de IRIs externas → ver `07-vocabularios-warnings.md`.

Siguiente: `03-arquitectura-build.md`.