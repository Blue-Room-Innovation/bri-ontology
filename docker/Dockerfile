FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
  openjdk-17-jre-headless \
  python3 \
  python3-venv \
  curl \
  ca-certificates \
  graphviz \
  && rm -rf /var/lib/apt/lists/*

# Install pySHACL into venv
RUN python3 -m venv /opt/venv \
  && . /opt/venv/bin/activate \
  && pip install --no-cache-dir --upgrade pip \
  && pip install --no-cache-dir pyshacl rdflib graphviz
ENV PATH="/opt/venv/bin:${PATH}"

# Install ROBOT
RUN mkdir -p /opt/robot \
  && curl -fsSL -o /opt/robot/robot.jar https://github.com/ontodev/robot/releases/latest/download/robot.jar \
  && printf '#!/bin/sh\nexec java -jar /opt/robot/robot.jar "$@"\n' > /usr/local/bin/robot \
  && chmod +x /usr/local/bin/robot

WORKDIR /workspace

# Convenience: copy CLI scripts into PATH (they reference mounted repo paths)
COPY scripts/validate-owl.sh /usr/local/bin/validate-owl
COPY scripts/validate-shacl.sh /usr/local/bin/validate-shacl
RUN chmod +x /usr/local/bin/validate-owl /usr/local/bin/validate-shacl \
  && sed -i 's/\r$//' /usr/local/bin/validate-owl /usr/local/bin/validate-shacl

ENTRYPOINT ["bash","-lc"]
