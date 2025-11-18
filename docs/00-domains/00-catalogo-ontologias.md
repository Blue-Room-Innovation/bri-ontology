# Catálogo de Ontologías

> [!IMPORTANT]
Inventario de modelos semánticos disponibles en este repositorio. Todas las ontologías están basadas en estándares **UNECE (United Nations Economic Commission for Europe)** para asegurar interoperabilidad internacional.

## Estados de Madurez
- **Experimental**: En desarrollo activo, puede cambiar significativamente
- **Beta**: Estructura estable, refinando detalles
- **Stable**: Producción, cambios requieren versionado mayor

## Ontologías Disponibles

| Ontología | Archivo | URL | Namespace | Base UNECE | Propósito | Versión | Estado |
|-----------|---------|-----|-----------|------------|-----------|---------|--------|
| **Digital Waste Passport** | `digitalWastePassport.ttl` | [📄 v0.1](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalWastePassport.ttl) | `dwp:` | `unece:VerifiableCredential`<br/>`unece-dpp:ProductPassport` | Pasaporte digital genérico para trazabilidad de residuos | 0.1 | Beta |
| **Digital MARPOL Waste Passport** | `digitalMarpolWastePassport.ttl` | [📄 v0.1](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalMarpolWastePassport.ttl) | `marpol:` | Extiende Digital Waste Passport | Pasaporte específico para residuos marítimos bajo regulación MARPOL | 0.1 | Beta |

## Shapes SHACL Asociados

| Ontología | Archivo Shape | URL |
|-----------|---------------|-----|
| **Digital Waste Passport** | `digitalWastePassportShapes.ttl` | [🔍 v0.1](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/shapes/digitalWastePassportShapes.ttl) |
| **Digital MARPOL Waste Passport** | `digitalMarpolWastePassportShapes.ttl` | [🔍 v0.1](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/shapes/digitalMarpolWastePassportShapes.ttl) |

## Recursos de Diseño

- **Diagramas conceptuales**: [Perfil sysadmin en Jargon.sh](https://jargon.sh/user/sysadmin)

