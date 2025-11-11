# 11. Interpretar resultados

OWL (ROBOT):
- Éxito: artefactos creados sin errores.
- Warnings: IRIs de codelists / UNTP sin definición local (ver `14-iri-warnings.md`).
- Fallos reasoning: posibles ciclos o equivalencias inadvertidas (revisar subclases MARPOL).

SHACL:
- `Conforms: True` → OK.
- `Conforms: False` → inspeccionar cada violación: nodo foco (DigitalWastePassport / WastePassport / ResidueInformation), propiedad, constraint (`sh:minCount`, `sh:in`, `sh:datatype`).

Errores comunes:
- Falta de `credentialSubject` en el DigitalWastePassport.
- Pasaporte sin relación `waste`.
- Código de tipo/subtipo fuera de codelist (`sh:in`).
- Fechas mal tipadas (`xsd:string` vs `xsd:dateTime`).

Siguiente: edición ontología (`12-paso-a-paso-construccion.md`).
