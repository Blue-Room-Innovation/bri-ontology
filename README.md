## Ontology & Taxonomy Toolkit

Repositorio genérico para múltiples ontologías de pasaportes digitales y taxonomías asociadas. La primera familia incorporada es la de residuos (Waste Passport núcleo + MARPOL). Más dominios (energía, agua, activos) se añadirán siguiendo la misma gobernanza.

Resumen rápido:
- Catálogo ontologías → `docs/CATALOGO-ONTOLOGIAS.md`.
- Catálogo taxonomías/codelists → `docs/CATALOGO-TAXONOMIAS.md`.
- Visión genérica → `docs/generic/overview.md`.
- Instalación/validación → `docs/generic/installation-validation.md`.
- Arquitectura build → `docs/generic/architecture-build.md`.
- Shapes contrato (genérico) → `docs/generic/shapes-contract.md`.
- Dominio Waste → `docs/domains/waste/overview.md`.

### ¿Qué es una ontología en este toolkit?
Representa el modelo semántico de una credencial o dominio (clases, propiedades, alineaciones externas) versionado y validable. Cada ontología se publica con su prefijo base y registro en el catálogo.

### Ejemplo: Pasaporte Digital de Residuos
Credencial verificable con la información clave de un residuo o lote. La extensión MARPOL añade elementos regulatorios marítimos (buque, puertos, medios de descarga, cantidades). Detalle completo en `docs/domains/waste/overview.md`.

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

### Documentación (orden sugerido)
Genérico:
1. `docs/CATALOGO-ONTOLOGIAS.md`
2. `docs/CATALOGO-TAXONOMIAS.md`
3. `docs/generic/overview.md`
4. `docs/generic/installation-validation.md`
5. `docs/generic/architecture-build.md`
6. `docs/generic/shapes-contract.md`
7. `docs/08-contribuir-extender.md`
8. `docs/09-roadmap.md`

Dominio Waste:
- `docs/domains/waste/overview.md`
- `docs/domains/waste/shapes.md`
- `docs/domains/waste/examples.md`
- `docs/domains/waste/vocabularies.md`
- `docs/domains/waste/roadmap.md`

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
1. Catálogos (`docs/CATALOGO-ONTOLOGIAS.md`, `docs/CATALOGO-TAXONOMIAS.md`).
2. Entender arquitectura genérica (`docs/generic/overview.md`).
3. Validar entorno (`docs/generic/installation-validation.md`).
4. Revisar dominio Waste (`docs/domains/waste/overview.md`).
5. Ejecutar ejemplos (`docs/domains/waste/examples.md`).
6. Contribuir (`docs/08-contribuir-extender.md`).