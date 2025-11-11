# Overview (Genérico)

Este toolkit soporta múltiples dominios de pasaportes digitales y sus taxonomías.

Componentes comunes:
- Ontologías OWL: definen clases y propiedades por dominio.
- Taxonomías / Codelists SKOS: listas controladas y esquemas conceptuales.
- Shapes SHACL: contrato de validación para instancias.
- Artefactos build: merged + reasoned (no canónico) para consultas y auditoría.

Flujo genérico:
1. Seleccionar dominio y crear ontología base.
2. Añadir taxonomías/codelists necesarias.
3. Definir shapes (NodeShapes y PropertyShapes) referenciando ontología.
4. Crear ejemplos mínimos (TTL / JSON-LD).
5. Validar local (OWL → SHACL).
6. Registrar en catálogos (`CATALOGO-ONTOLOGIAS.md`, `CATALOGO-TAXONOMIAS.md`).

Instalación y validación: `installation-validation.md`.
