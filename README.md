## Toolkit Ontología DPP

Repositorio para modelar, validar y documentar una ontología de Pasaporte Digital de Producto (DPP) con OWL/RDF y SHACL. Incluye alineaciones con UNTP (UN/CEFACT) y soporte para eventos GS1 EPCIS.

### Estructura

```
.
├─ ontology/
│  ├─ dpp.ttl                    # Núcleo OWL de la ontología DPP
│  ├─ alignments-untp.ttl        # Alineaciones DPP ↔ UNTP (clases/propiedades)
│  ├─ dpp-extensions.ttl         # Extensiones DPP (scorecards, provenance, etc.)
│  ├─ gs1-epcis.ttl              # Módulo EPCIS (Object/Aggregation/Transformation/Transaction)
│  └─ external-declarations.ttl  # Declaraciones mínimas de IRIs externos
├─ shapes/
│  └─ dpp-shapes.ttl             # SHACL Shapes para validar instancias DPP
├─ examples/
│  ├─ product-sample.ttl         # Ejemplo TTL de un DPP completo
│  └─ product-sample.jsonld      # Ejemplo JSON-LD equivalente
├─ docs/
│  ├─ dpp-ontology.md            # Resumen de la ontología + diagrama
│  ├─ dpp-shapes.md              # Resumen de Shapes + diagrama
│  ├─ dpp-untp-alignment.md      # Alineación con UNTP + diagrama
│  ├─ dpp-epcis.md               # Integración EPCIS + diagrama
│  ├─ examples.md                # Cómo validar y ejemplos
│  ├─ install.md                 # Instalación nativa y con Docker
│  └─ paso-a-paso-ontologia.md   # Guía para modificar la ontología y testear
├─ scripts/
│  ├─ validate-owl.(sh|ps1)      # Valida OWL (merge + profile + reason con ROBOT)
│  ├─ validate-shacl.(sh|ps1)    # Valida SHACL (pySHACL o Jena SHACL)
│  ├─ validate-all.(sh|ps1)      # Ejecuta SHACL y OWL
│  ├─ build-docker.(sh|ps1)      # Construye la imagen Docker
│  ├─ validate-all-docker.sh     # Valida dentro de Docker (Unix)
│  └─ validate-all-docker.ps1    # Valida dentro de Docker (Windows)
└─ docker/
   └─ Dockerfile                 # Imagen con Java 17 + ROBOT + pySHACL
```

### Uso rápido

- Docker
  - Construir imagen: `./scripts/build-docker.ps1` (Windows) o `bash scripts/build-docker.sh` (Unix)
  - Validar todo: `./scripts/validate-all-docker.ps1` (Windows) o `bash scripts/validate-all-docker.sh` (Unix)

- Instalación nativa (ver `docs/install.md`)
  - Validar todo: `./scripts/validate-all.ps1` (Windows) o `bash scripts/validate-all.sh` (Unix)
  - Solo SHACL: `./scripts/validate-shacl.ps1 -DataFile examples/product-sample.ttl` o `bash scripts/validate-shacl.sh examples/product-sample.ttl`
  - Solo OWL: `./scripts/validate-owl.ps1` o `bash scripts/validate-owl.sh`

Resultados esperados
- SHACL: con `examples/product-sample.ttl` debe verse `Conforms: True`.
- OWL (ROBOT): se generan `build/dpp-merged.ttl` y `build/dpp-reasoned.ttl`. Puede haber warnings por IRIs externos; son esperables.

### Documentación

- Ontología: `docs/dpp-ontology.md`
- Shapes: `docs/dpp-shapes.md`
- UNTP: `docs/dpp-untp-alignment.md`
- EPCIS: `docs/dpp-epcis.md`
- Instalación y ejemplos: `docs/install.md`, `docs/examples.md`
- Guía para modificar y testear la ontología: `docs/paso-a-paso-ontologia.md`

### Notas

- Para reducir avisos de vocabularios externos en validación OWL, se incluyen IRIs mínimos en `ontology/external-declarations.ttl`.
- Los scripts toleran warnings de OWL para no bloquear validaciones SHACL.

### Contribuir

Sigue la guía paso a paso: `docs/paso-a-paso-ontologia.md`.

