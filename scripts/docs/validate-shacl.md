# Manual `validate-shacl.sh`

Script de validación SHACL genérico para las ontologías y shapes del proyecto.

## Objetivo
Validar instancias de la ontología (pasaportes, etc.) contra las shapes SHACL. Usa `pyshacl` si está disponible; de lo contrario intenta Apache Jena SHACL CLI.

## Requisitos
- Tener disponibles los archivos de datos a validar (TTL o JSON-LD).
- Shapes SHACL en `shapes/`
- Ontologías/módulos en `ontology/`.
- Contenedor `bri-ontology-tooling` (recomendado) o instalación local de `pyshacl` / Jena.

## Uso básico
Siempre indicar data y shapes:
```bash
scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl -s shapes/digitalWastePassportShapes.ttl
```

## Sintaxis
```bash
scripts/validate-shacl.sh -d data.ttl -s shapes.ttl [opciones]
```

## Opciones
| Opción | Descripción |
|--------|-------------|
| `-d, --data <file>` | Archivo de datos a validar (TTL/JSON-LD). (Obligatorio) |
| `-s, --shapes <file>` | Archivo SHACL shapes. (Obligatorio) |
| `-e, --extras <csv>` | Lista separada por comas de archivos `.ttl` extra (explícitos). |
| `-f, --format <fmt>` | Formato salida `pyshacl` (human, turtle, json-ld, text). Default: human |
| `-h, --help` | Muestra la ayuda integrada. |

### Argumentos posicionales
1. Data
2. Shapes
Equivalentes a usar `--data` y `--shapes`.

## Extras
Los `extras` son archivos TTL adicionales que se cargan en el grafo junto con los datos y las shapes para dar contexto semántico (vocabularios, clases, propiedades, codelists) durante la validación.

¿Por qué necesitarlos?
- Las shapes pueden referirse a clases/propiedades definidas en módulos separados (ej: `ontology/digitalWastePassport.ttl`).
- Los datos pueden usar IRIs de códigos (codelists) que no aparecen en el archivo de datos ni en `shapes`, pero sí en `ontology/codelists/*.ttl`.
- Aumentan la capacidad de `pyshacl` de razonar o verificar tipos y restricciones basadas en definiciones externas.

Cuándo usar `--extras`:
- Si tus datos contienen IRIs de vocabularios que no están definidos dentro del propio archivo de datos.
- Si las shapes hacen referencia a clases de otros módulos y quieres evitar warnings de recursos "desconocidos".
- Cuando necesitas listas controladas (códigos) para validar pertenencia a un conjunto.

Cuándo NO usarlo:
- Validaciones rápidas donde el archivo de datos ya incluye todas las definiciones necesarias inline.
- Tests unitarios minimalistas centrados sólo en la estructura exigida por las shapes sin semántica externa.

Formato:
```bash
--extras "ontology/digitalWastePassport.ttl,ontology/codelists/unlocode.ttl"
```
Cada archivo debe existir; si alguno falta la validación puede fallar o producir resultados incompletos.

Impacto en Apache Jena:
- Jena no soporta pasar extras como parámetros separados; el script concatena internamente los extras y los datos antes de validar.

## Ejemplos
Validar un pasaporte (sin extras):
```bash
scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl -s shapes/digitalWastePassportShapes.ttl
```
Validar archivo inválido (esperar errores):
```bash
scripts/validate-shacl.sh -d examples/invalid-waste-passport-sample.ttl -s shapes/digitalWastePassportShapes.ttl
```
Con extras explícitos:
```bash
scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl -s shapes/digitalWastePassportShapes.ttl -e "ontology/digitalWastePassport.ttl,ontology/codelists/unlocode.ttl"
```
Cambiar formato de salida:
```bash
scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl -s shapes/digitalWastePassportShapes.ttl -f json-ld
```
Uso posicional (equivalente):
```bash
scripts/validate-shacl.sh examples/digital-waste-passport-sample.ttl shapes/digitalWastePassportShapes.ttl
```

## Salida
- Lista de archivos cargados (Data, Shapes, Extras).
- Con `pyshacl`: Validation Report (conforms True/False + detalles).
- Con Jena: salida estándar CLI SHACL.

## Códigos de salida
| Código | Significado |
|--------|-------------|
| 0 | Validación conforme / ejecución exitosa. |
| 1 | Error general, informe no conforme o falta de validador / argumentos requeridos ausentes. |
| 2 | Archivo data o shapes inexistente. |
| >0 | Código propagado de herramienta externa. |

## Integración con Docker
Ejecutar dentro del contenedor (desde raíz repo):
```bash
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl -s shapes/digitalWastePassportShapes.ttl
```

## Solución de problemas
| Problema | Causa probable | Acción |
|----------|----------------|--------|
| "No se encontró ningún validador" | Falta `pyshacl` y Jena en entorno | Usar contenedor o instalar `pip install pyshacl` / añadir Jena. |
| Formato no aceptado | Valor de `--format` inválido | Usar uno de: human, turtle, json-ld, text. |
| Muchos fallos de MinCount | Datos incompletos | Añadir propiedades mínimas requeridas por shapes. |
| Extras contaminan data en Jena | Jena no soporta -e | Se concatena extras + data (si hay extras); verificar colisiones de IRIs. |
