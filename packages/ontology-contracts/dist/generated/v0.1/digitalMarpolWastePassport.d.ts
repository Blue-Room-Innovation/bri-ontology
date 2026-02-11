/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-11 15:11:21
 * Source: shapes/v0.1/digital-marpol-waste-passport.shacl.ttl
 */
export type DigitalMarpolWastePassportSchema = {
    "@graph": (Dmwp_DigitalMarpolWastePassportShape | Dmwp_MarpolWastePassportShape | Dmwp_MarpolWasteShape | Dmwp_ResidueInformationShape | Dmwp_ShipShape | Dmwp_AuthorizedPartyShape | Dmwp_InvolvedPartyShape)[];
    [k: string]: unknown;
} | ({
    [k: string]: unknown;
} & (Dmwp_DigitalMarpolWastePassportShape | Dmwp_MarpolWastePassportShape | Dmwp_MarpolWasteShape | Dmwp_ResidueInformationShape | Dmwp_ShipShape | Dmwp_AuthorizedPartyShape | Dmwp_InvolvedPartyShape));
export type Dmwp_DigitalMarpolWastePassportShape = {
    credentialSubject: Dmwp_MarpolWastePassportShape | [Dmwp_MarpolWastePassportShape];
    issued: string | [string];
    publisher: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#DigitalMarpolWastePassport" | "DigitalMarpolWastePassport";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
export type Dmwp_MarpolWastePassportShape = {
    waste: Dmwp_MarpolWasteShape | [Dmwp_MarpolWasteShape];
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#MarpolWastePassport" | "MarpolWastePassport";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
export type Dmwp_MarpolWasteShape = {
    ship: Dmwp_ShipShape | [Dmwp_ShipShape];
    residue: Dmwp_ResidueInformationShape | [Dmwp_ResidueInformationShape, ...Dmwp_ResidueInformationShape[]];
    lastDeliveryDate?: string | [] | [string];
    arrivalPort?: string | [] | [string & string];
    nextPlannedDeliveryPort?: string | [] | [string & string];
    lastWasteDeliveryPort?: string | [] | [string & string];
    deliveryType?: (string & ("ZTO" | "REC" | "DIS")) | [] | [string & ("ZTO" | "REC" | "DIS")];
    shipScale?: string | [] | [string];
    marpolEdition?: string | [] | [string];
    wasteAgent?: Dmwp_AuthorizedPartyShape | [] | [Dmwp_AuthorizedPartyShape];
    message?: unknown;
    involvedParty?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#MarpolWaste" | "MarpolWaste";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
export type Dmwp_ShipShape = {
    imoNumber: string | [string & string];
    name: string | [string];
    flag: string | [string & string];
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#Ship" | "Ship";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
export type Dmwp_ResidueInformationShape = {
    typeCode: (string & "OIL") | [string & "OIL"];
    subtypeCode: (string & "SLU") | [string & "SLU"];
    substance?: string | [] | [string];
    dischargeMeans?: (string & ("ZTE" | "ZTD" | "ZTC" | "ZTB")) | [] | [string & ("ZTE" | "ZTD" | "ZTC" | "ZTB")];
    nextCollectionPort?: string | [] | [string & string];
    quantityToDeliver?: ({
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    }) | [] | [
        {
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        }
    ];
    quantityRemainingOnBoard?: ({
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    }) | [] | [
        {
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        }
    ];
    estimatedGenerated?: ({
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    }) | [] | [
        {
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        }
    ];
    maxCapacity?: ({
        "@type": "https://ontology.untp.io/core/Measure" | "Measure";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    }) | [] | [
        {
            "@type": "https://ontology.untp.io/core/Measure" | "Measure";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        }
    ];
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#ResidueInformation" | "ResidueInformation";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
}) & ({
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
export type Dmwp_AuthorizedPartyShape = {
    identifier: string | [string];
    contactPoint?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#AuthorizedParty" | "AuthorizedParty";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
export type Dmwp_InvolvedPartyShape = {
    role?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalMarpolWastePassport.ttl#InvolvedParty" | "InvolvedParty";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
/**
 * Alias exports without internal prefixes.
 */
export type DigitalMarpolWastePassportShape = Dmwp_DigitalMarpolWastePassportShape;
export type MarpolWastePassportShape = Dmwp_MarpolWastePassportShape;
export type MarpolWasteShape = Dmwp_MarpolWasteShape;
export type ShipShape = Dmwp_ShipShape;
export type ResidueInformationShape = Dmwp_ResidueInformationShape;
export type AuthorizedPartyShape = Dmwp_AuthorizedPartyShape;
export type InvolvedPartyShape = Dmwp_InvolvedPartyShape;
//# sourceMappingURL=digitalMarpolWastePassport.d.ts.map