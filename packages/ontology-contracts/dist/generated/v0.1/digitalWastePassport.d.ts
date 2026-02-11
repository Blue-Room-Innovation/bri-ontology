/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-11 15:11:19
 * Source: shapes/v0.1/digital-waste-passport.shacl.ttl
 */
export type DigitalWastePassportSchema = {
    "@graph": (DwpShape_DigitalWastePassportShape | DwpShape_WastePassportShape | DwpShape_WasteShape)[];
    [k: string]: unknown;
} | ({
    [k: string]: unknown;
} & (DwpShape_DigitalWastePassportShape | DwpShape_WastePassportShape | DwpShape_WasteShape));
export type DwpShape_DigitalWastePassportShape = {
    id: string | [string];
    issuer: ({
        "@type": "https://test.uncefact.org/vocabulary/untp/core/0/CredentialIssuer" | "CredentialIssuer";
        [k: string]: unknown;
    } | {
        "@type": unknown[];
        [k: string]: unknown;
    }) | [
        {
            "@type": "https://test.uncefact.org/vocabulary/untp/core/0/CredentialIssuer" | "CredentialIssuer";
            [k: string]: unknown;
        } | {
            "@type": unknown[];
            [k: string]: unknown;
        }
    ];
    validFrom?: string | [] | [string & string];
    validUntil?: string | [] | [string & string];
    credentialSubject: DwpShape_WastePassportShape | [DwpShape_WastePassportShape & DwpShape_WastePassportShape];
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalWastePassport.ttl#DigitalWastePassport" | "DigitalWastePassport";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
export type DwpShape_WastePassportShape = {
    circularityScorecard?: unknown;
    conformityClaim?: unknown;
    dueDiligenceDeclaration?: unknown;
    emissionsScorecard?: unknown;
    granularityLevel?: (string & ("item" | "batch" | "model")) | [] | [string & ("item" | "batch" | "model")];
    id?: string | [] | [string];
    materialsProvenance?: unknown;
    traceabilityInformation?: unknown;
    waste: DwpShape_WasteShape | [DwpShape_WasteShape & DwpShape_WasteShape];
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalWastePassport.ttl#WastePassport" | "WastePassport";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
export type DwpShape_WasteShape = {
    batchNumber?: string | [] | [string];
    characteristics?: unknown;
    countryOfProduction?: (string & ("AD" | "AE" | "AF" | "AG" | "AI" | "AL" | "AM" | "AO" | "AQ" | "AR" | "AS" | "AT" | "AU" | "AW" | "AX" | "AZ" | "BA" | "BB" | "BD" | "BE" | "BF" | "BG" | "BH" | "BI" | "BJ" | "BL" | "BM" | "BN" | "BO" | "BQ" | "BR" | "BS" | "BT" | "BV" | "BW" | "BY" | "BZ" | "CA" | "CC" | "CD" | "CF" | "CG" | "CH" | "CI" | "CK" | "CL" | "CM" | "CN" | "CO" | "CR" | "CU" | "CV" | "CW" | "CX" | "CY" | "CZ" | "DE" | "DJ" | "DK" | "DM" | "DO" | "DZ" | "EC" | "EE" | "EG" | "EH" | "ER" | "ES" | "ET" | "FI" | "FJ" | "FK" | "FM" | "FO" | "FR" | "GA" | "GB" | "GD" | "GE" | "GF" | "GG" | "GH" | "GI" | "GL" | "GM" | "GN" | "GP" | "GQ" | "GR" | "GS" | "GT" | "GU" | "GW" | "GY" | "HK" | "HM" | "HN" | "HR" | "HT" | "HU" | "ID" | "IE" | "IL" | "IM" | "IN" | "IO" | "IQ" | "IR" | "IS" | "IT" | "JE" | "JM" | "JO" | "JP" | "KE" | "KG" | "KH" | "KI" | "KM" | "KN" | "KP" | "KR" | "KW" | "KY" | "KZ" | "LA" | "LB" | "LC" | "LI" | "LK" | "LR" | "LS" | "LT" | "LU" | "LV" | "LY" | "MA" | "MC" | "MD" | "ME" | "MF" | "MG" | "MH" | "MK" | "ML" | "MM" | "MN" | "MO" | "MP" | "MQ" | "MR" | "MS" | "MT" | "MU" | "MV" | "MW" | "MX" | "MY" | "MZ" | "NA" | "NC" | "NE" | "NF" | "NG" | "NI" | "NL" | "NO" | "NP" | "NR" | "NU" | "NZ" | "OM" | "PA" | "PE" | "PF" | "PG" | "PH" | "PK" | "PL" | "PM" | "PN" | "PR" | "PS" | "PT" | "PW" | "PY" | "QA" | "RE" | "RO" | "RS" | "RU" | "RW" | "SA" | "SB" | "SC" | "SD" | "SE" | "SG" | "SH" | "SI" | "SJ" | "SK" | "SL" | "SM" | "SN" | "SO" | "SR" | "SS" | "ST" | "SV" | "SX" | "SY" | "SZ" | "TC" | "TD" | "TF" | "TG" | "TH" | "TJ" | "TK" | "TL" | "TM" | "TN" | "TO" | "TR" | "TT" | "TV" | "TW" | "TZ" | "UA" | "UG" | "UM" | "US" | "UY" | "UZ" | "VA" | "VC" | "VE" | "VG" | "VI" | "VN" | "VU" | "WF" | "WS" | "YE" | "YT" | "ZA" | "ZM" | "ZW")) | [] | [
        string & ("AD" | "AE" | "AF" | "AG" | "AI" | "AL" | "AM" | "AO" | "AQ" | "AR" | "AS" | "AT" | "AU" | "AW" | "AX" | "AZ" | "BA" | "BB" | "BD" | "BE" | "BF" | "BG" | "BH" | "BI" | "BJ" | "BL" | "BM" | "BN" | "BO" | "BQ" | "BR" | "BS" | "BT" | "BV" | "BW" | "BY" | "BZ" | "CA" | "CC" | "CD" | "CF" | "CG" | "CH" | "CI" | "CK" | "CL" | "CM" | "CN" | "CO" | "CR" | "CU" | "CV" | "CW" | "CX" | "CY" | "CZ" | "DE" | "DJ" | "DK" | "DM" | "DO" | "DZ" | "EC" | "EE" | "EG" | "EH" | "ER" | "ES" | "ET" | "FI" | "FJ" | "FK" | "FM" | "FO" | "FR" | "GA" | "GB" | "GD" | "GE" | "GF" | "GG" | "GH" | "GI" | "GL" | "GM" | "GN" | "GP" | "GQ" | "GR" | "GS" | "GT" | "GU" | "GW" | "GY" | "HK" | "HM" | "HN" | "HR" | "HT" | "HU" | "ID" | "IE" | "IL" | "IM" | "IN" | "IO" | "IQ" | "IR" | "IS" | "IT" | "JE" | "JM" | "JO" | "JP" | "KE" | "KG" | "KH" | "KI" | "KM" | "KN" | "KP" | "KR" | "KW" | "KY" | "KZ" | "LA" | "LB" | "LC" | "LI" | "LK" | "LR" | "LS" | "LT" | "LU" | "LV" | "LY" | "MA" | "MC" | "MD" | "ME" | "MF" | "MG" | "MH" | "MK" | "ML" | "MM" | "MN" | "MO" | "MP" | "MQ" | "MR" | "MS" | "MT" | "MU" | "MV" | "MW" | "MX" | "MY" | "MZ" | "NA" | "NC" | "NE" | "NF" | "NG" | "NI" | "NL" | "NO" | "NP" | "NR" | "NU" | "NZ" | "OM" | "PA" | "PE" | "PF" | "PG" | "PH" | "PK" | "PL" | "PM" | "PN" | "PR" | "PS" | "PT" | "PW" | "PY" | "QA" | "RE" | "RO" | "RS" | "RU" | "RW" | "SA" | "SB" | "SC" | "SD" | "SE" | "SG" | "SH" | "SI" | "SJ" | "SK" | "SL" | "SM" | "SN" | "SO" | "SR" | "SS" | "ST" | "SV" | "SX" | "SY" | "SZ" | "TC" | "TD" | "TF" | "TG" | "TH" | "TJ" | "TK" | "TL" | "TM" | "TN" | "TO" | "TR" | "TT" | "TV" | "TW" | "TZ" | "UA" | "UG" | "UM" | "US" | "UY" | "UZ" | "VA" | "VC" | "VE" | "VG" | "VI" | "VN" | "VU" | "WF" | "WS" | "YE" | "YT" | "ZA" | "ZM" | "ZW")
    ];
    description?: string | [] | [string];
    dimensions?: unknown;
    furtherInformation?: unknown;
    id?: string | [] | [string];
    idScheme?: unknown;
    name?: string | [] | [string];
    producedAtFacility?: unknown;
    producedByParty?: unknown;
    productCategory?: unknown;
    productImage?: unknown;
    productionDate?: string | [] | [string];
    registeredId?: string | [] | [string];
    serialNumber?: string | [] | [string];
    weightQuantity?: number | [] | [number];
    pickupFacility?: unknown;
    wasteAgentParty?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/digitalWastePassport.ttl#Waste" | "Waste";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
});
/**
 * Alias exports without internal prefixes.
 */
export type DigitalWastePassportShape = DwpShape_DigitalWastePassportShape;
export type WastePassportShape = DwpShape_WastePassportShape;
export type WasteShape = DwpShape_WasteShape;
//# sourceMappingURL=digitalWastePassport.d.ts.map