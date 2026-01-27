# Ontologies Catalog

> [!IMPORTANT]
> Inventory of semantic models available in this repository. All ontologies are based on **UNECE (United Nations Economic Commission for Europe)** standards to ensure international interoperability.

## Maturity States

- **Experimental**: Under active development, may change significantly
- **Beta**: Stable structure, refining details
- **Stable**: Production, changes require major versioning

## Available Ontologies

| Ontology                          | File                             | URL                                                                                                                        | Namespace | UNECE Base                                                   | Purpose                                                      | Version | State |
| --------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------- | ----- |
| **Digital Waste Passport**        | `digitalWastePassport.ttl`       | [📄 v0.1](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalWastePassport.ttl)       | `dwp:`    | `unece:VerifiableCredential`<br/>`unece-dpp:ProductPassport` | Generic digital passport for waste traceability              | 0.1     | Beta  |
| **Digital MARPOL Waste Passport** | `digitalMarpolWastePassport.ttl` | [📄 v0.1](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalMarpolWastePassport.ttl) | `marpol:` | Extends Digital Waste Passport                               | Specific passport for maritime waste under MARPOL regulation | 0.1     | Beta  |

## Associated SHACL Shapes

| Ontology                          | Shape File                             | URL                                                                                                                            |
| --------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Digital Waste Passport**        | `digitalWastePassportShapes.ttl`       | [🔍 v0.1](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/shapes/digitalWastePassportShapes.ttl)       |
| **Digital MARPOL Waste Passport** | `digitalMarpolWastePassportShapes.ttl` | [🔍 v0.1](https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/shapes/digitalMarpolWastePassportShapes.ttl) |

## Design Resources

- **Conceptual diagrams**: [Sysadmin profile on Jargon.sh](https://jargon.sh/user/sysadmin)
