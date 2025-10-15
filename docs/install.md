## Instalación de dependencias

Puedes usar instalación nativa (Java + ROBOT + Jena + pySHACL) o la opción con Docker.

Requisitos comunes
- Java 17+ (para ROBOT y Jena)
- Python 3.8+ (para pySHACL)

Opción 1: Instalación nativa
- Java
  - Windows: instala OpenJDK (p. ej., Temurin) y añade `java` al PATH.
  - macOS (Homebrew): `brew install --cask temurin`
  - Linux (Debian/Ubuntu): `sudo apt-get install -y openjdk-17-jre-headless`

- ROBOT (ontodev)
  1) Descarga el JAR: https://github.com/ontodev/robot/releases/latest/download/robot.jar
  2) Mueve a una ruta fija, por ejemplo:
     - Windows: `C:\tools\robot\robot.jar`
     - Unix: `~/bin/robot.jar`
  3) Crea un wrapper para invocarlo como comando `robot`:
     - Windows (PowerShell, guarda como `C:\tools\robot\robot.cmd`):
       ```bat
       @echo off
       java -jar "C:\tools\robot\robot.jar" %*
       ```
       Añade `C:\tools\robot` al PATH.
     - Unix:
       ```bash
       printf '#!/usr/bin/env bash
       exec java -jar "$HOME/bin/robot.jar" "$@"
       ' > ~/bin/robot
       chmod +x ~/bin/robot
       ```

- Apache Jena (opcional; fallback de validación RDF/SHACL)
  1) Descarga desde: https://jena.apache.org/download/
  2) Extrae y añade la carpeta `bin` al PATH (comandos `riot`, `shacl` o `jena shacl`).

- pySHACL
  - Con pip: `pip install pyshacl`
  - Recomendado con pipx: `pipx install pyshacl`

Verificación rápida
- `robot --version`
- `riot --version` (si instalaste Jena)
- `pyshacl --version`

Opción 2: Usar Docker
- Requisitos: Docker Desktop (Windows/macOS) o Docker Engine (Linux)
- Construir imagen con dependencias (Java + ROBOT + pySHACL):
  - Windows: `./scripts/build-docker.ps1`
  - Unix: `bash scripts/build-docker.sh`
- Ejecutar validación dentro del contenedor montando el repo:
  - Windows: `./scripts/validate-all-docker.ps1`
  - Unix: `bash scripts/validate-all-docker.sh`

Comandos útiles con Docker directamente
- Construir y validar en una sola línea (Unix):
  ```bash
  bash scripts/build-docker.sh && docker run --rm -v "$PWD":/workspace -w /workspace dpp-tooling -lc "validate-all"
  ```
- Validar SHACL únicamente (Unix):
  ```bash
  docker run --rm -v "$PWD":/workspace -w /workspace dpp-tooling -lc "validate-shacl examples/product-sample.ttl"
  ```

