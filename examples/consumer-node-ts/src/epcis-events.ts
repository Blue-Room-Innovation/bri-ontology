import {
  createValidator,
  type SchemaKeyCurrent,
  EpcisEventsSchemaNS,
} from "@blueroominnovation/ontology-contracts";

const validator = createValidator();

const schemaKey: SchemaKeyCurrent = "epcis-events";


const payload: EpcisEventsSchemaNS.EpcisEventsSchema = {
  "@id": "https://id.example.org/document1",
  "@type": "EPCISDocument",
  "schemaVersion": "2.0",
  "creationDate": "2013-06-04T14:59:02.099+02:00",
  "sender": "urn:epc:id:sgln:0353579.00001.0",
  "receiver": "urn:epc:id:sgln:5012345.00001.0",
  "instanceIdentifier": "1234567890",
  "epcisBody": {
    "eventList": [
      {
        "@type": "ObjectEvent",
        "eventTime": "2013-06-08T14:58:56.591Z",
        "eventTimeZoneOffset": "+02:00",
        "action": "OBSERVE",
        "certificationInfo": "https://accreditation-council.example.org/certificate/ABC12345",
        "errorDeclaration": {
          "declarationTime": "2013-11-07T14:00:00.000+01:00",
          "reason": "urn:epcglobal:cbv:er:incorrect_data",
          "correctiveEventIDs": [
            "ni:///sha-256;fec9667280c4710a3fa9558b7bc8ddc2ced0dc442d87f82becae24bb6ca6a46f?ver=CBV2.0"
          ]
        }
      }
    ]
  }
};


const result = validator.validate(payload, schemaKey);

if (!result.ok) {
  // Show only item-level errors (not the anyOf single-object branch noise)
  const itemErrors = result.errors!.filter((e: any) => e.instancePath.includes('eventList/'));
  const topErrors = result.errors!.filter((e: any) => !e.instancePath.includes('eventList'));
  console.error("Validation failed — top-level errors:", topErrors.length);
  topErrors.slice(0, 5).forEach((e: any) => console.error("  ", e.instancePath, e.schemaPath, e.message));
  console.error("Item-level errors:", itemErrors.length);
  itemErrors.slice(0, 20).forEach((e: any) => console.error("  ", e.instancePath, e.schemaPath, e.message));
  process.exit(1);
}

console.log("Validation OK :", result.value);