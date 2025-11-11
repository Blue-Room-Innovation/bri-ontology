# 01 · Overview de la Estructura del Repositorio

> Esta nota es para alguien que llega sin contexto técnico previo y necesita entender "qué es cada carpeta" y "cómo se conectan" los conceptos (ontologías, shapes, codelists y ejemplos).

## Mapa Conceptual Rápido
| Concepto | Archivo(s) | Rol | Analogía |
|----------|------------|-----|----------|
| Ontología | `ontology/*.ttl` | Modelo: clases y propiedades | Esquema relacional | 
| Codelist/Taxonomía | `ontology/codelists/*.ttl` | Listas controladas de valores | Tabla de códigos/enumeraciones |
| Shape (SHACL) | `shapes/*.ttl` | Reglas de validación sobre instancias | Constraints/validaciones | 
| Ejemplo de datos | `examples/*.ttl`/`*.jsonld` | Instancias para probar y documentar | Dataset de prueba |
| Informe generado | `build/*` (tras pipeline) | Resultados de reasoning y validación | Carpeta de artefactos |
| Scripts | `scripts/*.sh` | Automatización local (validación) | Make/utilidades |
| Imagen/entorno | `docker/Dockerfile` | Facilita entorno reproducible | Contenedor |
| Documentación | `docs/*.md` | Guías temáticas | Manual/wiki |

## Estructura de Carpetas

### ¿Por qué están separadas Ontologías y Shapes?
- La ontología define el vocabulario (qué clases y propiedades existen).
- El shape define reglas concretas de uso (qué es obligatorio, cardinalidades, tipos y códigos permitidos).
Separarlas permite: (a) reutilizar la ontología en distintos contextos, (b) endurecer o flexibilizar reglas sin tocar el modelo base.

### ¿Qué diferencia hay entre Ontologías y Codelists?
- Ontología: estructura semántica (clases como `Residuo` o `Transporte`).
- Codelist: lista explícita de valores aceptados para una propiedad (ej: tipos de residuo) representada también en RDF/TTL para integrarse semánticamente.

