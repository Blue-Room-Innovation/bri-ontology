# IRIs y Warnings en Validación OWL

Los validadores OWL avisan cuando usamos IRIs externas (p.ej. de Schema.org) sin declaración local. Para reducir ese ruido mantenemos stubs mínimos en `ontology/external-declarations.ttl`.

Este documento explica por qué aparecen *warnings* relacionados con IRIs y cómo los gestionamos.

## 1. ¿Qué es un IRI?
Un **IRI (Internationalized Resource Identifier)** es un identificador global único para recursos en la Web Semántica. Es una evolución de la URL que permite caracteres Unicode. En RDF/OWL las IRIs identifican:
- Clases (ej: `https://w3id.org/dpp#Product`)
- Propiedades (ej: `https://w3id.org/dpp#hasGTIN`)
- Individuos / instancias (ej: `https://example.org/product/Producto123`)

Diferencia simple con una URL tradicional: una URL suele apuntar a un documento recuperable; una IRI en ontologías puede no devolver nada al navegar, pero sigue siendo un identificador estable.

## 2. ¿Por qué aparecen warnings?
Herramientas de validación OWL (como ROBOT) intentan verificar que todas las IRIs referenciadas tengan una declaración básica (tipo de recurso) dentro de los archivos cargados o importados. Si usamos una IRI externa (ej: de Schema.org, GS1, UNTP) sin incluir su definición local, el validador no puede saber si es una clase, propiedad de datos, propiedad de objeto, etc. Genera entonces mensajes como:
```
WARNING: Referenced IRI <https://schema.org/Product> not defined.
WARNING: Referenced IRI <https://schema.org/manufacturer> not defined.
```
Estos warnings generan ruido y dificultan ver problemas reales.

## 3. Estrategia: stubs mínimos
Creamos el archivo `ontology/external-declarations.ttl` que contiene **stubs** (declaraciones mínimas) para las IRIs externas que usamos, por ejemplo:
```ttl
@prefix schema: <https://schema.org/> .

schema:Product a owl:Class .
schema:manufacturer a owl:ObjectProperty .
```
Esto satisface al validador: ya conoce el tipo de cada IRI y deja de mostrar el warning. Importante: **no** estamos redefiniendo Schema.org; solo añadimos la mínima información estructural.

## 4. Buenas prácticas al crear stubs
- Incluir solo el tipo (Class, ObjectProperty, DatatypeProperty) y, opcionalmente, una etiqueta (`rdfs:label`).
- No inventar axiomas (domain, range, equivalencias) si no los has verificado en la fuente original.
- Agrupar todos los stubs en un único archivo para facilitar mantenimiento.
- Documentar la fuente original si la semántica pudiera ser crítica.

## 5. Cuándo NO usar stubs
Evita añadir un stub si:
- Necesitas toda la semántica del vocabulario (mejor importar oficialmente el archivo RDF completo si la licencia lo permite).
- La IRI podría cambiar o no está estable (espera confirmación antes de congelarla).
- Estás modelando algo que requiere razonamiento complejo (propiedades con restricciones) donde un stub incompleto podría llevar a inferencias erróneas.

## 6. Alternativas a los stubs
- **Importar el vocabulario completo**: usando `owl:imports` hacia el archivo oficial. Pros: semántica completa; Contras: mayor tamaño, posibles dependencias transitivas.
- **Generar un subset** (extracción con ROBOT `extract`) para incluir solo lo que necesitas.

## 7. Flujo recomendado al añadir una nueva IRI externa
1. Añadir la IRI en tu ontología o ejemplo.
2. Ejecutar validación OWL.
3. Si aparece warning de no definida y no quieres (o no puedes) importar el vocabulario completo, agregar stub al archivo `external-declarations.ttl`.
4. Re-ejecutar validación para confirmar que el warning desaparece.
5. Si la IRI se vuelve crítica (más allá de un simple identificador), evaluar reemplazar stub por import oficial.

## 8. Ejemplo de mejora incremental
Inicialmente:
```ttl
schema:manufacturer a owl:ObjectProperty .
```
Más adelante, cuando necesites semántica:
```ttl
schema:manufacturer a owl:ObjectProperty ;
  rdfs:domain schema:Organization ;
  rdfs:range schema:Organization .
```
(Verificar primero en la fuente oficial antes de añadir domain/range.)

## 9. Preguntas frecuentes (FAQ)
- ¿Genera problemas tener stubs? No, si son mínimos. Solo reducen ruido de warnings.
- ¿Necesito publicar los stubs? Sí, quedan versionados como parte del repositorio para reproducibilidad.
- ¿Puedo mezclar stubs y imports? Sí, pero evita duplicar definiciones del mismo recurso con axiomas distintos.

## 10. Referencias
- OWL Overview: https://www.w3.org/TR/owl2-overview/
- SHACL: https://www.w3.org/TR/shacl/
- Schema.org: https://schema.org/
- ROBOT: https://robot.obolibrary.org/
