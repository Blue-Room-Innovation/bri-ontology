## Artefactos de build/ (técnico con ejemplos sencillos)

La carpeta `build/` guarda artefactos generados por la tubería OWL para facilitar inspección y pruebas del modelo.

Cómo se generan
- Comando (Docker): `docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling validate-owl`
- Pasos (ROBOT):
  1) `merge` de `ontology/*.ttl` → `build/dpp-merged.ttl` (grafo unificado, sin añadir axiomas nuevos).
  2) `validate-profile` (perfil OWL 2 DL) sobre el merged.
  3) `reason` (HermiT) → `build/dpp-reasoned.ttl` (grafo con algunas consecuencias lógicas materializadas).

Ficheros principales y uso recomendado

1) `build/dpp-merged.ttl` (grafo fusionado)
- Qué es: unión determinista de todos los módulos OWL del repo. Contiene solo axiomas afirmados en las fuentes.
- Para qué sirve:
  - Entregar un “single-file ontology” a herramientas que no manejan múltiples imports/archivos.
  - Ejecutar SPARQL o validaciones sobre el modelo unificado.
  - Depurar el modelo combinado sin efectos del razonador.
- ¿Publicarlo? Recomendación:
  - Mantén `ontology/` como fuente canónica (normativa).
  - Puedes publicar el `merged` como artefacto de conveniencia para consumo externo (no normativo). Versiona y alinea su ciclo con la ontología.
- Ejemplo mínimo (idéntico en las fuentes y en merged):
  ```turtle
  ex:A rdfs:subClassOf ex:B .
  ex:B rdfs:subClassOf ex:C .
  # merged contiene exactamente estas dos líneas (y lo demás declarado en las fuentes).
  ```

2) `build/dpp-reasoned.ttl` (grafo razonado)
- Qué es: el grafo de `merged` más axiomas “inferidos” por el razonador (materialización parcial de consecuencias: cierres de jerarquía, equivalencias, etc.).
- Para qué sirve:
  - Verificar jerarquías y alineaciones (¿aparecen equivalencias o subclases esperadas?).
  - Detectar consecuencias no deseadas (equivalencias accidentales, ciclos, etc.).
  - Acelerar consultas cuando interesa tener el cierre ya materializado.
- ¿Publicarlo? Recomendación:
  - No como ontología canónica: suele ser más verboso y depende del razonador/configuración.
  - Úsalo como artefacto de inspección, demostración o entrega opcional (marcar “no normativo”).
- Ejemplos sencillos de inferencias:
  - Transitividad de subclase:
    ```turtle
    ex:A rdfs:subClassOf ex:B .
    ex:B rdfs:subClassOf ex:C .
    # En reasoned aparece además (inferido):
    ex:A rdfs:subClassOf ex:C .
    ```
  - Equivalencia de clases desplegada:
    ```turtle
    ex:X owl:equivalentClass ex:Y .
    # El razonado puede incluir ambas direcciones como subclases (forma normal):
    ex:X rdfs:subClassOf ex:Y .
    ex:Y rdfs:subClassOf ex:X .
    ```
  - Equivalencia de propiedades (idea análoga):
    ```turtle
    ex:hasPart owl:equivalentProperty schema:hasPart .
    # El razonado puede reflejarlo como:
    ex:hasPart rdfs:subPropertyOf schema:hasPart .
    schema:hasPart rdfs:subPropertyOf ex:hasPart .
    ```

Notas y buenas prácticas
- Los artefactos de `build/` describen el modelo (TBox), no instancias de datos.
- Usa `merged` para integraciones y tooling que prefieren “un solo archivo”.
- Usa `reasoned` para comprobar consecuencias lógicas; no lo sustituyas por la ontología fuente.
- Si ves avisos en el proceso, revisa `docs/interpretar-resultados.md` para entender su impacto.
