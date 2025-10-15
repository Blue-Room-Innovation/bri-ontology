## DPP Ontology Toolkit

Repositorio para modelar, validar y documentar una ontología de Pasaporte Digital de Producto (DPP) con OWL/RDF y SHACL, alineada con vocabularios establecidos (schema.org, DCTERMS, PROV, ADMS, QUDT), con mapeos a UNTP (UN/CEFACT) y soporte para eventos GS1 EPCIS.

### Estructura del repositorio

```
.
├─ ontology/
│  ├─ dpp.ttl                     # Núcleo OWL de la ontología DPP
│  ├─ alignments-untp.ttl         # Alineaciones DPP ↔ UNTP (clases/propiedades)
│  ├─ dpp-extensions.ttl          # Extensiones DPP alineadas a UNTP (scorecards, provenance, etc.)
│  ├─ gs1-epcis.ttl               # Módulo EPCIS (Object/Aggregation/Transformation/Transaction)
│  └─ external-declarations.ttl   # Declaraciones mínimas de IRIs externos (schema.org, ADMS, UNTP, EPCIS)
│
├─ shapes/
│  └─ dpp-shapes.ttl              # SHACL Shapes para validar instancias DPP (+ UNTP + EPCIS)
│
├─ examples/
│  ├─ product-sample.ttl          # Ejemplo TTL de un DPP completo
│  └─ product-sample.jsonld       # Ejemplo JSON-LD equivalente
│
├─ docs/
│  ├─ dpp-ontology.md             # Resumen de la ontología + diagrama Mermaid
│  ├─ dpp-shapes.md               # Resumen de Shapes + diagrama Mermaid
│  ├─ dpp-untp-alignment.md       # Alineación con UNTP + diagrama Mermaid
│  ├─ dpp-epcis.md                # Integración EPCIS + diagrama Mermaid
│  ├─ examples.md                 # Cómo ejecutar validaciones con scripts o Docker
│  └─ install.md                  # Instalación nativa y con Docker
│
├─ scripts/
│  ├─ validate-owl.(sh|ps1)       # Valida OWL (merge + profile + reason con ROBOT)
│  ├─ validate-shacl.(sh|ps1)     # Valida SHACL (pySHACL o Jena SHACL)
│  ├─ validate-all.(sh|ps1)       # Ejecuta SHACL y OWL
│  ├─ build-docker.(sh|ps1)       # Construye la imagen Docker con dependencias
│  ├─ validate-all-docker.sh      # Valida dentro de Docker (Unix)
│  └─ validate-all-docker.ps1     # Valida dentro de Docker (Windows)
│
└─ docker/
   └─ Dockerfile                  # Imagen con Java 17 + ROBOT + pySHACL (venv)
```

### Paso a paso (rápido con Docker)

1) Construir imagen
- Windows (PowerShell): `./scripts/build-docker.ps1`
- Unix (bash): `bash scripts/build-docker.sh`

2) Validar todo (OWL + SHACL)
- Windows: `./scripts/validate-all-docker.ps1`
- Unix: `bash scripts/validate-all-docker.sh`

3) Ver resultados
- El reporte SHACL aparece en consola. Con el ejemplo actual, debe indicar `Conforms: True`.
- OWL se ejecuta con ROBOT. Si hay avisos por IRIs externos, se muestran como warnings (ver notas más abajo).

Más detalles (opciones, instalación nativa, comandos manuales) en `docs/examples.md` y `docs/install.md`.

### Paso a paso (instalación nativa)

1) Instalar dependencias
- Java 17+, ROBOT y (opcional) Apache Jena (riot/shacl)
- Python 3.8+ y pySHACL
- Guía detallada en `docs/install.md`

2) Validar desde scripts
- PowerShell (Windows):
  - `./scripts/validate-all.ps1`
- Bash (Unix):
  - `bash scripts/validate-all.sh`

3) Validar manualmente con pySHACL
- Comandos listados en `docs/examples.md` (incluye opciones para enlazar ontologías `-e`).

### Qué contienen los módulos OWL

- `ontology/dpp.ttl`: Clases/propiedades base DPP (Producto, Componentes, Material, Identificadores, Eventos, etc.).
- `ontology/alignments-untp.ttl`: Equivalencias y `seeAlso` con UNTP (core y dpp).
- `ontology/dpp-extensions.ttl`: Propiedades y clases extendidas (MaterialProvenance, Scorecards, Claims/Declarations, TraceabilityInformation) alineadas a UNTP.
- `ontology/gs1-epcis.ttl`: Mapeo a EPCIS/CBV (Event/ObjectEvent/Aggregation/Transformation/Transaction y propiedades clave).
- `ontology/external-declarations.ttl`: Declaraciones mínimas de IRIs externos para mejorar la carga con parsers OWL (ROBOT/OWL-API).

Explicaciones y diagramas en:
- Ontología: `docs/dpp-ontology.md`
- Alineación UNTP: `docs/dpp-untp-alignment.md`
- EPCIS: `docs/dpp-epcis.md`

### Validación con SHACL

- Shapes principales en `shapes/dpp-shapes.ttl`.
- Reglas clave resumidas en `docs/dpp-shapes.md`.
- El ejemplo `examples/product-sample.ttl` conforma (Conforms: True).

### Notas sobre OWL/ROBOT

- Se usa ROBOT para: merge → validate-profile (OWL 2 DL) → reason (HermiT).
- Algunos IRIs externos (schema.org, UNTP, EPCIS) no incluyen axiomas OWL en sus endpoints, lo que puede producir avisos al cargarlos indirectamente. Para evitar ruido, se incluyen declaraciones mínimas en `ontology/external-declarations.ttl` y el pipeline tolera warnings (sin bloquear SHACL).
- Si necesitas “0 warnings”, podemos ampliar `external-declarations.ttl` con más axiomas (o sustituir ciertas equivalencias por `skos:exactMatch` caso a caso).

### Cómo extender

- Añadir nuevas clases/propiedades en `ontology/dpp-extensions.ttl` (o módulos nuevos), y actualizar la documentación en `docs/`.
- Ampliar Shapes en `shapes/dpp-shapes.ttl` y actualizar `docs/dpp-shapes.md`.
- Proveer ejemplos nuevos en `examples/` y validar con los scripts.

### Referencias

- Instalación y comandos: `docs/install.md`, `docs/examples.md`
- Ontología DPP (Mermaid): `docs/dpp-ontology.md`
- Shapes (Mermaid): `docs/dpp-shapes.md`
- Alineación UNTP (Mermaid): `docs/dpp-untp-alignment.md`
- EPCIS (Mermaid): `docs/dpp-epcis.md`
