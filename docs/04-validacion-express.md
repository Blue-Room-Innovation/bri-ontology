# 4. Validación express

Con Docker listo (ver `03-instalacion.md`).

OWL + razonamiento (artefactos actuales con prefijo histórico dpp):
```powershell
robot merge --input ontology/digitalWastePassport.ttl --input ontology/digitalMarpolWastePassport.ttl --output build/dpp-merged.ttl ; robot reason --input build/dpp-merged.ttl --output build/dpp-reasoned.ttl
```

SHACL (núcleo Waste Passport):
```powershell
python -m pyshacl -s shapes/dpp-shapes.ttl -m rdfs -i examples/digital-waste-passport-sample.ttl
```

SHACL (variante MARPOL):
```powershell
python -m pyshacl -s shapes/dpp-shapes.ttl -m rdfs -i examples/digital-marpol-waste-passport-sample.ttl
```

Siguiente: modelo de datos en `05-modelo-datos.md`.
