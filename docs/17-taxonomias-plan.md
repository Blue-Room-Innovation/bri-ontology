# 17. Taxonomías plan

Necesidades SKOS (residuos):
- Clasificación ampliada de residuos (por peligrosidad / origen).
- Método de tratamiento (incineración, reciclaje, vertido controlado).
- Estado de manejo (almacenado, en tránsito, entregado).
- Alcance regulatorio (MARPOL, local, transfronterizo).

Pasos:
1. Crear `taxonomy/` archivos (ej. `taxonomy/waste_handling_status.ttl`).
2. Definir esquema (`skos:ConceptScheme`) + 5–10 conceptos iniciales.
3. Añadir shapes para validar pertenencia a esquema.
4. Extender ejemplos (añadir estado a MarpolWaste).
5. Revalidar SHACL y ajustar documentación.

Usar este archivo como checklist hasta completar.
