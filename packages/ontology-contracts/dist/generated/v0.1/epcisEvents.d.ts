/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-11 15:11:26
 * Source: shapes/v0.1/epcis-events.shacl.ttl
 */
export type EpcisEventsSchema = {
    "@graph": (Epcis_EPCISDocumentShape | Epcis_ObjectEventShape | Epcis_AggregationEventShape | Epcis_AssociationEventShape | Epcis_TransactionEventShape | Epcis_TransformationEventShape | Epcis_TransformationIDConditionsShape)[];
    [k: string]: unknown;
} | ({
    [k: string]: unknown;
} & (Epcis_EPCISDocumentShape | Epcis_ObjectEventShape | Epcis_AggregationEventShape | Epcis_AssociationEventShape | Epcis_TransactionEventShape | Epcis_TransformationEventShape | Epcis_TransformationIDConditionsShape));
export type Epcis_EPCISDocumentShape = {
    versionInfo: string | [string];
    created: string | [string];
    instanceIdentifier?: string | [] | [string];
    sender?: string | [] | [string | string];
    receiver?: string | [] | [string | string];
    epcisHeader?: unknown;
    epcisBody?: unknown;
    eventList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & {
    epcisHeader?: Epcis_EpcisHeaderShape | [] | [Epcis_EpcisHeaderShape];
    [k: string]: unknown;
} & {
    epcisBody: Epcis_EpcisBodyShape | [Epcis_EpcisBodyShape];
    [k: string]: unknown;
} & ({
    "@type": "https://ref.gs1.org/epcis/EPCISDocument" | "EPCISDocument";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
export type Epcis_EpcisHeaderShape = {
    epcisHeader?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_EpcisBodyShape = {
    epcisBody?: unknown;
    eventList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & {
    eventList?: Epcis_EventListShape | Epcis_EventListShape[];
    [k: string]: unknown;
};
export type Epcis_EventListShape = {
    eventList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_ObjectEventShape = {
    eventTime: string | [string];
    eventTimeZoneOffset: string | [string & string];
    recordTime?: string | [] | [string];
    action: (string & ("ADD" | "OBSERVE" | "DELETE")) | [string & ("ADD" | "OBSERVE" | "DELETE")];
    bizStep?: string | [] | [string & string];
    disposition?: string | [] | [string & string];
    readPoint?: string | [] | [string & string];
    bizLocation?: string | [] | [string & string];
    epcList?: string | string[];
    parentID?: unknown;
    childEPCs?: unknown;
    inputEPCList?: unknown;
    outputEPCList?: unknown;
    quantityList?: unknown;
    epcClass?: unknown;
    quantity?: unknown;
    uom?: unknown;
    inputQuantityList?: unknown;
    outputQuantityList?: unknown;
    childQuantityList?: unknown;
    ilmd?: unknown;
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
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & {
    [k: string]: unknown;
} & {
    quantityList?: Epcis_QuantityElementShape | Epcis_QuantityElementShape[];
    [k: string]: unknown;
} & ({
    [k: string]: unknown;
} | {
    action?: "ADD" | "ADD"[];
    [k: string]: unknown;
}) & {
    persistentDisposition?: Epcis_PersistentDispositionShape | [] | [Epcis_PersistentDispositionShape];
    [k: string]: unknown;
} & {
    bizTransactionList?: Epcis_BizTransactionShape | Epcis_BizTransactionShape[];
    [k: string]: unknown;
} & {
    sourceList?: Epcis_SourceListShape | Epcis_SourceListShape[];
    [k: string]: unknown;
} & {
    destinationList?: Epcis_DestinationListShape | Epcis_DestinationListShape[];
    [k: string]: unknown;
} & {
    errorDeclaration?: Epcis_ErrorDeclarationShape | [] | [Epcis_ErrorDeclarationShape];
    [k: string]: unknown;
} & {
    sensorElementList?: Epcis_SensorElementShape | Epcis_SensorElementShape[];
    [k: string]: unknown;
} & {
    certificationInfo?: string | string[];
    [k: string]: unknown;
} & ({
    "@type": "https://ref.gs1.org/epcis/ObjectEvent" | "ObjectEvent";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
}) & ({
    "@id": string;
    [k: string]: unknown;
} | ({
    "@id": string;
    [k: string]: unknown;
} | {
    [k: string]: unknown;
}));
export type Epcis_QuantityElementShape = {
    epcClass: string | [string & string];
    quantity?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    uom?: string | [] | [string & string];
    quantityList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_PersistentDispositionShape = {
    set?: string | string[];
    unset?: string | string[];
    persistentDisposition?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    set: unknown;
    [k: string]: unknown;
} | {
    unset: unknown;
    [k: string]: unknown;
});
export type Epcis_BizTransactionShape = {
    bizTransactionType?: string | [] | [string & string];
    bizTransactionList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_SourceListShape = {
    sourceOrDestination: string | [string & string];
    sourceOrDestinationType: string | [string & string];
    sourceList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_DestinationListShape = {
    sourceOrDestination: string | [string & string];
    sourceOrDestinationType: string | [string & string];
    destinationList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_ErrorDeclarationShape = {
    correctiveEventIDs?: string | string[];
    reason?: string | [] | [string & string];
    declarationTime: string | [string];
    errorDeclaration?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_SensorElementShape = {
    sensorMetadata?: Epcis_SensorMetadataShape | [] | [Epcis_SensorMetadataShape];
    sensorReport: Epcis_SensorReportShape | [Epcis_SensorReportShape, ...Epcis_SensorReportShape[]];
    sensorElementList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_SensorMetadataShape = {
    time?: string | [] | [string];
    startTime?: string | [] | [string];
    endTime?: string | [] | [string];
    deviceID?: string | [] | [string & string];
    deviceMetadata?: string | [] | [string & string];
    rawData?: string | [] | [string & string];
    dataProcessingMethod?: string | [] | [string & string];
    bizRules?: string | [] | [string & string];
    sensorMetadata?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_SensorReportShape = {
    time?: string | [] | [string];
    deviceID?: string | [] | [string & string];
    deviceMetadata?: string | [] | [string & string];
    rawData?: string | [] | [string & string];
    dataProcessingMethod?: string | [] | [string & string];
    measurementType?: string | [] | [string & string];
    exception?: string | [] | [string & string];
    microorganism?: string | [] | [string & string];
    chemicalSubstance?: string | [] | [string & string];
    coordinateReferenceSystem?: string | [] | [string & string];
    uriValue?: string | [] | [string & string];
    value?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    minValue?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    maxValue?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    meanValue?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    sDev?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    percRank?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    percValue?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    booleanValue?: boolean | [] | [boolean];
    hexBinaryValue?: string | [] | [string];
    stringValue?: string | [] | [string];
    uom?: string | [] | [string];
    component?: string | [] | [string & string];
    sensorReport?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_AggregationEventShape = {
    eventTime: string | [string];
    eventTimeZoneOffset: string | [string & string];
    recordTime?: string | [] | [string];
    action: (string & ("ADD" | "OBSERVE" | "DELETE")) | [string & ("ADD" | "OBSERVE" | "DELETE")];
    bizStep?: string | [] | [string & string];
    disposition?: string | [] | [string & string];
    readPoint?: string | [] | [string & string];
    bizLocation?: string | [] | [string & string];
    parentID?: string | [] | [string & string];
    childEPCs?: string | string[];
    epcList?: unknown;
    inputEPCList?: unknown;
    outputEPCList?: unknown;
    ilmd?: unknown;
    childQuantityList?: unknown;
    epcClass?: unknown;
    quantity?: unknown;
    uom?: unknown;
    quantityList?: unknown;
    inputQuantityList?: unknown;
    outputQuantityList?: unknown;
    persistentDisposition?: unknown;
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
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & {
    [k: string]: unknown;
} & {
    childQuantityList?: Epcis_ChildQuantityElementShape | Epcis_ChildQuantityElementShape[];
    [k: string]: unknown;
} & {
    bizTransactionList?: Epcis_BizTransactionShape | Epcis_BizTransactionShape[];
    [k: string]: unknown;
} & {
    sourceList?: Epcis_SourceListShape | Epcis_SourceListShape[];
    [k: string]: unknown;
} & {
    destinationList?: Epcis_DestinationListShape | Epcis_DestinationListShape[];
    [k: string]: unknown;
} & {
    errorDeclaration?: Epcis_ErrorDeclarationShape | [] | [Epcis_ErrorDeclarationShape];
    [k: string]: unknown;
} & {
    sensorElementList?: Epcis_SensorElementShape | Epcis_SensorElementShape[];
    [k: string]: unknown;
} & {
    certificationInfo?: string | string[];
    [k: string]: unknown;
} & ({
    "@type": "https://ref.gs1.org/epcis/AggregationEvent" | "AggregationEvent";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
}) & ({
    "@id": string;
    [k: string]: unknown;
} | ({
    "@id": string;
    [k: string]: unknown;
} | {
    [k: string]: unknown;
}));
export type Epcis_ChildQuantityElementShape = {
    epcClass: string | [string & string];
    quantity?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    uom?: string | [] | [string & string];
    childQuantityList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_AssociationEventShape = {
    eventTime: string | [string];
    eventTimeZoneOffset: string | [string & string];
    recordTime?: string | [] | [string];
    action: (string & ("ADD" | "OBSERVE" | "DELETE")) | [string & ("ADD" | "OBSERVE" | "DELETE")];
    bizStep?: string | [] | [string & string];
    disposition?: string | [] | [string & string];
    readPoint?: string | [] | [string & string];
    bizLocation?: string | [] | [string & string];
    parentID: string | [string & string];
    childEPCs?: string | string[];
    epcList?: unknown;
    inputEPCList?: unknown;
    outputEPCList?: unknown;
    ilmd?: unknown;
    childQuantityList?: unknown;
    epcClass?: unknown;
    quantity?: unknown;
    uom?: unknown;
    quantityList?: unknown;
    inputQuantityList?: unknown;
    outputQuantityList?: unknown;
    persistentDisposition?: unknown;
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
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & {
    [k: string]: unknown;
} & {
    childQuantityList?: Epcis_ChildQuantityElementShape | Epcis_ChildQuantityElementShape[];
    [k: string]: unknown;
} & {
    bizTransactionList?: Epcis_BizTransactionShape | Epcis_BizTransactionShape[];
    [k: string]: unknown;
} & {
    sourceList?: Epcis_SourceListShape | Epcis_SourceListShape[];
    [k: string]: unknown;
} & {
    destinationList?: Epcis_DestinationListShape | Epcis_DestinationListShape[];
    [k: string]: unknown;
} & {
    errorDeclaration?: Epcis_ErrorDeclarationShape | [] | [Epcis_ErrorDeclarationShape];
    [k: string]: unknown;
} & {
    sensorElementList?: Epcis_SensorElementShape | Epcis_SensorElementShape[];
    [k: string]: unknown;
} & {
    certificationInfo?: string | string[];
    [k: string]: unknown;
} & ({
    "@type": "https://ref.gs1.org/epcis/AssociationEvent" | "AssociationEvent";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
}) & ({
    "@id": string;
    [k: string]: unknown;
} | ({
    "@id": string;
    [k: string]: unknown;
} | {
    [k: string]: unknown;
}));
export type Epcis_TransactionEventShape = {
    eventTime: string | [string];
    eventTimeZoneOffset: string | [string & string];
    recordTime?: string | [] | [string];
    action: (string & ("ADD" | "OBSERVE" | "DELETE")) | [string & ("ADD" | "OBSERVE" | "DELETE")];
    bizStep?: string | [] | [string & string];
    disposition?: string | [] | [string & string];
    readPoint?: string | [] | [string & string];
    bizLocation?: string | [] | [string & string];
    parentID?: string | [] | [string & string];
    epcList?: string | string[];
    childEPCs?: unknown;
    inputEPCList?: unknown;
    outputEPCList?: unknown;
    ilmd?: unknown;
    quantityList?: unknown;
    epcClass?: unknown;
    quantity?: unknown;
    uom?: unknown;
    childQuantityList?: unknown;
    inputQuantityList?: unknown;
    outputQuantityList?: unknown;
    persistentDisposition?: unknown;
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
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & {
    [k: string]: unknown;
} & {
    quantityList?: Epcis_QuantityElementShape | Epcis_QuantityElementShape[];
    [k: string]: unknown;
} & {
    bizTransactionList: Epcis_BizTransactionMandatoryShape | [Epcis_BizTransactionMandatoryShape, ...Epcis_BizTransactionMandatoryShape[]];
    [k: string]: unknown;
} & {
    sourceList?: Epcis_SourceListShape | Epcis_SourceListShape[];
    [k: string]: unknown;
} & {
    destinationList?: Epcis_DestinationListShape | Epcis_DestinationListShape[];
    [k: string]: unknown;
} & {
    errorDeclaration?: Epcis_ErrorDeclarationShape | [] | [Epcis_ErrorDeclarationShape];
    [k: string]: unknown;
} & {
    sensorElementList?: Epcis_SensorElementShape | Epcis_SensorElementShape[];
    [k: string]: unknown;
} & {
    certificationInfo?: string | string[];
    [k: string]: unknown;
} & ({
    "@type": "https://ref.gs1.org/epcis/TransactionEvent" | "TransactionEvent";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
}) & ({
    "@id": string;
    [k: string]: unknown;
} | ({
    "@id": string;
    [k: string]: unknown;
} | {
    [k: string]: unknown;
}));
export type Epcis_BizTransactionMandatoryShape = {
    bizTransactionType?: string | [] | [string & string];
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_TransformationEventShape = {
    eventTime: string | [string];
    eventTimeZoneOffset: string | [string & string];
    recordTime?: string | [] | [string];
    bizStep?: string | [] | [string & string];
    disposition?: string | [] | [string & string];
    readPoint?: string | [] | [string & string];
    bizLocation?: string | [] | [string & string];
    inputEPCList?: string | string[];
    outputEPCList?: string | string[];
    transformationID?: string | [] | [string & string];
    action?: unknown;
    parentID?: unknown;
    childEPCs?: unknown;
    epcList?: unknown;
    inputQuantityList?: unknown;
    epcClass?: unknown;
    quantity?: unknown;
    uom?: unknown;
    outputQuantityList?: unknown;
    quantityList?: unknown;
    childQuantityList?: unknown;
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
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & {
    [k: string]: unknown;
} & {
    inputQuantityList?: Epcis_InputQuantityElementShape | Epcis_InputQuantityElementShape[];
    [k: string]: unknown;
} & {
    outputQuantityList?: Epcis_OutputQuantityElementShape | Epcis_OutputQuantityElementShape[];
    [k: string]: unknown;
} & {
    persistentDisposition?: Epcis_PersistentDispositionShape | [] | [Epcis_PersistentDispositionShape];
    [k: string]: unknown;
} & {
    bizTransactionList?: Epcis_BizTransactionShape | Epcis_BizTransactionShape[];
    [k: string]: unknown;
} & {
    sourceList?: Epcis_SourceListShape | Epcis_SourceListShape[];
    [k: string]: unknown;
} & {
    destinationList?: Epcis_DestinationListShape | Epcis_DestinationListShape[];
    [k: string]: unknown;
} & {
    errorDeclaration?: Epcis_ErrorDeclarationShape | [] | [Epcis_ErrorDeclarationShape];
    [k: string]: unknown;
} & {
    sensorElementList?: Epcis_SensorElementShape | Epcis_SensorElementShape[];
    [k: string]: unknown;
} & {
    certificationInfo?: string | string[];
    [k: string]: unknown;
} & (({
    transformationID: unknown;
    [k: string]: unknown;
} & ({
    outputEPCList: unknown;
    [k: string]: unknown;
} | {
    outputQuantityList: unknown;
    [k: string]: unknown;
} | {
    inputEPCList: unknown;
    [k: string]: unknown;
} | {
    inputQuantityList: unknown;
    [k: string]: unknown;
})) | (({
    outputEPCList: unknown;
    [k: string]: unknown;
} | {
    outputQuantityList: unknown;
    [k: string]: unknown;
}) & ({
    inputEPCList: unknown;
    [k: string]: unknown;
} | {
    inputQuantityList: unknown;
    [k: string]: unknown;
}))) & ({
    "@type": "https://ref.gs1.org/epcis/TransformationEvent" | "TransformationEvent";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
}) & ({
    "@id": string;
    [k: string]: unknown;
} | ({
    "@id": string;
    [k: string]: unknown;
} | {
    [k: string]: unknown;
}));
export type Epcis_InputQuantityElementShape = {
    epcClass: string | [string & string];
    quantity?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    uom?: string | [] | [string & string];
    inputQuantityList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_OutputQuantityElementShape = {
    epcClass: string | [string & string];
    quantity?: (number & {
        [k: string]: unknown;
    }) | [] | [
        number & {
            [k: string]: unknown;
        }
    ];
    uom?: string | [] | [string & string];
    outputQuantityList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
};
export type Epcis_TransformationIDConditionsShape = {
    transformationID?: unknown;
    outputEPCList?: unknown;
    outputQuantityList?: unknown;
    inputEPCList?: unknown;
    inputQuantityList?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://ref.gs1.org/epcis/TransformationEvent" | "TransformationEvent";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
}) & (({
    transformationID: unknown;
    [k: string]: unknown;
} & ({
    outputEPCList: unknown;
    [k: string]: unknown;
} | {
    outputQuantityList: unknown;
    [k: string]: unknown;
} | {
    inputEPCList: unknown;
    [k: string]: unknown;
} | {
    inputQuantityList: unknown;
    [k: string]: unknown;
})) | (({
    outputEPCList: unknown;
    [k: string]: unknown;
} | {
    outputQuantityList: unknown;
    [k: string]: unknown;
}) & ({
    inputEPCList: unknown;
    [k: string]: unknown;
} | {
    inputQuantityList: unknown;
    [k: string]: unknown;
})));
/**
 * Alias exports without internal prefixes.
 */
export type EPCISDocumentShape = Epcis_EPCISDocumentShape;
export type EpcisHeaderShape = Epcis_EpcisHeaderShape;
export type EpcisBodyShape = Epcis_EpcisBodyShape;
export type EventListShape = Epcis_EventListShape;
export type ObjectEventShape = Epcis_ObjectEventShape;
export type QuantityElementShape = Epcis_QuantityElementShape;
export type PersistentDispositionShape = Epcis_PersistentDispositionShape;
export type BizTransactionShape = Epcis_BizTransactionShape;
export type SourceListShape = Epcis_SourceListShape;
export type DestinationListShape = Epcis_DestinationListShape;
export type ErrorDeclarationShape = Epcis_ErrorDeclarationShape;
export type SensorElementShape = Epcis_SensorElementShape;
export type SensorMetadataShape = Epcis_SensorMetadataShape;
export type SensorReportShape = Epcis_SensorReportShape;
export type AggregationEventShape = Epcis_AggregationEventShape;
export type ChildQuantityElementShape = Epcis_ChildQuantityElementShape;
export type AssociationEventShape = Epcis_AssociationEventShape;
export type TransactionEventShape = Epcis_TransactionEventShape;
export type BizTransactionMandatoryShape = Epcis_BizTransactionMandatoryShape;
export type TransformationEventShape = Epcis_TransformationEventShape;
export type InputQuantityElementShape = Epcis_InputQuantityElementShape;
export type OutputQuantityElementShape = Epcis_OutputQuantityElementShape;
export type TransformationIDConditionsShape = Epcis_TransformationIDConditionsShape;
//# sourceMappingURL=epcisEvents.d.ts.map