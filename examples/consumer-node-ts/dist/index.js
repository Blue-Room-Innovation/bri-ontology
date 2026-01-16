import { createValidator } from "@blueroominnovation/ontology-contracts";
const validator = createValidator();
const schemaKey = "digitalWastePassport";
const payload = {
    "dct:issued": "2026-01-16T00:00:00Z",
    "dct:publisher": "example-publisher",
    "dwp:credentialSubject": {
        "dwp:waste": {
            "unece:name": "Example waste",
            "unece:productName": "Example product"
        }
    }
};
const result = validator.validate(payload, schemaKey);
if (!result.ok) {
    console.error("Validation failed", result.errors);
    process.exit(1);
}
const typed = result.value;
console.log("Validation OK, issued:", typed["dct:issued"]);
