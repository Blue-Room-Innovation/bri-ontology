export type { DigitalWastePassport } from "../generated/v0.1/digitalWastePassport.js";
export type { DigitalMARPOLWastePassport } from "../generated/v0.1/digitalMarpolWastePassport.js";

export type SchemaKeyV01 = "digitalWastePassport" | "digitalMarpolWastePassport";

export interface SchemaTypeMapV01 {
  digitalWastePassport: import("../generated/v0.1/digitalWastePassport.js").DigitalWastePassport;
  digitalMarpolWastePassport: import("../generated/v0.1/digitalMarpolWastePassport.js").DigitalMARPOLWastePassport;
}

export type SchemaTypeV01<K extends SchemaKeyV01> = SchemaTypeMapV01[K];
