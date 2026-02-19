/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-19 15:36:09
 * Source: shapes/v0.1/recycling.shacl.ttl
 */
export type RecyclingSchema = {
    "@graph": BriRecycling_RecyclingOrganisationShape[];
    [k: string]: unknown;
} | BriRecycling_RecyclingOrganisationShape;
export type BriRecycling_RecyclingOrganisationShape = {
    managerCode: string;
    nimaCode: string;
    name: string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    correspondeceAddress: string;
    correspondeceAddressLocality: string;
    correspondecePostalCode: string;
    telephone?: string;
    faxNumber?: string;
    email?: string;
    url?: string;
    latitude?: unknown;
    longitude?: unknown;
    adaptedToRD1102015?: true | false;
    wasteTreatmentActivity?: string;
    "@type": "Recycler" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/recycling.ttl#Recycler";
    type?: "Recycler" | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/recycling.ttl#Recycler";
    "@id"?: string;
    id?: string;
} & ({
    [k: string]: unknown;
} | {
    latitude: number;
    longitude: number;
    [k: string]: unknown;
});
/**
 * Alias exports without internal prefixes.
 */
export type RecyclingOrganisationShape = BriRecycling_RecyclingOrganisationShape;
//# sourceMappingURL=recycling.d.ts.map