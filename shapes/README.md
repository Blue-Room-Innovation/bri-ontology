## Folder & File Structure

```
/shacl
│
├── dpp-bootstrap.shacl.ttl
│   UNECE-derived bootstrap shapes (immutable) based to https://test.uncefact.org/vocabulary/untp/dpp/untp-dpp-schema-0.6.0.json
│
├── dwp-bootstrap.shacl.ttl
│   UNECE-derived bootstrap shapes (immutable) based to https://test.uncefact.org/vocabulary/untp/dpp/untp-dpp-schema-0.6.0.json
│
├── dpp-governed.shacl.ttl
│   Governed Digital Product Passport constraints
│
├── dwp-governed.shacl.ttl
│   Governed Digital Waste Passport constraints
│
├── dwp-marpol.shacl.ttl
│   MARPOL regulatory profile (waste-specific)
│
└── README.md
```

---

## Validation Layers Explained

### 1. JSON Schema (Runtime / API Validation)

* Source: **UNECE official JSON Schemas** - https://test.uncefact.org/vocabulary/untp/dpp/untp-dpp-schema-0.6.0.json
* Purpose:
  * Validate incoming/outgoing JSON(-LD) documents
  * Enforce structural correctness at API boundaries
* Used in:
  * Serialization
  * CI/CD pipelines
  * Frontend/backend contracts

⚠️ JSON Schema **does NOT provide semantic validation**. so is used here to generate the SHACL Boostrap


---

### 2. SHACL Bootstrap (UNECE-aligned)

**File:** `dpp-bootstrap.shacl.ttl`, all the bootstrap files will work the same

* Derived from:

  * `https://test.uncefact.org/vocabulary/untp/dpp/untp-dpp-schema-0.6.0.json`
* Purpose:

  * Mirror *explicit structural constraints* from UNECE
  * Enable early graph validation of JSON-LD DPP instances
* Rules:

  * **Open shapes (`sh:closed false`)**
  * **Immutable**
  * **No business or regulatory logic**

> This file must never be modified to add domain rules. (Just if the UNECE Schema changes)

---

### 3. Governed Profiles (Normative)

**Files:**

* `dpp-governed.shacl.ttl`
* `dwp-governed.shacl.ttl`

Purpose:

* Define **normative, domain-specific constraints**
* Apply **closure (`sh:closed true`)**
* Enforce rules not present in UNECE schemas

Examples:

* Mandatory validity periods
* Waste-specific aggregation rules
* Controlled enumerations

These files are the **semantic source of truth** for their domain.

---

### 4. Regulatory Profiles (e.g. MARPOL)

**File:** `dwp-marpol.shacl.ttl`

Purpose:

* Encode **regulatory obligations** (IMO MARPOL)
* Apply strict validation for:

  * ships
  * ports
  * waste residues
  * quantities and delivery modes

Characteristics:

* Closed shapes
* Explicit enumerations (even if partial)
* Pattern-based validation
* Logical constraints (`sh:or`, SPARQL)

These profiles are **normative for compliance**.

---

## How SHACL “Extension” Works

SHACL does **not** support inheritance.

Instead, extension is achieved by:

* defining multiple `sh:NodeShape`s
* targeting the same RDF class (`sh:targetClass`)
* applying shapes **cumulatively**

Example:

```
DPP Instance
   ├─ validated by dpp-bootstrap.shacl.ttl
   ├─ validated by dpp-governed.shacl.ttl
   ├─ validated by dwp-bootstrap.shacl.ttl (if applicable)
   └─ validated by dwp-marpol.shacl.ttl    (if applicable)
```

No file overrides another.
**All constraints must pass.**

---

## Closure Strategy (`sh:closed`)

| Layer      | Closed | Reason               |
| ---------- | ------ | -------------------- |
| Bootstrap  | ❌ No   | Allow extension      |
| Governed   | ✅ Yes  | Enforce domain rules |
| Regulatory | ✅ Yes  | Enforce compliance   |

Closure is **never applied** in bootstrap shapes.

---

## Adding New Profiles

To add a new profile:

1. **DO NOT modify bootstrap files**
2. Create a new SHACL file
3. Target existing RDF classes
4. Decide if shapes should be closed
5. Document the profile clearly

Example:

```
dwp-eu-regulation-202X.shacl.ttl
dpp-battery-profile.shacl.ttl
```

---

## Governance Rules (Non-Negotiable)

* UNECE-derived artefacts are **read-only**
* SHACL is the **semantic source of truth**
* JSON Schema is a **derived artefact**
* All changes must be versioned
* Breaking changes must be explicit