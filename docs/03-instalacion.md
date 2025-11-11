# 3. Instalación (Docker)

Requisitos:
- Docker Desktop (Win/macOS) o Docker Engine (Linux).

Imagen: `bri-ontology-tooling` (incluye ROBOT + pySHACL + dependencias).

Validar OWL (núcleo + MARPOL si procede):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
```

Validar SHACL (ejemplo Digital Waste Passport):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
```

Validar SHACL (ejemplo MARPOL):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-marpol-waste-passport-sample.ttl"
```

Resultado esperado sobre ejemplos válidos: `Conforms: True`.
Warnings OWL por IRIs externas (codelists) son normales; ver `14-iri-warnings.md`.

Alternativa nativa (Java 17 + Python) en `04-validacion-express.md`.
