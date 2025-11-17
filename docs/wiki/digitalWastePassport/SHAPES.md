# Shapes para digitalWastePassport

| Shape | Target Class(es) | Propiedad | Datatype | Class | Min | Max | In | Descripción |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| DigitalWastePassportShape | DigitalWastePassport | issued | dateTime |  | 1 | 1 |  |  |
| DigitalWastePassportShape | DigitalWastePassport | publisher |  |  | 1 | 1 |  |  |
| DigitalWastePassportShape | DigitalWastePassport | credentialSubject |  | WastePassport | 1 | 1 |  |  |
| DigitalWastePassportShape | DigitalWastePassport | valid | dateTime |  | 0 | 1 |  |  |
| WastePassportShape | WastePassport | waste |  | Waste | 1 | 1 |  |  |
| WastePassportShape | WastePassport | identifier | string |  | 0 | 1 |  |  |
| WastePassportShape | WastePassport | reportingStandard |  | Standard | 0 |  |  |  |
| WasteShape | Waste | name | string |  | 1 | 1 |  |  |
| WasteShape | Waste | productName | string |  | 1 | 1 |  |  |
| WasteShape | Waste | productDescription | string |  | 0 | 1 |  |  |
| WasteShape | Waste | hasBatchIdentifier | string |  | 0 | 1 |  |  |
| WasteShape | Waste | originCountry |  |  | 0 | 1 | DE, ES, FR, IT, NL, PT, BE, DK, SE, NO, FI, GB, IE |  |
| WasteShape | Waste | productionDate | date |  | 0 | 1 |  |  |
| WasteShape | Waste | weightQuantity | decimal |  | 0 | 1 |  |  |
| WasteShape | Waste | declaredUnit |  |  | 0 | 1 | KGM, TNE, LTR, MTR, CMQ |  |
| WasteShape | Waste | hasConstituent |  | MaterialConstituent | 0 |  |  |  |
| MaterialConstituentShape | MaterialConstituent | materialType |  |  | 1 | 1 |  |  |
| MaterialConstituentShape | MaterialConstituent | massFraction | decimal |  | 1 | 1 |  |  |
| StandardShape | Standard | standardName | string |  | 1 | 1 |  |  |
