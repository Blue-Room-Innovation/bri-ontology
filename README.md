## Digital Waste Passport Toolkit

Bienvenido. Este repositorio contiene la ontología (OWL/RDF) y shapes (SHACL) para el Pasaporte Digital de Residuos (núcleo) y su extensión MARPOL. Incluye tooling de validación, ejemplos reproducibles y alineaciones opcionales con UNTP y EPCIS.

Resumen rápido:
- Modelo (OWL): clases y relaciones núcleo + MARPOL → ver `docs/01-introduccion-modelo.md`.
- Validación (SHACL): contrato de datos → ver `docs/04-shapes-reglas.md`.
- Instalación y pruebas inmediatas: `docs/02-instalacion-validacion.md`.
- Ejemplos válidos / inválidos: `docs/05-ejemplos.md`.

Si quieres ejecutar algo ya, salta a Quickstart.

### ¿Qué es el Pasaporte Digital de Residuos?
Credencial verificable con la información clave del residuo y su ciclo de vida. La variante MARPOL añade atributos marítimos (buque, puertos, medios descarga, cantidades a bordo / a entregar).

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
Flujo: seguir `docs/08-contribuir-extender.md` → validar (`docs/02` / `docs/04`) → abrir PR con motivación y ejemplos actualizados.

### Notas técnicas
- Stubs externos: `ontology/external-declarations.ttl` (ver 14).
- Scripts estandarizados: `scripts/validate-owl.sh`, `scripts/validate-shacl.sh`.
- `build/` se regenera; no editar manualmente.

### Licencia y reutilización
Indica aquí la licencia (añadir si se define). Si reutilizas, cita la fuente y enlaza este repositorio.

---

### Próximos pasos sugeridos
1. Leer `docs/01-introduccion-modelo.md`.
2. Ejecutar validaciones (`docs/02-instalacion-validacion.md`).
3. Revisar shapes (`docs/04-shapes-reglas.md`).
4. Mirar ejemplos (`docs/05-ejemplos.md`).
5. Extender según guía (`docs/08-contribuir-extender.md`).