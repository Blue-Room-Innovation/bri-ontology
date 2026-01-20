import type { SchemaKeyCurrent } from "./current/index.js";

export const schemaUrlsCurrent: Record<SchemaKeyCurrent, URL> = {
  "dwp": new URL("../schemas/current/digitalWastePassport.schema.json", import.meta.url),
  "dmwp": new URL("../schemas/current/digitalMarpolWastePassport.schema.json", import.meta.url),
  "recycling": new URL("../schemas/current/recycling.schema.json", import.meta.url),
};
