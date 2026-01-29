What is automatic now

The contracts package reads config.yml and, when you run npm run contracts:build, it does all this automatically:
Looks at build_version and generation.artifacts

Copies schemas and types from build/<build_version>/...
Regenerates the "current" files (typed schema keys + type map) and the runtime schema registry

This happens via sync-artifacts.mjs.
The files that are regenerated and you should NOT edit manually are:

index.ts
Case 1) I modify shapes but stay on the same version (e.g., v0.1)

Manually you need to:
Regenerate artifacts so v0.1 reflects the changes:

npm run generate:types (or the pipeline you use)
Rebuild the contracts package:

npm run contracts:build
(Recommended) Run the consumer-test:

npm run contracts:test
And that's it.

Case 2) I add a new "contract" (new shape → new schema/ts) within the same version
Example: you add a new shape that you want to publish as a validatable schema.

Manually you need to:
Add the new entry to generation.artifacts in config.yml with only the ID (schemaKey) that the consumer will see (e.g., dwp, dmwp, recycling).

And define the specific paths to conversions:

- conversion.shacl_to_json.<id> (input/output + options like naming)
- conversion.json_to_ts.<id> (input/output + source)

The file names (.schema.json and .ts) are derived from the `output` of these conversions.
Ensure that the pipeline actually generates these files in build/<build_version>/

npm run generate:types (or equivalent)
No need to touch any TS files in the package: the SchemaKeyCurrent and type mapping regenerate themselves.

Important to avoid breaking users
If you change name, you change the schemaKey → it's a "breaking change" for consumers.

If you change json_schema you can also break consumers who import the JSON schema as a file.
Case 3) I create a new version (e.g., v0.2)

There are 2 ways to work depending on how you want them to consume it.
3A) I want consumers to always use "current" (recommended)

This is the cheapest: imports DO NOT change.
Manually you need to:

In config.yml:
Change build_version: "v0.2"

Update generation.artifacts if names/files have changed or you've added new ones
Generate the build for the new version:

npm run generate:types (or the pipeline that generates build/v0.2/...)
Build + test the package:

npm run contracts:build
npm run contracts:test

And that's it: consumers who import:
@blueroominnovation/ontology-contracts/current

@blueroominnovation/ontology-contracts/schemas/current/\*
automatically see the new "current".

3B) I want to have explicit versioned imports (e.g., /v0.2) as a stable API
This is still NOT 100% automatic: today we maintain /v0.1 fixed and current dynamic.

Manually, in addition to 3A, you should:
Add a new version entrypoint (e.g., ./v0.2) to package.json inside exports

Create the file packages/ontology-contracts/src/v0.2/index.ts (type barrel) and export it from the main entrypoint if you want
(Optional) Add ./schemas/v0.2/\* to exports if you want direct access to versioned files

If you don't need versioned imports, I recommend sticking with current and avoiding this cost.
Case 4) Publish a new release of the package

Manually:
Increment version in package.json

npm run contracts:build (already does sync:artifacts + tsc)
Publish (your flow: npm publish, CI, etc.)

If you want, I can add a short section to the root README explaining these 4 cases and recommending "current vs versioned", so it's documented for everyone.
