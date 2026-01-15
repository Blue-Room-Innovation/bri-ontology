
# Digital Waste Passport – Semantic Architecture

This ontology is a **domain profile of the UNECE UNTP and DPP vocabularies** for waste and recycling use cases.

It does **not replace** UNECE.
It **extends and specializes** it.

---

## 1. What this ontology is

This ontology defines:

* `DigitalWastePassport` as a specialization of `unece:VerifiableCredential`
* `WastePassport` as a specialization of `unece-dpp:ProductPassport`
* `Waste` as a specialization of `unece:Product`

This means all data produced with this ontology is:

* UNECE compliant
* DPP compatible
* Ready for verifiable credentials and Digital Product Passports

---

## 2. How data MUST be published

All JSON-LD or RDF data **must reference this ontology as its single context**.

Correct:

```json
"@context": "https://…/digitalWastePassport/context.jsonld"
```

Incorrect:

```json
"@context": {
  "untp": "...",
  "schema": "...",
  "dpp": "..."
}
```

The ontology already integrates UNECE and other vocabularies internally.
Data must never mix external vocabularies directly.

---

## 3. How UNECE and Schema.org are used

This ontology internally maps:

* UNECE UNTP Core
* UNECE DPP
* Schema.org (for contact and web data)

This is done at the **ontology level**, not at the data level.

For example:

* `bri:email` is mapped to `schema:email`
* `bri:name` is mapped to `unece:name`

This guarantees:

* Semantic consistency
* Interoperability with UNECE and DPP
* Full control over validation and governance

---

## 4. Why this architecture is required

This approach:

* Enables Digital Product Passport compliance
* Enables Verifiable Credentials
* Prevents data fragmentation
* Guarantees long-term interoperability

UNECE vocabularies provide the **global semantic foundation**.
This ontology provides the **waste-specific application profile**.

---

## 5. In one sentence

> UNECE provides the building blocks.
> This ontology is the building.
> Data must always point to the building, not to the loose bricks.

