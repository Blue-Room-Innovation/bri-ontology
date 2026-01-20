export type { DigitalWastePassport } from "../generated/current/digitalWastePassport.js";
export type { DigitalMARPOLWastePassport } from "../generated/current/digitalMarpolWastePassport.js";
export type { GeneratedJSONSchemaFromSHACL } from "../generated/current/recycling.js";

export const CURRENT_BUILD_VERSION = "v0.1" as const;

export type SchemaKeyCurrent = "dwp" | "dmwp" | "recycling";

export interface SchemaTypeMapCurrent {
  "dwp": import("../generated/current/digitalWastePassport.js").DigitalWastePassport;
  "dmwp": import("../generated/current/digitalMarpolWastePassport.js").DigitalMARPOLWastePassport;
  "recycling": import("../generated/current/recycling.js").GeneratedJSONSchemaFromSHACL;
}

export type SchemaTypeCurrent<K extends SchemaKeyCurrent> = SchemaTypeMapCurrent[K];
