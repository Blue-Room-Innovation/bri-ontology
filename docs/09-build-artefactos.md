# 9. Artefactos de build

`build/dpp-merged.ttl`: unión determinista de módulos (solo axiomas afirmados).
`build/dpp-reasoned.ttl`: merged + inferencias (subclases transitivas, equivalencias desplegadas, etc.).

Usos:
- merged: entregar un único archivo, consultas SPARQL limpias.
- reasoned: inspeccionar consecuencias lógicas, detectar equivalencias accidentales.

No publicar reasoned como ontología canónica: depende del razonador.

Ver comandos: `10-validar-ontologia-y-pasaportes.md`.
