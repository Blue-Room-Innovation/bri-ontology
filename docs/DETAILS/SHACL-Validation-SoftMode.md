# SHACL Validation Workaround ("Soft Mode")

This document explains the rationale behind the "soft mode" validation available in this repository (`npm run validate:shacl:no-meta`) and the technical details of the workaround implemented.

## The Problem

We utilize **pyshacl** for validating data against SHACL shapes. By default, pyshacl enforces strict compliance with the [SHACL Core](https://www.w3.org/TR/shacl/) specification regarding the structure of the shapes themselves (Meta-SHACL validation).

However, some standard industry shapes (such as the **GS1 EPCIS 2.0** reference shapes) contain definitions that can be interpreted as structurally invalid by strict validators. Specifically:

1.  **NodeShape vs. PropertyShape Ambiguity**: Some shapes are explicitly typed as `sh:NodeShape` but also define a `sh:path`. According to strict interpretations, a NodeShape should not have a path (that distinguishes it from a PropertyShape).
2.  **`sh:node` Targeting Property Shapes**: Some shapes use `sh:node` to reference another shape that contains a `sh:path`. Pyshacl expects `sh:node` to point to a pure NodeShape. If the target has a path, pyshacl considers it a malformed shape structure.

### The Consequence

When pyshacl encounters these structural issues, it does not merely report a warning or a validation constraint on the shape graph. Instead, **it raises a hard exception and aborts validation entirely**.

This prevents us from validating our actual data files (`.jsonld` or `.ttl`) against these standard shapes, as the tool crashes before checking the data.

## The Solution: "Soft Mode" (`--no-meta`)

To allow data validation to proceed without modifying the official upstream shape files, we have implemented a "soft mode" or "no-meta" mode.

**Command:**

```bash
npm run validate:shacl:no-meta <scenario>
# or
node docker/docker.js run validate:shacl --no-meta <scenario>
```

### Technical Implementation

When this flag is used, the validation script (`scripts/lib/validate_shacl.py`) performs a two-step workaround:

1.  **Disable Meta-Validation**: It instructs pyshacl to skip the built-in validation of the shapes graph against the SHACL SHACL.
2.  **In-Memory Sanitization (The "Workaround")**: Before passing the shapes graph to the validator, the script runs a `_sanitize_shapes` function that modifies the graph **in memory only**:
    - **Identifies** shapes that are typed as `sh:NodeShape` but contain `sh:path`.
    - **Removes** the `rdf:type sh:NodeShape` triple from these shapes (effectively treating them as implicit PropertyShapes or generic shapes).
    - **Identifies** `sh:node` properties pointing to shapes that have `sh:path`.
    - **Converts** these pointers from `sh:node` to `sh:property`.

### Important Notes

- **Non-Destructive**: This process defines the shapes _in memory_ during the script execution. **The original `.ttl` shape files on disk are never modified.**
- **Validation Scope**: This allows the validation engine to successfully boot up and validate your _data_ against the logic of the shapes.
- **Console Output**: The script will print `[SHACL] WORKAROUND (in-memory): ...` messages to the console to clearly indicate that this transformation is taking place.

## When to Use

- Use **Strict Mode** (`npm run validate:shacl`) for shapes you develop yourself, to ensure they strictly comply with SHACL specs.
- Use **Soft Mode** (`npm run validate:shacl:no-meta`) when using third-party shapes (like GS1 EPCIS) that cause pyshacl to crash due to the issues described above.
