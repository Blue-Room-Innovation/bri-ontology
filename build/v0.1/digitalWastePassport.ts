/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-03 09:46:11
 * Source: shapes/v0.1/digital-waste-passport.shacl.ttl
 */

/**
 * Main DigitalWastePassport shape; closed to detect unexpected properties.
 */
export interface DigitalWastePassportShape {
  /**
   * Must have an issued date (dct:issued).
   */
  issued: string;
  /**
   * Must specify publisher (dct:publisher).
   */
  publisher: {
    [k: string]: unknown;
  };
  /**
   * Must link exactly one WastePassport.
   */
  credentialSubject: WastePassportShape;
  valid?: string;
}
/**
 * WastePassport shape closed; only allows defined properties.
 */
export interface WastePassportShape {
  /**
   * Must reference a Waste.
   */
  waste: WasteShape;
  identifier?: string;
  reportingStandard?: StandardShape;
}
/**
 * Waste shape closed with allowed UNECE properties.
 */
export interface WasteShape {
  /**
   * Must have a name (unece:name).
   */
  name: string;
  productName: string;
  productDescription?: string;
  hasBatchIdentifier?: string;
  /**
   * originCountry must be in the allowed list (subset EU+GB).
   */
  originCountry?:
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
  productionDate?: string;
  weightQuantity?: number;
  /**
   * declaredUnit must be one of: KGM, TNE, LTR, MTR, CMQ.
   */
  declaredUnit?:
    | "https://vocabulary.uncefact.org/UnitMeasureCode#KGM"
    | "https://vocabulary.uncefact.org/UnitMeasureCode#TNE"
    | "https://vocabulary.uncefact.org/UnitMeasureCode#LTR"
    | "https://vocabulary.uncefact.org/UnitMeasureCode#MTR"
    | "https://vocabulary.uncefact.org/UnitMeasureCode#CMQ";
  hasConstituent?: MaterialConstituentShape;
}
/**
 * Material Constituent
 */
export interface MaterialConstituentShape {
  materialType:
    | string
    | {
        "@id": string;
        [k: string]: unknown;
      };
  massFraction: number;
}
/**
 * Reporting Standard
 */
export interface StandardShape {
  standardName: string;
}
