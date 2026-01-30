# digitalMarpolWastePassport Ontology

- **Version:** 0.1
- **Imports:** https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/codelists/v0.1/delivery-type-code.ttl, https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/codelists/v0.1/discharge-means-code.ttl, https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/codelists/v0.1/iso3166-iAlpha2.ttl, https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/codelists/v0.1/residue-subtype-code.ttl, https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/codelists/v0.1/residue-type-code.ttl, https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/main/codelists/v0.1/unlocode.ttl
- **Link to ontology:** [ontology/v0.1/digitalMarpolWastePassport.ttl](https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl)

```mermaid
classDiagram
   class Link{
   }
   class Measure{
   }
   class Party{
   }
   class AuthorizedParty{
       identifier string
   }
   class DigitalMarpolWastePassport{
   }
   class DigitalWastePassport{
   }
   class InvolvedParty{
   }
   class MarpolWaste{
       arrivalPort string
       deliveryType string
       lastDeliveryDate dateTime
       lastWasteDeliveryPort string
       marpolEdition string
       nextPlannedDeliveryPort string
       shipScale string
   }
   class MarpolWastePassport{
   }
   class ResidueInformation{
       dischargeMeans string
       nextCollectionPort string
       substance string
       subtypeCode string
       typeCode string
   }
   class Ship{
       flag string
       imoNumber string
       name string
   }
   class WasdisMetadata{
       messageId string
       remarks string
       sender string
       submissionDate dateTime
   }
   class Waste{
   }
   class WastePassport{
   }
   AuthorizedParty --> Link : contactPoint
   DigitalMarpolWastePassport --> MarpolWastePassport : credentialSubject
   ResidueInformation --> Measure : estimatedGenerated
   MarpolWaste --> InvolvedParty : involvedParty
   ResidueInformation --> Measure : maxCapacity
   MarpolWaste --> WasdisMetadata : message
   ResidueInformation --> Measure : quantityRemainingOnBoard
   ResidueInformation --> Measure : quantityToDeliver
   MarpolWaste --> ResidueInformation : residue
   InvolvedParty --> Party : role
   MarpolWaste --> Ship : ship
   MarpolWastePassport --> MarpolWaste : waste
   MarpolWaste --> AuthorizedParty : wasteAgent
   DigitalMarpolWastePassport --|> DigitalWastePassport
   MarpolWaste --|> Waste
   MarpolWastePassport --|> WastePassport
```

## Classes

|Name|Description|Datatype properties|Object properties|Subclass of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="Link">Link</span>|||||
|<span id="Measure">Measure</span>|||||
|<span id="Party">Party</span>|||||
|<span id="AuthorizedParty">AuthorizedParty</span>|Represents an authorized entity responsible for handling the waste.|[identifier](#identifier)|[contactPoint](#contactPoint)||
|<span id="DigitalMarpolWastePassport">DigitalMarpolWastePassport</span>|A digital waste passport specific to MARPOL regulations, extending the generic `DigitalWastePassport`.||[credentialSubject](#credentialSubject)|DigitalWastePassport|
|<span id="DigitalWastePassport">DigitalWastePassport</span>|||||
|<span id="InvolvedParty">InvolvedParty</span>|A party involved in the waste management process, such as the ship operator.||[role](#role)||
|<span id="MarpolWaste">MarpolWaste</span>|Represents a specific waste entity within the MARPOL context, including regulatory attributes for ship-generated waste.|[arrivalPort](#arrivalPort), [deliveryType](#deliveryType), [lastDeliveryDate](#lastDeliveryDate), [lastWasteDeliveryPort](#lastWasteDeliveryPort), [marpolEdition](#marpolEdition), [nextPlannedDeliveryPort](#nextPlannedDeliveryPort), [shipScale](#shipScale)|[involvedParty](#involvedParty), [message](#message), [residue](#residue), [ship](#ship), [wasteAgent](#wasteAgent)|Waste|
|<span id="MarpolWastePassport">MarpolWastePassport</span>|Represents the waste passport data specific to MARPOL regulations.||[waste](#waste)|WastePassport|
|<span id="ResidueInformation">ResidueInformation</span>|Details of a specific waste residue, including type, quantity, and handling.|[dischargeMeans](#dischargeMeans), [nextCollectionPort](#nextCollectionPort), [substance](#substance), [subtypeCode](#subtypeCode), [typeCode](#typeCode)|[estimatedGenerated](#estimatedGenerated), [maxCapacity](#maxCapacity), [quantityRemainingOnBoard](#quantityRemainingOnBoard), [quantityToDeliver](#quantityToDeliver)||
|<span id="Ship">Ship</span>|Details about the ship generating the waste.|[flag](#flag), [imoNumber](#imoNumber), [name](#name)|||
|<span id="WasdisMetadata">WasdisMetadata</span>|Metadata related to the WASDIS system for auditing purposes.|[messageId](#messageId), [remarks](#remarks), [sender](#sender), [submissionDate](#submissionDate)|||
|<span id="Waste">Waste</span>|||||
|<span id="WastePassport">WastePassport</span>|||||

## Data Properties

|Name|Description|Domain|Range|Subproperty of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="arrivalPort">arrivalPort</span>|The port of arrival for the ship, identified using the UN/LOCODE format (e.g., `ESPMI`).|[MarpolWaste](#MarpolWaste)|string||
|<span id="deliveryType">deliveryType</span>|Code indicating the type of delivery method used for the waste, based on a local codelist (e.g., `ZTO`).|[MarpolWaste](#MarpolWaste)|string||
|<span id="dischargeMeans">dischargeMeans</span>|The method used to discharge the residue, identified by a local codelist code (e.g., `ZTE`).|[ResidueInformation](#ResidueInformation)|string||
|<span id="flag">flag</span>|The flag state of the ship, identified by the ISO 3166-1 Alpha-2 code (e.g., `CY` for Cyprus).|[Ship](#Ship)|string||
|<span id="identifier">identifier</span>|A unique identifier for the authorized party.|[AuthorizedParty](#AuthorizedParty)|string||
|<span id="imoNumber">imoNumber</span>|The International Maritime Organization (IMO) number, a 7-digit identifier for ships.|[Ship](#Ship)|string||
|<span id="lastDeliveryDate">lastDeliveryDate</span>|The date and time of the last waste delivery, in ISO-8601 format with timezone.|[MarpolWaste](#MarpolWaste)|dateTime||
|<span id="lastWasteDeliveryPort">lastWasteDeliveryPort</span>|The last port where waste was delivered, using UN/LOCODE format.|[MarpolWaste](#MarpolWaste)|string||
|<span id="marpolEdition">marpolEdition</span>|The edition of MARPOL applicable to the waste being documented (if relevant).|[MarpolWaste](#MarpolWaste)|string||
|<span id="messageId">messageId</span>|A unique identifier for the message.|[WasdisMetadata](#WasdisMetadata)|string||
|<span id="name">name</span>|The name of the ship.|[Ship](#Ship)|string||
|<span id="nextCollectionPort">nextCollectionPort</span>|The next port where the residue will be collected, identified by the UN/LOCODE|[ResidueInformation](#ResidueInformation)|string||
|<span id="nextPlannedDeliveryPort">nextPlannedDeliveryPort</span>|The next planned port for waste delivery, identified with UN/LOCODE.|[MarpolWaste](#MarpolWaste)|string||
|<span id="remarks">remarks</span>|Any additional remarks or notes regarding the waste delivery or process.|[WasdisMetadata](#WasdisMetadata)|string||
|<span id="sender">sender</span>|The entity that sent the waste notification.|[WasdisMetadata](#WasdisMetadata)|string||
|<span id="shipScale">shipScale</span>|An identifier for the ship scale or port call, useful for traceability.|[MarpolWaste](#MarpolWaste)|string||
|<span id="submissionDate">submissionDate</span>|The date and time when the waste notification was submitted.|[WasdisMetadata](#WasdisMetadata)|dateTime||
|<span id="substance">substance</span>|The substance of the residue, e.g., oil, sewage, or waste sludge.|[ResidueInformation](#ResidueInformation)|string||
|<span id="subtypeCode">subtypeCode</span>|Code representing the subtype of residue, providing more detailed categorization.|[ResidueInformation](#ResidueInformation)|string||
|<span id="typeCode">typeCode</span>|Code representing the type of residue, based on a local codelist or MARPOL standard.|[ResidueInformation](#ResidueInformation)|string||

## Object Properties

|Name|Descriptions|Domain|Range|Subproperty of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="contactPoint">contactPoint</span>|Contact information for the authorized party, represented as a link.|[AuthorizedParty](#AuthorizedParty)|[Link](#Link)||
|<span id="credentialSubject">credentialSubject</span>|References the MARPOL-specific waste passport subject (`MarpolWastePassport`).|[DigitalMarpolWastePassport](#DigitalMarpolWastePassport)|[MarpolWastePassport](#MarpolWastePassport)||
|<span id="estimatedGenerated">estimatedGenerated</span>|The estimated quantity of residue generated, represented as a measure.|[ResidueInformation](#ResidueInformation)|[Measure](#Measure)||
|<span id="involvedParty">involvedParty</span>|The party involved in the waste management process, such as the ship operator or company.|[MarpolWaste](#MarpolWaste)|[InvolvedParty](#InvolvedParty)||
|<span id="maxCapacity">maxCapacity</span>|The maximum capacity for residue storage, represented as a measure.|[ResidueInformation](#ResidueInformation)|[Measure](#Measure)||
|<span id="message">message</span>|Metadata related to the WASDIS system, including the sender, message ID, and submission details.|[MarpolWaste](#MarpolWaste)|[WasdisMetadata](#WasdisMetadata)||
|<span id="quantityRemainingOnBoard">quantityRemainingOnBoard</span>|The quantity of residue still remaining onboard, represented as a measure.|[ResidueInformation](#ResidueInformation)|[Measure](#Measure)||
|<span id="quantityToDeliver">quantityToDeliver</span>|The quantity of residue to be delivered, represented as a measure.|[ResidueInformation](#ResidueInformation)|[Measure](#Measure)||
|<span id="residue">residue</span>|Detailed information about the waste residue, including type, quantity, and discharge method.|[MarpolWaste](#MarpolWaste)|[ResidueInformation](#ResidueInformation)||
|<span id="role">role</span>|The role of the involved party, as defined by the regulatory framework.|[InvolvedParty](#InvolvedParty)|[Party](#Party)||
|<span id="ship">ship</span>|Details about the ship responsible for the waste, including the IMO number, name, and flag.|[MarpolWaste](#MarpolWaste)|[Ship](#Ship)||
|<span id="waste">waste</span>|Details of the MARPOL-specific waste entity, encapsulating waste-related information within the MARPOL framework.|[MarpolWastePassport](#MarpolWastePassport)|[MarpolWaste](#MarpolWaste)||
|<span id="wasteAgent">wasteAgent</span>|The authorized waste collection company handling the waste.|[MarpolWaste](#MarpolWaste)|[AuthorizedParty](#AuthorizedParty)||
