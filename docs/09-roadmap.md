# 9. Roadmap y taxonomías

Prioridades:
1. Migrar shapes legado a modelo Waste / MARPOL completo.
2. Shapes específicos MARPOL (cardinalidades residuo vs puertos).
3. Validación estricta de códigos (SHACL `sh:in` + SPARQL ASK complementario).
4. CI automatizado (ROBOT + pySHACL + reporte HTML).
5. Eventos EPCIS integrados en ejemplos avanzados.
6. Taxonomías SKOS nuevas (estado manejo, método tratamiento, alcance regulatorio).
7. Patrones de extensión documentados (nuevas regulaciones futuras).

Taxonomías (plan):
- Estado manejo: almacenado, en tránsito, entregado.
- Método tratamiento: incineración, reciclaje, vertido controlado.
- Alcance regulatorio: MARPOL, local, transfronterizo.

Pasos para cada taxonomía:
1. Crear `taxonomy/<nombre>.ttl` con `skos:ConceptScheme`.
2. Definir 5–10 conceptos iniciales.
3. Añadir shape de pertenencia al esquema.
4. Añadir propiedad al ejemplo correspondiente.
5. Revalidar.

Contribuciones bienvenidas (ver `08-contribuir-extender.md`).