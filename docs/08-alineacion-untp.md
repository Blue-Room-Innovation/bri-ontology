---
title: "8. Alineación UNTP"
description: "Correspondencias entre clases y propiedades DPP y vocabularios UNTP."
tags: [untp, alineacion]
---

# 8. Alineación UNTP

Clases equivalentes (ejemplos):
- `ProductPassport ≡ untpdpp:ProductPassport`
- `Product ≡ untpcore:Product`
- `Facility ≡ untpcore:Facility`

Propiedades equivalentes:
- `describesProduct ≡ untpcore:product`
- `hasMaterialProvenance ≡ untpcore:materialsProvenance`
- `circularityScorecard ≡ untpcore:circularityScorecard`

Datos: `serialNumber ≡ untpcore:serialNumber`, `lotNumber ≡ untpcore:batchNumber`.

Usa alineaciones fuertes solo si semántica exacta; si dudas, utiliza `skos:closeMatch`.
