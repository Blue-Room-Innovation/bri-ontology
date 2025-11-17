# 05 · Cómo Generar la Wiki de Ontologías y Shapes

## Objetivo
Documentar el proceso para producir una "wiki" navegable en Markdown que describa:
- Clases, propiedades de objeto y de datos de cada ontología.
- Metadatos básicos (título, versión, creador si están presentes).
- Shapes SHACL asociados (NodeShape y PropertyShape) con sus restricciones.
- Diagramas opcionales (Graphviz y/o Mermaid) para visualización rápida.

## Qué se Genera
Al ejecutar el script se crea (por defecto) `docs/wiki/` con:
- `index.md` → Tabla resumen (#Clases, #ObjProps, #DataProps y opcional #Shapes).
- Carpeta por ontología (`<NombreOntologia>/`):
  - `README.md` → Detalle de clases y propiedades (modo básico o rich).
  - `SHAPES.md` → Documentación de restricciones SHACL (si se activa `--include-shapes` y existen shapes).
  - `diagram.png|svg` → Diagrama Graphviz (si se usa `--generate-diagrams`).

## Requisitos Previos
- Docker instalado (para entorno aislado) o Python 3.10+ local.
- Dependencias: `rdflib`, `graphviz`, `pyshacl` (ya incluidas en la imagen Docker definida en `docker/Dockerfile`).
- Ontologías en `ontology/*.ttl` y shapes en `shapes/*.ttl` siguiendo convención `<Ontologia>Shapes.ttl`.

## Construir la Imagen (PowerShell)
Si no la tienes aún, construye la imagen base (contiene Python, rdflib, graphviz, pySHACL, ROBOT):
```powershell
docker build -t bri-ontology-tooling -f docker/Dockerfile .
```

Para reconstruir sin caché:
```powershell
docker build --no-cache -t bri-ontology-tooling -f docker/Dockerfile .
```

Verifica la imagen:
```powershell
docker images bri-ontology-tooling
```

## Comando
Wiki rica con shapes, codelists, diagrama Graphviz en SVG y Mermaid:

```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace --entrypoint python3 bri-ontology-tooling scripts/generate-wiki.py --verbose --format rich --mermaid --include-shapes --generate-diagrams --diagram-format svg
```

Resultado esperado: carpeta `docs/wiki/` con `index.md` y subcarpetas por ontología.

## Opciones Principales
| Opción | Descripción | Valor por defecto |
|--------|-------------|-------------------|
| `--ontology-dir` | Directorio de ontologías | `ontology` |
| `--output-dir` | Directorio de salida | `docs/wiki` |
| `--include-codelists` | Incluye `ontology/codelists` | `False` |
| `--include-shapes` | Genera documentación de shapes | `False` |
| `--shapes-dir` | Directorio de shapes | `shapes` |
| `--generate-diagrams` | Activa diagrama Graphviz | `False` |
| `--diagram-format` | `png` o `svg` | `png` |
| `--diagram-max-classes` | Umbral máximo de clases para diagrama | `150` |
| `--format` | `basic` o `rich` | `basic` |
| `--mermaid` | Añade diagrama Mermaid (solo `rich`) | `False` |
| `--verbose` | Logging detallado | `False` |

## Interpretación de Archivos
### `index.md`
Tabla resumen tipo:
```
| Ontología | #Clases | #ObjProps | #DataProps | #Shapes |
|-----------|---------|-----------|-----------|---------|
| digitalWastePassport | 25 | 12 | 8 | 5 |
```

### `README.md` (basic)
Listados de clases y propiedades con labels, comentarios, dominios, rangos.

### `README.md` (rich)
Tablas estructuradas y navegación mediante anchors internos, opcional diagrama Mermaid (`classDiagram`).

### `SHAPES.md`
Tabla consolidada:
```
| Shape | Target Class(es) | Propiedad | Datatype | Class | Min | Max | In | Descripción |
```
Cada fila describe una PropertyShape ligada al NodeShape (restricciones cardinalidad, enumeraciones, tipos).

