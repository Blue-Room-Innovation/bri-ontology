export type { DigitalWastePassport } from "../generated/current/digitalWastePassport.js";
export type { DigitalMARPOLWastePassport } from "../generated/current/digitalMarpolWastePassport.js";

export const CURRENT_BUILD_VERSION = "v0.1" as const;

export type SchemaKeyCurrent = "digitalWastePassport" | "digitalMarpolWastePassport";

export interface SchemaTypeMapCurrent {
  "digitalWastePassport": import("../generated/current/digitalWastePassport.js").DigitalWastePassport;
  "digitalMarpolWastePassport": import("../generated/current/digitalMarpolWastePassport.js").DigitalMARPOLWastePassport;
}

export type SchemaTypeCurrent<K extends SchemaKeyCurrent> = SchemaTypeMapCurrent[K];
