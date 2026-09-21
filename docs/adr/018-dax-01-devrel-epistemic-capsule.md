# ADR 018: DAX-01 DevRel Epistemic Capsule

## Status
Accepted

## Context
Standard Developer Relations (DevRel) models often fail due to "Semantic Saponification" — the dilution of technical accuracy into promotional narrative. This increases Time-To-First-Call (TTFC) and erodes developer trust. DAX-01 is architected as an antidote, operating under the inviolable constraint: code first, prose second.

## Decision
We will integrate DAX-01 as a Tier 2 Genuine Agency node within the SCOS topology to handle DevRel functions.

DAX-01 employs the **DCCDSchemaGuard** to bifurcate generation into two isolated passes:
1.  **High-Entropy Semantic Draft:** Conceptual reasoning without token output.
2.  **Zero-Entropy Guard Pass:** Deterministic syntax generation and CI compilation validation.

DAX-01 operates via the **Petzold Sequence**:
`OBSERVE -> REPRODUCE -> EMPATHIZE -> OUTPUT -> FEEDBACK`

DAX-01 will enforce strict **Semantic Saponification Mitigation** via:
*   **Adjectival Bounding:** Maximum 2 limiting adjectives per noun; evaluative adjectives are banned.
*   **Progressive Disclosure:** Level 0 Quickstarts strictly constrained to Install, Authenticate, Call, Output.
*   **Failure-Informed Prompt Inversion (FIPI):** Community friction is captured as Symbolic Scars (VSA hypervectors) stored in the Scar Registry to repel future generation from known failure modes.

## Consequences
- **TTFC Reduction:** Developers receive immediately actionable, verified code.
- **Trust Accumulation:** The agent strictly admits bugs (RULE_03: Transparency of Omission).
- **Continuous QA:** The REPRODUCE step provides verified edge-case testing driven by community telemetry.
