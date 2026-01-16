import fs from "node:fs";
import { createRequire } from "node:module";
const schemaUrlsV01 = {
    digitalWastePassport: new URL("../schemas/v0.1/digitalWastePassport.schema.json", import.meta.url),
    digitalMarpolWastePassport: new URL("../schemas/v0.1/digitalMarpolWastePassport.schema.json", import.meta.url)
};
const schemaObjectCache = new Map();
function loadSchemaObject(version, schemaKey) {
    const cacheKey = `${version}:${schemaKey}`;
    const cached = schemaObjectCache.get(cacheKey);
    if (cached)
        return cached;
    let url;
    switch (version) {
        case "v0.1":
            url = schemaUrlsV01[schemaKey];
            break;
        default: {
            const exhaustiveCheck = version;
            throw new Error(`Unsupported schema version: ${exhaustiveCheck}`);
        }
    }
    const raw = fs.readFileSync(url, "utf8");
    const parsed = JSON.parse(raw);
    schemaObjectCache.set(cacheKey, parsed);
    return parsed;
}
const compiledValidatorsCache = new WeakMap();
function getCompiledValidator(ajv, version, schemaKey) {
    let perAjvCache = compiledValidatorsCache.get(ajv);
    if (!perAjvCache) {
        perAjvCache = new Map();
        compiledValidatorsCache.set(ajv, perAjvCache);
    }
    const cacheKey = `${version}:${schemaKey}`;
    const cached = perAjvCache.get(cacheKey);
    if (cached)
        return cached;
    const schema = loadSchemaObject(version, schemaKey);
    const validate = ajv.compile(schema);
    perAjvCache.set(cacheKey, validate);
    return validate;
}
function normalizeErrors(errors) {
    if (!errors || errors.length === 0)
        return [];
    return errors.map((e) => ({
        instancePath: e.instancePath,
        schemaPath: e.schemaPath,
        message: e.message,
        params: e.params
    }));
}
export function createValidator(options = {}) {
    const version = options.version ?? "v0.1";
    const require = createRequire(import.meta.url);
    const Ajv = require("ajv");
    const addFormats = require("ajv-formats");
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
        validate(data, schemaKey) {
            const validateFn = getCompiledValidator(ajv, version, schemaKey);
            const ok = validateFn(data);
            if (ok) {
                return { ok: true, schemaKey, value: data };
            }
            return { ok: false, schemaKey, errors: normalizeErrors(validateFn.errors) };
        },
        assertValid(data, schemaKey) {
            const result = this.validate(data, schemaKey);
            if (result.ok)
                return;
            const messages = result.errors
                .map((e) => `${e.instancePath || "<root>"} ${e.message ?? "is invalid"}`.trim())
                .join("\n");
            throw new Error(`Invalid payload for schema '${schemaKey}':\n${messages}`);
        }
    };
}
//# sourceMappingURL=validator.js.map