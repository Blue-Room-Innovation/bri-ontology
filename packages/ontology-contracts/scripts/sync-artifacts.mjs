import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(packageDir, "..", "..");

const buildDir = path.join(repoRoot, "build", "v0.1");
const schemasDestDir = path.join(packageDir, "schemas", "v0.1");
const generatedDestDir = path.join(packageDir, "src", "generated", "v0.1");

const artifacts = [
  {
    src: path.join(buildDir, "digitalWastePassport.schema.json"),
    dest: path.join(schemasDestDir, "digitalWastePassport.schema.json")
  },
  {
    src: path.join(buildDir, "digitalMarpolWastePassport.schema.json"),
    dest: path.join(schemasDestDir, "digitalMarpolWastePassport.schema.json")
  },
  {
    src: path.join(buildDir, "digitalWastePassport.ts"),
    dest: path.join(generatedDestDir, "digitalWastePassport.ts")
  },
  {
    src: path.join(buildDir, "digitalMarpolWastePassport.ts"),
    dest: path.join(generatedDestDir, "digitalMarpolWastePassport.ts")
  }
];

async function ensureDirs() {
  await fs.mkdir(schemasDestDir, { recursive: true });
  await fs.mkdir(generatedDestDir, { recursive: true });
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

await ensureDirs();

for (const { src, dest } of artifacts) {
  if (!(await exists(src))) {
    throw new Error(
      `Missing artifact: ${src}. Generate it first (e.g. run the repo build pipeline to populate build/v0.1).`
    );
  }

  await fs.copyFile(src, dest);
}

console.log("ontology-contracts: synced artifacts from build/v0.1");
