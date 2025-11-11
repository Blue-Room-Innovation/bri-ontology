# Manual `validate-shacl.sh`

Script de validación SHACL genérico para las ontologías y shapes del proyecto.

## Objetivo
Validar instancias de la ontología (pasaportes, etc.) contra las shapes SHACL. Intenta usar `pyshacl` (más completo y soporta módulos extra). Si no está disponible, cae a Apache Jena SHACL CLI.

## Requisitos
- Tener disponibles los archivos de datos a validar (TTL o JSON-LD).
- Shapes SHACL en `shapes/` (por defecto `shapes/waste-shapes.ttl`).
- Ontologías / módulos en `ontology/`.
- Contenedor `bri-ontology-tooling` (recomendado) o instalación local de `pyshacl` / Jena.

## Uso básico
```bash
scripts/validate-shacl.sh
```

Usa los defaults:
- Data: `examples/digital-waste-passport-sample.ttl`
- Shapes: `shapes/waste-shapes.ttl`
- Extras: todos los `.ttl` bajo `ontology/`.

## Sintaxis
```bash
scripts/validate-shacl.sh [opciones] [data.ttl [shapes.ttl]]
```

## Opciones
| Opción | Descripción |
|--------|-------------|
| `-d, --data <file>` | Archivo de datos a validar (TTL/JSON-LD). |
| `-s, --shapes <file>` | Archivo SHACL shapes. |
| `-e, --extras <csv>` | Lista separada por comas de archivos `.ttl` extra a cargar. |
| `--no-extras` | Desactiva descubrimiento automático de módulos. |
| `-f, --format <fmt>` | Formato salida `pyshacl` (human, turtle, json-ld, text). Default: human |
| `-h, --help` | Muestra la ayuda integrada. |

### Argumentos posicionales
1. Data
2. Shapes
(Son equivalentes a usar `--data` y `--shapes`).

## Descubrimiento automático de extras
Si no se dan `--extras` ni `--no-extras`, el script busca todos los `.ttl` dentro de `ontology/` y subdirectorios y los añade como `-e` para `pyshacl`. Se excluye el archivo de datos y el archivo de shapes.

## Ejemplos
Validar el ejemplo por defecto:
```bash
scripts/validate-shacl.sh
```
Validar un archivo específico sin extras:
```bash
scripts/validate-shacl.sh --data examples/invalid-waste-passport-sample.ttl --no-extras
```
Usar un conjunto concreto de extras:
```bash
scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl -e "ontology/digitalWastePassport.ttl,ontology/codelists/unlocode.ttl"
```
Cambiar formato de salida:
```bash
scripts/validate-shacl.sh -f json-ld
```
Usar posición en vez de flags:
```bash
scripts/validate-shacl.sh examples/digital-waste-passport-sample.ttl shapes/waste-shapes.ttl
```

## Salida
- Muestra lista de archivos cargados.
- Si usa `pyshacl`: genera un Validation Report (conforms True/False y detalles de violaciones).
- Si cae a Jena: salida estándar de la CLI SHACL de Jena.

## Códigos de salida
| Código | Significado |
|--------|-------------|
| 0 | Validación exitosa y conforme (o proceso ejecutado sin errores y resultado conforme). |
| 1 | No se encontró validador o error general de validación. |
| 2 | Archivo data o shapes inexistente. |
| >0 | Código propagado de la herramienta (cuando no conforme en `pyshacl` normalmente 1). |

## Integración con Docker
Ejecutar dentro del contenedor de tooling (desde raíz repo):
```bash
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl"
```

## Solución de problemas
| Problema | Causa probable | Acción |
|----------|----------------|--------|
| "No se encontró ningún validador" | Falta `pyshacl` y Jena en entorno | Usar contenedor o instalar `pip install pyshacl` / añadir Jena. |
| Formato no aceptado | Valor de `--format` inválido | Usar uno de: human, turtle, json-ld, text. |
| Muchos fallos de MinCount | Datos incompletos | Añadir propiedades mínimas requeridas por shapes. |
| Extras contaminan data en Jena | Jena no soporta -e | El script concatena extras + data; verificar que no hay colisiones de IRIs. |
