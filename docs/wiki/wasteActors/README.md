# wasteActors Ontology

**Link to ontology:**  ontology/v0.1/wasteActors.ttl

```mermaid
classDiagram
   class Producer{
   }
   class Recycler{
   }
   class Transporter{
   }
   Party --> GeoLocation : geoLocation
   Product --> Recycler : wasteHandler
   Product --> Producer : wasteProducer
   Product --> Transporter : wasteTransporter
   Producer --|> Party
   Recycler --|> Party
   Transporter --|> Party
```

## Classes

|Name|Description|Datatype properties|Object properties|Subclass of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="Producer">Producer</span>|The organization that produced or placed the product on the market, and therefore generated the waste.|||Party|
|<span id="Recycler">Recycler</span>|A legally registered organization authorized to manage, treat, recycle or dispose of waste.|||Party|
|<span id="Transporter">Transporter</span>|An organization responsible for transporting waste between locations.|||Party|

## Data Properties

|Name|Description|Domain|Range|Subproperty of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="addressLocality">addressLocality</span>||[Party](#Party)|string|addressLocality|
|<span id="country">country</span>||[Party](#Party)|string|addressCountry|
|<span id="email">email</span>||[Party](#Party)|string|email|
|<span id="legalName">legalName</span>||[Party](#Party)|string|name|
|<span id="phone">phone</span>||[Party](#Party)|string|telephone|
|<span id="postalCode">postalCode</span>||[Party](#Party)|string|postalCode|
|<span id="registeredId">registeredId</span>|Official registration identifier such as VAT, company number or national waste registry code.|[Party](#Party)|string||
|<span id="streetAddress">streetAddress</span>||[Party](#Party)|string|streetAddress|
|<span id="website">website</span>||[Party](#Party)|anyURI|url|

## Object Properties

|Name|Descriptions|Domain|Range|Subproperty of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="geoLocation">geoLocation</span>|Geographic coordinates of the organization.|[Party](#Party)|[GeoLocation](#GeoLocation)||
|<span id="wasteHandler">wasteHandler</span>|Links a Waste (UNECE Product) to the Recycler responsible for its treatment.|[Product](#Product)|[Recycler](#Recycler)||
|<span id="wasteProducer">wasteProducer</span>|Links a Waste to the organization that generated it.|[Product](#Product)|[Producer](#Producer)||
|<span id="wasteTransporter">wasteTransporter</span>|Links a Waste to the organization responsible for transporting it.|[Product](#Product)|[Transporter](#Transporter)||
## Propiedades de Objeto

### geoLocation

**Comentarios:**
- (und) Geographic coordinates of the organization.
**Domain:** Party
**Range:** GeoLocation

### wasteHandler

**Comentarios:**
- (und) Links a Waste (UNECE Product) to the Recycler responsible for its treatment.
**Domain:** Product
**Range:** Recycler

### wasteProducer

**Comentarios:**
- (und) Links a Waste to the organization that generated it.
**Domain:** Product
**Range:** Producer

### wasteTransporter

**Comentarios:**
- (und) Links a Waste to the organization responsible for transporting it.
**Domain:** Product
**Range:** Transporter

## Propiedades de Datos

### addressLocality

**Domain:** Party
**Range:** string

### country

**Domain:** Party
**Range:** string

### email

**Domain:** Party
**Range:** string

### legalName

**Domain:** Party
**Range:** string

### phone

**Domain:** Party
**Range:** string

### postalCode

**Domain:** Party
**Range:** string

### registeredId

**Comentarios:**
- (und) Official registration identifier such as VAT, company number or national waste registry code.
**Domain:** Party
**Range:** string

### streetAddress

**Domain:** Party
**Range:** string

### website

**Domain:** Party
**Range:** anyURI

