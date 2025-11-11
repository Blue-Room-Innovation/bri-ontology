# 5. Modelo de datos (núcleo)

Clases principales: Producto, Pasaporte, Identificador, Material, Organización, Evento de Ciclo de Vida, Documentos, Scorecards, Información de Trazabilidad.

Diagrama (simplificado):
```mermaid
classDiagram
  class Product
  class DigitalProductPassport
  class Identifier
  class Material
  class Organization
  class LifecycleEvent
  class CircularityScorecard
  class EmissionsScorecard
  DigitalProductPassport --> Product : describesProduct
  Product --> Identifier : hasIdentifier
  Product --> Material : hasMaterial
  Product --> Organization : manufacturer
  Product --> LifecycleEvent : hasLifecycleEvent
  DigitalProductPassport --> CircularityScorecard : circularityScorecard
  DigitalProductPassport --> EmissionsScorecard : emissionsScorecard
```

Alineaciones clave (resumen):
- `Product ≡ schema:Product ≡ untpcore:Product`
- `DigitalProductPassport ≡ untpdpp:DigitalProductPassport`
- `Organization ≡ schema:Organization ⊑ untpcore:Party`
- Eventos trazabilidad detallados en `07-alineacion-epcis.md`.

Para módulos y estructura técnica ver `06-modulos-ontologia.md`.
