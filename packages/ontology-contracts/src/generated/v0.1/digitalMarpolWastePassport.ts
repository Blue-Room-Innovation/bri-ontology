/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-02-06 13:20:53
 * Source: shapes/v0.1/digital-marpol-waste-passport.shacl.ttl
 */

/**
 * Information for each waste batch (closed).
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
  /**
   * Type identifier for DigitalMarpolWastePassport
   */
  "@type": "DigitalMarpolWastePassport";
  /**
   * Must have a credentialSubject (MarpolWastePassport).
   */
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
 * MarpolWastePassport shape (closed).
 */
export interface MarpolWastePassportShape {
  /**
   * Type identifier for MarpolWastePassport
   */
  "@type": "MarpolWastePassport";
  /**
   * Must link a MarpolWaste.
   */
  waste: MarpolWasteShape;
}
/**
 * MARPOL waste shape (closed).
 */
export interface MarpolWasteShape {
  /**
   * Type identifier for MarpolWaste
   */
  "@type": "MarpolWaste";
  /**
   * Must specify the ship (ship).
   */
  ship: ShipShape;
  /**
   * Must have at least one ResidueInformation.
   */
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
 * Ship data (closed).
 */
export interface ShipShape {
  /**
   * Type identifier for Ship
   */
  "@type": "Ship";
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
  /**
   * Type identifier for AuthorizedParty
   */
  "@type": "AuthorizedParty";
  identifier: string;
  contactPoint?: {
    [k: string]: unknown;
  };
}
