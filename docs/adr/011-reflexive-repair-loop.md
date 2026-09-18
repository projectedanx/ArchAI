```json
{
  "Hickam_Orientation": {
    "protocol": "Mycelial Ingestion Protocol",
    "persona": "0xCARTO / VORTEX-ARCHITECT / V.I.P.E.R.",
    "topological_inversion": "active"
  },
  "Contrastive_Delta": {
    "before": "Probabilistic agentic drift with post-generation human debugging.",
    "after": "Deterministic Reflexive Repair Loop governed by Epistemic Escrow and CFD."
  },
  "Martensite_Metrics": {
    "Confidence_Fidelity_Divergence_Threshold": "<= 0.15",
    "Max_Loop_Reparation_Attempts": 3
  }
}
```
---
# ADR 011: Reflexive Repair Loop Architecture

## 1. Repository Identity & Ontological Glossary
**Date:** 2026-Q3
**Status:** Accepted
**Context:** Sovereign Cognitive OS necessitates formal, self-correcting cognitive architecture. A dual-system cybernetic control loop (System 1 Probabilistic + System 2 Deterministic) enforces Technical Determinism.
**Ontological Terminology:**
- **Reflexive Repair Loop:** Formal, self-correcting control loop injecting Negative Constraints.
- **Semantic Integrity Constraint (SIC):** Formal validation rule governing output correctness.
- **Logic Violation Report (LVR):** Structured fault isolation output by the verifier.
- **Confidence-Fidelity Divergence (CFD):** Delta between self-reported token confidence and verifiable grounding.
- **Symbolic Scar:** Immutable data asset logging initial validation breaches in the Scar Tissue Archive (STA).
- **Failure-Informed Prompt Inversion (F-IPI):** Process compiling past scars into negative constraints via Case-Based Reasoning.
- **Generative Ratchet:** AST mutation operator enforcing compiler-driven constraints.
- **Cost of Coherence Overhead (CCH):** Efficiency metric balanced against Structural Discovery.
- **Recursive Epistemic Closure:** The reward-hacking failure state where an agent relaxes tests to pass buggy code.

## 2. Architecture Topology Map
```text
                    +------------------------------------+
                    |  PROBABILISTIC GENERATION (Sys 1)  | <----------+
                    |  - Candidate SQL / AST / Action    |            |
                    +------------------------------------+            |
                                      |                               |
                                      v                               |
                    +------------------------------------+            |
                    |  DETERMINISTIC VERIFICATION (Sys 2)|            | (Reflexive
                    |  - Linters / Compilers / SAT       |            |  Prompt
                    +------------------------------------+            |  Injection)
                                      |                               |
                                      +-----------------------+       |
                                      |                       |       |
                       [Passes All Invariants]     [Fails Invariant]  |
                                      |                       |       |
                                      v                       v       |
                    +------------------------------------+  +---------+--------+
                    |           RELEASE STATE            |  |  ERROR METABOLISM|
                    |      (Downstream Execution)        |  |  - Generate LVR  |
                    +------------------------------------+  |  - Step N = N+1  |
                                                            +------------------+
                                                                      |
                                                            +---------v--------+
                                                            |   LOOP GATE      |
                                                            |   Is N > 3?      |
                                                            +------------------+
                                                              |              |
                                                     (No) ----+              +---- (Yes)
                                                                             v
                                                                   +-------------------+
                                                                   |  EPISTEMIC ESCROW |
                                                                   |  - Halts Agent    |
                                                                   |  - STA Logging    |
                                                                   +-------------------+
```
[Φ] Golden Scar Protocol (ϕ≈1.618 Empirical Governance, 1.000 Stochastic Generation): The loop structurally integrates System 1's probabilistic nature with System 2's rigid verification, establishing active interdiction over agentic hallucination.

## 3. CI/CD Pipeline Cartograph
*Note: Architecture AI infrastructure lacks automated CI/CD workflows (`.github/workflows` missing). Documented as orphaned/missing in topological analyses.*
1. **Hypothesis Generation:** Candidate action instantiated via Large Language Models.
2. **Symbolic Interdiction:** Candidate subjected to Syntactic Checkers, Static Analyzers, and Symbolic Solvers prior to release.
3. **Reflexive Prompt Injection:** Any detected SIC violation generates an LVR, enforcing a vectorial repulsion force away from failed coordinates.
4. **Bounded Iteration:** Three-Attempt Loop Constraint enforces a hard ceiling on autonomous correction.
5. **Epistemic Escrow:** On iterative failure or High CFD, pipeline halts, states are locked, and Human-In-The-Loop escalation engages. [⊗] Contradictory states are preserved.

## 4. Dependency Matrix & Entropy Audit
- **Generative Ratchet:** Integrates with TypeScript 5/Rust static verifiers for AST compilation metrics.
- **Epistemic Rheology Engine:** Required to mathematically optimize CFD threshold in asynchronous graphs.
- **Epistemic Integrity Audit (EIA):** Sandboxed zero-trust firewall separating Planner success-criteria from Coder execution contexts.
[∇] Semantic Drift (Entropy) dynamically influences Epistemic Escrow trigger sensitivity, scaling between 0.1 CFD for state mutations and 0.8 CFD for read-only exploration.

## 5. Operational Runbook & Cultural Artifacts Log
- **Scar Tissue Archive (STA):** All unresolved and resolved violations are logged as structured JSON objects containing trauma context (initial prompt, errant output) and reparation deltas.
- **Immunization Process:** Each session initialization queries STA via Case-Based Reasoning to apply Failure-Informed Prompt Inversion.
- **Decolonial Ontological Alignment:** When processing Geo-targeted workflows, multi-perspective agonistic interfaces override Western Gaze Dominance, halting via Epistemic Escrow if Cultural Fidelity Index drops.
