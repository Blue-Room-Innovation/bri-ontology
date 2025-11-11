# 9. Artefactos de build

`build/dpp-merged.ttl`: unión determinista de módulos (digitalWastePassport + digitalMarpolWastePassport + stubs/codelists).
`build/dpp-reasoned.ttl`: merged + inferencias (jerarquías desplegadas, consecuencias lógicas de subclases y equivalencias).

Usos:
- merged: entregar un único archivo y ejecutar SPARQL sin dependencia de archivos múltiples.
- reasoned: auditar inferencias (detecta equivalencias accidentales o clases redundantes).

Nota: prefijo "dpp" es histórico; se renombrará cuando termine la migración completa a Digital Waste Passport.

No publicar el reasoned como ontología canónica: depende del razonador y versión de herramientas.

Comandos en: `10-validar-ontologia-y-pasaportes.md`.
