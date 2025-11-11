## Toolkit de Ontologías y Taxonomías

> Repositorio para modelar, validar y evolucionar pasaportes digitales y sus taxonomías asociadas mediante OWL + SHACL + listas controladas (codelists). Este README resume y enlaza la documentación detallada ubicada en `docs/`.

### 1. Objetivo y Alcance
Estandarizar el significado y la forma de datos intercambiados entre sistemas (generación, transporte, control, reporte) usando:
- Ontologías (`ontology/*.ttl`) para vocabulario: clases y propiedades versionadas.
- Codelists (`ontology/codelists/*.ttl`) para valores controlados (SKOS/códigos).
- Shapes SHACL (`shapes/*.ttl`) para reglas de calidad y conformidad.
- Ejemplos (`examples/*.ttl`/`.jsonld`) para prueba y documentación.

Dominios actuales:
- Waste Core (pasaporte digital de residuo genérico).
- Waste MARPOL (extensión marítima regulatoria).
Se prevén futuros dominios siguiendo misma gobernanza y convenciones.

### 2. Conceptos Clave
| Concepto | Carpeta | Rol | Analogía |
|----------|--------|-----|----------|
| Ontología | `ontology/*.ttl` | Modelo semántico | Esquema relacional |
| Codelist | `ontology/codelists/*.ttl` | Lista de valores | Tabla códigos |
| Shape SHACL | `shapes/*.ttl` | Reglas de uso/validación | Constraints |
| Ejemplo | `examples/*.ttl` / `.jsonld` | Instancia ilustrativa | Dataset prueba |
| Artefactos build | `build/` | Resultado reasoning + reportes | Carpeta artefactos |
| Scripts | `scripts/*.sh` | Comandos validación | Utilidades build |
| Imagen Docker | `docker/Dockerfile` | Entorno reproducible | Contenedor |
| Docs | `docs/*.md` | Guías y catálogos | Manual/wiki |

### 3. Catálogo de Ontologías
ver `docs/00-domains/00-catalogo-ontologias.md`

### 4. Catálogo de Codelists
Ver `docs/00-domains/00-catalogo-taxonomias.md`

### 5. Estructura del Repositorio
```
ontology/              Ontologías núcleo y extensiones
ontology/codelists/    Listas controladas SKOS
shapes/                Shapes SHACL de validación
examples/              Instancias ejemplo (TTL / JSON-LD)
docs/                  Documentación temática
scripts/               Scripts de validación
docker/                Dockerfile tooling
build/                 Artefactos generados (merge, inferred, reports)
```

### 6. Flujo de Uso en una Aplicación
Ver `docs/02-como-se-usa-la-ontologia-y-para-que.md`

### 7. Crear o Editar una Ontología
Ver: `docs/03-como-crear-o-editar-ontologia.md`

### 8. Validación Detallada
Ver `docs/04-como-validar-ontologias.md`

### 9. Licencia y Reutilización
Licencia: pendiente de confirmación. Al reutilizar:
- Mantener prefijos y referencias a catálogo.
- Citar origen y versión (`owl:versionInfo` + commit).
- Para cambios mayores proponer issue y debatir gobernanza.

### 10. Próximos Pasos Sugeridos
1. Revisar catálogos (`docs/00-domains/00-catalogo-ontologias.md`, `docs/00-domains/00-catalogo-taxonomias.md`).
2. Leer visión general (`docs/01-overview-estructura.md`).
3. Entender casos de uso (`docs/02-como-se-usa-la-ontologia-y-para-que.md`).
4. Practicar validación (`docs/04-como-validar-ontologias.md`).
5. Examinar ontologías y shapes en la carpeta correspondiente.
