import fs from "node:fs";
import { createRequire } from "node:module";

import type { Ajv as AjvClass, Options as AjvOptions } from "ajv";
import type { AnySchema, ValidateFunction } from "ajv";
import type { FormatsPlugin } from "ajv-formats";

import type { SchemaKeyV01, SchemaTypeV01 } from "./v0.1/index.js";

export type SchemaVersion = "v0.1";

export type SchemaKey = SchemaKeyV01;

export type ValidationError = {
  instancePath: string;
  schemaPath: string;
  message?: string;
  params?: unknown;
};

export type ValidateResult<K extends SchemaKey> =
  | { ok: true; schemaKey: K; value: SchemaTypeV01<K> }
  | { ok: false; schemaKey: K; errors: ValidationError[] };

export type OntologyValidator = {
  version: SchemaVersion;
  ajv: AjvInstance;
  validate<K extends SchemaKey>(data: unknown, schemaKey: K): ValidateResult<K>;
  assertValid<K extends SchemaKey>(data: unknown, schemaKey: K): asserts data is SchemaTypeV01<K>;
};

export type CreateValidatorOptions = {
  version?: SchemaVersion;
  ajv?: AjvInstance;
};

export type AjvInstance = AjvClass;

type AjvCtor = new (opts?: AjvOptions) => AjvClass;

const schemaUrlsV01: Record<SchemaKeyV01, URL> = {
  digitalWastePassport: new URL("../schemas/v0.1/digitalWastePassport.schema.json", import.meta.url),
  digitalMarpolWastePassport: new URL("../schemas/v0.1/digitalMarpolWastePassport.schema.json", import.meta.url)
};

const schemaObjectCache = new Map<string, AnySchema>();

function loadSchemaObject(version: SchemaVersion, schemaKey: SchemaKey): AnySchema {
  const cacheKey = `${version}:${schemaKey}`;
  const cached = schemaObjectCache.get(cacheKey);
  if (cached) return cached;

  let url: URL;
  switch (version) {
    case "v0.1":
      url = schemaUrlsV01[schemaKey as SchemaKeyV01];
      break;
    default: {
      const exhaustiveCheck: never = version;
      throw new Error(`Unsupported schema version: ${exhaustiveCheck}`);
    }
  }

  const raw = fs.readFileSync(url, "utf8");
  const parsed = JSON.parse(raw) as AnySchema;
  schemaObjectCache.set(cacheKey, parsed);
  return parsed;
}

const compiledValidatorsCache = new WeakMap<AjvInstance, Map<string, ValidateFunction>>();

function getCompiledValidator<K extends SchemaKey>(ajv: AjvInstance, version: SchemaVersion, schemaKey: K): ValidateFunction {
  let perAjvCache = compiledValidatorsCache.get(ajv);
  if (!perAjvCache) {
    perAjvCache = new Map();
    compiledValidatorsCache.set(ajv, perAjvCache);
  }

  const cacheKey = `${version}:${schemaKey}`;
  const cached = perAjvCache.get(cacheKey);
  if (cached) return cached;

  const schema = loadSchemaObject(version, schemaKey);
  const validate = ajv.compile(schema);
  perAjvCache.set(cacheKey, validate);
  return validate;
}

function normalizeErrors(errors: ValidateFunction["errors"]): ValidationError[] {
  if (!errors || errors.length === 0) return [];

  return errors.map((e) => ({
    instancePath: e.instancePath,
    schemaPath: e.schemaPath,
    message: e.message,
    params: e.params
  }));
}

export function createValidator(options: CreateValidatorOptions = {}): OntologyValidator {
  const version = options.version ?? "v0.1";

  const require = createRequire(import.meta.url);
  const Ajv = require("ajv") as unknown as AjvCtor;
  const addFormats = require("ajv-formats") as unknown as FormatsPlugin;

  const ajv = options.ajv ??
    new Ajv({
      allErrors: true,
      strict: false,
      strictSchema: false
    });

  addFormats(ajv);

  return {
    version,
    ajv,

    validate<K extends SchemaKey>(data: unknown, schemaKey: K): ValidateResult<K> {
      const validateFn = getCompiledValidator(ajv, version, schemaKey);
      const ok = validateFn(data);

      if (ok) {
        return { ok: true, schemaKey, value: data as SchemaTypeV01<K> };
      }

      return { ok: false, schemaKey, errors: normalizeErrors(validateFn.errors) };
    },

    assertValid<K extends SchemaKey>(data: unknown, schemaKey: K): asserts data is SchemaTypeV01<K> {
      const result = this.validate(data, schemaKey);
      if (result.ok) return;

      const messages = result.errors
        .map((e) => `${e.instancePath || "<root>"} ${e.message ?? "is invalid"}`.trim())
        .join("\n");

      throw new Error(`Invalid payload for schema '${schemaKey}':\n${messages}`);
    }
  };
}
