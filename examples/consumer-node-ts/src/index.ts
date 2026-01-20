import {
  createValidator,
  type RecyclingOrganisationShape,
  type SchemaKeyCurrent,
} from "@blueroominnovation/ontology-contracts";

const validator = createValidator();

const schemaKey: SchemaKeyCurrent = "recycling";

const payload: RecyclingOrganisationShape = {
  "adaptedToRD1102015": true,
  "addressLocality": "asdf",
  managerCode: "123",
  name: "2134",
  nimaCode: "1",
  postalCode: "123",
  streetAddress: "asdf",
  wasteTreatmentActivity: "34",
  url: {
    "@id":"http://example.cat"
  }

};

const result = validator.validate(payload, schemaKey);

if (!result.ok) {
  console.error("Validation failed", result.errors);
  process.exit(1);
}

console.log("Validation OK :", result.value);
