/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-03 14:02:02
 * Source: shapes/v0.1/dpp-unece.shacl.ttl
 */

/**
 * This schema was automatically generated from SHACL shapes. It provides structural validation only. For semantic validation, use the original SHACL shapes.
 */
export interface DigitalProductPassportShape {
  id: string;
  issuer: CredentialIssuerShape;
  /**
   * The data from which this scheme version is valid.
   */
  validFrom?: string;
  /**
   * The date and time until which this scheme version remains valid.
   */
  validUntil?: string;
  credentialSubject: ProductPassportShape;
}
export interface CredentialIssuerShape {
  /**
   * The W3C DID of the ...
   */
  id: string;
  /**
   * An optional list of other ...
   */
  issuerAlsoKnownAs?: PartyShape;
  /**
   * The name of the issuer ...
   */
  name: string;
}
export interface PartyShape {
  /**
   * An optional short description of ...
   */
  description?: string;
  /**
   * The W3C DID of the ...
   */
  id: string;
  /**
   * The identifier scheme of the ...
   */
  idScheme?: IdentifierSchemeShape;
  /**
   * The industry categories for this ...
   */
  industryCategory?: ClassificationShape;
  /**
   * The name of the issuer ...
   */
  name: string;
  /**
   * Website for this organisation
   */
  organisationWebsite?: string;
  /**
   * An optional list of other ...
   */
  partyAlsoKnownAs?: PartyShape;
  /**
   * The registration number (alphanumeric) of ...
   */
  registeredId?: string;
  /**
   * the country in which this ...
   */
  registrationCountry?: string;
}
export interface IdentifierSchemeShape {
  /**
   * The W3C DID of the ...
   */
  id: string;
  /**
   * The name of the issuer ...
   */
  name: string;
}
export interface ClassificationShape {
  /**
   * classification code within the scheme ...
   */
  code: string;
  /**
   * The W3C DID of the ...
   */
  id: string;
  /**
   * The name of the issuer ...
   */
  name: string;
  /**
   * Classification scheme ID
   */
  schemeID: string;
  /**
   * The name of the classification ...
   */
  schemeName: string;
}
export interface ProductPassportShape {
  /**
   * A circularity performance scorecard
   */
  circularityScorecard?: CircularityPerformanceShape;
  /**
   * An array of claim objects ...
   */
  conformityClaim?: ClaimShape;
  /**
   * The due diligence declaration that ...
   */
  dueDiligenceDeclaration?: LinkShape;
  /**
   * An emissions performance scorecard
   */
  emissionsScorecard?: EmissionsPerformanceShape;
  /**
   * Code to indicate the granularity ...
   */
  granularityLevel?: "item" | "batch" | "model";
  /**
   * An id is not required ...
   */
  id?: string;
  /**
   * An array of Provenance objects ...
   */
  materialsProvenance?: MaterialShape;
  /**
   * The ProductInformation class encapsulates detailed ...
   */
  product: ProductShape;
  /**
   * An array of traceability events ...
   */
  traceabilityInformation?: TraceabilityPerformanceShape;
}
export interface CircularityPerformanceShape {
  /**
   * The overall circularity performance indicator ...
   */
  materialCircularityIndicator?: number;
  /**
   * The fraction of the this ...
   */
  recyclableContent?: number;
  /**
   * The fraction (by mass) of ...
   */
  recycledContent?: number;
  /**
   * A URI pointing to recycling ...
   */
  recyclingInformation?: LinkShape;
  /**
   * A URI pointing to repair ...
   */
  repairInformation?: LinkShape;
  /**
   * An indicator of durability defined ...
   */
  utilityFactor?: number;
}
export interface LinkShape {
  /**
   * A display name for the ...
   */
  linkName?: string;
  /**
   * The type of the target ...
   */
  linkType?: string;
  /**
   * The URL of the target ...
   */
  linkURL: string;
}
export interface ClaimShape {
  /**
   * The specification against which the ...
   */
  assessmentCriteria?: CriterionShape;
  /**
   * The date on which this ...
   */
  assessmentDate?: string;
  /**
   * An indicator of whether or ...
   */
  conformance?: boolean;
  /**
   * A URI pointing to the ...
   */
  conformityEvidence?: SecureLinkShape;
  /**
   * The conformity topic category for ...
   */
  conformityTopic?: string;
  /**
   * The list of specific values ...
   */
  declaredValue?: MetricShape;
  /**
   * An optional short description of ...
   */
  description?: string;
  /**
   * The W3C DID of the ...
   */
  id?: string;
  /**
   * The reference to the regulation ...
   */
  referenceRegulation?: RegulationShape;
  /**
   * The reference to the standard ...
   */
  referenceStandard?: StandardShape;
}
export interface CriterionShape {
  /**
   * A set of classification codes ...
   */
  category?: ClassificationShape;
  /**
   * The conformity topic category for ...
   */
  conformityTopic?: string;
  /**
   * An optional short description of ...
   */
  description?: string;
  /**
   * The W3C DID of the ...
   */
  id?: string;
  /**
   * The name of the issuer ...
   */
  name?: string;
  /**
   * A performance category code to ...
   */
  performanceLevel?: string;
  /**
   * The lifecycle status of this ...
   */
  status?: string;
  /**
   * List of criterion that are ...
   */
  subCriterion?: CriterionShape;
  /**
   * A set of tags that ...
   */
  tag?: string;
  /**
   * A threshold value that defines ...
   */
  thresholdValue?: MetricShape;
}
export interface MetricShape {
  /**
   * A percentage represented as a ...
   */
  accuracy?: number;
  /**
   * A human readable name for ...
   */
  metricName?: string;
  /**
   * A numeric value and unit ...
   */
  metricValue?: MeasureShape;
  /**
   * A score or rank associated ...
   */
  score?: string;
}
export interface MeasureShape {
  /**
   * Unit of measure drawn from ...
   */
  unit: string;
  /**
   * The numeric value of the ...
   */
  value: number;
}
export interface SecureLinkShape {
  /**
   * The symmetric encryption algorithm used ...
   */
  encryptionMethod?: string;
  /**
   * The hash of the file. ...
   */
  hashDigest?: string;
  /**
   * The hashing algorithm used to ...
   */
  hashMethod?: string;
  /**
   * A display name for the ...
   */
  linkName?: string;
  /**
   * The type of the target ...
   */
  linkType?: string;
  /**
   * The URL of the target ...
   */
  linkURL?: string;
}
export interface RegulationShape {
  /**
   * the issuing body of the ...
   */
  administeredBy?: PartyShape;
  /**
   * the date at which the ...
   */
  effectiveDate?: string;
  /**
   * The W3C DID of the ...
   */
  id?: string;
  /**
   * The legal jurisdiction (country) under ...
   */
  jurisdictionCountry?: string;
  /**
   * The name of the issuer ...
   */
  name?: string;
}
export interface StandardShape {
  /**
   * The W3C DID of the ...
   */
  id?: string;
  /**
   * The date when the standard ...
   */
  issueDate?: string;
  /**
   * The party that issued the ...
   */
  issuingParty?: PartyShape;
  /**
   * The name of the issuer ...
   */
  name?: string;
}
export interface EmissionsPerformanceShape {
  /**
   * The carbon footprint of the ...
   */
  carbonFootprint?: number;
  /**
   * The unit of product (EA, ...
   */
  declaredUnit?: string;
  /**
   * The operational scope of the ...
   */
  operationalScope?: string;
  /**
   * The ratio of emissions data ...
   */
  primarySourcedRatio?: number;
  /**
   * The reporting standard (eg GHG ...
   */
  reportingStandard?: StandardShape;
}
export interface MaterialShape {
  /**
   * Indicates whether this material is ...
   */
  hazardous?: boolean;
  /**
   * The mass of the material ...
   */
  mass?: MeasureShape;
  /**
   * The mass fraction of the ...
   */
  massFraction?: number;
  /**
   * Reference to further information about ...
   */
  materialSafetyInformation?: LinkShape;
  /**
   * The type of this material ...
   */
  materialType?: ClassificationShape;
  /**
   * The name of the issuer ...
   */
  name?: string;
  /**
   * A ISO 3166-1 code representing ...
   */
  originCountry?: string;
  /**
   * Mass fraction of this material ...
   */
  recycledMassFraction?: number;
  /**
   * Based 64 encoded binary used ...
   */
  symbol?: string;
}
export interface ProductShape {
  /**
   * Identifier of the specific production ...
   */
  batchNumber?: string;
  /**
   * A placeholder for indusutry / ...
   */
  characteristics?: CharacteristicsShape;
  /**
   * The country in which this ...
   */
  countryOfProduction?: string;
  /**
   * An optional short description of ...
   */
  description?: string;
  /**
   * The physical dimensions of the ...
   */
  dimensions?: DimensionShape;
  /**
   * A URL pointing to further ...
   */
  furtherInformation?: LinkShape;
  /**
   * The W3C DID of the ...
   */
  id: string;
  /**
   * The identifier scheme of the ...
   */
  idScheme?: IdentifierSchemeShape;
  /**
   * The name of the issuer ...
   */
  name?: string;
  /**
   * The Facility where the product ...
   */
  producedAtFacility?: FacilityShape;
  /**
   * The Party entity that manufactured ...
   */
  producedByParty?: PartyShape;
  /**
   * A code representing the product's ...
   */
  productCategory?: ClassificationShape;
  /**
   * Reference information (location, type, name) ...
   */
  productImage?: LinkShape;
  /**
   * The ISO 8601 date on ...
   */
  productionDate?: string;
  /**
   * The registration number (alphanumeric) of ...
   */
  registeredId?: string;
  /**
   * A number or code representing ...
   */
  serialNumber?: string;
}
export interface CharacteristicsShape {}
export interface DimensionShape {
  /**
   * The height of the product ...
   */
  height?: MeasureShape;
  /**
   * The length of the product ...
   */
  length?: MeasureShape;
  /**
   * The displacement volume of the ...
   */
  volume?: MeasureShape;
  /**
   * the weight of the product. ...
   */
  weight?: MeasureShape;
  /**
   * The width of the product ...
   */
  width?: MeasureShape;
}
export interface FacilityShape {
  /**
   * The Postal address of the ...
   */
  address?: AddressShape;
  /**
   * The country in which this ...
   */
  countryOfOperation?: string;
  /**
   * An optional short description of ...
   */
  description?: string;
  /**
   * An optional list of other ...
   */
  facilityAlsoKnownAs?: FacilityShape;
  /**
   * The W3C DID of the ...
   */
  id: string;
  /**
   * The identifier scheme of the ...
   */
  idScheme?: IdentifierSchemeShape;
  /**
   * Geo-location information for this facility ...
   */
  locationInformation?: LocationShape;
  /**
   * The name of the issuer ...
   */
  name?: string;
  /**
   * The Party entity responsible for ...
   */
  operatedByParty?: PartyShape;
  /**
   * The industrial or production processes ...
   */
  processCategory?: ClassificationShape;
  /**
   * The registration number (alphanumeric) of ...
   */
  registeredId?: string;
}
export interface AddressShape {
  /**
   * The address country as an ...
   */
  addressCountry?: string;
  /**
   * The city, suburb or township ...
   */
  addressLocality?: string;
  /**
   * The state or territory or ...
   */
  addressRegion?: string;
  /**
   * The postal code or zip ...
   */
  postalCode?: string;
  /**
   * the street address as an ...
   */
  streetAddress?: string;
}
export interface LocationShape {
  /**
   * The list of ordered coordinates ...
   */
  geoBoundary?: string;
  /**
   * The latitude and longitude coordinates ...
   */
  geoLocation?: string;
  /**
   * An open location code (https://maps.google.com/pluscodes/) ...
   */
  plusCode?: string;
}
export interface TraceabilityPerformanceShape {
  /**
   * A list of secure links ...
   */
  traceabilityEvent?: SecureLinkShape;
  /**
   * Human readable name for the ...
   */
  valueChainProcess?: string;
  /**
   * The proportion (0 to 1) ...
   */
  verifiedRatio?: number;
}
