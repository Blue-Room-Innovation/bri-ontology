import {
  createValidator,
  type RecyclingOrganisationShape,
  type SchemaKeyCurrent,
} from "@blueroominnovation/ontology-contracts";

const validator = createValidator();

const schemaKey: SchemaKeyCurrent = "recycling";

const payload: RecyclingOrganisationShape = {
  "managerCode": "laborum",
  "nimaCode": "sit proident est sed cupidatat",
  "name": "dolor reprehenderit eu laborum aute",
  "streetAddress": "sed sunt incididunt nulla",
  "addressLocality": "enim tempor fugiat et",
  "postalCode": "cillum dolor laborum id",
  "correspondeceAddress": "anim",
  "correspondeceAddressLocality": "enim",
  "correspondecePostalCode": "laboris est officia",
  "telephone": "exercitation velit ipsum in cupidatat",
  "faxNumber": "aliquip labore nostrud",
  "email": "adipisicing",
  "url": {
    "@id": "https://XHsIOMRfRocDfku.oryI8,rmWEOuGqtChnRDeRD9vp5nh6XJOF0c90v2YSw"
  },
  "latitude": -22.272395068749418,
  "longitude": -157.81622160552345,
  "adaptedToRD1102015": true,
  "wasteTreatmentActivity": "sit"
}

const result = validator.validate(payload, schemaKey);

if (!result.ok) {
  console.error("Validation failed", result.errors);
  process.exit(1);
}

console.log("Validation OK :", result.value);
