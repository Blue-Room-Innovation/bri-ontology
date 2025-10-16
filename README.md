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
│  ├─ validate-owl.sh            # Valida OWL (usado dentro de Docker)
│  └─ validate-shacl.sh          # Valida SHACL (usado dentro de Docker)
└─ docker/
   └─ Dockerfile                 # Imagen con Java 17 + ROBOT + pySHACL
```

### Documentación

- Ontología: `docs/dpp-ontology.md`
- Shapes: `docs/dpp-shapes.md`
- UNTP: `docs/dpp-untp-alignment.md`
- EPCIS: `docs/dpp-epcis.md`
- Instalación y ejemplos: `docs/install.md`, `docs/examples.md`
- Guía para modificar y testear la ontología: `docs/paso-a-paso-ontologia.md`
- Cómo interpretar los resultados: `docs/interpretar-resultados.md`

### Notas

- Para reducir avisos de vocabularios externos en validación OWL, se incluyen IRIs mínimos en `ontology/external-declarations.ttl`.
- Los scripts toleran warnings de OWL para no bloquear validaciones SHACL.

### Contribuir y Uso

Sigue la guía paso a paso: `docs/paso-a-paso-ontologia.md`.
