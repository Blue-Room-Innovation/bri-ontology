/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-19 15:36:11
 * Source: shapes/v0.1/epcis-events.shacl.ttl
 */

export type EpcisEventsSchema =
  | {
      "@graph": (
        | Epcis_EPCISDocumentShape
        | Epcis_EPCISEventShape
        | Epcis_ObjectEventShape
        | Epcis_AggregationEventShape
        | Epcis_AssociationEventShape
        | Epcis_TransactionEventShape
        | Epcis_TransformationEventShape
        | Epcis_TransformationIDConditionsShape
      )[];
      [k: string]: unknown;
    }
  | Epcis_EPCISDocumentShape
  | Epcis_EPCISEventShape
  | Epcis_ObjectEventShape
  | Epcis_AggregationEventShape
  | Epcis_AssociationEventShape
  | Epcis_TransactionEventShape
  | Epcis_TransformationEventShape
  | Epcis_TransformationIDConditionsShape;
export type Epcis_EPCISEventShape =
  | Epcis_ObjectEventShape
  | Epcis_AggregationEventShape
  | Epcis_AssociationEventShape
  | Epcis_TransactionEventShape
  | Epcis_TransformationEventShape;
export type Epcis_ObjectEventShape = {
  eventTime: string;
  eventTimeZoneOffset: string;
  recordTime?: string;
  action: "ADD" | "OBSERVE" | "DELETE";
  bizStep?: string;
  disposition?: string;
  readPoint?: string;
  bizLocation?: string;
  epcList?: string | string[];
  "@type": "ObjectEvent" | "https://ref.gs1.org/epcis/ObjectEvent";
  type?: "ObjectEvent" | "https://ref.gs1.org/epcis/ObjectEvent";
  "@id"?: string;
  id?: string;
  quantityList?: unknown;
  epcClass?: unknown;
  quantity?: unknown;
  uom?: unknown;
  persistentDisposition?: unknown;
  set?: unknown;
  unset?: unknown;
  bizTransactionList?: unknown;
  bizTransactionType?: unknown;
  sourceList?: unknown;
  sourceOrDestination?: unknown;
  sourceOrDestinationType?: unknown;
  destinationList?: unknown;
  errorDeclaration?: unknown;
  correctiveEventIDs?: unknown;
  reason?: unknown;
  declarationTime?: unknown;
  sensorElementList?: unknown;
  sensorMetadata?: unknown;
  sensorReport?: unknown;
  certificationInfo?: unknown;
} & Epcis_QuantityElementShape &
  Epcis_InputQuantityElementForbiddenShape &
  Epcis_OutputQuantityElementForbiddenShape &
  Epcis_ChildQuantityElementForbiddenShape &
  Epcis_ILMDConditionallyForbiddenShape &
  Epcis_PersistentDispositionShape &
  Epcis_BizTransactionShape &
  Epcis_SourceListShape &
  Epcis_DestinationListShape &
  Epcis_ErrorDeclarationShape &
  Epcis_SensorElementShape &
  Epcis_CertificationInfoShape &
  (
    | {
        "@id": string;
        [k: string]: unknown;
      }
    | (
        | {
            "@id": string;
            [k: string]: unknown;
          }
        | {
            [k: string]: unknown;
          }
      )
  );
export type Epcis_ILMDConditionallyForbiddenShape =
  | {
      [k: string]: unknown;
    }
  | {
      action?: "ADD" | "ADD"[];
    };
export type Epcis_SpecifySetOrUnsetShape =
  | {
      set: unknown;
    }
  | {
      unset: unknown;
    };
export type Epcis_AggregationEventShape = {
  eventTime: string;
  eventTimeZoneOffset: string;
  recordTime?: string;
  action: "ADD" | "OBSERVE" | "DELETE";
  bizStep?: string;
  disposition?: string;
  readPoint?: string;
  bizLocation?: string;
  parentID?: string;
  childEPCs?: string | string[];
  "@type": "AggregationEvent" | "https://ref.gs1.org/epcis/AggregationEvent";
  type?: "AggregationEvent" | "https://ref.gs1.org/epcis/AggregationEvent";
  "@id"?: string;
  id?: string;
  childQuantityList?: unknown;
  epcClass?: unknown;
  quantity?: unknown;
  uom?: unknown;
  bizTransactionList?: unknown;
  bizTransactionType?: unknown;
  sourceList?: unknown;
  sourceOrDestination?: unknown;
  sourceOrDestinationType?: unknown;
  destinationList?: unknown;
  errorDeclaration?: unknown;
  correctiveEventIDs?: unknown;
  reason?: unknown;
  declarationTime?: unknown;
  sensorElementList?: unknown;
  sensorMetadata?: unknown;
  sensorReport?: unknown;
  certificationInfo?: unknown;
} & Epcis_ChildQuantityElementShape &
  Epcis_QuantityElementForbiddenShape &
  Epcis_InputQuantityElementForbiddenShape &
  Epcis_OutputQuantityElementForbiddenShape &
  Epcis_PersistentDispositionForbiddenShape &
  Epcis_BizTransactionShape &
  Epcis_SourceListShape &
  Epcis_DestinationListShape &
  Epcis_ErrorDeclarationShape &
  Epcis_SensorElementShape &
  Epcis_CertificationInfoShape &
  (
    | {
        "@id": string;
        [k: string]: unknown;
      }
    | (
        | {
            "@id": string;
            [k: string]: unknown;
          }
        | {
            [k: string]: unknown;
          }
      )
  );
export type Epcis_AssociationEventShape = {
  eventTime: string;
  eventTimeZoneOffset: string;
  recordTime?: string;
  action: "ADD" | "OBSERVE" | "DELETE";
  bizStep?: string;
  disposition?: string;
  readPoint?: string;
  bizLocation?: string;
  parentID: string;
  childEPCs?: string | string[];
  "@type": "AssociationEvent" | "https://ref.gs1.org/epcis/AssociationEvent";
  type?: "AssociationEvent" | "https://ref.gs1.org/epcis/AssociationEvent";
  "@id"?: string;
  id?: string;
  childQuantityList?: unknown;
  epcClass?: unknown;
  quantity?: unknown;
  uom?: unknown;
  bizTransactionList?: unknown;
  bizTransactionType?: unknown;
  sourceList?: unknown;
  sourceOrDestination?: unknown;
  sourceOrDestinationType?: unknown;
  destinationList?: unknown;
  errorDeclaration?: unknown;
  correctiveEventIDs?: unknown;
  reason?: unknown;
  declarationTime?: unknown;
  sensorElementList?: unknown;
  sensorMetadata?: unknown;
  sensorReport?: unknown;
  certificationInfo?: unknown;
} & Epcis_ChildQuantityElementShape &
  Epcis_QuantityElementForbiddenShape &
  Epcis_InputQuantityElementForbiddenShape &
  Epcis_OutputQuantityElementForbiddenShape &
  Epcis_PersistentDispositionForbiddenShape &
  Epcis_BizTransactionShape &
  Epcis_SourceListShape &
  Epcis_DestinationListShape &
  Epcis_ErrorDeclarationShape &
  Epcis_SensorElementShape &
  Epcis_CertificationInfoShape &
  (
    | {
        "@id": string;
        [k: string]: unknown;
      }
    | (
        | {
            "@id": string;
            [k: string]: unknown;
          }
        | {
            [k: string]: unknown;
          }
      )
  );
export type Epcis_TransactionEventShape = {
  eventTime: string;
  eventTimeZoneOffset: string;
  recordTime?: string;
  action: "ADD" | "OBSERVE" | "DELETE";
  bizStep?: string;
  disposition?: string;
  readPoint?: string;
  bizLocation?: string;
  parentID?: string;
  epcList?: string | string[];
  "@type": "TransactionEvent" | "https://ref.gs1.org/epcis/TransactionEvent";
  type?: "TransactionEvent" | "https://ref.gs1.org/epcis/TransactionEvent";
  "@id"?: string;
  id?: string;
  quantityList?: unknown;
  epcClass?: unknown;
  quantity?: unknown;
  uom?: unknown;
  bizTransactionList?: unknown;
  bizTransactionType?: unknown;
  sourceList?: unknown;
  sourceOrDestination?: unknown;
  sourceOrDestinationType?: unknown;
  destinationList?: unknown;
  errorDeclaration?: unknown;
  correctiveEventIDs?: unknown;
  reason?: unknown;
  declarationTime?: unknown;
  sensorElementList?: unknown;
  sensorMetadata?: unknown;
  sensorReport?: unknown;
  certificationInfo?: unknown;
} & Epcis_QuantityElementShape &
  Epcis_ChildQuantityElementForbiddenShape &
  Epcis_InputQuantityElementForbiddenShape &
  Epcis_OutputQuantityElementForbiddenShape &
  Epcis_PersistentDispositionForbiddenShape &
  Epcis_BizTransactionMandatoryShape &
  Epcis_SourceListShape &
  Epcis_DestinationListShape &
  Epcis_ErrorDeclarationShape &
  Epcis_SensorElementShape &
  Epcis_CertificationInfoShape &
  (
    | {
        "@id": string;
        [k: string]: unknown;
      }
    | (
        | {
            "@id": string;
            [k: string]: unknown;
          }
        | {
            [k: string]: unknown;
          }
      )
  );
export type Epcis_TransformationEventShape = {
  eventTime: string;
  eventTimeZoneOffset: string;
  recordTime?: string;
  bizStep?: string;
  disposition?: string;
  readPoint?: string;
  bizLocation?: string;
  inputEPCList?: string | string[];
  outputEPCList?: string | string[];
  transformationID?: string;
  "@type": "TransformationEvent" | "https://ref.gs1.org/epcis/TransformationEvent";
  type?: "TransformationEvent" | "https://ref.gs1.org/epcis/TransformationEvent";
  "@id"?: string;
  id?: string;
  inputQuantityList?: unknown;
  epcClass?: unknown;
  quantity?: unknown;
  uom?: unknown;
  outputQuantityList?: unknown;
  persistentDisposition?: unknown;
  set?: unknown;
  unset?: unknown;
  bizTransactionList?: unknown;
  bizTransactionType?: unknown;
  sourceList?: unknown;
  sourceOrDestination?: unknown;
  sourceOrDestinationType?: unknown;
  destinationList?: unknown;
  errorDeclaration?: unknown;
  correctiveEventIDs?: unknown;
  reason?: unknown;
  declarationTime?: unknown;
  sensorElementList?: unknown;
  sensorMetadata?: unknown;
  sensorReport?: unknown;
  certificationInfo?: unknown;
} & Epcis_InputQuantityElementShape &
  Epcis_OutputQuantityElementShape &
  Epcis_QuantityElementForbiddenShape &
  Epcis_ChildQuantityElementForbiddenShape &
  Epcis_PersistentDispositionShape &
  Epcis_BizTransactionShape &
  Epcis_SourceListShape &
  Epcis_DestinationListShape &
  Epcis_ErrorDeclarationShape &
  Epcis_SensorElementShape &
  Epcis_CertificationInfoShape &
  Epcis_TransformationIDConditionsShape &
  (
    | {
        "@id": string;
        [k: string]: unknown;
      }
    | (
        | {
            "@id": string;
            [k: string]: unknown;
          }
        | {
            [k: string]: unknown;
          }
      )
  );
export type Epcis_TransformationIDConditionsShape =
  | ({
      transformationID: unknown;
      [k: string]: unknown;
    } & (
      | {
          outputEPCList: unknown;
          [k: string]: unknown;
        }
      | {
          outputQuantityList: unknown;
          [k: string]: unknown;
        }
      | {
          inputEPCList: unknown;
          [k: string]: unknown;
        }
      | {
          inputQuantityList: unknown;
          [k: string]: unknown;
        }
    ))
  | ((
      | {
          outputEPCList: unknown;
          [k: string]: unknown;
        }
      | {
          outputQuantityList: unknown;
          [k: string]: unknown;
        }
    ) &
      (
        | {
            inputEPCList: unknown;
            [k: string]: unknown;
          }
        | {
            inputQuantityList: unknown;
            [k: string]: unknown;
          }
      ));

export interface Epcis_EPCISDocumentShape {
  schemaVersion: string;
  creationDate: string;
  instanceIdentifier?: string;
  sender?: string;
  receiver?: string;
  epcisHeader?: unknown;
  epcisBody: Epcis_EventListShape;
  "@type": "EPCISDocument" | "https://ref.gs1.org/epcis/EPCISDocument";
  type?: "EPCISDocument" | "https://ref.gs1.org/epcis/EPCISDocument";
  "@id"?: string;
  id?: string;
}
export interface Epcis_EventListShape {
  eventList?: Epcis_EPCISEventShape | Epcis_EPCISEventShape[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface Epcis_QuantityElementShape {
  quantityList?:
    | {
        epcClass: string;
        quantity?: number;
        uom?: string;
      }
    | {
        epcClass: string;
        quantity?: number;
        uom?: string;
      }[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_InputQuantityElementForbiddenShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_OutputQuantityElementForbiddenShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_ChildQuantityElementForbiddenShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_PersistentDispositionShape {
  persistentDisposition?: Epcis_SpecifySetOrUnsetShape & {
    set?: string | string[];
    unset?: string | string[];
  };
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_BizTransactionShape {
  bizTransactionList?:
    | (string & {
        bizTransactionType?: string;
      })
    | (string & {
        bizTransactionType?: string;
      })[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_SourceListShape {
  sourceList?:
    | {
        sourceOrDestination: string;
        sourceOrDestinationType: string;
      }
    | {
        sourceOrDestination: string;
        sourceOrDestinationType: string;
      }[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_DestinationListShape {
  destinationList?:
    | {
        sourceOrDestination: string;
        sourceOrDestinationType: string;
      }
    | {
        sourceOrDestination: string;
        sourceOrDestinationType: string;
      }[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_ErrorDeclarationShape {
  errorDeclaration?: {
    correctiveEventIDs?: string | string[];
    reason?: string;
    declarationTime: string;
  };
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_SensorElementShape {
  sensorElementList?:
    | {
        sensorMetadata?: unknown;
        sensorReport: unknown;
      }
    | {
        sensorMetadata?: unknown;
        sensorReport: unknown;
      }[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_CertificationInfoShape {
  certificationInfo?: string | string[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_ChildQuantityElementShape {
  childQuantityList?:
    | {
        epcClass: string;
        quantity?: number;
        uom?: string;
      }
    | {
        epcClass: string;
        quantity?: number;
        uom?: string;
      }[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_QuantityElementForbiddenShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_PersistentDispositionForbiddenShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_BizTransactionMandatoryShape {
  bizTransactionList:
    | (string & {
        bizTransactionType?: string;
      })
    | [
        string &
          string & {
            bizTransactionType?: string & string;
          },
        ...(string &
          string & {
            bizTransactionType?: string & string;
          })[]
      ];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_InputQuantityElementShape {
  inputQuantityList?:
    | {
        epcClass: string;
        quantity?: number;
        uom?: string;
      }
    | {
        epcClass: string;
        quantity?: number;
        uom?: string;
      }[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface Epcis_OutputQuantityElementShape {
  outputQuantityList?:
    | {
        epcClass: string;
        quantity?: number;
        uom?: string;
      }
    | {
        epcClass: string;
        quantity?: number;
        uom?: string;
      }[];
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}

/**
 * Alias exports without internal prefixes.
 */
export type EPCISEventShape = Epcis_EPCISEventShape;
export type ObjectEventShape = Epcis_ObjectEventShape;
export type ILMDConditionallyForbiddenShape = Epcis_ILMDConditionallyForbiddenShape;
export type SpecifySetOrUnsetShape = Epcis_SpecifySetOrUnsetShape;
export type AggregationEventShape = Epcis_AggregationEventShape;
export type AssociationEventShape = Epcis_AssociationEventShape;
export type TransactionEventShape = Epcis_TransactionEventShape;
export type TransformationEventShape = Epcis_TransformationEventShape;
export type TransformationIDConditionsShape = Epcis_TransformationIDConditionsShape;
export type EPCISDocumentShape = Epcis_EPCISDocumentShape;
export type EventListShape = Epcis_EventListShape;
export type QuantityElementShape = Epcis_QuantityElementShape;
export type InputQuantityElementForbiddenShape = Epcis_InputQuantityElementForbiddenShape;
export type OutputQuantityElementForbiddenShape = Epcis_OutputQuantityElementForbiddenShape;
export type ChildQuantityElementForbiddenShape = Epcis_ChildQuantityElementForbiddenShape;
export type PersistentDispositionShape = Epcis_PersistentDispositionShape;
export type BizTransactionShape = Epcis_BizTransactionShape;
export type SourceListShape = Epcis_SourceListShape;
export type DestinationListShape = Epcis_DestinationListShape;
export type ErrorDeclarationShape = Epcis_ErrorDeclarationShape;
export type SensorElementShape = Epcis_SensorElementShape;
export type CertificationInfoShape = Epcis_CertificationInfoShape;
export type ChildQuantityElementShape = Epcis_ChildQuantityElementShape;
export type QuantityElementForbiddenShape = Epcis_QuantityElementForbiddenShape;
export type PersistentDispositionForbiddenShape = Epcis_PersistentDispositionForbiddenShape;
export type BizTransactionMandatoryShape = Epcis_BizTransactionMandatoryShape;
export type InputQuantityElementShape = Epcis_InputQuantityElementShape;
export type OutputQuantityElementShape = Epcis_OutputQuantityElementShape;
