---
title: "7. Alineación EPCIS"
description: "Cómo conectamos DPP con eventos GS1 EPCIS y CBV."
tags: [epcis, trazabilidad]
---

# 7. Alineación EPCIS

Eventos soportados: Object, Aggregation, Transformation, Transaction.

Propiedades clave:
- `eventTime`, `bizStep`, `disposition`, `bizLocation`, `readPoint`, `epc`.

Shape resumen:
- `EPCISEventShape`: tiempo + paso de negocio obligatorio.
- `ObjectEventShape`: exige ≥1 EPC.

Diagrama:
```mermaid
flowchart TD
  TRC[TraceabilityInformation] --> EV[EPCISEvent]
  EV --> OE[ObjectEvent]
  EV --> AGG[AggregationEvent]
  EV --> TRN[TransformationEvent]
  EV --> TXN[TransactionEvent]
```

Más en ontología: `ontology/gs1-epcis.ttl`.

UNTP alineaciones en `08-alineacion-untp.md`.
