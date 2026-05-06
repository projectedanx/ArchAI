# Implementation Plan: Epistemic Escrow & Symbolic Ratcheting

## Phase 1: Observability & Routing
- [ ] 1.1 Instrument `runAgentLoop` to calculate CFDI (variance in agent scoring).
- [ ] 1.2 Define the schema for Tension Nodes in `types.ts` (e.g., `EscrowRecord`).
- [ ] 1.3 Implement the routing logic: when CFDI > 0.15, push to the Epistemic Escrow array instead of forcing resolution.

## Phase 2: Human Interface & Synthesis
- [ ] 2.1 Build the Epistemic Escrow UI view in React to display quarantined Tension Nodes.
- [ ] 2.2 Implement the "Elevate to Scar" action, allowing human operators to define a new architectural constraint from the tension node.

## Phase 3: Ratchet Enforcement
- [ ] 3.1 Define the `ScarRegistry` schema to store human-approved constraints.
- [ ] 3.2 Update `executeStareDecisis` (and `PROMPTS.OPERATORS`) to parse and strictly enforce the active `ScarRegistry`.
- [ ] 3.3 Test the loop: ensure that a generated plan violating a Scar Ratchet is immediately blocked.
