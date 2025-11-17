# Script: generate-wiki.py

Genera automáticamente una "wiki" en Markdown a partir de las ontologías (archivos `.ttl`) del directorio `ontology/`.

## Objetivo
Disponer de documentación legible y navegable que describa clases y propiedades de cada ontología sin editar manualmente.

## Requisitos
Instala dependencias:

```bash
pip install -r requirements.txt
```

(En Docker, añade la instalación de `rdflib` si no está incluida.)

## Uso
Desde la raíz del repositorio (PowerShell / Bash). La salida por defecto se crea en `docs/wiki/`.

```bash
python scripts/generate-wiki.py
```

Parámetros opcionales (CLI):

| Parámetro | Descripción | Valor por defecto |
|-----------|-------------|-------------------|
| `--ontology-dir` | Directorio donde buscar `.ttl` | `ontology` |
| `--output-dir` | Directorio destino de la wiki | `docs/wiki` |
| `--include-codelists` | Incluye archivos en `ontology/codelists` | `False` |
| `--generate-diagrams` | Genera diagrama Graphviz por ontología | `False` |
| `--diagram-format` | Formato (png/svg) | `png` |
| `--diagram-max-classes` | Máx clases para intentar diagrama | `150` |
| `--format` | `basic` (listar) / `rich` (tablas + mermaid opcional) | `basic` |
| `--mermaid` | Incluye diagrama Mermaid en modo `rich` | `False` |
| `--include-shapes` | Procesa shapes SHACL y genera `SHAPES.md` | `False` |
| `--shapes-dir` | Directorio de shapes `.ttl` | `shapes` |
| `--verbose` | Activa logging detallado | `False` |

Ejemplos:

```bash
# Generar wiki básica (sin codelists, sin shapes)
python scripts/generate-wiki.py

# Incluir codelists
python scripts/generate-wiki.py --include-codelists

# Generar wiki rica con tablas y diagrama Mermaid
python scripts/generate-wiki.py --format rich --mermaid

# Generar diagramas en SVG
python scripts/generate-wiki.py --generate-diagrams --diagram-format svg

# Incluir documentación de SHACL shapes
python scripts/generate-wiki.py --include-shapes

# Usar directorios alternativos y logging verbose
python scripts/generate-wiki.py --ontology-dir ontology --shapes-dir shapes --output-dir docs/wiki --include-shapes --format rich --verbose
```

## Salida Generada
Estructura típica:

```
build/
  wiki/
    index.md                        # Tabla resumen global (incluye #Shapes si se activa --include-shapes)
    digitalWastePassport/
      README.md                     # Detalle (rich o básico) + posible diagrama (Graphviz/Mermaid)
      diagram.png|svg               # (opcional) diagrama Graphviz
      SHAPES.md                     # (opcional) documentación de NodeShape y PropertyShape
    digitalMarpolWastePassport/
      README.md
      SHAPES.md
```

Cada `README.md` incluye (modo `basic`):
- Resumen (conteo de clases y propiedades)
- Listado detallado de Clases, Propiedades de Objeto y de Datos.

En modo `rich` se añaden tablas:
- Tabla de clases con: Name | Description | Datatype properties | Object properties | Subclass of
- Tabla de Data Properties
- Tabla de Object Properties
- (Opcional) Diagrama Mermaid `classDiagram` consolidado.

Si se activa `--include-shapes`, cada ontología con shapes asociados genera `SHAPES.md` con:
- Tabla: Shape | Target Class(es) | Propiedad | Datatype | Class | Min | Max | In | Descripción
  - Min/Max = restricciones cardinalidad (sh:minCount / sh:maxCount)
  - In = enumeración de valores permitidos (sh:in)

## Convenciones
- Si no existe `rdfs:label`, se usa el localName del URI.
- Se listan etiquetas y comentarios multi-idioma (idiomas detectados: `es`, `en`, otros -> `und`).
- El orden prioriza español, inglés y luego otros.
- Axiomas OWL complejos (restricciones anónimas, equivalencias, disjuntas) aún no se expanden.
- Shapes: se asume convención de nombre `<OntologyName>Shapes.ttl` para asociar shapes a una ontología.

## Extensiones Futuras (Ideas)
- Extracción completa de restricciones OWL (owl:Restriction) y equivalencias.
- Anotación de propiedades de datos en nodos del diagrama Graphviz.
- Exportar también a HTML y/o JSON para integraciones.
- Resumen específico de codelists (SKOS ConceptScheme, Concept) con códigos y jerarquías.
- Validación previa contra shapes y listado de incumplimientos.
- Generación de un grafo de dependencias entre ontologías (owl:imports).

## Solución de Problemas
| Problema | Causa probable | Solución |
|----------|----------------|----------|
| Archivo vacío | Ontología sin clases tipo OWL | Verifica tipos y formato TTL |
| UnicodeError | Caracteres especiales no soportados | Asegura UTF-8 en los `.ttl` |
| No aparecen codelists | Falta `--include-codelists` | Ejecuta con parámetro |
| No aparece columna #Shapes | No se pasó `--include-shapes` | Añade parámetro |
| SHAPES.md vacío | Shapes sin NodeShape | Revisa contenido del TTL de shapes |
| Diagrama no generado | Demasiadas clases (> límite) o falta Graphviz | Ajusta `--diagram-max-classes` / instala graphviz |
| Mermaid no aparece | Falta `--mermaid` o modo no es `rich` | Usa `--format rich --mermaid` |

## Licencia / Uso
El script pretende ser genérico y reutilizable en otros repositorios de ontologías Turtle.


## Test Rápido (Smoke Test)
```bash
python scripts/generate-wiki.py --include-shapes --format rich --mermaid --generate-diagrams --diagram-format svg --verbose
tree docs/wiki
```
Comprueba:
1. `docs/wiki/index.md` contiene columna `#Shapes`.
2. Cada ontología genera `README.md` y opcionalmente `SHAPES.md` si hay shapes.
3. Diagramas presentes si el número de clases <= umbral.

## Ejecución con Docker
Se puede ejecutar sin instalar dependencias locales usando la imagen definida en `docker/Dockerfile`.

### Construir imagen
PowerShell (Windows):
```powershell
docker build -t bri-ontology-wiki -f docker/Dockerfile .
```

Bash (Linux/macOS):
```bash
docker build -t bri-ontology-wiki -f docker/Dockerfile .
```

### Ejecutar generación
Montamos el directorio del repositorio en `/workspace` (el `WORKDIR` del contenedor).

PowerShell:
```powershell
docker run --rm -v "${PWD}:/workspace" bri-ontology-wiki python3 scripts/generate-wiki.py --format rich --mermaid --include-shapes --generate-diagrams --diagram-format svg --verbose
```

Bash:
```bash
docker run --rm -v "$(pwd):/workspace" bri-ontology-wiki python3 scripts/generate-wiki.py --format rich --mermaid --include-shapes --generate-diagrams --diagram-format svg --verbose
```

Tras la ejecución se espera:
- Carpeta `docs/wiki/` creada en el host (porque se monta el volumen).
- Archivos `README.md`, `SHAPES.md` (si shapes) y `diagram.svg|png` por ontología.

### Ejemplos mínimos
Solo wiki básica (salida en docs/wiki):
```powershell
docker run --rm -v "${PWD}:/workspace" bri-ontology-wiki python3 scripts/generate-wiki.py
```

Incluir codelists y shapes en modo básico:
```powershell
docker run --rm -v "${PWD}:/workspace" bri-ontology-wiki python3 scripts/generate-wiki.py --include-codelists --include-shapes
```

Si quieres que el contenedor genere solamente la wiki y termine, estos comandos son suficientes; no hace falta una shell interactiva.

### Problemas comunes con Docker
| Síntoma | Posible causa | Acción |
|--------|---------------|--------|
| No aparece carpeta `docs/wiki/` | Volumen no montado correctamente | Revisa sintaxis `-v` y ruta absoluta |
| Error "command not found" al ejecutar python | PATH no incluye venv | Asegura que usas `python3` (imagen lo provee) |
| Diagrama no generado | Límite de clases excedido / falta Graphviz | Ajusta `--diagram-max-classes` o verifica instalación |
| SHAPES.md vacío | Archivo de shapes sin `sh:NodeShape` | Verifica contenido del TTL de shapes |
| Columna #Shapes vacía | No se activó `--include-shapes` | Añade parámetro al comando |