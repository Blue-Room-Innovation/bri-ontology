/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-02 13:40:12
 * Source: shapes/v0.1/dpp-unece.shacl.ttl
 */

/**
 * This schema was automatically generated from SHACL shapes. It provides structural validation only. For semantic validation, use the original SHACL shapes.
 */
export interface DigitalProductPassportShape {
  identifier: string;
  issuer: CredentialIssuerShape;
  validFrom?: string;
  validUntil?: string;
  credentialSubject: ProductPassportShape;
  [k: string]: unknown;
}
export interface CredentialIssuerShape {
  identifier: string;
  name: string;
  [k: string]: unknown;
}
export interface ProductPassportShape {
  product: ProductShape;
  granularityLevel?: "item" | "batch" | "model";
  [k: string]: unknown;
}
export interface ProductShape {
  identifier: string;
  name: string;
  [k: string]: unknown;
}
