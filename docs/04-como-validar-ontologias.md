# 04 · Cómo Validar Ontologías, Shapes y Ejemplos

## Objetivo
Centralizar los comandos y criterios para comprobar que:
- Las ontologías cargan y razonan correctamente.
- Los shapes SHACL confirman el cumplimiento de las reglas.
- Los ejemplos representan instancias válidas.

## Componentes que Validamos
| Tipo | Ubicación | Qué se comprueba |
|------|-----------|------------------|
| Ontologías | `ontology/*.ttl` | Sintaxis RDF/OWL y consistencia + reasoning |
| Shapes | `shapes/*.ttl` | Reglas SHACL (targets, propiedades, cardinalidades, tipos, valores) |
| Codelists | `ontology/codelists/*.ttl` | Accesibilidad de IRIs y uso en shapes/ejemplos |
| Ejemplos | `examples/*.ttl` / `.jsonld` | Conformidad con shapes y vocabulario |

## Comandos Esenciales (PowerShell)
### 0. Construir la imagen Docker
Antes de ejecutar cualquier validación necesitas tener la imagen local `bri-ontology-tooling` basada en el `Dockerfile` del repositorio.

Dentro de la raíz del proyecto ejecuta:
```powershell
docker build -t bri-ontology-tooling -f docker/Dockerfile .
```

Si estás en PowerShell y quieres forzar reconstrucción (sin cache):
```powershell
docker build --no-cache -t bri-ontology-tooling -f docker/Dockerfile .
```

Verifica que existe la imagen:
```powershell
docker images bri-ontology-tooling
```

La imagen incluye:
- OpenJDK 17 + ROBOT (razonamiento y operaciones OWL)
- Python + pySHACL (validación de shapes)
- Scripts `validate-owl` y `validate-shacl` copiados al PATH

Actualiza la imagen solo cuando:
- Cambies dependencias (Java, Python, pySHACL versión, etc.)
- Modifiques scripts en `scripts/*.sh`
- Añadas nuevas herramientas para el pipeline

Consejo: si solo cambias ontologías (`ontology/*.ttl`), shapes o ejemplos, NO necesitas reconstruir la imagen; basta con montar el volumen.

### 1. Validación SHACL puntual (un ejemplo vs reglas)
Comando básico (usa shapes y extras auto-descubiertos):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl"
```

Ejemplo con formato JSON-LD y sin extras auto (solo shapes):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-shacl.sh --data examples/digital-waste-passport-sample.ttl --no-extras --format json-ld"
```

Ejemplo especificando extras concretos:
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl -e ontology/digitalWastePassport.ttl,ontology/codelists/unlocode.ttl"
```
Salida esperada contiene:
- `Conforms True` → todo correcto.
- O lista de violaciones con `path`, `message` y `focusNode`.

### 2. Validación y razonamiento OWL (merge + profile + reasoner)
Comando por defecto (descubre ontologías, excluye codelists, perfil DL, razonador HermiT):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-owl.sh"
```

Incluir codelists y usar ELK:
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-owl.sh --include-codelists --reasoner ELK"
```

Solo validar perfil, sin razonamiento:
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-owl.sh --reasoner none"
```
Genera carpeta `build/` con artefactos:
| Archivo | Descripción |
|---------|-------------|
| `merged-ontology.ttl` | Ontologías fusionadas (si merge OK o con warnings) |
| `reasoned-ontology.ttl` | Ontología razonada (omitido si `--reasoner none`) |

Nota: El script no produce informes SHACL; para eso usar `scripts/validate-shacl.sh`.

### 3. Validar otro ejemplo
Reemplaza el nombre de archivo (manteniendo flags que necesites):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-shacl.sh -d examples/mi-dominio-sample.ttl"
```

## Interpretar Resultados
| Indicador | Significado | Acción sugerida |
|-----------|-------------|-----------------|
| `Conforms True` | Ejemplo cumple | Nada; opcional añadir nuevo caso de prueba |
| `Conforms False` | Hay violaciones SHACL | Revisar cada `sh:message` y propiedad faltante |
| Merge warnings (OWL) | Import no resolvible / triple no OWL | Revisar IRIs import, limpiar triples ajenos a OWL |
| Profile issues | Construct fuera del perfil DL | Ajustar axiomas o cambiar a `--profile OWL2` |
| Reasoner issues | Posible inconsistencia | Inspeccionar clases equivalentes a `owl:Nothing` |
| Código no encontrado | Valor no pertenece a codelist | Añadir al codelist o corregir valor |
| Tipo incorrecto | Literal con tipo distinto | Ajustar `xsd:` o el shape |

## Errores Frecuentes y Solución
| Problema | Causa Común | Fix Rápido |
|----------|-------------|-----------|
| Faltan propiedades obligatorias | Nueva regla añadida en shape | Actualizar ejemplo con campo mínimo |
| Valor string donde se espera IRI | Omisión de prefijo | Añadir prefijo o usar IRI completa |
| Código obsoleto | Codelist actualizado | Sincronizar ejemplo con nueva lista |
| Cardinalidad > permitida | Repetición accidental | Consolidar en una sola declaración |
| Prefijo no declarado | Copia parcial de ejemplo | Añadir declaración `@prefix` al inicio |

## Flujo de Depuración Sugerido
1. Ejecutar validación puntual sobre ejemplo concreto.
2. Leer mensajes y agrupar por tipo de violación (códigos, propiedades, tipos).
3. Corregir ejemplo primero (rápido).
4. Si falta vocabulario → extender ontología.
5. Si regla necesaria no existe → modificar shape.
6. Revalidar ejemplo.
7. Ejecutar pipeline completa para asegurar reasoning coherente.