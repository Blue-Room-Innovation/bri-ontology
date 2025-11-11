# 12. Construcción paso a paso

Flujo recomendado:
1. Elegir archivo: núcleo (`digitalWastePassport.ttl`) vs extensión regulatoria (`digitalMarpolWastePassport.ttl`).
2. Definir clase/propiedad (label + comment claro + domain/range si aplica).
3. Evaluar si requiere alineación UNTP (solo si semántica exacta) o mapping SKOS.
4. Actualizar shapes (añadir restricciones nuevas: códigos, cardinalidades, datatypes).
5. Extender ejemplos TTL / JSON-LD (añadir nuevo bloque de residuo / credencial).
6. Validar (OWL → SHACL) y revisar warnings.
7. Checklist PR (ver `19-contribuir.md`).

Ejemplo (añadir clase adicional de actor especializado en MARPOL):
```turtle
dwpm:SpecializedWasteHandler a owl:Class ;
  rdfs:label "Gestor especializado de residuo"@es ;
  rdfs:comment "Entidad especializada en la manipulación de residuos MARPOL específicos."@es .

dwpm:handledBy a owl:ObjectProperty ;
  rdfs:domain :MarpolWaste ;
  rdfs:range  dwpm:SpecializedWasteHandler ;
  rdfs:comment "Asocia un residuo MARPOL con el gestor especializado que lo manipula."@es .
```

Tras definir, crear shape (ej. exigir `handledBy` si tipo de residuo = cierto código) y actualizar ejemplo MARPOL.
