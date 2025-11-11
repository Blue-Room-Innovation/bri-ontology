# Arquitectura & Build (Genérico)

Estructura recomendada:
```
ontology/                # Ontologías por dominio
  digitalWastePassport.ttl
  digitalMarpolWastePassport.ttl
  codelists/
shapes/                  # Shapes (pueden ser por dominio o compartidos)
examples/                # Instancias por dominio
build/                   # Artefactos merged / reasoned
```

Pipeline (`validate-owl`):
1. Merge ontologías seleccionadas + codelists → `build/*-merged.ttl`.
2. Reason → `build/*-reasoned.ttl`.
3. Validar SHACL ejemplos.

Convenciones:
- Prefijos estables.
- Reasoned no es versión canónica.
- Alineaciones externas justificadas.
