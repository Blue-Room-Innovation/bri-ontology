# 9. Artefactos de build

`build/waste-merged.ttl`: unión determinista de módulos (digitalWastePassport + digitalMarpolWastePassport + stubs/codelists).
`build/waste-reasoned.ttl`: merged + inferencias (jerarquías desplegadas, consecuencias lógicas de subclases y equivalencias).

Usos:
- merged: entregar un único archivo y ejecutar SPARQL sin dependencia de archivos múltiples.
- reasoned: auditar inferencias (detecta equivalencias accidentales o clases redundantes).

Nota: renombrado completado. Ajustar scripts CI si apuntaban a nombres anteriores.

No publicar el reasoned como ontología canónica: depende del razonador y versión de herramientas.

Comandos en: `10-validar-ontologia-y-pasaportes.md`.
