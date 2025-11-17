# Catálogo de Ontologías

> Inventario de modelos semánticos disponibles en este repositorio. Todas las ontologías están basadas en estándares UNECE (United Nations Economic Commission for Europe) para asegurar interoperabilidad internacional.

## Estados de Madurez
- **Experimental**: En desarrollo activo, puede cambiar significativamente
- **Beta**: Estructura estable, refinando detalles
- **Stable**: Producción, cambios requieren versionado mayor

## Ontologías Disponibles

| Ontología | Archivo | Namespace | Base UNECE | Propósito | Versión | Estado |
|-----------|---------|-----------|------------|-----------|---------|--------|
| **Digital Waste Passport** | `digitalWastePassport.ttl` | `dwp:` | `unece:VerifiableCredential`<br/>`unece-dpp:ProductPassport` | Pasaporte digital genérico para trazabilidad de residuos | 0.1 | Beta |
| **Digital MARPOL Waste Passport** | `digitalMarpolWastePassport.ttl` | `marpol:` | Extiende Digital Waste Passport | Pasaporte específico para residuos marítimos bajo regulación MARPOL | 0.1 | Beta |