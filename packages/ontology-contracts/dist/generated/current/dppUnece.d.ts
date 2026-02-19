/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-19 15:36:01
 * Source: shapes/v0.1/dpp-unece.shacl.ttl
 */
export type DppUneceSchema = {
    "@graph": (BriShape_DigitalProductPassportShape | BriShape_CredentialIssuerShape | BriShape_PartyShape | BriShape_IdentifierSchemeShape | BriShape_ClassificationShape | BriShape_ProductPassportShape | BriShape_ProductShape | BriShape_CharacteristicsShape | BriShape_DimensionShape | BriShape_MeasureShape | BriShape_LinkShape | BriShape_FacilityShape | BriShape_AddressShape | BriShape_LocationShape | BriShape_CircularityPerformanceShape | BriShape_ClaimShape | BriShape_CriterionShape | BriShape_MetricShape | BriShape_SecureLinkShape | BriShape_RegulationShape | BriShape_StandardShape | BriShape_EmissionsPerformanceShape | BriShape_MaterialShape | BriShape_TraceabilityPerformanceShape)[];
    [k: string]: unknown;
} | BriShape_DigitalProductPassportShape | BriShape_CredentialIssuerShape | BriShape_PartyShape | BriShape_IdentifierSchemeShape | BriShape_ClassificationShape | BriShape_ProductPassportShape | BriShape_ProductShape | BriShape_CharacteristicsShape | BriShape_DimensionShape | BriShape_MeasureShape | BriShape_LinkShape | BriShape_FacilityShape | BriShape_AddressShape | BriShape_LocationShape | BriShape_CircularityPerformanceShape | BriShape_ClaimShape | BriShape_CriterionShape | BriShape_MetricShape | BriShape_SecureLinkShape | BriShape_RegulationShape | BriShape_StandardShape | BriShape_EmissionsPerformanceShape | BriShape_MaterialShape | BriShape_TraceabilityPerformanceShape;
export interface BriShape_DigitalProductPassportShape {
    id: string;
    issuer: BriShape_CredentialIssuerShape;
    validFrom?: string;
    validUntil?: string;
    credentialSubject: BriShape_ProductPassportShape;
    "@type": "DigitalProductPassport" | "https://test.uncefact.org/vocabulary/untp/dpp/0/DigitalProductPassport";
    type?: "DigitalProductPassport" | "https://test.uncefact.org/vocabulary/untp/dpp/0/DigitalProductPassport";
    "@id"?: string;
}
export interface BriShape_CredentialIssuerShape {
    id: string;
    issuerAlsoKnownAs?: BriShape_PartyShape | BriShape_PartyShape[];
    name: string;
    "@type": "CredentialIssuer" | "https://test.uncefact.org/vocabulary/untp/core/0/CredentialIssuer";
    type?: "CredentialIssuer" | "https://test.uncefact.org/vocabulary/untp/core/0/CredentialIssuer";
    "@id"?: string;
}
export interface BriShape_PartyShape {
    description?: string;
    id: string;
    idScheme?: BriShape_IdentifierSchemeShape;
    industryCategory?: BriShape_ClassificationShape | BriShape_ClassificationShape[];
    name: string;
    organisationWebsite?: string;
    partyAlsoKnownAs?: BriShape_PartyShape | BriShape_PartyShape[];
    registeredId?: string;
    registrationCountry?: string;
    "@type": "Party" | "https://test.uncefact.org/vocabulary/untp/core/0/Party";
    type?: "Party" | "https://test.uncefact.org/vocabulary/untp/core/0/Party";
    "@id"?: string;
}
export interface BriShape_IdentifierSchemeShape {
    id: string;
    name: string;
    "@type": "IdentifierScheme" | "https://test.uncefact.org/vocabulary/untp/core/0/IdentifierScheme";
    type?: "IdentifierScheme" | "https://test.uncefact.org/vocabulary/untp/core/0/IdentifierScheme";
    "@id"?: string;
}
export interface BriShape_ClassificationShape {
    code: string;
    id: string;
    name: string;
    schemeID: string;
    schemeName: string;
    "@type": "Classification" | "https://test.uncefact.org/vocabulary/untp/core/0/Classification";
    type?: "Classification" | "https://test.uncefact.org/vocabulary/untp/core/0/Classification";
    "@id"?: string;
}
export interface BriShape_ProductPassportShape {
    circularityScorecard?: BriShape_CircularityPerformanceShape;
    conformityClaim?: BriShape_ClaimShape | BriShape_ClaimShape[];
    dueDiligenceDeclaration?: BriShape_LinkShape;
    emissionsScorecard?: BriShape_EmissionsPerformanceShape;
    granularityLevel?: "item" | "batch" | "model";
    id?: string;
    materialsProvenance?: BriShape_MaterialShape | BriShape_MaterialShape[];
    product: BriShape_ProductShape;
    traceabilityInformation?: BriShape_TraceabilityPerformanceShape | BriShape_TraceabilityPerformanceShape[];
    "@type": "ProductPassport" | "https://test.uncefact.org/vocabulary/untp/dpp/0/ProductPassport";
    type?: "ProductPassport" | "https://test.uncefact.org/vocabulary/untp/dpp/0/ProductPassport";
    "@id"?: string;
}
export interface BriShape_CircularityPerformanceShape {
    materialCircularityIndicator?: number;
    recyclableContent?: number;
    recycledContent?: number;
    recyclingInformation?: BriShape_LinkShape;
    repairInformation?: BriShape_LinkShape;
    utilityFactor?: number;
    "@type": "CircularityPerformance" | "https://test.uncefact.org/vocabulary/untp/core/0/CircularityPerformance";
    type?: "CircularityPerformance" | "https://test.uncefact.org/vocabulary/untp/core/0/CircularityPerformance";
    "@id"?: string;
    id?: string;
}
export interface BriShape_LinkShape {
    linkName?: string;
    linkType?: string;
    linkURL: string;
    "@type": "Link" | "https://test.uncefact.org/vocabulary/untp/core/0/Link";
    type?: "Link" | "https://test.uncefact.org/vocabulary/untp/core/0/Link";
    "@id"?: string;
    id?: string;
}
export interface BriShape_ClaimShape {
    assessmentCriteria?: BriShape_CriterionShape | BriShape_CriterionShape[];
    assessmentDate?: string;
    conformance?: boolean;
    conformityEvidence?: BriShape_SecureLinkShape | BriShape_SecureLinkShape[];
    conformityTopic?: string;
    declaredValue?: BriShape_MetricShape | BriShape_MetricShape[];
    description?: string;
    id?: string;
    referenceRegulation?: BriShape_RegulationShape | BriShape_RegulationShape[];
    referenceStandard?: BriShape_StandardShape | BriShape_StandardShape[];
    "@type": "Claim" | "https://test.uncefact.org/vocabulary/untp/core/0/Claim";
    type?: "Claim" | "https://test.uncefact.org/vocabulary/untp/core/0/Claim";
    "@id"?: string;
}
export interface BriShape_CriterionShape {
    category?: BriShape_ClassificationShape | BriShape_ClassificationShape[];
    conformityTopic?: string;
    description?: string;
    id?: string;
    name?: string;
    performanceLevel?: string;
    status?: string;
    subCriterion?: BriShape_CriterionShape | BriShape_CriterionShape[];
    tag?: string | string[];
    thresholdValue?: BriShape_MetricShape | BriShape_MetricShape[];
    "@type": "Criterion" | "https://test.uncefact.org/vocabulary/untp/core/0/Criterion";
    type?: "Criterion" | "https://test.uncefact.org/vocabulary/untp/core/0/Criterion";
    "@id"?: string;
}
export interface BriShape_MetricShape {
    accuracy?: number;
    metricName?: string;
    metricValue?: BriShape_MeasureShape | BriShape_MeasureShape[];
    score?: string;
    "@type": "Metric" | "https://test.uncefact.org/vocabulary/untp/core/0/Metric";
    type?: "Metric" | "https://test.uncefact.org/vocabulary/untp/core/0/Metric";
    "@id"?: string;
    id?: string;
}
export interface BriShape_MeasureShape {
    unit: string;
    value: number;
    "@type": "Measure" | "https://test.uncefact.org/vocabulary/untp/core/0/Measure";
    type?: "Measure" | "https://test.uncefact.org/vocabulary/untp/core/0/Measure";
    "@id"?: string;
    id?: string;
}
export interface BriShape_SecureLinkShape {
    encryptionMethod?: string;
    hashDigest?: string;
    hashMethod?: string;
    linkName?: string;
    linkType?: string;
    linkURL?: string;
    "@type": "SecureLink" | "https://test.uncefact.org/vocabulary/untp/core/0/SecureLink";
    type?: "SecureLink" | "https://test.uncefact.org/vocabulary/untp/core/0/SecureLink";
    "@id"?: string;
    id?: string;
}
export interface BriShape_RegulationShape {
    administeredBy?: BriShape_PartyShape | BriShape_PartyShape[];
    effectiveDate?: string;
    id?: string;
    jurisdictionCountry?: string;
    name?: string;
    "@type": "Regulation" | "https://test.uncefact.org/vocabulary/untp/core/0/Regulation";
    type?: "Regulation" | "https://test.uncefact.org/vocabulary/untp/core/0/Regulation";
    "@id"?: string;
}
export interface BriShape_StandardShape {
    id?: string;
    issueDate?: string;
    issuingParty?: BriShape_PartyShape | BriShape_PartyShape[];
    name?: string;
    "@type": "Standard" | "https://test.uncefact.org/vocabulary/untp/core/0/Standard";
    type?: "Standard" | "https://test.uncefact.org/vocabulary/untp/core/0/Standard";
    "@id"?: string;
}
export interface BriShape_EmissionsPerformanceShape {
    carbonFootprint?: number;
    declaredUnit?: string;
    operationalScope?: "CradleToGate" | "CradleToGrave" | "None";
    primarySourcedRatio?: number;
    reportingStandard?: BriShape_StandardShape | BriShape_StandardShape[];
    "@type": "EmissionsPerformance" | "https://test.uncefact.org/vocabulary/untp/core/0/EmissionsPerformance";
    type?: "EmissionsPerformance" | "https://test.uncefact.org/vocabulary/untp/core/0/EmissionsPerformance";
    "@id"?: string;
    id?: string;
}
export interface BriShape_MaterialShape {
    hazardous?: boolean;
    mass?: BriShape_MeasureShape | BriShape_MeasureShape[];
    massFraction?: number;
    materialSafetyInformation?: BriShape_LinkShape;
    materialType?: BriShape_ClassificationShape | BriShape_ClassificationShape[];
    name?: string;
    originCountry?: string;
    recycledMassFraction?: number;
    symbol?: string;
    "@type": "Material" | "https://test.uncefact.org/vocabulary/untp/core/0/Material";
    type?: "Material" | "https://test.uncefact.org/vocabulary/untp/core/0/Material";
    "@id"?: string;
    id?: string;
}
export interface BriShape_ProductShape {
    batchNumber?: string;
    characteristics?: BriShape_CharacteristicsShape;
    countryOfProduction?: "AD" | "AE" | "AF" | "AG" | "AI" | "AL" | "AM" | "AO" | "AQ" | "AR" | "AS" | "AT" | "AU" | "AW" | "AX" | "AZ" | "BA" | "BB" | "BD" | "BE" | "BF" | "BG" | "BH" | "BI" | "BJ" | "BL" | "BM" | "BN" | "BO" | "BQ" | "BR" | "BS" | "BT" | "BV" | "BW" | "BY" | "BZ" | "CA" | "CC" | "CD" | "CF" | "CG" | "CH" | "CI" | "CK" | "CL" | "CM" | "CN" | "CO" | "CR" | "CU" | "CV" | "CW" | "CX" | "CY" | "CZ" | "DE" | "DJ" | "DK" | "DM" | "DO" | "DZ" | "EC" | "EE" | "EG" | "EH" | "ER" | "ES" | "ET" | "FI" | "FJ" | "FK" | "FM" | "FO" | "FR" | "GA" | "GB" | "GD" | "GE" | "GF" | "GG" | "GH" | "GI" | "GL" | "GM" | "GN" | "GP" | "GQ" | "GR" | "GS" | "GT" | "GU" | "GW" | "GY" | "HK" | "HM" | "HN" | "HR" | "HT" | "HU" | "ID" | "IE" | "IL" | "IM" | "IN" | "IO" | "IQ" | "IR" | "IS" | "IT" | "JE" | "JM" | "JO" | "JP" | "KE" | "KG" | "KH" | "KI" | "KM" | "KN" | "KP" | "KR" | "KW" | "KY" | "KZ" | "LA" | "LB" | "LC" | "LI" | "LK" | "LR" | "LS" | "LT" | "LU" | "LV" | "LY" | "MA" | "MC" | "MD" | "ME" | "MF" | "MG" | "MH" | "MK" | "ML" | "MM" | "MN" | "MO" | "MP" | "MQ" | "MR" | "MS" | "MT" | "MU" | "MV" | "MW" | "MX" | "MY" | "MZ" | "NA" | "NC" | "NE" | "NF" | "NG" | "NI" | "NL" | "NO" | "NP" | "NR" | "NU" | "NZ" | "OM" | "PA" | "PE" | "PF" | "PG" | "PH" | "PK" | "PL" | "PM" | "PN" | "PR" | "PS" | "PT" | "PW" | "PY" | "QA" | "RE" | "RO" | "RS" | "RU" | "RW" | "SA" | "SB" | "SC" | "SD" | "SE" | "SG" | "SH" | "SI" | "SJ" | "SK" | "SL" | "SM" | "SN" | "SO" | "SR" | "SS" | "ST" | "SV" | "SX" | "SY" | "SZ" | "TC" | "TD" | "TF" | "TG" | "TH" | "TJ" | "TK" | "TL" | "TM" | "TN" | "TO" | "TR" | "TT" | "TV" | "TW" | "TZ" | "UA" | "UG" | "UM" | "US" | "UY" | "UZ" | "VA" | "VC" | "VE" | "VG" | "VI" | "VN" | "VU" | "WF" | "WS" | "YE" | "YT" | "ZA" | "ZM" | "ZW";
    description?: string;
    dimensions?: BriShape_DimensionShape;
    furtherInformation?: BriShape_LinkShape | BriShape_LinkShape[];
    id: string;
    idScheme?: BriShape_IdentifierSchemeShape;
    name?: string;
    producedAtFacility?: BriShape_FacilityShape;
    producedByParty?: BriShape_PartyShape;
    productCategory?: BriShape_ClassificationShape | BriShape_ClassificationShape[];
    productImage?: BriShape_LinkShape;
    productionDate?: string;
    registeredId?: string;
    serialNumber?: string;
    "@type": "Product" | "https://test.uncefact.org/vocabulary/untp/core/0/Product";
    type?: "Product" | "https://test.uncefact.org/vocabulary/untp/core/0/Product";
    "@id"?: string;
}
export interface BriShape_CharacteristicsShape {
    "@type": "Characteristics" | "https://test.uncefact.org/vocabulary/untp/core/0/Characteristics";
    type?: "Characteristics" | "https://test.uncefact.org/vocabulary/untp/core/0/Characteristics";
    "@id"?: string;
    id?: string;
}
export interface BriShape_DimensionShape {
    height?: BriShape_MeasureShape;
    length?: BriShape_MeasureShape;
    volume?: BriShape_MeasureShape;
    weight?: BriShape_MeasureShape;
    width?: BriShape_MeasureShape;
    "@type": "Dimension" | "https://test.uncefact.org/vocabulary/untp/core/0/Dimension";
    type?: "Dimension" | "https://test.uncefact.org/vocabulary/untp/core/0/Dimension";
    "@id"?: string;
    id?: string;
}
export interface BriShape_FacilityShape {
    address?: BriShape_AddressShape;
    countryOfOperation?: string;
    description?: string;
    facilityAlsoKnownAs?: BriShape_FacilityShape | BriShape_FacilityShape[];
    id: string;
    idScheme?: BriShape_IdentifierSchemeShape;
    locationInformation?: BriShape_LocationShape;
    name?: string;
    operatedByParty?: BriShape_PartyShape;
    processCategory?: BriShape_ClassificationShape;
    registeredId?: string;
    "@type": "Facility" | "https://test.uncefact.org/vocabulary/untp/core/0/Facility";
    type?: "Facility" | "https://test.uncefact.org/vocabulary/untp/core/0/Facility";
    "@id"?: string;
}
export interface BriShape_AddressShape {
    addressCountry?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    streetAddress?: string;
    "@type": "Address" | "https://test.uncefact.org/vocabulary/untp/core/0/Address";
    type?: "Address" | "https://test.uncefact.org/vocabulary/untp/core/0/Address";
    "@id"?: string;
    id?: string;
}
export interface BriShape_LocationShape {
    geoBoundary?: string;
    geoLocation?: string;
    plusCode?: string;
    "@type": "Location" | "https://test.uncefact.org/vocabulary/untp/core/0/Location";
    type?: "Location" | "https://test.uncefact.org/vocabulary/untp/core/0/Location";
    "@id"?: string;
    id?: string;
}
export interface BriShape_TraceabilityPerformanceShape {
    traceabilityEvent?: BriShape_SecureLinkShape | BriShape_SecureLinkShape[];
    valueChainProcess?: string;
    verifiedRatio?: number;
    "@type": "TraceabilityPerformance" | "https://test.uncefact.org/vocabulary/untp/dpp/0/TraceabilityPerformance";
    type?: "TraceabilityPerformance" | "https://test.uncefact.org/vocabulary/untp/dpp/0/TraceabilityPerformance";
    "@id"?: string;
    id?: string;
}
/**
 * Alias exports without internal prefixes.
 */
export type DigitalProductPassportShape = BriShape_DigitalProductPassportShape;
export type CredentialIssuerShape = BriShape_CredentialIssuerShape;
export type PartyShape = BriShape_PartyShape;
export type IdentifierSchemeShape = BriShape_IdentifierSchemeShape;
export type ClassificationShape = BriShape_ClassificationShape;
export type ProductPassportShape = BriShape_ProductPassportShape;
export type CircularityPerformanceShape = BriShape_CircularityPerformanceShape;
export type LinkShape = BriShape_LinkShape;
export type ClaimShape = BriShape_ClaimShape;
export type CriterionShape = BriShape_CriterionShape;
export type MetricShape = BriShape_MetricShape;
export type MeasureShape = BriShape_MeasureShape;
export type SecureLinkShape = BriShape_SecureLinkShape;
export type RegulationShape = BriShape_RegulationShape;
export type StandardShape = BriShape_StandardShape;
export type EmissionsPerformanceShape = BriShape_EmissionsPerformanceShape;
export type MaterialShape = BriShape_MaterialShape;
export type ProductShape = BriShape_ProductShape;
export type CharacteristicsShape = BriShape_CharacteristicsShape;
export type DimensionShape = BriShape_DimensionShape;
export type FacilityShape = BriShape_FacilityShape;
export type AddressShape = BriShape_AddressShape;
export type LocationShape = BriShape_LocationShape;
export type TraceabilityPerformanceShape = BriShape_TraceabilityPerformanceShape;
//# sourceMappingURL=dppUnece.d.ts.map