## Toolkit Ontología DPP

Bienvenido. Si nunca has trabajado con ontologías o pasaportes digitales de producto (Digital Product Passport, DPP), este repositorio ofrece una implementación abierta del modelo semántico (OWL/RDF) y sus reglas de validación (SHACL) para describir productos, su ciclo de vida y eventos de trazabilidad. Lo usamos para experimentar con alineaciones internacionales (UN/CEFACT UNTP) y con el estándar de eventos GS1 EPCIS.

En pocas palabras:
- OWL define las clases y propiedades (qué cosas puedes decir de un producto).
    Ejemplo mínimo OWL (clase y propiedad):
    ```ttl
    dpp:Product a owl:Class .
    dpp:hasGTIN a owl:DatatypeProperty ; rdfs:domain dpp:Product ; rdfs:range xsd:string .
    ```
    Uso: declarar que `ex:Producto123 a dpp:Product` y añadir `dpp:hasGTIN "123"`. Más sobre OWL: https://www.w3.org/TR/owl2-overview/
- SHACL define restricciones (qué forma debe tener una instancia válida de un pasaporte digital).
    Ejemplo mínimo SHACL (shape para GTIN):
    ```ttl
    ex:ProductShape a sh:NodeShape ;
        sh:targetClass dpp:Product ;
        sh:property [ sh:path dpp:hasGTIN ; sh:datatype xsd:string ; sh:minCount 1 ] .
    ```
    Uso: valida que todo `dpp:Product` tenga al menos un `hasGTIN` literal string. Más sobre SHACL: https://www.w3.org/TR/shacl/
- Ejemplos y scripts te permiten validar rápido y extender el modelo.
    Ejemplo de ejecución rápida (Docker):
    ```powershell
    docker run --rm -v ${PWD}:/work dpp-toolkit bash docs/validation/scripts/validate-shacl.sh examples/product-sample.ttl
    ```
        Herramientas:
        - ROBOT (https://robot.obolibrary.org/): aunque nació en el ámbito de ontologías biomédicas, es una herramienta genérica para OWL. Aquí lo usamos para tareas repetibles del pipeline ontológico: merge de módulos (`merge`), comprobación básica de perfil OWL (`validate`), razonamiento para obtener axiomas implícitos (`reason`) y extracción/debug de términos (`extract`, `query`). Su ventaja es que encapsula buenas prácticas y permite scripts reproducibles sin escribir Java manualmente.
            Ejemplo (merge + reason):
            ```powershell
            robot merge --input ontology/dpp.ttl --input ontology/dpp-extensions.ttl --output build/dpp-merged.ttl ; \
            robot reason --input build/dpp-merged.ttl --output build/dpp-reasoned.ttl
            ```
        - pySHACL (https://github.com/RDFLib/pySHACL): librería Python para ejecutar validaciones SHACL sobre instancias RDF. La usamos para asegurar que los pasaportes (ejemplos y datos reales) cumplen las shapes (cardinalidades, tipos, formatos). Permite integrar en CI y obtener informes detallados (con severidades). 
            Ejemplo (validación simple):
            ```powershell
            python -m pyshacl -s shapes/dpp-shapes.ttl -m rdfs -i examples/product-sample.ttl
            ```

Si solo quieres ver algo funcionando, ve directo a la sección "Quickstart" más abajo.

### ¿Qué es un DPP?
Un Pasaporte Digital de Producto es un conjunto estructurado de datos que acompaña al producto físico durante su ciclo de vida (fabricación, uso, mantenimiento, reciclaje). Permite trazabilidad, transparencia y cumplimiento normativo. Aquí lo expresamos en RDF para interoperabilidad y razonamiento automático.

---

### Quickstart

1. Explora el ejemplo completo (TTL):
```ttl
@prefix dpp: <https://w3id.org/dpp#> .
@prefix ex: <https://example.org/product/> .

ex:Producto123 a dpp:Product ;
    dpp:hasGTIN "12345678901234" ;
    dpp:hasManufacturer "ACME Corp" ;
    dpp:hasMaterial [ a dpp:Material ; dpp:materialName "Acero" ] .
```

2. Mira el equivalente JSON-LD simplificado:
```jsonld
{
    "@context": "https://w3id.org/dpp/context.jsonld",
    "@id": "https://example.org/product/Producto123",
    "@type": "Product",
    "hasGTIN": "12345678901234",
    "hasManufacturer": "ACME Corp",
    "hasMaterial": {
        "@type": "Material",
        "materialName": "Acero"
    }
}
```

3. Validar vía Docker (sin instalar nada más):
```powershell
docker build -t dpp-toolkit ./docker
docker run --rm -v ${PWD}:/work dpp-toolkit bash docs/validation/scripts/validate-owl.sh
docker run --rm -v ${PWD}:/work dpp-toolkit bash docs/validation/scripts/validate-shacl.sh examples/product-sample.ttl
```

4. Validar nativo (si tienes Java 17 + Python): ver `docs/getting-started/installation.md`. Resumen:
```powershell
# OWL merge + reason (ROBOT) - ejemplo orientativo
robot merge --input ontology/dpp.ttl --input ontology/dpp-extensions.ttl --output build/dpp-merged.ttl ; \
robot reason --input build/dpp-merged.ttl --output build/dpp-reasoned.ttl

# SHACL (pySHACL)
python -m pyshacl -s shapes/dpp-shapes.ttl -m rdfs -i examples/product-sample.ttl
```

5. Ver un informe de errores rápido (usa el ejemplo inválido):
```powershell
python -m pyshacl -s shapes/dpp-shapes.ttl -m rdfs -i examples/invalid-product-sample.ttl
```

Más ejemplos y explicación detallada en `docs/validation/shacl-examples.md` y `docs/guides/validar-ontologia.md`.

---

### Estructura del repositorio
```
ontology/        # Ontología principal y módulos
shapes/          # Shapes SHACL de validación
examples/        # Instancias ejemplo (válidas e inválidas)
docs/            # DocumentaciA3n (portada en docs/index.md)
docs/validation/scripts/  # Scripts usados en Docker para validaciA3n
docker/          # Imagen base (Java + ROBOT + pySHACL)
build/           # Artefactos generados (merged, reasoned, etc.)
```

---

### DocumentaciA3n detallada
Puntos de entrada principales en docs/ (ver docs/index.md):
- IntroducciA3n y primeros pasos: docs/getting-started/overview.md, docs/getting-started/installation.md, docs/getting-started/quick-validation.md
- Conceptos del modelo: docs/concepts/data-model.md, docs/concepts/ontology-modules.md, docs/concepts/epcis-alignment.md, docs/concepts/untp-alignment.md
- Referencia tAcnica: docs/reference/shapes.md, docs/reference/ontology.md, docs/reference/iri-warnings.md
- GuA-as prA-cticas: docs/guides/validar-ontologia.md, docs/guides/build.md, docs/guides/interpretar-resultados.md, docs/guides/paso-a-paso-construccion.md
- Ejemplos SHACL: docs/validation/shacl-examples.md

Lee primero docs/concepts/data-model.md si buscas entender el modelo; o salta a docs/getting-started/quick-validation.md para ejecutar casos reales.

---

### Contribuir
Para proponer nuevas clases, propiedades o shapes:
1. Revisa el impacto en reasoning (ROBOT) y validación SHACL.
2. Sigue el flujo descrito en `docs/guides/paso-a-paso-construccion.md`.
3. Abre un issue o PR explicando la motivación y ejemplos de uso.

### Notas técnicas
- `ontology/external-declarations.ttl` incluye IRIs mínimos para reducir warnings en validación OWL. Más informaicón en `docs/reference/iri-warnings.md`
- Los scripts toleran warnings OWL para no bloquear iteraciones rápidas de SHACL.
- La carpeta `build/` se regenera; no edites manualmente los TTL ahí.

### Licencia y reutilización
Indica aquí la licencia (añadir si se define). Si reutilizas, cita la fuente y enlaza este repositorio.

---

### Próximos pasos sugeridos
1. Leer `docs/concepts/data-model.md` (visión general).
2. Ejecutar validación rápida con Docker (Quickstart paso 3).
3. Modificar una clase y seguir la guía `docs/guides/paso-a-paso-construccion.md`.