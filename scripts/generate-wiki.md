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
Desde la raíz del repositorio:

```bash
python scripts/generate-wiki.py
```

Parámetros opcionales:

| Parámetro | Descripción | Valor por defecto |
|-----------|-------------|-------------------|
| `--ontology-dir` | Directorio donde buscar `.ttl` | `ontology` |
| `--output-dir` | Directorio destino de la wiki | `wiki` |
| `--include-codelists` | Incluye archivos en `ontology/codelists` | `False` |

Ejemplos:

```bash
# Generar wiki básica (sin codelists)
python scripts/generate-wiki.py

# Incluir codelists
python scripts/generate-wiki.py --include-codelists

# Cambiar directorio de salida
python scripts/generate-wiki.py --output-dir docs/wiki
```

## Salida Generada
Estructura típica:

```
wiki/
  index.md               # Tabla resumen global
  digitalWastePassport/  # Un subdirectorio por ontología
    README.md            # Detalle de clases y propiedades
  digitalMarpolWastePassport/
    README.md
```

Cada `README.md` incluye:
- Resumen (conteo de clases y propiedades)
- Sección de Clases: labels, comentarios, subclases
- Propiedades de Objeto: dominios, rangos, labels, comentarios
- Propiedades de Datos: dominios, rangos, labels, comentarios

## Convenciones
- Si no existe `rdfs:label`, se usa el localName del URI.
- Se listan etiquetas y comentarios multi-idioma (idiomas detectados: `es`, `en`, otros -> `und`).
- El orden prioriza español, inglés y luego otros.
- No se procesan axiomas complejos (restricciones, equivalencias, disjuntas) en esta versión.

## Extensiones Futuras (Ideas)
- Extracción de restricciones (owl:Restriction) para documentar dominios más precisos.
- Generar diagrama simple (p.ej. usando Graphviz) de relaciones principales.
- Exportar también a HTML.
- Añadir resumen de vocabularios controlados (codelists) con los códigos SKOS.

## Solución de Problemas
| Problema | Causa probable | Solución |
|----------|----------------|----------|
| Archivo vacío | Ontología sin clases tipo OWL | Verifica tipos y formato TTL |
| UnicodeError | Caracteres especiales no soportados | Asegura UTF-8 en los `.ttl` |
| No aparecen codelists | Falta `--include-codelists` | Ejecuta con parámetro |

## Licencia / Uso
El script pretende ser genérico y reutilizable en otros repositorios de ontologías Turtle.

## Mantenimiento
- Revisa dependencias en `requirements.txt` periódicamente.
- Añade tests si se expande la lógica (por ejemplo, fixture con una ontología mínima).