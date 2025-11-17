# 03 · Cómo Crear o Editar una Ontología

> Esta guía cubre el ciclo completo para extender el modelo semántico: desde decidir si hace falta una nueva clase hasta versionar y publicar el cambio.

## Objetivo
Proporcionar pasos claros y criterios de decisión para cambios en `ontology/*.ttl` manteniendo consistencia y calidad.

## Diferencia: ¿Nueva Ontología o Editar Existente?
| Situación | Acción | Ejemplo |
|-----------|--------|---------|
| Nuevo dominio conceptual independiente | Crear nuevo archivo `.ttl` | Pasaporte residuos marítimos vs pasaporte terrestre |
| Añadir atributo a clase ya existente | Editar ontología actual | Agregar `hasTransportType` a `Residuo` |
| Refinar etiqueta/descripción | Editar existente (PATCH version) | Cambiar comentario para mayor claridad |
| Romper compatibilidad (cambiar rango o significado) | Editar y subir MAJOR | Cambiar `hasQuantity` de literal a objeto |

## Checklist de Decisión Antes de Crear
- ¿El concepto puede modelarse como extensión (subclase) en ontología existente? Si sí → evita nuevo archivo.
- ¿Comparte >50% de vocabulario con otro dominio? Posible reutilización preferida.
- ¿Requiere reglas propias (shapes) significativamente distintas? Podría justificar nueva ontología + shape.

## Estructura Mínima de un Archivo Ontología
```ttl
@prefix : <mi-dominio/ontolgia#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

: a owl:Ontology ;
  owl:versionInfo "0.1" ;
  rdfs:comment "Ontología inicial del dominio Mi Dominio"@es .

:Residuo a owl:Class ; rdfs:label "Residuo"@es ; rdfs:comment "Material o sustancia gestionada"@es .
:puertoOrigen a owl:ObjectProperty ; rdfs:label "puerto origen"@es ; rdfs:domain :Residuo ; rdfs:range :Puerto .
:Puerto a owl:Class ; rdfs:label "Puerto"@es .
```

## Buenas Prácticas de Nomenclatura
- Clases: PascalCase (`ResiduoQuimico`).
- Propiedades: camelCase (`hasQuantity`, `puertoOrigen`).
- Evita abreviaturas opacas (`qty`, `resTyp`).
- Prefijos estables y cortos (no cambiar URIs base salvo MAJOR).

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
1. Crear rama
2. Localizar archivo en `ontology/` y abrirlo.
3. Aplicar cambios con comentarios que expliquen razón (`# Cambio: ...`), puedes usar Protégé.
4. Actualizar `owl:versionInfo` según tipo de cambio.
5. Ajustar shapes (`shapes/*.ttl`).
6. Añadir/actualizar ejemplo.
7. Ejecutar validaciones `10-como-validar-ontologias.md`
8. Actualizar catálogos si es nueva ontología/codelist.
9. Pull Request con lista de cambios y resultados de validación.

## Buenas Prácticas de Versionado
| Tipo | Cuándo |
|------|--------|
| PATCH | Texto, comentario, label |
| MINOR | Añadir clases/propiedades compatibles |
| MAJOR | Cambios que rompen integraciones, renombres, eliminación |

## Deprecación
1. Anunciar en comentario: `# Deprecado: usar :nuevaPropiedad`.
2. Mantener ambas durante un ciclo MINOR.
3. Eliminar en siguiente MAJOR con nota en PR.

## Próximos Pasos
Tras crear o editar:
- Validar (ver `10-como-validar-ontologias.md`).
- Revisar estructura general (`09-overview-estructura.md`).
- Si introduce lógica compleja → planificar shapes adicionales.
