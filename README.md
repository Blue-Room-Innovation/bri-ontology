## Toolkit Ontología DPP

Bienvenido. Si nunca has trabajado con ontologías o pasaportes digitales de producto (Digital Product Passport, DPP), este repositorio ofrece una implementación abierta del modelo semántico (OWL/RDF) y sus reglas de validación (SHACL) para describir productos, su ciclo de vida y eventos de trazabilidad. Lo usamos para experimentar con alineaciones internacionales (UN/CEFACT UNTP) y con el estándar de eventos GS1 EPCIS.

Resumen rápido:
- OWL: clases y propiedades (modelo semántico) → ver `docs/05-modelo-datos.md`.
- SHACL: restricciones sobre instancias → ver `docs/13-shapes-referencia.md`.
- Scripts de validación: `scripts/validate-owl.sh` y `scripts/validate-shacl.sh`.
- Ejemplo ejecutable rápido: `docs/04-validacion-express.md`.

Si solo quieres ver algo funcionando, ve directo a la sección "Quickstart" más abajo.

### ¿Qué es un DPP?
Un Pasaporte Digital de Producto es un conjunto estructurado de datos que acompaña al producto físico durante su ciclo de vida (fabricación, uso, mantenimiento, reciclaje). Permite trazabilidad, transparencia y cumplimiento normativo. Aquí lo expresamos en RDF para interoperabilidad y razonamiento automático.

---

### Quickstart (mínimo)

1. Explora el ejemplo completo (TTL):
```ttl
@prefix dpp: <https://w3id.org/dpp#> .
@prefix ex: <https://example.org/product/> .

ex:Producto123 a dpp:Product ;
    dpp:hasGTIN "12345678901234" ;
    dpp:hasManufacturer "ACME Corp" ;
    dpp:hasMaterial [ a dpp:Material ; dpp:materialName "Acero" ] .
```

2. Mira el equivalente JSON-LD simplificado:
```jsonld
{
    "@context": "https://w3id.org/dpp/context.jsonld",
    "@id": "https://example.org/product/Producto123",
    "@type": "Product",
    "hasGTIN": "12345678901234",
    "hasManufacturer": "ACME Corp",
    "hasMaterial": {
        "@type": "Material",
        "materialName": "Acero"
    }
}
```

Más ejemplos y explicación detallada en `docs/18-validacion-ejemplos.md` y `docs/10-validar-ontologia-y-pasaportes.md`.

---

### Estructura del repositorio
```
ontology/      # Ontología principal y módulos
shapes/        # Shapes SHACL
examples/      # Instancias ejemplo
docs/          # Documentación numerada (00–20)
scripts/       # Scripts de validación
docker/        # Dockerfile tooling
build/         # Artefactos generados (merged, reasoned)
```

---

### Documentación numerada (orden recomendado)
00 Portada y mapa → `docs/00-portada.md`
01 Introducción → `docs/01-introduccion.md`
02 Conceptos clave → `docs/02-conceptos-clave.md`
03 Instalación (Docker) → `docs/03-instalacion.md`
04 Validación express → `docs/04-validacion-express.md`
05 Modelo de datos → `docs/05-modelo-datos.md`
06 Módulos ontología → `docs/06-modulos-ontologia.md`
07 EPCIS → `docs/07-alineacion-epcis.md`
08 UNTP → `docs/08-alineacion-untp.md`
09 Artefactos build → `docs/09-build-artefactos.md`
10 Validar ontología/pasaportes → `docs/10-validar-ontologia-y-pasaportes.md`
11 Interpretar resultados → `docs/11-interpretar-resultados.md`
12 Construcción paso a paso → `docs/12-paso-a-paso-construccion.md`
13 Shapes referencia → `docs/13-shapes-referencia.md`
14 IRIs y warnings → `docs/14-iri-warnings.md`
15 Roadmap → `docs/15-roadmap.md`
16 Vocabularios/imports → `docs/16-vocabularios-imports.md`
17 Taxonomías plan → `docs/17-taxonomias-plan.md`
18 Ejemplos validación → `docs/18-validacion-ejemplos.md`
19 Contribuir → `docs/19-contribuir.md`
20 Glosario → `docs/20-glosario.md`

---

### Contribuir
Flujo: leer 12 → editar ontología/shapes → validar (10/11) → abrir PR con motivación y ejemplos.

### Notas técnicas
- Stubs externos: `ontology/external-declarations.ttl` (ver 14).
- Scripts estandarizados: `scripts/validate-owl.sh`, `scripts/validate-shacl.sh`.
- `build/` se regenera; no editar manualmente.

### Licencia y reutilización
Indica aquí la licencia (añadir si se define). Si reutilizas, cita la fuente y enlaza este repositorio.

---

### Próximos pasos sugeridos
1. Leer 05 (modelo de datos).
2. Ejecutar 04 (validación express).
3. Seguir 12 para extender.