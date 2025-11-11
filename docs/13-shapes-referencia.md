---
title: "13. Shapes referencia"
description: "Resumen funcional de las reglas SHACL más relevantes."
tags: [shapes, referencia]
---

# 13. Shapes referencia

Reglas núcleo:
- `DigitalProductPassport`: requiere emisión (`dct:issued`), estándar (`dct:conformsTo`), relación con producto y ≥1 identificador.
- `Product`: exige `schema:name` + identificador (GTIN/serial/mpn) y fabricante.
- `Identifier`: necesita al menos un dato (`gtin` / `serialNumber` / `mpn`).
- `LifecycleEvent`: fecha inicio + agente asociado.

Extensiones:
- Scorecards: huella de carbono + unidad declarada, indicadores de circularidad.
- EPCIS: `eventTime` + `bizStep` obligatorios; ObjectEvent con EPCs.

Usar shapes como contrato para datos de entrada. Si falta algo, SHACL te lo dirá.
