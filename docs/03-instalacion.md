# 3. Instalación (Docker)

Requisitos:
- Docker Desktop (Win/macOS) o Docker Engine (Linux).

Imagen esperada: `bri-ontology-tooling` (generada en el proceso de build del proyecto).

Validar OWL (PowerShell Windows):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
```

Validar SHACL (ejemplo TTL válido):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/product-sample.ttl"
```

Resultado esperado SHACL sobre ejemplo válido: `Conforms: True`.
Warnings OWL por IRIs externas son normales; luego ver `14-iri-warnings.md`.

Alternativa nativa (Java 17 + Python) en `04-validacion-express.md`.
