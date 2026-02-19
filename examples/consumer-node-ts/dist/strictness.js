import { createValidator, } from "@blueroominnovation/ontology-contracts";
const validator = createValidator();
const schemaKey = "dpp-unece";
console.log("---------------------------------------------------------");
console.log("STRICTNESS TEST: Verifying rejection of extra properties");
console.log("---------------------------------------------------------");
// 1. Create a minimally valid payload and add an ILLEGAL extra property
const payloadWithJunk = {
    "@type": "DigitalProductPassport",
    id: "https://example.org/dpp/strict-test",
    issuer: {
        "@type": "CredentialIssuer",
        id: "https://example.org/org/issuer-strict",
        name: "Strictness Tester",
    },
    credentialSubject: {
        "@type": "ProductPassport",
        product: {
            "@type": "Product",
            id: "https://example.org/product/strict-1",
            name: "Strict Product",
        },
        granularityLevel: "item",
    },
    // ILLEGAL PROPERTY
    _thisShouldNotBeAllowed: "I am an extra property",
};
// 2. Validate
const result = validator.validate(payloadWithJunk, schemaKey);
// 3. Assert EXPECTED FAILURE
if (result.ok) {
    console.error("❌ STRICTNESS CHECK FAILED: Validation succeeded but should have failed due to '_thisShouldNotBeAllowed'");
    process.exit(1);
}
else {
    // Check if error is about unexpected properties
    const errorText = JSON.stringify(result.errors);
    const hasExtraPropsError = errorText.includes("additionalProperties") || errorText.includes("unevaluatedProperties");
    if (hasExtraPropsError) {
        console.log("✅ STRICTNESS CHECK PASSED: Validation failed as expected with extra properties error.");
    }
    else {
        console.warn("⚠️  STRICTNESS CHECK WARNING: Validation failed, but not strictly due to extra properties?");
        console.warn("   Error details:", JSON.stringify(result.errors, null, 2));
    }
}
console.log("---------------------------------------------------------");
