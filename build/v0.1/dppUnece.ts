/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-11 15:11:12
 * Source: shapes/v0.1/dpp-unece.shacl.ttl
 */

export type DppUneceSchema =
  | {
      "@graph": (
        | BriShape_DigitalProductPassportShape
        | BriShape_CredentialIssuerShape
        | BriShape_PartyShape
        | BriShape_IdentifierSchemeShape
        | BriShape_ClassificationShape
        | BriShape_ProductPassportShape
        | BriShape_ProductShape
        | BriShape_CharacteristicsShape
        | BriShape_DimensionShape
        | BriShape_MeasureShape
        | BriShape_LinkShape
        | BriShape_FacilityShape
        | BriShape_AddressShape
        | BriShape_LocationShape
        | BriShape_CircularityPerformanceShape
        | BriShape_ClaimShape
        | BriShape_CriterionShape
        | BriShape_MetricShape
        | BriShape_SecureLinkShape
        | BriShape_RegulationShape
        | BriShape_StandardShape
        | BriShape_EmissionsPerformanceShape
        | BriShape_MaterialShape
        | BriShape_TraceabilityPerformanceShape
      )[];
      [k: string]: unknown;
    }
  | ({
      [k: string]: unknown;
    } & (
      | BriShape_DigitalProductPassportShape
      | BriShape_CredentialIssuerShape
      | BriShape_PartyShape
      | BriShape_IdentifierSchemeShape
      | BriShape_ClassificationShape
      | BriShape_ProductPassportShape
      | BriShape_ProductShape
      | BriShape_CharacteristicsShape
      | BriShape_DimensionShape
      | BriShape_MeasureShape
      | BriShape_LinkShape
      | BriShape_FacilityShape
      | BriShape_AddressShape
      | BriShape_LocationShape
      | BriShape_CircularityPerformanceShape
      | BriShape_ClaimShape
      | BriShape_CriterionShape
      | BriShape_MetricShape
      | BriShape_SecureLinkShape
      | BriShape_RegulationShape
      | BriShape_StandardShape
      | BriShape_EmissionsPerformanceShape
      | BriShape_MaterialShape
      | BriShape_TraceabilityPerformanceShape
    ));
export type BriShape_DigitalProductPassportShape = {
  id: string | [string];
  issuer: BriShape_CredentialIssuerShape | [BriShape_CredentialIssuerShape & BriShape_CredentialIssuerShape];
  validFrom?: string | [] | [string & string];
  validUntil?: string | [] | [string & string];
  credentialSubject: BriShape_ProductPassportShape | [BriShape_ProductPassportShape & BriShape_ProductPassportShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/dpp/0/DigitalProductPassport" | "DigitalProductPassport";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_CredentialIssuerShape = {
  id: string | [string];
  issuerAlsoKnownAs?: BriShape_PartyShape | BriShape_PartyShape[];
  name: string | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/CredentialIssuer" | "CredentialIssuer";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_PartyShape = {
  description?: string | [] | [string];
  id: string | [string];
  idScheme?: BriShape_IdentifierSchemeShape | [] | [BriShape_IdentifierSchemeShape & BriShape_IdentifierSchemeShape];
  industryCategory?: BriShape_ClassificationShape | BriShape_ClassificationShape[];
  name: string | [string];
  organisationWebsite?: string | [] | [string];
  partyAlsoKnownAs?: BriShape_PartyShape | BriShape_PartyShape[];
  registeredId?: string | [] | [string];
  registrationCountry?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Party" | "Party";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_IdentifierSchemeShape = {
  id: string | [string];
  name: string | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/IdentifierScheme" | "IdentifierScheme";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_ClassificationShape = {
  code: string | [string];
  id: string | [string];
  name: string | [string];
  schemeID: string | [string];
  schemeName: string | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Classification" | "Classification";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_ProductPassportShape = {
  circularityScorecard?: BriShape_CircularityPerformanceShape | [] | [BriShape_CircularityPerformanceShape];
  conformityClaim?: BriShape_ClaimShape | BriShape_ClaimShape[];
  dueDiligenceDeclaration?: BriShape_LinkShape | [] | [BriShape_LinkShape];
  emissionsScorecard?: BriShape_EmissionsPerformanceShape | [] | [BriShape_EmissionsPerformanceShape];
  granularityLevel?: (string & ("item" | "batch" | "model")) | [] | [string & ("item" | "batch" | "model")];
  id?: string | [] | [string];
  materialsProvenance?: BriShape_MaterialShape | BriShape_MaterialShape[];
  product: BriShape_ProductShape | [BriShape_ProductShape];
  traceabilityInformation?: BriShape_TraceabilityPerformanceShape | BriShape_TraceabilityPerformanceShape[];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/dpp/0/ProductPassport" | "ProductPassport";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_CircularityPerformanceShape = {
  materialCircularityIndicator?: number | [] | [number];
  recyclableContent?: number | [] | [number];
  recycledContent?: number | [] | [number];
  recyclingInformation?: BriShape_LinkShape | [] | [BriShape_LinkShape];
  repairInformation?: BriShape_LinkShape | [] | [BriShape_LinkShape];
  utilityFactor?: number | [] | [number];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/CircularityPerformance" | "CircularityPerformance";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_LinkShape = {
  linkName?: string | [] | [string];
  linkType?: string | [] | [string];
  linkURL: string | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Link" | "Link";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_ClaimShape = {
  assessmentCriteria?: BriShape_CriterionShape | BriShape_CriterionShape[];
  assessmentDate?: string | [] | [string];
  conformance?: boolean | [] | [boolean];
  conformityEvidence?: BriShape_SecureLinkShape | BriShape_SecureLinkShape[];
  conformityTopic?: string | [] | [string];
  declaredValue?: BriShape_MetricShape | BriShape_MetricShape[];
  description?: string | [] | [string];
  id?: string | [] | [string];
  referenceRegulation?: BriShape_RegulationShape | BriShape_RegulationShape[];
  referenceStandard?: BriShape_StandardShape | BriShape_StandardShape[];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Claim" | "Claim";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_CriterionShape = {
  category?: BriShape_ClassificationShape | BriShape_ClassificationShape[];
  conformityTopic?: string | [] | [string];
  description?: string | [] | [string];
  id?: string | [] | [string];
  name?: string | [] | [string];
  performanceLevel?: string | [] | [string];
  status?: string | [] | [string];
  subCriterion?: BriShape_CriterionShape | BriShape_CriterionShape[];
  tag?: string | string[];
  thresholdValue?: BriShape_MetricShape | BriShape_MetricShape[];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Criterion" | "Criterion";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_MetricShape = {
  accuracy?: number | [] | [number];
  metricName?: string | [] | [string];
  metricValue?: BriShape_MeasureShape | BriShape_MeasureShape[];
  score?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Metric" | "Metric";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_MeasureShape = {
  unit: string | [string];
  value: number | [number];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Measure" | "Measure";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_SecureLinkShape = {
  encryptionMethod?: string | [] | [string];
  hashDigest?: string | [] | [string];
  hashMethod?: string | [] | [string];
  linkName?: string | [] | [string];
  linkType?: string | [] | [string];
  linkURL?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/SecureLink" | "SecureLink";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_RegulationShape = {
  administeredBy?: BriShape_PartyShape | BriShape_PartyShape[];
  effectiveDate?: string | [] | [string];
  id?: string | [] | [string];
  jurisdictionCountry?: string | [] | [string];
  name?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Regulation" | "Regulation";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_StandardShape = {
  id?: string | [] | [string];
  issueDate?: string | [] | [string];
  issuingParty?: BriShape_PartyShape | BriShape_PartyShape[];
  name?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Standard" | "Standard";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_EmissionsPerformanceShape = {
  carbonFootprint?: number | [] | [number];
  declaredUnit?: string | [] | [string];
  operationalScope?:
    | (string & ("CradleToGate" | "CradleToGrave" | "None"))
    | []
    | [string & ("CradleToGate" | "CradleToGrave" | "None")];
  primarySourcedRatio?: number | [] | [number];
  reportingStandard?: BriShape_StandardShape | BriShape_StandardShape[];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/EmissionsPerformance" | "EmissionsPerformance";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_MaterialShape = {
  hazardous?: boolean | [] | [boolean];
  mass?: BriShape_MeasureShape | BriShape_MeasureShape[];
  massFraction?: number | [] | [number];
  materialSafetyInformation?: BriShape_LinkShape | [] | [BriShape_LinkShape];
  materialType?: BriShape_ClassificationShape | BriShape_ClassificationShape[];
  name?: string | [] | [string];
  originCountry?: string | [] | [string];
  recycledMassFraction?: number | [] | [number];
  symbol?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Material" | "Material";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_ProductShape = {
  batchNumber?: string | [] | [string];
  characteristics?: BriShape_CharacteristicsShape | [] | [BriShape_CharacteristicsShape];
  countryOfProduction?:
    | (string &
        (
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
          | "ZW"
        ))
    | []
    | [
        string &
          (
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
            | "ZW"
          )
      ];
  description?: string | [] | [string];
  dimensions?: BriShape_DimensionShape | [] | [BriShape_DimensionShape];
  furtherInformation?: BriShape_LinkShape | BriShape_LinkShape[];
  id: string | [string];
  idScheme?: BriShape_IdentifierSchemeShape | [] | [BriShape_IdentifierSchemeShape];
  name?: string | [] | [string];
  producedAtFacility?: BriShape_FacilityShape | [] | [BriShape_FacilityShape];
  producedByParty?: BriShape_PartyShape | [] | [BriShape_PartyShape];
  productCategory?: BriShape_ClassificationShape | BriShape_ClassificationShape[];
  productImage?: BriShape_LinkShape | [] | [BriShape_LinkShape];
  productionDate?: string | [] | [string];
  registeredId?: string | [] | [string];
  serialNumber?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Product" | "Product";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_CharacteristicsShape = {
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Characteristics" | "Characteristics";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_DimensionShape = {
  height?: BriShape_MeasureShape | [] | [BriShape_MeasureShape];
  length?: BriShape_MeasureShape | [] | [BriShape_MeasureShape];
  volume?: BriShape_MeasureShape | [] | [BriShape_MeasureShape];
  weight?: BriShape_MeasureShape | [] | [BriShape_MeasureShape];
  width?: BriShape_MeasureShape | [] | [BriShape_MeasureShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Dimension" | "Dimension";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_FacilityShape = {
  address?: BriShape_AddressShape | [] | [BriShape_AddressShape];
  countryOfOperation?: string | [] | [string];
  description?: string | [] | [string];
  facilityAlsoKnownAs?: BriShape_FacilityShape | BriShape_FacilityShape[];
  id: string | [string];
  idScheme?: BriShape_IdentifierSchemeShape | [] | [BriShape_IdentifierSchemeShape];
  locationInformation?: BriShape_LocationShape | [] | [BriShape_LocationShape];
  name?: string | [] | [string];
  operatedByParty?: BriShape_PartyShape | [] | [BriShape_PartyShape];
  processCategory?: BriShape_ClassificationShape | [] | [BriShape_ClassificationShape];
  registeredId?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Facility" | "Facility";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_AddressShape = {
  addressCountry?: string | [] | [string];
  addressLocality?: string | [] | [string];
  addressRegion?: string | [] | [string];
  postalCode?: string | [] | [string];
  streetAddress?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Address" | "Address";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_LocationShape = {
  geoBoundary?: string | [] | [string];
  geoLocation?: string | [] | [string];
  plusCode?: string | [] | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/core/0/Location" | "Location";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BriShape_TraceabilityPerformanceShape = {
  traceabilityEvent?: BriShape_SecureLinkShape | BriShape_SecureLinkShape[];
  valueChainProcess?: string | [] | [string];
  verifiedRatio?: number | [] | [number];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://test.uncefact.org/vocabulary/untp/dpp/0/TraceabilityPerformance" | "TraceabilityPerformance";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
