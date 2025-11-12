# Shapes para digitalMarpolWastePassport

| Shape | Target Class(es) | Propiedad | Datatype | Class | Min | Max | In | Descripción |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| AuthorizedPartyShape | AuthorizedParty | identifier | string |  | 1 | 1 |  |  |
| AuthorizedPartyShape | AuthorizedParty | contactPoint |  |  | 0 | 1 |  |  |
| DigitalMarpolWastePassportShape | DigitalMarpolWastePassport | credentialSubject |  | MarpolWastePassport | 1 | 1 |  |  |
| DigitalMarpolWastePassportShape | DigitalMarpolWastePassport | issued | dateTime |  | 1 | 1 |  |  |
| DigitalMarpolWastePassportShape | DigitalMarpolWastePassport | publisher |  |  | 1 | 1 |  |  |
| InvolvedPartyShape | InvolvedParty | role |  |  | 0 | 1 |  |  |
| MarpolWastePassportShape | MarpolWastePassport | waste |  | MarpolWaste | 1 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | ship |  | Ship | 1 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | residue |  | ResidueInformation | 1 |  |  |  |
| MarpolWasteShape | MarpolWaste | lastDeliveryDate | dateTime |  | 0 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | arrivalPort | string |  | 0 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | nextPlannedDeliveryPort | string |  | 0 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | lastWasteDeliveryPort | string |  | 0 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | deliveryType | string |  | 0 | 1 | ZTO, REC, DIS |  |
| MarpolWasteShape | MarpolWaste | shipScale | string |  | 0 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | marpolEdition | string |  | 0 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | wasteAgent |  | AuthorizedParty | 0 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | message |  |  | 0 | 1 |  |  |
| MarpolWasteShape | MarpolWaste | involvedParty |  |  | 0 |  |  |  |
| ResidueInformationShape | ResidueInformation | typeCode | string |  | 1 | 1 | OIL |  |
| ResidueInformationShape | ResidueInformation | subtypeCode | string |  | 1 | 1 | SLU |  |
| ResidueInformationShape | ResidueInformation | substance | string |  | 0 | 1 |  |  |
| ResidueInformationShape | ResidueInformation | dischargeMeans | string |  | 0 | 1 | ZTE, ZTD, ZTC, ZTB |  |
| ResidueInformationShape | ResidueInformation | nextCollectionPort | string |  | 0 | 1 |  |  |
| ResidueInformationShape | ResidueInformation | quantityToDeliver |  | Measure | 0 | 1 |  |  |
| ResidueInformationShape | ResidueInformation | quantityRemainingOnBoard |  | Measure | 0 | 1 |  |  |
| ResidueInformationShape | ResidueInformation | estimatedGenerated |  | Measure | 0 | 1 |  |  |
| ResidueInformationShape | ResidueInformation | maxCapacity |  | Measure | 0 | 1 |  |  |
| ShipShape | Ship | imoNumber | string |  | 1 | 1 |  |  |
| ShipShape | Ship | name | string |  | 1 | 1 |  |  |
| ShipShape | Ship | flag | string |  | 1 | 1 |  |  |
