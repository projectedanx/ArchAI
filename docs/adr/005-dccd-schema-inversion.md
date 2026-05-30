/// file: docs/adr/005-dccd-schema-inversion.md ///
# ADR 005: Dynamic Contextual Confidence Guardrails (DCCD) & Schema Inversion

**Date:** 2026-Q2
**Status:** Accepted
**Context:** The Sovereign Cognitive OS relies on deterministic execution. Standard LLM deployments hallucinate certainty when faced with ambiguity, leading to "Semantic Saponification" (washing out precise definitions into generic averages) and structurally invalid JSON generation when forced into strict schemas during high-uncertainty tasks.
**Decision:** We implement DCCD utilizing a 15/85 Schema Inversion.
1. The orchestration layer evaluates a `confidence_score` during generation.
2. If confidence > 0.85, the `StrictPlanSchema` is enforced.
3. If confidence <= 0.85, execution halts, and the `BranchedPlanSchema` (Twinning) is generated, explicitly mapping the topological divergence.
4. The human operator is required to resolve the branch, providing deterministic constraint authorization.
**Consequences:**
*   **Positive:** Eradicates the hallucination of consensus. Forces human intervention at high-leverage architectural crossroads.
*   **Negative:** Introduces "Positive Friction" into the workflow, preventing fully autonomous loop execution under high ambiguity.
