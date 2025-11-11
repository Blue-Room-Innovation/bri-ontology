## Ontology & Taxonomy Toolkit

Repositorio genérico para múltiples ontologías de pasaportes digitales y taxonomías asociadas. La primera familia incorporada es el Pasaporte Digital de Residuos (núcleo + MARPOL). Se añadirán más dominios (energía, agua, circularidad de activos) siguiendo la misma gobernanza.

Resumen rápido:
- Catálogo ontologías → `docs/CATALOGO-ONTOLOGIAS.md`.
- Catálogo taxonomías / codelists → `docs/CATALOGO-TAXONOMIAS.md`.
- Modelo Waste (núcleo + MARPOL) → `docs/01-introduccion-modelo.md`.
- Validación (SHACL) → `docs/04-shapes-reglas.md`.
- Instalación genérica → `docs/02-instalacion-validacion.md`.
- Ejemplos → `docs/05-ejemplos.md`.

### ¿Qué es una ontología en este toolkit?
Representa el modelo semántico de una credencial o dominio (clases, propiedades, alineaciones externas) versionado y validable. Cada ontología se publica con su prefijo base y registro en el catálogo.

### ¿Qué es el Pasaporte Digital de Residuos?
Credencial verificable con la información clave de un residuo o lote. La extensión MARPOL añade elementos regulatorios marítimos (buque, puertos, medios descarga, cantidades). Se apoya en codelists SKOS y shapes SHACL para garantizar conformidad.

---

### Quickstart (mínimo)

1. Ejecuta validación OWL (merge + reasoning) con Docker:
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl
```
2. Valida ejemplo núcleo (SHACL):
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-waste-passport-sample.ttl"
```
3. Valida ejemplo MARPOL:
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "validate-shacl examples/digital-marpol-waste-passport-sample.ttl"
```
4. Revisa resultados (Conforms True/False). Para interpretar violaciones ver `docs/04-shapes-reglas.md`.

Para más detalles sobre instalación y alternativas nativas: `docs/02-instalacion-validacion.md`.

---

### Estructura del repositorio
```
ontology/      # Ontología principal y módulos
shapes/        # Shapes SHACL
examples/      # Instancias ejemplo
docs/          # Documentación consolidada (01–09 + glosario)
scripts/       # Scripts de validación
docker/        # Dockerfile tooling
build/         # Artefactos generados (merged, reasoned)
```

---

### Documentación (orden recomendado)
01 Introducción y modelo → `docs/01-introduccion-modelo.md`
02 Instalación y validación → `docs/02-instalacion-validacion.md`
03 Arquitectura y build → `docs/03-arquitectura-build.md`
04 Shapes y reglas → `docs/04-shapes-reglas.md`
05 Ejemplos → `docs/05-ejemplos.md`
06 Alineaciones externas → `docs/06-alineaciones.md`
07 Vocabularios y warnings → `docs/07-vocabularios-warnings.md`
08 Contribuir y extender → `docs/08-contribuir-extender.md`
09 Roadmap y taxonomías → `docs/09-roadmap.md`
20 Glosario → `docs/20-glosario.md`

---

### Contribuir
Flujo general: crear rama → añadir/editar ontología o taxonomía → actualizar catálogos → añadir/ajustar shapes → validar (OWL + SHACL) → actualizar ejemplos → abrir PR con motivación y evidencias.
Guía detallada: `docs/08-contribuir-extender.md`.

### Notas técnicas
- Prefijos coherentes por dominio (`https://ontology.circularpass.io/<slug>/`).
- Stubs/vocabularios externos: ver política en `docs/07-vocabularios-warnings.md`.
- Scripts: `scripts/validate-owl.sh` y `scripts/validate-shacl.sh` (contenidos en imagen Docker).
- Artefactos de reasoning NO son ontología canónica.

### Licencia y reutilización
Indicar licencia (pendiente). Para reutilización: mantener prefijos y citar el catálogo correspondiente. Cambios mayores → abrir issue para debatir gobernanza.

---

### Próximos pasos sugeridos
1. Revisar catálogos (`docs/CATALOGO-ONTOLOGIAS.md`, `docs/CATALOGO-TAXONOMIAS.md`).
2. Leer modelo Waste (`docs/01-introduccion-modelo.md`).
3. Ejecutar validaciones (`docs/02-instalacion-validacion.md`).
4. Analizar shapes (`docs/04-shapes-reglas.md`).
5. Explorar ejemplos (`docs/05-ejemplos.md`).
6. Contribuir siguiendo (`docs/08-contribuir-extender.md`).