/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-01-30 14:22:22
 * Source: shapes/v0.1/digital-marpol-waste-passport.shacl.ttl
 */

/**
 * Must have at least one ResidueInformation.
 */
export type ResidueInformationShape =
  | {
      quantityToDeliver: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      quantityRemainingOnBoard: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      estimatedGenerated: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };

/**
 * Main shape of the Digital MARPOL Waste Passport (closed).
 */
export interface DigitalMarpolWastePassportShape {
  credentialSubject: MarpolWastePassportShape;
  /**
   * Missing issued date (dct:issued).
   */
  issued: string;
  /**
   * Missing publisher (dct:publisher).
   */
  publisher: {
    [k: string]: unknown;
  };
}
/**
 * Must have a credentialSubject (MarpolWastePassport).
 */
export interface MarpolWastePassportShape {
  waste: MarpolWasteShape;
}
/**
 * Must link a MarpolWaste.
 */
export interface MarpolWasteShape {
  ship: ShipShape;
  residue: ResidueInformationShape;
  lastDeliveryDate?: string;
  /**
   * arrivalPort must match UN/LOCODE pattern (e.g. ESPMI).
   */
  arrivalPort?: string;
  nextPlannedDeliveryPort?: string;
  lastWasteDeliveryPort?: string;
  /**
   * deliveryType outside allowed list (ZTO, REC, DIS).
   */
  deliveryType?: "ZTO" | "REC" | "DIS";
  shipScale?: string;
  marpolEdition?: string;
  wasteAgent?: AuthorizedPartyShape;
  message?: {
    [k: string]: unknown;
  };
  involvedParty?: {
    [k: string]: unknown;
  };
}
/**
 * Must specify the ship (ship).
 */
export interface ShipShape {
  /**
   * IMO must be 7 digits.
   */
  imoNumber: string;
  name: string;
  /**
   * flag must be ISO 3166-1 alpha-2.
   */
  flag: string;
}
/**
 * Authorized entity (closed).
 */
export interface AuthorizedPartyShape {
  identifier: string;
  contactPoint?: {
    [k: string]: unknown;
  };
}
