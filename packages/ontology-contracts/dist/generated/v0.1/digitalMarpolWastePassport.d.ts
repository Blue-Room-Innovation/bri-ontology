/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-01-29 14:21:54
 * Source: shapes/v0.1/digitalMarpolWastePassportShapes.ttl
 */
/**
 * Must have at least one ResidueInformation.
 */
export type ResidueInformationShape = {
    "dmwp:quantityToDeliver": {
        [k: string]: unknown;
    };
    [k: string]: unknown;
} | {
    "dmwp:quantityRemainingOnBoard": {
        [k: string]: unknown;
    };
    [k: string]: unknown;
} | {
    "dmwp:estimatedGenerated": {
        [k: string]: unknown;
    };
    [k: string]: unknown;
};
/**
 * Main shape of the Digital MARPOL Waste Passport (closed).
 */
export interface DigitalMarpolWastePassportShape {
    "dmwp:credentialSubject": MarpolWastePassportShape;
    /**
     * Missing issued date (dct:issued).
     */
    "dct:issued": string;
    /**
     * Missing publisher (dct:publisher).
     */
    "dct:publisher": {
        [k: string]: unknown;
    };
}
/**
 * Must have a credentialSubject (MarpolWastePassport).
 */
export interface MarpolWastePassportShape {
    "dmwp:waste": MarpolWasteShape;
}
/**
 * Must link a MarpolWaste.
 */
export interface MarpolWasteShape {
    "dmwp:ship": ShipShape;
    "dmwp:residue": ResidueInformationShape;
    "dmwp:lastDeliveryDate"?: string;
    /**
     * arrivalPort must match UN/LOCODE pattern (e.g. ESPMI).
     */
    "dmwp:arrivalPort"?: string;
    "dmwp:nextPlannedDeliveryPort"?: string;
    "dmwp:lastWasteDeliveryPort"?: string;
    /**
     * deliveryType outside allowed list (ZTO, REC, DIS).
     */
    "dmwp:deliveryType"?: "ZTO" | "REC" | "DIS";
    "dmwp:shipScale"?: string;
    "dmwp:marpolEdition"?: string;
    "dmwp:wasteAgent"?: AuthorizedPartyShape;
    "dmwp:message"?: {
        [k: string]: unknown;
    };
    "dmwp:involvedParty"?: {
        [k: string]: unknown;
    };
}
/**
 * Must specify the ship (ship).
 */
export interface ShipShape {
    /**
     * IMO must be 7 digits.
     */
    "dmwp:imoNumber": string;
    "dmwp:name": string;
    /**
     * flag must be ISO 3166-1 alpha-2.
     */
    "dmwp:flag": string;
}
/**
 * Authorized entity (closed).
 */
export interface AuthorizedPartyShape {
    "dmwp:identifier": string;
    "dmwp:contactPoint"?: {
        [k: string]: unknown;
    };
}
//# sourceMappingURL=digitalMarpolWastePassport.d.ts.map