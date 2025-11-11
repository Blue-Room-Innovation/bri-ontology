# 04 · Cómo Validar Ontologías, Shapes y Ejemplos

> Guía práctica para ejecutar validaciones y entender los resultados. Incluye comandos, flujo, errores típicos y consejos de resolución.

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
### 1. Validación SHACL puntual (un ejemplo vs reglas)
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
```
Salida esperada contiene:
- `Conforms True` → todo correcto.
- O lista de violaciones con `path`, `message` y `focusNode`.

### 2. Pipeline completa (ontologías + reasoning + reportes)
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
```
Genera carpeta `build/` con artefactos:
| Archivo | Descripción |
|---------|-------------|
| `merged.ttl` | Ontologías fusionadas |
| `inferred.ttl` | Tripletas inferidas vía razonamiento |
| `report-shacl.ttl` / `.json` | Resultado detallado de validación |
| `stats.txt` | Métricas (tripletas, clases, propiedades) |

### 3. Validar otro ejemplo
(Reemplaza nombre de archivo)
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/mi-dominio-sample.ttl"
```

## Interpretar Resultados
| Indicador | Significado | Acción sugerida |
|-----------|-------------|-----------------|
| `Conforms True` | Ejemplo cumple | Nada; opcional añadir nuevo caso de prueba |
| `Conforms False` | Hay violaciones | Revisar cada `sh:message` y propiedad faltante |
| Ontology parse error | Sintaxis errónea TTL | Ver líneas cercanas; validar con un parser RDF |
| Código no encontrado | Valor no pertenece a codelist | Añadir a codelist (si procede) o corregir valor |
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