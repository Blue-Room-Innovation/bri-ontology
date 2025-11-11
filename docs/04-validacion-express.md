# 4. Validación express

Con Docker listo (ver `03-instalacion.md`).

OWL + razonamiento (artefactos renombrados):
```powershell
robot merge --input ontology/digitalWastePassport.ttl --input ontology/digitalMarpolWastePassport.ttl --output build/waste-merged.ttl ; robot reason --input build/waste-merged.ttl --output build/waste-reasoned.ttl
```

SHACL (núcleo Waste Passport):
```powershell
python -m pyshacl -s shapes/waste-shapes.ttl -m rdfs -i examples/digital-waste-passport-sample.ttl
```

SHACL (variante MARPOL):
```powershell
python -m pyshacl -s shapes/waste-shapes.ttl -m rdfs -i examples/digital-marpol-waste-passport-sample.ttl
```

Siguiente: modelo de datos en `05-modelo-datos.md`.
