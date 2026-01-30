import {
  createValidator,
  type DigitalWastePassportShape,
  type SchemaKeyCurrent,
} from "@blueroominnovation/ontology-contracts";

const validator = createValidator();

const schemaKey: SchemaKeyCurrent = "dwp";

const payload: DigitalWastePassportShape = {
  issued: new Date().toISOString(),
  publisher: {},
  credentialSubject: {
    waste: {
      name: "Demo waste",
      productName: "Demo product",
    },
  },
};

const result = validator.validate(payload, schemaKey);

if (!result.ok) {
  console.error("Validation failed", result.errors);
  process.exit(1);
}

console.log("Validation OK :", result.value);
