/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-01-20 11:58:28
 * Source: shapes/v0.1/digitalWastePassportShapes.ttl
 */
/**
 * Shape principal del DigitalWastePassport; cerrado para detectar propiedades inesperadas.
 */
export interface DigitalWastePassportShape {
    /**
     * Debe tener una fecha de emisión (dct:issued).
     */
    "dct:issued": string;
    /**
     * Debe indicar publisher (dct:publisher).
     */
    "dct:publisher": {
        [k: string]: unknown;
    };
    "dwp:credentialSubject": WastePassportShape;
    "dct:valid"?: string;
}
/**
 * Debe enlazar exactamente un WastePassport.
 */
export interface WastePassportShape {
    "dwp:waste": WasteShape;
    "dct:identifier"?: string;
    "unece:reportingStandard"?: StandardShape;
}
/**
 * Debe referenciar un Waste.
 */
export interface WasteShape {
    /**
     * Debe tener nombre (unece:name).
     */
    "unece:name": string;
    "unece:productName": string;
    "unece:productDescription"?: string;
    "unece:hasBatchIdentifier"?: string;
    /**
     * originCountry debe estar en el listado permitido (subset EU+GB).
     */
    "unece:originCountry"?: "https://vocabulary.uncefact.org/CountryId#DE" | "https://vocabulary.uncefact.org/CountryId#ES" | "https://vocabulary.uncefact.org/CountryId#FR" | "https://vocabulary.uncefact.org/CountryId#IT" | "https://vocabulary.uncefact.org/CountryId#NL" | "https://vocabulary.uncefact.org/CountryId#PT" | "https://vocabulary.uncefact.org/CountryId#BE" | "https://vocabulary.uncefact.org/CountryId#DK" | "https://vocabulary.uncefact.org/CountryId#SE" | "https://vocabulary.uncefact.org/CountryId#NO" | "https://vocabulary.uncefact.org/CountryId#FI" | "https://vocabulary.uncefact.org/CountryId#GB" | "https://vocabulary.uncefact.org/CountryId#IE";
    "unece:productionDate"?: string;
    "unece:weightQuantity"?: number;
    /**
     * declaredUnit debe ser una de: KGM, TNE, LTR, MTR, CMQ.
     */
    "unece:declaredUnit"?: "https://vocabulary.uncefact.org/UnitMeasureCode#KGM" | "https://vocabulary.uncefact.org/UnitMeasureCode#TNE" | "https://vocabulary.uncefact.org/UnitMeasureCode#LTR" | "https://vocabulary.uncefact.org/UnitMeasureCode#MTR" | "https://vocabulary.uncefact.org/UnitMeasureCode#CMQ";
    "unece:hasConstituent"?: MaterialConstituentShape;
}
/**
 * Material Constituent
 */
export interface MaterialConstituentShape {
    "unece:materialType": string | {
        "@id": string;
        [k: string]: unknown;
    };
    "unece:massFraction": number;
}
/**
 * Reporting Standard
 */
export interface StandardShape {
    "unece:standardName": string;
}
//# sourceMappingURL=digitalWastePassport.d.ts.map