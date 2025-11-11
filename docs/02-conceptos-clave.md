---
title: "2. Conceptos clave"
description: "Resumen rápido de entidades principales sin jerga técnica pesada."
tags: [conceptos, resumen]
---

# 2. Conceptos clave

Piensa en el DPP como una ficha enriquecida conectada a un producto físico.

Entidades básicas:
- Producto (`Product`): lo que recibe un pasaporte.
- Pasaporte (`DigitalProductPassport` / `ProductPassport`): conjunto de metadatos y enlaces a scorecards, identificadores y trazabilidad.
- Identificador (`Identifier`): números de serie, GTIN, lote.
- Organización / Instalación: quién fabrica y dónde.
- Material / Proveniencia: de qué está hecho y de dónde viene.
- Evento de ciclo de vida (`LifecycleEvent`): hitos relevantes (fabricado, mantenido, reciclado...).
- Evento EPCIS: granularidad de trazabilidad GS1 (movimientos, transformaciones). Solo si lo necesitas.
- Scorecards (Circularidad / Emisiones): indicadores cuantitativos.

Relación mental mínima:
Pasaporte → describe → Producto → compuesto por → Componentes / Materiales → fabricado en → Instalación → con eventos y métricas.

Con esto en mente lee `03-instalacion.md` para poner el entorno y validar un ejemplo.
