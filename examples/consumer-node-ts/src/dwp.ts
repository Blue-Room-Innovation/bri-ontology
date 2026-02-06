import {
  createValidator,
  type DigitalWastePassportShape,
  type SchemaKeyCurrent,
} from "@blueroominnovation/ontology-contracts";

const validator = createValidator();

const schemaKey: SchemaKeyCurrent = "dwp";

const payload: DigitalWastePassportShape = {
  id: "https://example.org/dwp/1",
  issuer: {
    id: "https://example.org/org/issuer-1",
    name: "Demo Issuer",
  },
  validFrom: new Date().toISOString(),
  credentialSubject: {
    waste: {
      name: "Demo waste",
    },
  },
};

const result = validator.validate(payload, schemaKey);

if (!result.ok) {
  console.error("Validation failed", result.errors);
  process.exit(1);
}

console.log("Validation OK :", result.value);
