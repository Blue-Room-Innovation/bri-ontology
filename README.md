## Toolkit de Ontologías y Taxonomías

> Repositorio para modelar, validar y evolucionar pasaportes digitales y sus taxonomías asociadas mediante OWL + SHACL + listas controladas (codelists). Este README resume y enlaza la documentación detallada ubicada en `docs/`.

### 1. Objetivo y Alcance
Estandarizar el significado y la forma de datos intercambiados entre sistemas (generación, transporte, control, reporte) usando:
- Ontologías (`ontology/*.ttl`) para vocabulario: clases y propiedades versionadas.
- Codelists (`ontology/codelists/*.ttl`) para valores controlados (SKOS/códigos).
- Shapes SHACL (`shapes/*.ttl`) para reglas de calidad y conformidad.
- Ejemplos (`examples/*.ttl`/`.jsonld`) para prueba y documentación.

> [!IMPORTANT]
Esta ontología está basada en los estándares y modelos de datos de la [UNECE (United Nations Economic Commission for Europe)](https://unece.org/), adaptándolos a las necesidades específicas de los pasaportes digitales de residuos.

Dominios actuales:
- Waste Core (pasaporte digital de residuo genérico).
- Waste MARPOL (extensión marítima regulatoria).
Se prevén futuros dominios siguiendo misma gobernanza y convenciones.

> 📋 **URLs y enlaces directos**: Ver catálogo en `docs/00-domains/00-catalogo-ontologias.md` para acceder a las ontologías y shapes publicados.

> 📖 **Wiki de ontologías**: Documentación autogenerada de clases, propiedades y diagramas en `docs/wiki/` (ver `docs/05-como-generar-la-wiki.md`).

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
Ver `docs/01-overview-estructura.md`

### 6. Flujo de Uso en una Aplicación
Ver `docs/02-como-se-usa-la-ontologia-y-para-que.md`

### 7. Crear o Editar una Ontología
Ver: `docs/03-como-crear-o-editar-ontologia.md`

### 8. Validación Detallada
Ver `docs/04-como-validar-ontologias.md`

### 9. Generación de JSON Schema desde SHACL
SHACL es la fuente de verdad semántica, pero para validación estructural de documentos JSON y generación de contratos de API, se puede derivar automáticamente JSON Schema:

```bash
# Generar JSON Schema para Digital Waste Passport
python scripts/shacl-to-jsonschema.py \
  --input shapes/digitalWastePassportShapes.ttl \
  --output build/digitalWastePassport.schema.json

# Generar JSON Schema para Digital MARPOL Waste Passport  
python scripts/shacl-to-jsonschema.py \
  --input shapes/digitalMarpolWastePassportShapes.ttl \
  --output build/digitalMarpolWastePassport.schema.json
```

**⚠️ Importante:** JSON Schema generado **NO** es una conversión semántica completa:
- ✅ Valida estructura de documentos JSON/JSON-LD
- ✅ Sirve como contrato de API y para generación de tipos TypeScript
- ❌ NO captura toda la semántica de SHACL (sh:sparql, lógica compleja, etc.)
- ❌ NO reemplaza la validación SHACL para contextos RDF

Ver documentación completa en:
- **ADR:** `docs/01-adr/01.ADR-005 Derivació automàtica de JSON Schema des de SHACL.md`
- **Script:** `scripts/shacl-to-jsonschema.md`

### 10. Licencia y Reutilización
Licencia: pendiente de confirmación. Al reutilizar:
- Mantener prefijos y referencias a catálogo.
- Citar origen y versión (`owl:versionInfo` + commit).
- Para cambios mayores proponer issue y debatir gobernanza.

### 11. Próximos Pasos Sugeridos
1. Revisar catálogos (`docs/00-domains/00-catalogo-ontologias.md`, `docs/00-domains/00-catalogo-taxonomias.md`).
2. Leer visión general (`docs/01-overview-estructura.md`).
3. Entender casos de uso (`docs/02-como-se-usa-la-ontologia-y-para-que.md`).
4. Practicar validación (`docs/04-como-validar-ontologias.md`).
5. Examinar ontologías y shapes en la carpeta correspondiente.
