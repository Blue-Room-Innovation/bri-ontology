import type { Ajv as AjvClass } from "ajv";
import type { SchemaKeyV01, SchemaTypeV01 } from "./v0.1/index.js";
export type SchemaVersion = "v0.1";
export type SchemaKey = SchemaKeyV01;
export type ValidationError = {
    instancePath: string;
    schemaPath: string;
    message?: string;
    params?: unknown;
};
export type ValidateResult<K extends SchemaKey> = {
    ok: true;
    schemaKey: K;
    value: SchemaTypeV01<K>;
} | {
    ok: false;
    schemaKey: K;
    errors: ValidationError[];
};
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
export declare function createValidator(options?: CreateValidatorOptions): OntologyValidator;
//# sourceMappingURL=validator.d.ts.map