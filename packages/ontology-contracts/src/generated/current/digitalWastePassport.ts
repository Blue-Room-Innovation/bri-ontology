/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-19 15:36:04
 * Source: shapes/v0.1/digital-waste-passport.shacl.ttl
 */

export type DigitalWastePassportSchema =
  | {
      "@graph": (DwpShape_DigitalWastePassportShape | DwpShape_WastePassportShape | DwpShape_WasteShape)[];
      [k: string]: unknown;
    }
  | DwpShape_DigitalWastePassportShape
  | DwpShape_WastePassportShape
  | DwpShape_WasteShape;

export interface DwpShape_DigitalWastePassportShape {
  id: string;
  issuer: (
    | {
        "@type": "https://test.uncefact.org/vocabulary/untp/core/0/CredentialIssuer" | "CredentialIssuer";
        [k: string]: unknown;
      }
    | {
        "@type": unknown[];
        [k: string]: unknown;
      }
  ) &
    BriShape_CredentialIssuerShape;
  validFrom?: string;
  validUntil?: string;
  credentialSubject: DwpShape_WastePassportShape;
  "@type":
    | "DigitalWastePassport"
    | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalWastePassport.ttl#DigitalWastePassport";
  type?:
    | "DigitalWastePassport"
    | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalWastePassport.ttl#DigitalWastePassport";
  "@id"?: string;
}
export interface BriShape_CredentialIssuerShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
}
export interface DwpShape_WastePassportShape {
  circularityScorecard?: BriShape_CircularityPerformanceShape;
  conformityClaim?: BriShape_ClaimShape | BriShape_ClaimShape[];
  dueDiligenceDeclaration?: BriShape_LinkShape;
  emissionsScorecard?: BriShape_EmissionsPerformanceShape;
  granularityLevel?: "item" | "batch" | "model";
  id?: string;
  materialsProvenance?: BriShape_MaterialShape | BriShape_MaterialShape[];
  traceabilityInformation?: BriShape_TraceabilityPerformanceShape | BriShape_TraceabilityPerformanceShape[];
  waste: DwpShape_WasteShape;
  "@type":
    | "WastePassport"
    | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalWastePassport.ttl#WastePassport";
  type?:
    | "WastePassport"
    | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalWastePassport.ttl#WastePassport";
  "@id"?: string;
}
export interface BriShape_CircularityPerformanceShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_ClaimShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_LinkShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_EmissionsPerformanceShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_MaterialShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_TraceabilityPerformanceShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface DwpShape_WasteShape {
  batchNumber?: string;
  characteristics?: BriShape_CharacteristicsShape;
  countryOfProduction?:
    | "AD"
    | "AE"
    | "AF"
    | "AG"
    | "AI"
    | "AL"
    | "AM"
    | "AO"
    | "AQ"
    | "AR"
    | "AS"
    | "AT"
    | "AU"
    | "AW"
    | "AX"
    | "AZ"
    | "BA"
    | "BB"
    | "BD"
    | "BE"
    | "BF"
    | "BG"
    | "BH"
    | "BI"
    | "BJ"
    | "BL"
    | "BM"
    | "BN"
    | "BO"
    | "BQ"
    | "BR"
    | "BS"
    | "BT"
    | "BV"
    | "BW"
    | "BY"
    | "BZ"
    | "CA"
    | "CC"
    | "CD"
    | "CF"
    | "CG"
    | "CH"
    | "CI"
    | "CK"
    | "CL"
    | "CM"
    | "CN"
    | "CO"
    | "CR"
    | "CU"
    | "CV"
    | "CW"
    | "CX"
    | "CY"
    | "CZ"
    | "DE"
    | "DJ"
    | "DK"
    | "DM"
    | "DO"
    | "DZ"
    | "EC"
    | "EE"
    | "EG"
    | "EH"
    | "ER"
    | "ES"
    | "ET"
    | "FI"
    | "FJ"
    | "FK"
    | "FM"
    | "FO"
    | "FR"
    | "GA"
    | "GB"
    | "GD"
    | "GE"
    | "GF"
    | "GG"
    | "GH"
    | "GI"
    | "GL"
    | "GM"
    | "GN"
    | "GP"
    | "GQ"
    | "GR"
    | "GS"
    | "GT"
    | "GU"
    | "GW"
    | "GY"
    | "HK"
    | "HM"
    | "HN"
    | "HR"
    | "HT"
    | "HU"
    | "ID"
    | "IE"
    | "IL"
    | "IM"
    | "IN"
    | "IO"
    | "IQ"
    | "IR"
    | "IS"
    | "IT"
    | "JE"
    | "JM"
    | "JO"
    | "JP"
    | "KE"
    | "KG"
    | "KH"
    | "KI"
    | "KM"
    | "KN"
    | "KP"
    | "KR"
    | "KW"
    | "KY"
    | "KZ"
    | "LA"
    | "LB"
    | "LC"
    | "LI"
    | "LK"
    | "LR"
    | "LS"
    | "LT"
    | "LU"
    | "LV"
    | "LY"
    | "MA"
    | "MC"
    | "MD"
    | "ME"
    | "MF"
    | "MG"
    | "MH"
    | "MK"
    | "ML"
    | "MM"
    | "MN"
    | "MO"
    | "MP"
    | "MQ"
    | "MR"
    | "MS"
    | "MT"
    | "MU"
    | "MV"
    | "MW"
    | "MX"
    | "MY"
    | "MZ"
    | "NA"
    | "NC"
    | "NE"
    | "NF"
    | "NG"
    | "NI"
    | "NL"
    | "NO"
    | "NP"
    | "NR"
    | "NU"
    | "NZ"
    | "OM"
    | "PA"
    | "PE"
    | "PF"
    | "PG"
    | "PH"
    | "PK"
    | "PL"
    | "PM"
    | "PN"
    | "PR"
    | "PS"
    | "PT"
    | "PW"
    | "PY"
    | "QA"
    | "RE"
    | "RO"
    | "RS"
    | "RU"
    | "RW"
    | "SA"
    | "SB"
    | "SC"
    | "SD"
    | "SE"
    | "SG"
    | "SH"
    | "SI"
    | "SJ"
    | "SK"
    | "SL"
    | "SM"
    | "SN"
    | "SO"
    | "SR"
    | "SS"
    | "ST"
    | "SV"
    | "SX"
    | "SY"
    | "SZ"
    | "TC"
    | "TD"
    | "TF"
    | "TG"
    | "TH"
    | "TJ"
    | "TK"
    | "TL"
    | "TM"
    | "TN"
    | "TO"
    | "TR"
    | "TT"
    | "TV"
    | "TW"
    | "TZ"
    | "UA"
    | "UG"
    | "UM"
    | "US"
    | "UY"
    | "UZ"
    | "VA"
    | "VC"
    | "VE"
    | "VG"
    | "VI"
    | "VN"
    | "VU"
    | "WF"
    | "WS"
    | "YE"
    | "YT"
    | "ZA"
    | "ZM"
    | "ZW";
  description?: string;
  dimensions?: BriShape_DimensionShape;
  furtherInformation?: BriShape_LinkShape | BriShape_LinkShape[];
  id?: string;
  idScheme?: BriShape_IdentifierSchemeShape;
  name?: string;
  producedAtFacility?: BriShape_FacilityShape;
  producedByParty?: BriShape_PartyShape;
  productCategory?: BriShape_ClassificationShape | BriShape_ClassificationShape[];
  productImage?: BriShape_LinkShape;
  productionDate?: string;
  registeredId?: string;
  serialNumber?: string;
  weightQuantity?: number;
  pickupFacility?: BriShape_FacilityShape;
  wasteAgentParty?: BriShape_PartyShape;
  "@type": "Waste" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalWastePassport.ttl#Waste";
  type?: "Waste" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalWastePassport.ttl#Waste";
  "@id"?: string;
}
export interface BriShape_CharacteristicsShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_DimensionShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_IdentifierSchemeShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_FacilityShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_PartyShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}
export interface BriShape_ClassificationShape {
  "@id"?: string;
  id?: string;
  "@type"?: string | unknown[];
  type?: string | unknown[];
  [k: string]: unknown;
}

/**
 * Alias exports without internal prefixes.
 */
export type DigitalWastePassportShape = DwpShape_DigitalWastePassportShape;
export type CredentialIssuerShape = BriShape_CredentialIssuerShape;
export type WastePassportShape = DwpShape_WastePassportShape;
export type CircularityPerformanceShape = BriShape_CircularityPerformanceShape;
export type ClaimShape = BriShape_ClaimShape;
export type LinkShape = BriShape_LinkShape;
export type EmissionsPerformanceShape = BriShape_EmissionsPerformanceShape;
export type MaterialShape = BriShape_MaterialShape;
export type TraceabilityPerformanceShape = BriShape_TraceabilityPerformanceShape;
export type WasteShape = DwpShape_WasteShape;
export type CharacteristicsShape = BriShape_CharacteristicsShape;
export type DimensionShape = BriShape_DimensionShape;
export type IdentifierSchemeShape = BriShape_IdentifierSchemeShape;
export type FacilityShape = BriShape_FacilityShape;
export type PartyShape = BriShape_PartyShape;
export type ClassificationShape = BriShape_ClassificationShape;
