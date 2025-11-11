# 02 · Cómo se Usa la Ontología y Para Qué

## Resumen en una Frase
Estandariza el significado y la forma de los datos de residuos para que distintos sistemas (generación, transporte, control, reporte) puedan entenderse y validarse automáticamente.

## Problemas que Resuelve
| Problema | Sin ontología | Con ontología |
|----------|---------------|--------------|
| Inconsistencia de nombres | `resType`, `tipoResiduo`, `waste_kind` | Propiedad única y documentada |
| Validaciones incompletas | Reglas dispersas en código | Shapes centralizan reglas |
| Dificultad de integrar fuentes | Mapeos ad-hoc | Mapeo a vocabulario estándar |
| Evolución caótica | Cambios sin traza semántica | Versionado y comentarios |
| Reutilización de códigos | Listas locales divergentes | Codelists semánticos referenciados |

## Casos de Uso Principales
1. Intercambio de datos entre plataformas (API a API) con formato Turtle o JSON-LD.
2. Validación automática de declaraciones de residuos antes de su envío a una autoridad.
3. Normalización interna: ETL que mapea columnas de DB a IRIs de la ontología.
4. Análisis avanzado: consultas SPARQL sobre grafo consolidado.
5. Auditoría: ver quién añadió qué concepto y cuándo (historial + versionado).
6. Extensión sectorial: añadir subclases específicas (ej. MARPOL) sin romper núcleo.

## Flujo de Integración Típico (Aplicación Consumidora)
1. Descargar versión publicada (tag/commit) de ontologías y shapes.
2. Cargar ontología en motor RDF (Jena, RDFLib, GraphDB…).
3. Mapear campos internos → IRIs (diccionario de mapeo).
4. Generar instancia JSON-LD o TTL.
5. Ejecutar validación SHACL previa a enviar/almacenar.
6. Si OK → Persistir/enviar a API externa.
7. Registrar logs con hash de commit de ontología usada (trazabilidad).

## Ejemplo de Mapeo Conceptual
| Campo DB | Significado | IRI Ontología |
|----------|-------------|---------------|
| waste_type_code | Código tipo residuo | `:residueType` (valor SKOS del codelist) |
| quantity_kg | Cantidad en kg | `:hasQuantity` (xsd:decimal) |
| origin_port | Puerto origen | `:puertoOrigen` |

## Ejemplo JSON-LD Simplificado
```json
{
  "@context": {
    "res": "https://ontology.circularpass.io/digitalWastePassport/",
    "code": "https://ontology.circularpass.io/digitalWastePassport/code/"
  },
  "@type": "res:Residuo",
  "res:residueType": {"@id": "code:Organic"},
  "res:hasQuantity": {"@value": 1200, "@type": "http://www.w3.org/2001/XMLSchema#decimal"},
  "res:puertoOrigen": {"@id": "res:Puerto-ESBCN"}
}
```