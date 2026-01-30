/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-01-30 09:42:30
 * Source: shapes/v0.1/digitalWastePassportShapes.ttl
 */

/**
 * Main DigitalWastePassport shape; closed to detect unexpected properties.
 */
export interface DigitalWastePassportShape {
  /**
   * Must have an issued date (dct:issued).
   */
  "dct:issued": string;
  /**
   * Must specify publisher (dct:publisher).
   */
  "dct:publisher": {
    [k: string]: unknown;
  };
  "dwp:credentialSubject": WastePassportShape;
  "dct:valid"?: string;
}
/**
 * Must link exactly one WastePassport.
 */
export interface WastePassportShape {
  "dwp:waste": WasteShape;
  "dct:identifier"?: string;
  "unece:reportingStandard"?: StandardShape;
}
/**
 * Must reference a Waste.
 */
export interface WasteShape {
  /**
   * Must have a name (unece:name).
   */
  "unece:name": string;
  "unece:productName": string;
  "unece:productDescription"?: string;
  "unece:hasBatchIdentifier"?: string;
  /**
   * originCountry must be in the allowed list (subset EU+GB).
   */
  "unece:originCountry"?:
    | "https://vocabulary.uncefact.org/CountryId#DE"
    | "https://vocabulary.uncefact.org/CountryId#ES"
    | "https://vocabulary.uncefact.org/CountryId#FR"
    | "https://vocabulary.uncefact.org/CountryId#IT"
    | "https://vocabulary.uncefact.org/CountryId#NL"
    | "https://vocabulary.uncefact.org/CountryId#PT"
    | "https://vocabulary.uncefact.org/CountryId#BE"
    | "https://vocabulary.uncefact.org/CountryId#DK"
    | "https://vocabulary.uncefact.org/CountryId#SE"
    | "https://vocabulary.uncefact.org/CountryId#NO"
    | "https://vocabulary.uncefact.org/CountryId#FI"
    | "https://vocabulary.uncefact.org/CountryId#GB"
    | "https://vocabulary.uncefact.org/CountryId#IE";
  "unece:productionDate"?: string;
  "unece:weightQuantity"?: number;
  /**
   * declaredUnit must be one of: KGM, TNE, LTR, MTR, CMQ.
   */
  "unece:declaredUnit"?:
    | "https://vocabulary.uncefact.org/UnitMeasureCode#KGM"
    | "https://vocabulary.uncefact.org/UnitMeasureCode#TNE"
    | "https://vocabulary.uncefact.org/UnitMeasureCode#LTR"
    | "https://vocabulary.uncefact.org/UnitMeasureCode#MTR"
    | "https://vocabulary.uncefact.org/UnitMeasureCode#CMQ";
  "unece:hasConstituent"?: MaterialConstituentShape;
}
/**
 * Material Constituent
 */
export interface MaterialConstituentShape {
  "unece:materialType":
    | string
    | {
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
