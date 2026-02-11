/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-11 15:11:24
 * Source: shapes/v0.1/recycling.shacl.ttl
 */
export type RecyclingSchema = {
    "@graph": BriRecycling_RecyclingOrganisationShape[];
    [k: string]: unknown;
} | ({
    [k: string]: unknown;
} & BriRecycling_RecyclingOrganisationShape);
export type BriRecycling_RecyclingOrganisationShape = {
    managerCode: string | [string & string];
    nimaCode: string | [string & string];
    name: string | [string & string];
    streetAddress: string | [string & string];
    addressLocality: string | [string & string];
    postalCode: string | [string & string];
    correspondeceAddress: string | [string & string];
    correspondeceAddressLocality: string | [string & string];
    correspondecePostalCode: string | [string & string];
    telephone?: string | [] | [string & string];
    faxNumber?: string | [] | [string & string];
    email?: string | [] | [string & string];
    url?: string | [] | [string];
    adaptedToRD1102015?: (boolean & (true | false)) | [] | [boolean & (true | false)];
    wasteTreatmentActivity?: string | [] | [string];
    latitude?: unknown;
    longitude?: unknown;
    "@id"?: string;
    "@type"?: string | unknown[];
    [k: string]: unknown;
} & ({
    "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/recycling.ttl#Recycler" | "Recycler";
    [k: string]: unknown;
} | {
    "@type": unknown[];
    [k: string]: unknown;
}) & {
    latitude: number | [number];
    longitude: number | [number];
    [k: string]: unknown;
};
/**
 * Alias exports without internal prefixes.
 */
export type RecyclingOrganisationShape = BriRecycling_RecyclingOrganisationShape;
//# sourceMappingURL=recycling.d.ts.map