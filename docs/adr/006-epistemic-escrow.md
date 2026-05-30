/// file: docs/adr/006-epistemic-escrow.md ///
# ADR 006: Epistemic Escrow & Symbolic Scar Ratcheting

**Date:** 2026-Q2
**Status:** Accepted
**Context:** When specialized personas (e.g., Security vs. Performance) encounter fundamental architectural contradictions, typical multi-agent loops attempt to synthesize a compromise. This "compromise" often violates the hard constraints of both domains (Algorithmic Dissonance).
**Decision:** We implement the Epistemic Escrow system governed by the CFDI (Confidence-Fidelity Divergence Index).
1. During the `runAgentLoop`, if `CFDI > 0.15` is detected, consensus generation is halted.
2. The contradictory node is routed to `escrowStore` and marked as `Quarantined`.
3. A human operator asynchronously reviews the escrow and applies a "Semantic Mutex Lock".
4. The resolution is permanently codified into the `ScarRegistry` as a Symbolic Scar Ratchet.
5. The `Stare Decisis Operator` utilizes the ScarRegistry to strictly bind all future agent generations.
**Consequences:**
*   **Positive:** Prevents the loss of architectural intent through averaging. Creates an immutable lineage of resolved contradictions (Auto-Ratcheting).
*   **Negative:** Requires an asynchronous UI flow, adding complexity to the `App.tsx` state machine.
