import {
  createValidator,
  type SchemaKeyCurrent,
  EpcisEventsSchemaNS,
} from "@blueroominnovation/ontology-contracts";

const validator = createValidator();

const schemaKey: SchemaKeyCurrent = "epcis-events";

const payload: EpcisEventsSchemaNS.TransactionEventShape = {
  "@type": "TransactionEvent",
  "@id": "urn:uuid:2e5e34fb-9657-4f0c-9a6f-563b3384b9a1",
  eventTime: new Date().toISOString(),
  eventTimeZoneOffset: "+01:00",
  action: "ADD",
  bizTransactionList: {
    "@id": "urn:uuid:36d1f5a2-9d48-4cb7-8d91-30b2bcd10a48",
    bizTransactionType: "urn:example:biztxn:po",
  }
};

const result = validator.validate(payload, schemaKey);

if (!result.ok) {
  console.error("Validation failed", result.errors);
  process.exit(1);
}

console.log("Validation OK :", result.value);