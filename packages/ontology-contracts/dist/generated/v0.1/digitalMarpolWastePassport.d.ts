/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-19 15:36:06
 * Source: shapes/v0.1/digital-marpol-waste-passport.shacl.ttl
 */
export type DigitalMarpolWastePassportSchema = {
    "@graph": (Dmwp_DigitalMarpolWastePassportShape | Dmwp_MarpolWastePassportShape | Dmwp_MarpolWasteShape | Dmwp_ResidueInformationShape | Dmwp_ShipShape | Dmwp_AuthorizedPartyShape | Dmwp_InvolvedPartyShape)[];
    [k: string]: unknown;
} | Dmwp_DigitalMarpolWastePassportShape | Dmwp_MarpolWastePassportShape | Dmwp_MarpolWasteShape | Dmwp_ResidueInformationShape | Dmwp_ShipShape | Dmwp_AuthorizedPartyShape | Dmwp_InvolvedPartyShape;
export type Dmwp_ResidueInformationShape = {
    typeCode: "OIL";
    subtypeCode: "SLU";
    substance?: string;
    dischargeMeans?: "ZTE" | "ZTD" | "ZTC" | "ZTB";
    nextCollectionPort?: string;
    quantityToDeliver?: {
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    };
    quantityRemainingOnBoard?: {
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    };
    estimatedGenerated?: {
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    };
    maxCapacity?: {
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    };
    "@type": "ResidueInformation" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#ResidueInformation";
    type?: "ResidueInformation" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#ResidueInformation";
    "@id"?: string;
    id?: string;
} & ({
    quantityToDeliver: ({
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    }) | [
        ({
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        }),
        ...({
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        })[]
    ];
    [k: string]: unknown;
} | {
    quantityRemainingOnBoard: ({
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    }) | [
        ({
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        }),
        ...({
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        })[]
    ];
    [k: string]: unknown;
} | {
    estimatedGenerated: ({
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    }) | [
        ({
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        }),
        ...({
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        })[]
    ];
    [k: string]: unknown;
});
export interface Dmwp_DigitalMarpolWastePassportShape {
    credentialSubject: Dmwp_MarpolWastePassportShape;
    issued: string;
    publisher: unknown;
    "@type": "DigitalMarpolWastePassport" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#DigitalMarpolWastePassport";
    type?: "DigitalMarpolWastePassport" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#DigitalMarpolWastePassport";
    "@id"?: string;
    id?: string;
}
export interface Dmwp_MarpolWastePassportShape {
    waste: Dmwp_MarpolWasteShape;
    "@type": "MarpolWastePassport" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#MarpolWastePassport";
    type?: "MarpolWastePassport" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#MarpolWastePassport";
    "@id"?: string;
    id?: string;
}
export interface Dmwp_MarpolWasteShape {
    ship: Dmwp_ShipShape;
    residue: Dmwp_ResidueInformationShape | [Dmwp_ResidueInformationShape, ...Dmwp_ResidueInformationShape[]];
    lastDeliveryDate?: string;
    arrivalPort?: string;
    nextPlannedDeliveryPort?: string;
    lastWasteDeliveryPort?: string;
    deliveryType?: "ZTO" | "REC" | "DIS";
    shipScale?: string;
    marpolEdition?: string;
    wasteAgent?: Dmwp_AuthorizedPartyShape;
    message?: unknown;
    involvedParty?: unknown;
    "@type": "MarpolWaste" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#MarpolWaste";
    type?: "MarpolWaste" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#MarpolWaste";
    "@id"?: string;
    id?: string;
}
export interface Dmwp_ShipShape {
    imoNumber: string;
    name: string;
    flag: string;
    "@type": "Ship" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#Ship";
    type?: "Ship" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#Ship";
    "@id"?: string;
    id?: string;
}
export interface Dmwp_AuthorizedPartyShape {
    identifier: string;
    contactPoint?: unknown;
    "@type": "AuthorizedParty" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#AuthorizedParty";
    type?: "AuthorizedParty" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#AuthorizedParty";
    "@id"?: string;
    id?: string;
}
export interface Dmwp_InvolvedPartyShape {
    role?: unknown;
    "@type": "InvolvedParty" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#InvolvedParty";
    type?: "InvolvedParty" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#InvolvedParty";
    "@id"?: string;
    id?: string;
}
/**
 * Alias exports without internal prefixes.
 */
export type ResidueInformationShape = Dmwp_ResidueInformationShape;
export type DigitalMarpolWastePassportShape = Dmwp_DigitalMarpolWastePassportShape;
export type MarpolWastePassportShape = Dmwp_MarpolWastePassportShape;
export type MarpolWasteShape = Dmwp_MarpolWasteShape;
export type ShipShape = Dmwp_ShipShape;
export type AuthorizedPartyShape = Dmwp_AuthorizedPartyShape;
export type InvolvedPartyShape = Dmwp_InvolvedPartyShape;
//# sourceMappingURL=digitalMarpolWastePassport.d.ts.map