# 10. Validar ontología y pasaportes

Scripts Docker:
- OWL: `validate-owl`
- SHACL: `validate-shacl <archivo.ttl>`

Nativo:
- ROBOT merge + reason (ver `04-validacion-express.md`).
- pySHACL con shapes: `python -m pyshacl -s shapes/dpp-shapes.ttl -i examples/product-sample.ttl`

Consejo: primero OWL (estructura), luego SHACL (instancias).

Interpretación de salida: `11-interpretar-resultados.md`.
