# 8. Alineación UNTP

Equivalencias núcleo (cuando aplican):
- `WastePassport ≡ unece-dpp:ProductPassport` (misma estructura de pasaporte, distinto dominio específico)
- `Waste ≡ unece:Product` (tratado como tipo de producto para fines de credencial)
- `DigitalWastePassport ⊑ unece:VerifiableCredential`

MARPOL (extensión): clases como `ResidueInformation`, `Ship` no tienen equivalentes directos; mapear vía SKOS (`skos:closeMatch` / `skos:related`) si se establecen en UNTP futuras.

Recomendación: usar equivalencias OWL solo si semántica exacta. Si hay diferencias contextuales (ej. restricciones MARPOL), optar por SKOS mappings.
