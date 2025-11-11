---
title: "6. Módulos de ontología"
description: "Cómo se divide la ontología en archivos y cuándo editar cada uno."
tags: [modulos, arquitectura]
---

# 6. Módulos de ontología

Archivos y roles:
- `ontology/dpp.ttl`: núcleo (clases/propiedades base).
- `ontology/dpp-extensions.ttl`: extensiones experimentales/optativas.
- `ontology/alignments-untp.ttl`: equivalencias con UNTP.
- `ontology/gs1-epcis.ttl`: eventos EPCIS y conexión con trazabilidad.
- `ontology/external-declarations.ttl`: stubs mínimos para IRIs externas.

Build simplificado (`validate-owl`): merge → perfil DL → reasoning → artefactos en `build/`.

Buenas prácticas:
- Un concepto se declara una sola vez (núcleo si estable).
- Extensiones nuevas empiezan en `dpp-extensions.ttl` hasta consenso.
- Alineaciones fuertes solo si semántica exacta (si no, `skos:exactMatch`).

Detalles de artefactos: `09-build-artefactos.md`.
