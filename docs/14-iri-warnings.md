# 14. IRIs y warnings

Motivo: el razonador/validador desconoce si una IRI externa (codelist, UNTP, etc.) es clase/propiedad → warning.
Solución rápida: stubs mínimos en `external-declarations.ttl`.
Migrar a import completo cuando: necesitas semántica formal (domain/range inferencias) o volumen alto del mismo vocabulario.

Flujo:
1. Añadir IRI de codelist (ej. `residue-type-code`).
2. Validar OWL.
3. Si warning repetitivo → crear stub.
4. Si se requiere jerarquía o restricciones → realizar import / subset con ROBOT.

Más detalles: `16-vocabularios-imports.md`.
