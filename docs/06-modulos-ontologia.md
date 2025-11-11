# 6. Módulos de ontología

Archivos y roles actuales:
- `ontology/digitalWastePassport.ttl`: núcleo Waste Passport (DigitalWastePassport, WastePassport, Waste, propiedades básicas).
- `ontology/digitalMarpolWastePassport.ttl`: extensión MARPOL (Ship, ResidueInformation, códigos, cantidades).
- `ontology/gs1-epcis.ttl`: eventos EPCIS (opcional para granularidad de trazabilidad).
- `ontology/external-declarations.ttl`: stubs mínimos (IRIs externas para reducir warnings).
- `ontology/codelists/*.ttl`: esquemas SKOS importados (códigos de tipo/subtipo residuo, medios descarga, ISO país, UN/LOCODE, tipo entrega).

Build (`validate-owl`): merge núcleo + extensión(es) + codelists → reasoning → artefactos (`build/dpp-merged.ttl`, `build/dpp-reasoned.ttl`). Renombrado pendiente.

Buenas prácticas:
- Declarar clases estables en el núcleo.
- Extensiones reguladas (MARPOL u otras futuras) en archivos separados.
- Alineaciones fuertes solo si semántica exacta (si no, usar SKOS mapping).

Más sobre artefactos: `09-build-artefactos.md`.
