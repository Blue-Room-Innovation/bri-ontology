# 03 · Cómo Crear o Editar una Ontología

> Esta guía cubre el ciclo completo para extender el modelo semántico: desde decidir si hace falta una nueva clase hasta versionar y publicar el cambio.

## Objetivo
Proporcionar pasos claros y criterios de decisión para cambios en `ontology/*.ttl` manteniendo consistencia y calidad.

## Diferencia: ¿Nueva Ontología o Editar Existente?
| Situación | Acción | Ejemplo |
|-----------|--------|---------|
| Nuevo dominio conceptual independiente | Crear nuevo archivo `.ttl` | Pasaporte MARPOL marítimo vs pasaporte genérico |
| Añadir atributo a clase ya existente | Editar ontología actual | Agregar propiedad `hasTransportMode` a `Waste` |
| Refinar etiqueta/descripción | Editar existente e incrementar versión | Mejorar comentario `rdfs:comment` para mayor claridad |
| Romper compatibilidad (cambiar rango o significado) | Editar, incrementar versión y documentar breaking change | Cambiar `unece:weightQuantity` de decimal a objeto `Measure` |

## Estructura Mínima de un Archivo Ontología
```ttl
@prefix : <https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/myDomain.ttl#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix unece: <https://test.uncefact.org/vocabulary/untp/core/0/> .

<https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/myDomain.ttl> 
  rdf:type owl:Ontology ;
  owl:versionInfo "0.1" ;
  rdfs:comment "Ontología para el dominio específico, extendiendo modelo UNECE"@es ;
  rdfs:label "My Domain Ontology"@en .

:Waste a owl:Class ; 
  rdfs:subClassOf unece:Product ;
  rdfs:label "Waste"@en ;
  rdfs:comment "Material o sustancia gestionada como residuo"@es .

:hasOriginPort a owl:ObjectProperty ; 
  rdfs:label "has origin port"@en ;
  rdfs:domain :Waste ; 
  rdfs:range :Port .

:Port a owl:Class ; 
  rdfs:label "Port"@en ;
  rdfs:comment "Puerto marítimo o instalación portuaria"@es .
```

## Buenas Prácticas de Nomenclatura
- **Clases**: PascalCase (`Waste`, `WastePassport`, `MarpolWaste`).
- **Propiedades**: camelCase (`hasQuantity`, `credentialSubject`, `arrivalPort`).
- **Idioma**: Preferir inglés para identificadores, usar `rdfs:label` multiidioma para etiquetas.
- **Evitar**: Abreviaturas opacas (`qty`, `resTyp`, `wst`).
- **URIs estables**: No cambiar base URI sin causa mayor y versionado explícito.

## Añadir una Nueva Clase
1. Crear declaración `:NuevaClase a owl:Class`.
2. Añadir `rdfs:label` y `rdfs:comment` (idioma `@es` y opcional `@en`).
3. Definir relaciones clave (propiedades existentes o nuevas). 
4. Actualizar shape si requiere validación (obligatoriedad, tipos).
5. Añadir ejemplo que la use.

## Añadir una Nueva Propiedad
1. Elegir tipo: `owl:ObjectProperty` o `owl:DatatypeProperty`.
2. Definir `rdfs:domain` y `rdfs:range` (o SHACL para restricciones avanzadas).
3. Etiquetas y comentario claro.
4. Si valores restringidos → crear codelist / SKOS.
5. Actualizar shape para cardinalidad y obligatoriedad.
6. Ejemplo que contenga la propiedad.

## Proceso Paso a Paso (Editar)
1. **Crear rama git**: `git checkout -b feature/add-transport-mode`
2. **Localizar archivo**: Abrir archivo relevante en `ontology/` (ej: `digitalWastePassport.ttl`)
3. **Aplicar cambios**: Editar con editor de texto o Protégé, añadiendo comentarios `rdfs:comment`
4. **Actualizar versión**: Incrementar `owl:versionInfo` (ej: de `"0.1"` a `"0.2"`)
5. **Ajustar shapes**: Modificar reglas SHACL en `shapes/*.ttl` si es necesario
6. **Crear/actualizar ejemplo**: Añadir instancia en `examples/` que use la nueva funcionalidad
7. **Validar**: Ejecutar scripts `validate-owl.sh` y `validate-shacl.sh` (ver `04-como-validar-ontologias.md`)
8. **Actualizar catálogos**: Si es nueva ontología/codelist, añadir entrada en `docs/00-domains/`
9. **Pull Request**: Crear PR con descripción de cambios y resultados de validación

## Buenas Prácticas de Versionado
El versionado se gestiona mediante `owl:versionInfo` con formato incremental simple (ej: `"0.1"`, `"0.2"`, `"1.0"`).

| Tipo de Cambio | Estrategia de Versión | Ejemplo |
|----------------|----------------------|----------|
| **Cambios menores** (labels, comentarios, documentación) | Incrementar decimal: `0.1` → `0.2` | Mejorar `rdfs:comment` |
| **Añadir elementos** (nuevas clases/propiedades compatibles) | Incrementar decimal: `0.5` → `0.6` | Añadir propiedad `hasRecyclingCode` |
| **Breaking changes** (eliminar, renombrar, cambiar semántica) | Incrementar entero: `0.9` → `1.0` | Cambiar rango de propiedad |

**Recomendación**: Documentar cambios en commit message y comentarios de la ontología.

## Deprecación de Elementos
1. **Marcar como deprecado**: Añadir anotación `owl:deprecated true` y comentario explicativo
2. **Mantener temporalmente**: Dejar elemento deprecado durante al menos una versión
3. **Eliminar**: Quitar en siguiente versión mayor con breaking changes documentados

```ttl
:oldProperty a owl:ObjectProperty ;
  owl:deprecated true ;
  rdfs:comment "DEPRECADO: Usar :newProperty en su lugar. Se eliminará en v2.0"@es .
```

## Próximos Pasos
Tras crear o editar:
- **Validar**: Ejecutar validaciones OWL y SHACL (ver `04-como-validar-ontologias.md`)
- **Revisar estructura**: Consultar convenciones del repositorio (`01-overview-estructura.md`)
- **Shapes**: Si introduces restricciones complejas, actualizar o crear shapes SHACL correspondientes
- **Documentación**: Regenerar wiki con `generate-wiki.py` (ver `05-como-generar-la-wiki.md`)
- **Testing**: Verificar que ejemplos existentes siguen siendo válidos con los cambios
