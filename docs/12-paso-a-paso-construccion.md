---
title: "12. Construcción paso a paso"
description: "Procedimiento para añadir clases, propiedades, shapes y ejemplos."
tags: [edicion, guia]
---

# 12. Construcción paso a paso

Flujo:
1. Elegir archivo correcto (núcleo vs extensión vs alineación).
2. Definir clase/propiedad (label + comment + domain/range si aplica).
3. Añadir alineaciones externas prudentes.
4. Actualizar shapes (nuevas restricciones).
5. Extender ejemplos.
6. Validar (OWL → SHACL).
7. Checklist PR.

Ejemplo de clase + propiedad en `dpp-extensions.ttl` para no romper núcleo:
```turtle
dpp:SustainabilityClaim a owl:Class ;
  rdfs:label "Declaración de sostenibilidad"@es ;
  rdfs:comment "Afirmación verificable asociada a un producto."@es .

dpp:hasClaim a owl:ObjectProperty ;
  rdfs:domain dpp:Product ;
  rdfs:range  dpp:SustainabilityClaim .
```

Actualizar shape correspondiente y ejemplo TTL, luego validar.
