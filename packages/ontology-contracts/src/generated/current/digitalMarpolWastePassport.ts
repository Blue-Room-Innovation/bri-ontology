/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-01-21 12:53:01
 * Source: shapes/v0.1/digitalMarpolWastePassportShapes.ttl
 */

/**
 * Shape principal del Digital MARPOL Waste Passport (cerrado).
 */
export interface DigitalMarpolWastePassportShape {
  "dmwp:credentialSubject": MarpolWastePassportShape;
  /**
   * Falta fecha de emisión (dct:issued).
   */
  "dct:issued": string;
  /**
   * Falta publisher (dct:publisher).
   */
  "dct:publisher": {
    [k: string]: unknown;
  };
}
/**
 * Debe tener un credentialSubject (MarpolWastePassport).
 */
export interface MarpolWastePassportShape {
  "dmwp:waste": MarpolWasteShape;
}
/**
 * Debe enlazar un MarpolWaste.
 */
export interface MarpolWasteShape {
  "dmwp:ship": ShipShape;
  "dmwp:residue": ResidueInformationShape;
  "dmwp:lastDeliveryDate"?: string;
  /**
   * arrivalPort debe cumplir patrón UN/LOCODE (e.g. ESPMI).
   */
  "dmwp:arrivalPort"?: string;
  "dmwp:nextPlannedDeliveryPort"?: string;
  "dmwp:lastWasteDeliveryPort"?: string;
  /**
   * deliveryType fuera de lista permitida (ZTO, REC, DIS).
   */
  "dmwp:deliveryType"?: "ZTO" | "REC" | "DIS";
  "dmwp:shipScale"?: string;
  "dmwp:marpolEdition"?: string;
  "dmwp:wasteAgent"?: AuthorizedPartyShape;
  "dmwp:message"?: {
    [k: string]: unknown;
  };
  "dmwp:involvedParty"?: {
    [k: string]: unknown;
  };
}
/**
 * Debe especificar el buque (ship).
 */
export interface ShipShape {
  /**
   * IMO debe ser 7 dígitos.
   */
  "dmwp:imoNumber": string;
  "dmwp:name": string;
  /**
   * flag debe ser ISO 3166-1 alpha-2.
   */
  "dmwp:flag": string;
}
/**
 * Debe existir al menos un ResidueInformation.
 */
export interface ResidueInformationShape {
  /**
   * typeCode debe ser OIL (placeholder).
   */
  "dmwp:typeCode": "OIL";
  /**
   * subtypeCode debe ser SLU (placeholder).
   */
  "dmwp:subtypeCode": "SLU";
  "dmwp:substance"?: string;
  "dmwp:dischargeMeans"?: "ZTE" | "ZTD" | "ZTC" | "ZTB";
  "dmwp:nextCollectionPort"?: string;
  "dmwp:quantityToDeliver"?: {
    [k: string]: unknown;
  };
  "dmwp:quantityRemainingOnBoard"?: {
    [k: string]: unknown;
  };
  "dmwp:estimatedGenerated"?: {
    [k: string]: unknown;
  };
  "dmwp:maxCapacity"?: {
    [k: string]: unknown;
  };
}
/**
 * Entidad autorizada (cerrado).
 */
export interface AuthorizedPartyShape {
  "dmwp:identifier": string;
  "dmwp:contactPoint"?: {
    [k: string]: unknown;
  };
}
