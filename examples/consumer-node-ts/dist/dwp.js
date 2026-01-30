import { createValidator, } from "@blueroominnovation/ontology-contracts";
const validator = createValidator();
const schemaKey = "dwp";
const payload = {
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
