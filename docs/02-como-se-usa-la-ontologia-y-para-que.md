# 02 · Cómo se Usa la Ontología y Para Qué

## Resumen en una Frase
Proporciona un vocabulario común basado en estándares UNECE para representar, intercambiar y validar datos de pasaportes digitales de residuos de forma consistente entre sistemas heterogéneos.

## Problemas que Resuelve
| Problema | Sin ontología | Con ontología |
|----------|---------------|--------------|
| **Inconsistencia semántica** | Cada sistema usa nombres diferentes: `resType`, `tipoResiduo`, `waste_kind` | Vocabulario único y documentado basado en UNECE: `unece:productName` |
| **Validaciones fragmentadas** | Reglas de negocio dispersas en cada aplicación | Shapes SHACL centralizados y reutilizables |
| **Interoperabilidad limitada** | Mapeos manuales punto a punto entre sistemas | Transformación declarativa a vocabulario estándar |
| **Trazabilidad de cambios** | Modificaciones sin control de versión semántico | Versionado OWL (`owl:versionInfo`) + control git |
| **Listas de códigos divergentes** | Catálogos locales incompatibles entre organizaciones | Codelists SKOS referenciables y alineados con ISO/UNECE |

## Flujo de Integración Típico (Aplicación Consumidora)
1. **Obtener artefactos**: Descargar versión específica (tag/release) de ontologías, shapes y codelists desde el repositorio.
2. **Configurar entorno RDF**: Cargar ontología en librería semántica (Apache Jena, RDFLib, rdflib.js) o triplestore (GraphDB, Fuseki).
3. **Definir mapeo**: Crear tabla de correspondencias entre modelo de datos interno y propiedades ontológicas (ej: `db.weight_kg` → `unece:weightQuantity`).
4. **Generar instancias**: Serializar datos como JSON-LD o Turtle siguiendo la estructura de clases de la ontología.
5. **Validar con SHACL**: Ejecutar motor de validación contra shapes antes de persistir o transmitir datos.
6. **Gestionar conformidad**: Si hay violaciones, rechazar o corregir; si es válido, proceder con la operación.
7. **Registrar trazabilidad**: Almacenar metadata de validación (versión ontología, timestamp, hash commit) para auditoría.

## Ejemplo de Mapeo Conceptual
| Campo DB | Significado | IRI Ontología |
|----------|-------------|---------------|
| product_name | Nombre del residuo | `unece:productName` (xsd:string) |
| weight_kg | Peso en kilogramos | `unece:weightQuantity` (xsd:decimal) |
| origin_country | País de origen | `unece:originCountry` (referencia ISO 3166) |
| batch_id | Identificador de lote | `unece:hasBatchIdentifier` (xsd:string) |

## Ejemplo JSON-LD Simplificado
Ver el archivo completo en `examples/digital-waste-passport-sample.jsonld` para un ejemplo detallado. Estructura básica:

```json
{
  "@context": {
    "dwp": "https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalWastePassport.ttl#",
    "unece": "https://test.uncefact.org/vocabulary/untp/core/0/",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@id": "ex:wastePassport1",
  "@type": "dwp:WastePassport",
  "dwp:waste": {
    "@id": "ex:waste1",
    "@type": "dwp:Waste",
    "unece:productName": "PCB Scrap",
    "unece:weightQuantity": {"@value": "1250", "@type": "xsd:decimal"},
    "unece:originCountry": {"@id": "https://vocabulary.uncefact.org/CountryId#DE"}
  }
}
```