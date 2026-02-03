/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-03 09:46:08
 * Source: shapes/v0.1/dpp-unece.shacl.ttl
 */

/**
 * This schema was automatically generated from SHACL shapes. It provides structural validation only. For semantic validation, use the original SHACL shapes.
 */
export interface DigitalProductPassportShape {
  id: string;
  issuer: CredentialIssuerShape;
  validFrom?: string;
  validUntil?: string;
  credentialSubject: ProductShape;
}
export interface CredentialIssuerShape {
  id: string;
  issuerAlsoKnownAs?: PartyShape;
  name: string;
  [k: string]: unknown;
}
export interface PartyShape {
  description?: string;
  id: string;
  idScheme?: IdentifierSchemeShape;
  industryCategory?: ClassificationShape;
  name: string;
  organisationWebsite?: string;
  /**
   * An optional list of other parties this party is also known as.
   */
  partyAlsoKnownAs?: PartyShape;
  /**
   * The registration number (alphanumeric) of the party.
   */
  registeredId?: string;
  /**
   * The country in which the party is registered.
   */
  registrationCountry?: string;
}
export interface IdentifierSchemeShape {
  id: string;
  name: string;
}
export interface ClassificationShape {
  code: string;
  id: string;
  name: string;
  schemeID: string;
  schemeName: string;
}
export interface ProductShape {
  batchNumber?: string;
  characteristics?: CharacteristicsShape;
  countryOfProduction?: string;
  description?: string;
  dimensions?: DimensionShape;
  furtherInformation?: LinkShape;
  id: string;
  idScheme?: IdentifierSchemeShape;
  name?: string;
  producedAtFacility?: FacilityShape;
  producedByParty?: PartyShape;
  productCategory?: ClassificationShape;
  productImage?: LinkShape;
  productionDate?: string;
  registeredId?: string;
  serialNumber?: string;
}
export interface CharacteristicsShape {}
export interface DimensionShape {
  height?: MeasureShape;
  length?: MeasureShape;
  volume?: MeasureShape;
  weight?: MeasureShape;
  width?: MeasureShape;
}
export interface MeasureShape {
  unit: string;
  value: number;
}
export interface LinkShape {
  linkName?: string;
  linkType?: string;
  linkURL: string;
  [k: string]: unknown;
}
export interface FacilityShape {
  address?: AddressShape;
  countryOfOperation?: string;
  description?: string;
  facilityAlsoKnownAs?: FacilityShape;
  id: string;
  idScheme?: IdentifierSchemeShape;
  locationInformation?: LocationShape;
  name?: string;
  operatedByParty?: PartyShape;
  processCategory?: ClassificationShape;
  registeredId?: string;
}
export interface AddressShape {
  addressCountry?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  streetAddress?: string;
}
export interface LocationShape {
  geoBoundary?: string;
  geoLocation?: string;
  plusCode?: string;
}
