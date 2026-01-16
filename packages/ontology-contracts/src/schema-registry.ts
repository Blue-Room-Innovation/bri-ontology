import type { SchemaKeyCurrent } from "./current/index.js";

export const schemaUrlsCurrent: Record<SchemaKeyCurrent, URL> = {
  "digitalWastePassport": new URL("../schemas/current/digitalWastePassport.schema.json", import.meta.url),
  "digitalMarpolWastePassport": new URL("../schemas/current/digitalMarpolWastePassport.schema.json", import.meta.url),
};
