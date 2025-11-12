# 04 · Cómo Validar Ontologías, Shapes y Ejemplos

## Objetivo
Centralizar los comandos y criterios para comprobar que:
- Las ontologías cargan y razonan correctamente.
- Los shapes SHACL confirman el cumplimiento de las reglas.
- Los ejemplos representan instancias válidas.

## Componentes que Validamos
- Ontologías(`ontology/*.ttl`): Sintaxis RDF/OWL y consistencia + reasoning
- Shapes(`shapes/*.ttl`): Reglas SHACL (targets, propiedades, cardinalidades, tipos, valores)
- Codelists(`ontology/codelists/*.ttl`): Accesibilidad de IRIs y uso en shapes/ejemplos
- Ejemplos(`examples/*.ttl|.jsonld`): Conformidad con shapes y vocabulario

## Comandos Esenciales (PowerShell)
### 0. Construir la imagen Docker
Antes de ejecutar cualquier validación necesitas tener la imagen local `bri-ontology-tooling` basada en el `Dockerfile` del repositorio.

Dentro de la raíz del proyecto ejecuta:
```powershell
docker build -t bri-ontology-tooling -f docker/Dockerfile .
```

Si estás en PowerShell y quieres forzar reconstrucción (sin cache):
```powershell
docker build --no-cache -t bri-ontology-tooling -f docker/Dockerfile .
```

Verifica que existe la imagen:
```powershell
docker images bri-ontology-tooling
```

La imagen incluye:
- OpenJDK 17 + ROBOT (razonamiento y operaciones OWL)
- Python + pySHACL (validación de shapes)
- Scripts `validate-owl` y `validate-shacl` copiados al PATH

Actualiza la imagen solo cuando:
- Cambies dependencias (Java, Python, pySHACL versión, etc.)
- Modifiques scripts en `scripts/*.sh`
- Añadas nuevas herramientas para el pipeline

Consejo: si solo cambias ontologías (`ontology/*.ttl`), shapes o ejemplos, NO necesitas reconstruir la imagen; basta con montar el volumen.

### 1. Ejemplo de validación SHACL (Verificar si los datos cumplen con las reglas definidas en los shapes)
En una validación SHACL, se comparan dos tipos de archivos:
- Datos (data) → contienen las _instancias reales_, es decir, los recursos y valores concretos (por ejemplo, un pasaporte de residuos con su contenido).
- Shapes (shapes) → definen las _reglas_ o _restricciones_ que los datos deben cumplir (por ejemplo, qué propiedades son obligatorias, tipos esperados, formatos, etc.).

El proceso de validación verifica si los datos cumplen con las reglas descritas en los shapes.

Las validaciones se realizan usando el script `validate-shacl.sh`.
Si quieres ver todas las opciones disponibles, consulta el archivo `validate-owl.md` o `--help`

#### Ejemplo de validación
Este comando permite incluir manualmente los archivos necesarios
```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-shacl.sh -d examples/digital-marpol-waste-passport-sample.ttl -e ontology/digitalWastePassport.ttl,ontology/codelists/unlocode.ttl --shapes shapes/digitalMarpolWastePassportShapes.ttl"

docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-shacl.sh -d examples/digital-waste-passport-sample.ttl -s shapes/digitalWastePassportShapes.ttl -e ontology/digitalWastePassport.ttl,ontology/codelists/unlocode.ttl"
```

#### Resultado esperado
```bash
[SHACL] Data      : examples/digital-waste-passport-sample.ttl
[SHACL] Shapes    : shapes/digitalWastePassportShapes.ttl
[SHACL] Formato   : human
[SHACL] Extras (2):
  - ontology/digitalWastePassport.ttl
  - ontology/codelists/unlocode.ttl
[SHACL] Intentando python3 -m pyshacl
/usr/bin/python3: No module named pyshacl
[SHACL] Falló con python3 -m pyshacl (exit 1)
[SHACL] Intentando /opt/venv/bin/python -m pyshacl
Validation Report
Conforms: True
```

- ✅ Conforms True → todo correcto, los datos cumplen las reglas.
- ⚠️ Si hay errores, aparece una lista con:
    - path → qué propiedad falló,
    - message → la causa del error,
    - focusNode → el recurso donde ocurrió el problema.

### 2. Validación y razonamiento OWL (Combinar ontologías y aplicar un razonador lógico)
La validación OWL se utiliza para verificar la consistencia lógica de las ontologías y combinar distintos archivos (por ejemplo, módulos o extensiones) en un único modelo coherente.
Durante este proceso, también puede aplicarse un razonador, que infiere automáticamente nuevas relaciones a partir de las definiciones existentes.

Las validaciones OWL se realizan usando el script `validate-owl.sh`.
Si quieres ver todas las opciones disponibles, consulta el archivo `validate-owl.md`.

#### Ejemplo de validación completa (fusiona ontologías y aplica razonamiento)
Este comando ejecuta la validación estándar, combinando ontologías, excluyendo listas de códigos, usando el perfil DL y el razonador HermiT:

```powershell
docker run --rm -v "${PWD}:/workspace" -w /workspace bri-ontology-tooling "scripts/validate-owl.sh"
```

#### Resultado esperado
```bash
[OWL] Ontologías (2):
  - ontology/digitalMarpolWastePassport.ttl
  - ontology/digitalWastePassport.ttl
[OWL] Profile  : DL
[OWL] Reasoner : HermiT
[OWL] Merge out: build/merged-ontology.ttl
[OWL] Reasoned : build/reasoned-ontology.ttl
[OWL] Usando ROBOT CLI
OWL 2 DL Profile Report: [Ontology and imports closure in profile]

[OWL] Profile (DL) OK.
[OWL] Razonamiento OK.
[OWL] Validación completa sin errores fatales.
```

El proceso genera una carpeta build/ con los siguientes archivos:

- **merged-ontology.ttl**: Ontologías fusionadas (si el merge fue correcto o con advertencias)
- **reasoned-ontology.ttl**: Ontología razonada (no se genera si se usa `--reasoner none`)

> 🛈 Nota: Este script no realiza validaciones SHACL.
> Para comprobar los datos frente a las reglas SHACL, utiliza scripts/validate-shacl.sh.
