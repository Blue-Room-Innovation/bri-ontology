# 6. Alineaciones externas

UNTP:
- `DigitalWastePassport ⊑ unece:VerifiableCredential`
- `WastePassport ≡ unece-dpp:ProductPassport`
- `Waste ≡ unece:Product`

Clases MARPOL sin equivalentes directos (usar `skos:closeMatch` / `skos:related` si aparecen futuras definiciones en UNTP).

EPCIS (eventos opcionales):
- ObjectEvent con `eventTime`, `bizStep` mínimos.
- Válido para granularidad adicional de movimientos / entregas.

Criterios alineación vs mapping:
- Igual semántica → equivalencia / subclase.
- Similar pero no idéntica → SKOS mapping.
- Dudosa / incompleta → mantener separada y documentar.

Siguiente: `07-vocabularios-warnings.md`.