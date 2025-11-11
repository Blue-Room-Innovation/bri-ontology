# Manual `validate-owl.sh`

Script genérico para validar ontologías OWL y ejecutar razonamiento sobre el conjunto combinado usando la herramienta ROBOT. Si ROBOT no está disponible, cae a Apache Jena RIOT para validación de sintaxis.

## Objetivo
Garantizar que las ontologías cumplen el perfil OWL indicado (por defecto OWL DL) y generar una versión razonada (clasificación, equivalencias) cuando el razonador está habilitado.

## Requisitos
- Archivos `.ttl` de ontología en `ontology/`.
- (Opcional) codelists en `ontology/codelists/`.
- Contenedor `bri-ontology-tooling` o instalación local de ROBOT/Jena.

## Uso básico
```bash
scripts/validate-owl.sh
```

Acciones por defecto:
- Descubre todos los `.ttl` en `ontology/` (excluye `ontology/codelists/`).
- Merge de ontologías en `build/merged-ontology.ttl`.
- Valida perfil `DL`.
- Razonamiento con `HermiT` y salida en `build/reasoned-ontology.ttl`.

## Sintaxis
```bash
scripts/validate-owl.sh [opciones]
```

## Opciones
| Opción | Descripción |
|--------|-------------|
| `-i, --inputs <csv>` | Lista de archivos `.ttl` separados por comas. Desactiva auto-descubrimiento si se usa. |
| `--include-codelists` | Incluye también los `.ttl` en `ontology/codelists/`. |
| `--no-auto` | No auto-descubrir ontologías (requiere `--inputs`). |
| `-r, --reasoner <name>` | Razonador (`HermiT`, `ELK`, `none`). Default: `HermiT`. |
| `-p, --profile <name>` | Perfil de validación (`DL`, `OWL2`). Default: `DL`. |
| `-m, --merged <file>` | Nombre archivo de merge (dentro de `build/`). Default: `merged-ontology.ttl`. |
| `-o, --output <file>` | Nombre archivo razonado (dentro de `build/`). Default: `reasoned-ontology.ttl`. |
| `-q, --quiet` | Reduce la salida (solo avisos y errores). |
| `-h, --help` | Muestra ayuda y termina. |

## Ejemplos
Auto-descubrir y validar (por defecto):
```bash
scripts/validate-owl.sh
```

Usar perfil OWL2 y razonador ELK:
```bash
scripts/validate-owl.sh --profile OWL2 --reasoner ELK
```

Validar sin razonamiento:
```bash
scripts/validate-owl.sh --reasoner none
```

Especificar ontologías manualmente y desactivar auto-descubrimiento:
```bash
scripts/validate-owl.sh -i "ontology/digitalWastePassport.ttl,ontology/digitalMarpolWastePassport.ttl" --no-auto
```

Incluir codelists en el merged:
```bash
scripts/validate-owl.sh --include-codelists
```

Cambiar nombres de archivos de salida:
```bash
scripts/validate-owl.sh -m merged.ttl -o reasoned.ttl
```

Modo silencioso:
```bash
scripts/validate-owl.sh --quiet
```

## Salida esperada (ROBOT)
1. Merge: crea el archivo merged.
2. Validación de perfil: informa de constructs fuera del perfil (warnings si hay problemas).
3. Razonamiento: genera axiomas derivados, clasifica jerarquías.
4. Informes de warnings si alguno de los pasos devuelve código distinto de cero.

## Códigos de salida
| Código | Significado |
|--------|-------------|
| 0 | Ejecución exitosa (puede tener warnings informados). |
| 1 | No se encontró ningún validador. |
| 2 | Sin ontologías de entrada (lista vacía). |
| >0 | Códigos internos de herramientas (en fallback RIOT normalmente 0 salvo error sintáctico). |

## Fallback RIOT
Si ROBOT no está presente, se valida cada archivo individual con `riot --validate`. Esto NO realiza razonamiento ni verifica perfil OWL DL profundo.

## Troubleshooting
| Problema | Posible causa | Solución |
|----------|---------------|----------|
| Merge con warnings | Triples no OWL o errores sintácticos | Revisar merged y limpiar triples ajenos a OWL. |
| Perfil falla | Uso de construct fuera de DL | Ajustar axiomas al perfil DL o cambiar a OWL2 si procede. |
| Razonador falla | Inconsistencia lógica | Inspeccionar reasoned y buscar clases equivalentes a `owl:Nothing`. |
| Nada se valida | Sin ontologías descubiertas | Verificar ruta `ontology/` o usar `--inputs`. |

## Integración Docker
Ejecutar dentro del contenedor (desde raíz del repo):
```bash
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-owl.sh"
```

