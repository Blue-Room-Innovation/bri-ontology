# 01 · Overview de la Estructura del Repositorio

> Esta nota es para alguien que llega sin contexto técnico previo y necesita entender "qué es cada carpeta" y "cómo se conectan" los conceptos (ontologías, shapes, codelists y ejemplos).

## Mapa Conceptual Rápido
| Concepto | Archivo(s) | Rol | Analogía |
|----------|------------|-----|----------|
| **Ontología** | `ontology/*.ttl` | Vocabulario semántico: clases y propiedades | Esquema de base de datos | 
| **Codelist/Taxonomía** | `ontology/codelists/*.ttl` | Listas controladas SKOS de valores permitidos | Tablas de catálogos (enums) |
| **Shape SHACL** | `shapes/*.ttl` | Reglas de validación y restricciones | Constraints SQL / JSON Schema | 
| **Ejemplos** | `examples/*.ttl`/`*.jsonld` | Instancias reales para documentar y probar | Dataset de testing |
| **Build** | `build/*` | Artefactos generados: ontología merged + reasoned | Carpeta `dist/` o `target/` |
| **Scripts** | `scripts/*.sh` / `*.py` | Automatización: validación OWL/SHACL, generación wiki | Makefile / CI scripts |
| **Docker** | `docker/Dockerfile` | Entorno reproducible con dependencias | Contenedor de desarrollo |
| **Documentación** | `docs/*.md` | Guías técnicas y catálogos | Wiki interna |

## Preguntas Frecuentes

### ¿Por qué están separadas Ontologías y Shapes?
- **Ontología** (`ontology/`): Define el **vocabulario** (qué clases y propiedades existen). Es descriptiva y permisiva.
- **Shape** (`shapes/`): Define **reglas de uso** (qué es obligatorio, cardinalidades, tipos y valores permitidos). Es prescriptiva y restrictiva.

**Ejemplo:** La ontología permite `unece:productName` (opcional), pero el shape puede exigirlo con `sh:minCount 1`.

### ¿Qué diferencia hay entre Ontologías y Codelists?
- **Ontología**: Estructura semántica (clases como `Waste`, `WastePassport`, propiedades como `dwp:waste`).
- **Codelist**: Lista explícita de valores permitidos (ej: `Organic`, `Plastic`, `Chemical`) representada como conceptos SKOS.

**Integración:** Los shapes SHACL referencian codelists para validar que las propiedades solo usen valores del catálogo:
```turtle
sh:in (
  code:Organic
  code:Plastic
  code:Chemical
)
```

### ¿Por qué hay ejemplos en JSON-LD y Turtle?
- **Turtle (`.ttl`)**: Más legible para humanos, ideal para edición manual
- **JSON-LD (`.jsonld`)**: Integración nativa con APIs REST/JSON, consumo desde JavaScript

Ambos representan los mismos datos RDF, solo cambia la sintaxis de serialización.

### ¿Qué hacen los scripts de validación?
- `validate-owl.sh`: Verifica sintaxis OWL, consistencia lógica (sin contradicciones) usando ROBOT
- `validate-shacl.sh`: Valida instancias contra shapes, genera reportes de conformidad usando Apache Jena
- `generate-wiki.py`: Extrae metadata de ontologías (clases, propiedades, codelists) y genera documentación markdown

### ¿Cuándo usar `build/` vs `ontology/`?
- **`ontology/`**: Archivos fuente, editables, versionados en git
- **`build/`**: Artefactos derivados, generados automáticamente, no se editan directamente
  - `merged-ontology.ttl`: Útil para cargar todo en una triplestore
  - `reasoned-ontology.ttl`: Con inferencias materializadas (subclases, propiedades transitivas, etc.)

## Convenciones de Nombres

| Elemento | Patrón | Ejemplo |
|----------|--------|---------|
| Ontología principal | `digital<Domain>Passport.ttl` | `digitalWastePassport.ttl` |
| Shape SHACL | `<Ontologia>Shapes.ttl` | `digitalWastePassportShapes.ttl` |
| Codelist | `<concepto>-code.ttl` | `residue-type-code.ttl` |
| Ejemplo válido | `<domain>-sample.{ttl,jsonld}` | `digital-waste-passport-sample.ttl` |
| Ejemplo inválido | `invalid-<domain>-sample.ttl` | `invalid-waste-passport-sample.ttl` |

## Flujo de Trabajo con la Estructura

1. **Desarrollo**: Editar archivos en `ontology/` y `shapes/`
2. **Validación local**: Ejecutar `scripts/validate-owl.sh` y `scripts/validate-shacl.sh`
3. **Build**: Generar artefactos en `build/` con merge + reasoning
4. **Documentación**: Ejecutar `scripts/generate-wiki.py` para actualizar `docs/wiki/`
5. **Commit**: Versionar cambios en git con mensaje descriptivo
6. **Release**: Crear tag simplificado (ej: `0.2`) para publicar versión estable

