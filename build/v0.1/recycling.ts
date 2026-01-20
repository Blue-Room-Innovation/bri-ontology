/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-01-20 11:48:31
 * Source: shapes/v0.1/recycling.shacl.ttl
 */

/**
 * This schema was automatically generated from SHACL shapes. It provides structural validation only. For semantic validation, use the original SHACL shapes.
 */
export interface RecyclingOrganisationShape {
  managerCode: string;
  nimaCode: string;
  name: string;
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  telephone?: string;
  faxNumber?: string;
  email?: string;
  url?:
    | string
    | {
        "@id": string;
        [k: string]: unknown;
      };
  latitude?: number;
  longitude?: number;
  adaptedToRD1102015?: boolean;
  wasteTreatmentActivity: string;
  [k: string]: unknown;
}
