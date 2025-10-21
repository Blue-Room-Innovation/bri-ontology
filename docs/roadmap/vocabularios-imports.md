# Roadmap: Gestión futura de vocabularios externos (stubs ≠ imports)

Fecha: 2025-10-21

Este documento captura la explicación narrativa (la "charla" de decisión) sobre si mantener `external-declarations.ttl` o migrar a importar vocabularios completos / subsets. Úsalo como guía antes de tocar nada.

---
## 1. ¿Por qué existe `external-declarations.ttl`?
Porque hoy solo necesitamos que el validador deje de quejarse de IRIs externas (Schema.org, GS1, UNTP, etc.) cuyo tipo no conoce. El archivo añade stubs mínimos (Class / ObjectProperty / DatatypeProperty) para silenciar warnings y permitir builds reproducibles offline. No aporta semántica rica.

Beneficios actuales:
- Cero dependencia de disponibilidad externa.
- Menos ruido en validación (centrados en errores reales).
- Build ligero y rápido.

Limitaciones:
- No aprovechamos axiomas externos (domain, range, jerarquías, equivalencias).
- Reasoning potencial desaprovechado.

---
## 2. ¿Cuándo pasar de stubs a imports reales?
Deberíamos considerar importar (o extraer subset) si se da alguna de estas condiciones:
1. Necesitamos inferencias derivadas de domain/range o jerarquías externas.
2. Queremos validar con SHACL usando tipos inferidos de vocabularios externos.
3. Requerimos trazabilidad formal (auditoría: "esta equivalencia viene de Schema.org vX").
4. Aparecen cada vez más stubs del mismo vocabulario → señal de que usamos bastante ese vocabulario.

Si ninguna aplica, mantener stubs = coste mínimo.

---
## 3. Opciones disponibles (resumen conceptual)
1. Mantener stubs (status quo).
2. Import completo (`owl:imports`).
3. Subset con ROBOT (`extract` método MIREOT/BOT) sólo de términos usados.
4. Generar stubs automáticamente (script) para acelerar mantenimiento.

---
## 4. Pros y contras comparados (en texto)
Mantener stubs: +Simple +Offline +Control / -Sin semántica rica.
Import completo: +Semántica total +Menos mantenimiento manual / -Peso -Riesgo de cambios externos.
Subset ROBOT: +Equilibrio semántica↔tamaño +Reproducible / -Requiere script y actualización.
Stubs auto-generados: +Menos trabajo manual / -Añade tooling y posible complejidad inicial.

---
## 5. Camino migratorio seguro (pasos concretos)
1. Inventariar IRIs externas reales (consulta SPARQL).
2. Agrupar por vocabulario y cuantificar frecuencia.
3. Decidir estrategia por grupo (matriz simple: uso bajo → stub, uso medio → subset, uso alto crítico → import).
4. Crear `ontology/imports.ttl` si hay al menos un import.
5. Ejecutar build comparativo (antes/después) midiendo: tamaño (triples) y tiempo de `robot reason`.
6. Validar shapes; revisar si aparecen violaciones nuevas inesperadas.
7. Migrar stubs de un vocabulario por iteración (PRs pequeñas).
8. Eliminar `external-declarations.ttl` solo cuando esté vacío.

---
## 6. Consulta SPARQL para detectar IRIs externas sin declaración
```sparql
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?iri
WHERE {
  ?s ?p ?iri .
  FILTER (isIRI(?iri))
  FILTER (STRSTARTS(STR(?iri), "https://w3id.org/dpp#") = false)
  FILTER NOT EXISTS { ?iri a ?t . }
}
ORDER BY ?iri
```
Ejecutar con ROBOT:
```bash
robot query --input build/dpp-merged.ttl --query externals.sparql externals.tsv
```

---
## 7. Ejemplo de extracción de subset con ROBOT
```bash
robot extract \
  --method MIREOT \
  --input full-schemaorg.owl \
  --upper-term "http://schema.org/Product" \
  --lower-term "http://schema.org/Offer" \
  --output imports/schemaorg-subset.ttl
```
(Ajustar términos según jerarquía real y necesidad.)

---
## 8. Métricas a vigilar tras cada cambio
- Triples en `dpp-merged.ttl` y `dpp-reasoned.ttl`.
- Tiempo de reasoning (segundos).
- Nº warnings OWL.
- Nº IRIs externas sin declaración.

Objetivo: mejoras semánticas sin degradar demasiado tiempo (<30s razonamiento orientativo) ni introducir warnings nuevos.

---
## 9. Riesgos y mitigaciones (lista breve)
- Performance: limitar tamaño de subsets → medir en cada PR.
- Semántica no deseada: revisar diff de axiomas inferidos antes de merge.
- Drift de versión externa: anotar versión/fecha del vocabulario importado.
- Sobremantenimiento de subsets: script reproducible (Make/ROBOT) documentado.

---
## 10. Decisiones pendientes iniciales
- [ ] Generar inventario actual de IRIs.
- [ ] Clasificar por vocabulario y frecuencia.
- [ ] Elegir qué vocabulario piloto migrar (candidato: el de mayor frecuencia > X usos).

Cuando se complete el piloto, re-evaluar si mantener enfoque híbrido.

---
## 11. Referencias
- ROBOT: https://robot.obolibrary.org/
- OWL 2 Overview: https://www.w3.org/TR/owl2-overview/
- SHACL: https://www.w3.org/TR/shacl/
- IRI RFC 3987: https://www.rfc-editor.org/rfc/rfc3987

---
Actualiza este roadmap marcando checkboxes y añadiendo métricas al avanzar.
