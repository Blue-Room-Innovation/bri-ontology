# 8. Alineación UNTP

Clases equivalentes (ejemplos):
- `ProductPassport ≡ untpdpp:ProductPassport`
- `Product ≡ untpcore:Product`
- `Facility ≡ untpcore:Facility`

Propiedades equivalentes:
- `describesProduct ≡ untpcore:product`
- `hasMaterialProvenance ≡ untpcore:materialsProvenance`
- `circularityScorecard ≡ untpcore:circularityScorecard`

Datos: `serialNumber ≡ untpcore:serialNumber`, `lotNumber ≡ untpcore:batchNumber`.

Usa alineaciones fuertes solo si semántica exacta; si dudas, utiliza `skos:closeMatch`.
