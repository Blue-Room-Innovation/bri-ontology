# recycling Ontology

**Link to ontology:**  ontology/v0.1/recycling.ttl

```mermaid
classDiagram
   class Recycler{
       adaptedToRD1102015 boolean
       correspondeceAddress string
       correspondeceAddressLocality string
       correspondecePostalCode string
       managerCode string
       nimaCode string
       wasteTreatmentActivity string
   }
   Recycler --|> Organization
```

## Classes

|Name|Description|Datatype properties|Object properties|Subclass of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="Recycler">Recycler</span>|An organization that processes waste materials for recycling|[adaptedToRD1102015](#adaptedToRD1102015), [correspondeceAddress](#correspondeceAddress), [correspondeceAddressLocality](#correspondeceAddressLocality), [correspondecePostalCode](#correspondecePostalCode), [managerCode](#managerCode), [nimaCode](#nimaCode), [wasteTreatmentActivity](#wasteTreatmentActivity)||Organization|

## Data Properties

|Name|Description|Domain|Range|Subproperty of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="adaptedToRD1102015">adaptedToRD1102015</span>|Indicates whether the recycler complies with Spanish Royal Decree 110/2015 on WEEE|[Recycler](#Recycler)|boolean|conformance|
|<span id="correspondeceAddress">correspondeceAddress</span>|Street address used for postal correspondence when different from the physical address|[Recycler](#Recycler)|string|streetAddress|
|<span id="correspondeceAddressLocality">correspondeceAddressLocality</span>|City or locality of the correspondence postal address|[Recycler](#Recycler)|string|addressLocality|
|<span id="correspondecePostalCode">correspondecePostalCode</span>|Postal code of the correspondence address|[Recycler](#Recycler)|string|postalCode|
|<span id="managerCode">managerCode</span>|Regional waste manager registration code|[Recycler](#Recycler)|string||
|<span id="nimaCode">nimaCode</span>|Spanish environmental registration number (NIMA)|[Recycler](#Recycler)|string||
|<span id="wasteTreatmentActivity">wasteTreatmentActivity</span>|Free-text description of waste treatment activities|[Recycler](#Recycler)|string||
## Propiedades de Datos

### adaptedToRD1102015

**Labels:**
- (en) Adapted to RD 110/2015 (WEEE)
**Comentarios:**
- (en) Indicates whether the recycler complies with Spanish Royal Decree 110/2015 on WEEE
**Domain:** Recycler
**Range:** boolean

### correspondeceAddress

**Labels:**
- (en) Correspondence street address
**Comentarios:**
- (en) Street address used for postal correspondence when different from the physical address
**Domain:** Recycler
**Range:** string

### correspondeceAddressLocality

**Labels:**
- (en) Correspondence locality
**Comentarios:**
- (en) City or locality of the correspondence postal address
**Domain:** Recycler
**Range:** string

### correspondecePostalCode

**Labels:**
- (en) Correspondence postal code
**Comentarios:**
- (en) Postal code of the correspondence address
**Domain:** Recycler
**Range:** string

### managerCode

**Labels:**
- (en) Waste manager code
**Comentarios:**
- (en) Regional waste manager registration code
**Domain:** Recycler
**Range:** string

### nimaCode

**Labels:**
- (en) NIMA code
**Comentarios:**
- (en) Spanish environmental registration number (NIMA)
**Domain:** Recycler
**Range:** string

### wasteTreatmentActivity

**Labels:**
- (en) Waste treatment activity description
**Comentarios:**
- (en) Free-text description of waste treatment activities
**Domain:** Recycler
**Range:** string

