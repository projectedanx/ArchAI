# ADR 017: Integration of the IKEA Effect into Collaborative Cognition

## Status
Accepted

## Context
Within the systems engineering of human-machine teaming, the **IKEA Effect** dictates that individuals place a significantly higher value on systems they actively participated in constructing. When applied to workflow visualization, this principle serves as a critical countermeasure to **Intent Drift** and the usability gaps born from top-down architectural abstraction. Collaborative visually-driven environments act as "practice fields" where distributed human teams and AI agents negotiate and synchronize their **Shared Mental Models (SMMs)**.

The challenge lies in resolving the isomorphic tension: empowering the user to build within strict, pre-designed confines, thereby compressing the task of navigating infinite design options into a highly constrained, local editing task. This minimizes **extraneous cognitive load** while maximizing **germane cognitive load**.

## Decision
We implement a four-pillar specification planning framework to harness the IKEA Effect in our AI-augmented workflow harness:

### 1. Automated Discovery and Constraint Mining
The system continuously mines constraints from the team's live visual interactions:
*   **Hard Boundary (Invariant):** Visual state updates must strictly compile to valid schema types. Contradictory states (e.g., cyclic deadlocks) trigger a **Typological Drift** error, halting execution for Socratic clarification.
*   **Soft Target (Optimizable Goal):** Balance the **Cognitive Reynolds Number ($Re$)**—the ratio of generative momentum (speed of execution) to epistemic viscosity (the constraints of rules and validation)—to keep the team operating within the optimal Laminar Flow "Goldilocks Zone" ($0.2 \le C_D \le 0.6$).

### 2. Isomorphic Formalization (From Canvas to Code)
A formalized **Context-to-Execution Pipeline (CxEP)** translates visual sketches into executable contracts:
*   Visual transitions/handshakes compile into typed **Product-Requirements Prompts (PRPs)**.
*   PRPs act as **Executable Cognitive Contracts**, binding visual layouts to programmatic verification tests (OpenAPI schemas, unit tests) ensuring logical soundness.

### 3. Parametric Trade-off Modeling
The system resolves the tension between frictionless usability and automation bias (Agency Laundering) by implementing **Positive Friction**:
*   When the **Confidence-Fidelity Divergence Index (CFDI)** exceeds the threshold ($CFDI > 0.42$), the interface introduces an "epistemic speed bump" (e.g., deliberate delays, forcing confirmation keys like "EXECUTE"), jolting users into System 2 scrutiny.

### 4. Continuous Falsification and Edge-Case Stress Testing
The system utilizes an automated **Uncertainty Accelerator** to treat the SMM as a falsifiable hypothesis:
*   Injects controlled failures or anomalous inputs (e.g., tool outages) to stress-test the SMM.
*   Failure recovery paths are logged as **Symbolic Scars** in the **Scar Tissue Archive (STA)** and processed via **Failure-Informed Prompt Inversion (F-IPI)** to structurally immunize the system.

## Consequences

*   **Positive:**
    *   Achieves **Affective Latent Space Homeostasis (ALSH)** by operating in the critically damped "Goldilocks Zone", balancing user agency and systemic constraints.
    *   Mitigates "Information Foraging Decay" and "Cognitive Debt" seen in purely top-down, under-damped systems.
    *   Prevents "Semantic Ossification" associated with over-damped, excessively rigid systems.
*   **Negative/Risks:**
    *   Increased complexity in telemetry and state tracking (measuring CFDI, modeling Cognitive Reynolds Number).
    *   Requires robust VLM parsers and Speculative Abstract Interpretation Engines for the CxEP pipeline.
