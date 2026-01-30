import { createValidator, } from "@blueroominnovation/ontology-contracts";
const validator = createValidator();
const schemaKey = "dmwp";
const payload = {
    issued: new Date().toISOString(),
    publisher: {},
    credentialSubject: {
        waste: {
            ship: {
                imoNumber: "1234567",
                name: "Demo ship",
                flag: "ES",
            },
            residue: {
                typeCode: "OIL",
                subtypeCode: "SLU",
                quantityToDeliver: {},
            },
        },
    },
};
const result = validator.validate(payload, schemaKey);
if (!result.ok) {
    console.error("Validation failed", result.errors);
    process.exit(1);
}
console.log("Validation OK :", result.value);
