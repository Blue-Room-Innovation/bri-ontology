import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(packageDir, "..", "..");

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toSchemaKey(artifactName) {
  return artifactName;
}

function parseRootInterfaceName(tsSource) {
  const match = /export\s+interface\s+([A-Za-z0-9_]+)/.exec(tsSource);
  if (!match) return null;
  return match[1];
}

const configPath = path.join(repoRoot, "config.yml");
if (!(await exists(configPath))) {
  throw new Error(`Missing config.yml at ${configPath}`);
}

const configRaw = await fs.readFile(configPath, "utf8");
const config = YAML.parse(configRaw);

const buildVersion = config?.build_version;
const artifactsCfg = config?.generation?.artifacts;

if (typeof buildVersion !== "string" || buildVersion.length === 0) {
  throw new Error(`config.yml must define build_version (string). Got: ${String(buildVersion)}`);
}

if (!Array.isArray(artifactsCfg) || artifactsCfg.length === 0) {
  throw new Error("config.yml must define generation.artifacts as a non-empty list");
}

const buildDir = path.join(repoRoot, "build", buildVersion);
if (!(await exists(buildDir))) {
  throw new Error(`Missing build output directory: ${buildDir}. Generate artifacts first (e.g. npm run generate:types).`);
}

const schemasDestDirCurrent = path.join(packageDir, "schemas", "current");
const generatedDestDirCurrent = path.join(packageDir, "src", "generated", "current");
const currentIndexDir = path.join(packageDir, "src", "current");

const schemasDestDirVersioned = path.join(packageDir, "schemas", buildVersion);
const generatedDestDirVersioned = path.join(packageDir, "src", "generated", buildVersion);

await fs.mkdir(schemasDestDirCurrent, { recursive: true });
await fs.mkdir(generatedDestDirCurrent, { recursive: true });
await fs.mkdir(currentIndexDir, { recursive: true });
await fs.mkdir(schemasDestDirVersioned, { recursive: true });
await fs.mkdir(generatedDestDirVersioned, { recursive: true });

const items = artifactsCfg
  .map((a) => ({
    name: a?.name,
    json_schema: a?.json_schema,
    typescript: a?.typescript
  }))
  .filter((a) => typeof a.name === "string" && typeof a.json_schema === "string" && typeof a.typescript === "string");

if (items.length === 0) {
  throw new Error("generation.artifacts in config.yml has no valid items (needs name/json_schema/typescript)");
}

const schemaEntries = [];
const typeEntries = [];

for (const item of items) {
  const schemaKey = toSchemaKey(item.name);

  const schemaSrc = path.join(buildDir, item.json_schema);
  const tsSrc = path.join(buildDir, item.typescript);

  if (!(await exists(schemaSrc))) {
    throw new Error(`Missing schema artifact: ${schemaSrc}`);
  }
  if (!(await exists(tsSrc))) {
    throw new Error(`Missing TypeScript artifact: ${tsSrc}`);
  }

  const schemaDestCurrent = path.join(schemasDestDirCurrent, item.json_schema);
  const tsDestCurrent = path.join(generatedDestDirCurrent, item.typescript);

  const schemaDestVersioned = path.join(schemasDestDirVersioned, item.json_schema);
  const tsDestVersioned = path.join(generatedDestDirVersioned, item.typescript);

  await fs.copyFile(schemaSrc, schemaDestCurrent);
  await fs.copyFile(tsSrc, tsDestCurrent);

  // Keep versioned copies too (for optional versioned exports)
  await fs.copyFile(schemaSrc, schemaDestVersioned);
  await fs.copyFile(tsSrc, tsDestVersioned);

  const tsSource = await fs.readFile(tsSrc, "utf8");
  const rootInterface = parseRootInterfaceName(tsSource);
  if (!rootInterface) {
    throw new Error(`Could not detect root exported interface in ${tsSrc}`);
  }

  schemaEntries.push({ schemaKey, json_schema: item.json_schema });
  typeEntries.push({ schemaKey, typescript: item.typescript, rootInterface });
}

// Generate src/current/index.ts (typed schema keys + type map)
const currentIndexPath = path.join(currentIndexDir, "index.ts");

const exportTypes = typeEntries
  .map((t) => `export type { ${t.rootInterface} } from "../generated/current/${t.typescript.replace(/\.ts$/, ".js")}";`)
  .join("\n");

const schemaKeyUnion = schemaEntries
  .map((s) => JSON.stringify(s.schemaKey))
  .join(" | ") || "never";

const typeMapLines = typeEntries
  .map(
    (t) =>
      `  ${JSON.stringify(t.schemaKey)}: import("../generated/current/${t.typescript.replace(/\.ts$/, ".js")}").${t.rootInterface};`
  )
  .join("\n");

const currentIndexSource = `${exportTypes}

export const CURRENT_BUILD_VERSION = ${JSON.stringify(buildVersion)} as const;

export type SchemaKeyCurrent = ${schemaKeyUnion};

export interface SchemaTypeMapCurrent {
${typeMapLines}
}

export type SchemaTypeCurrent<K extends SchemaKeyCurrent> = SchemaTypeMapCurrent[K];
`;

await fs.writeFile(currentIndexPath, currentIndexSource, "utf8");

// Generate src/schema-registry.ts (runtime schema URL map)
const registryPath = path.join(packageDir, "src", "schema-registry.ts");
const registryEntries = schemaEntries
  .map(
    (s) =>
      `  ${JSON.stringify(s.schemaKey)}: new URL("../schemas/current/${s.json_schema}", import.meta.url),`
  )
  .join("\n");

const registrySource = `import type { SchemaKeyCurrent } from "./current/index.js";

export const schemaUrlsCurrent: Record<SchemaKeyCurrent, URL> = {
${registryEntries}
};
`;

await fs.writeFile(registryPath, registrySource, "utf8");

console.log(`ontology-contracts: synced artifacts from build/${buildVersion} (config-driven) and generated current typings`);
