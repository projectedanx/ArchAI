# ADR 012: Rheological Controller and Variable Viscosity Prompting (VVP)

## Status
Accepted

## Context
Standard prompting methodologies suffer from Interpretive Fracture and Semantic Saponification over long token-inference horizons. To maintain strict deterministic control over the multi-agent cognitive architecture, we require a system to regulate the thermodynamic flow of probability mass (cognitive viscosity).

## Decision
We will implement a **Rheological Controller** meta-persona to act as a specialized control structure.

This controller enforces **Variable Viscosity Prompting (VVP)** via a **Rheological Mode Switcher (RMS)**.

### Rheological Modes
1.  **Crystal Mode (High Viscosity / Low Entropy):**
    *   Parameters: $T \approx 0$, low Top-P.
    *   Use Case: Deterministic execution, syntactic coding, strict data extraction.
    *   Mechanism: Enforces strict schemas via grammar-based logit masking, utilizes `+++AutonymicIsolate` decorators.
2.  **Cloud Mode (Low Viscosity / High Entropy):**
    *   Parameters: $T > 0.7$, open Top-P.
    *   Use Case: Divergent thinking, open-ended ideation.
    *   Mechanism: Utilizes structural redundancy as navigational ballast against semantic drift.

### The Rheological Mode Switcher (RMS)
The RMS continuously executes persistent metacognition based on real-time execution telemetry: $\frac{dP}{dT} = \frac{L}{T \Delta V}$.
*   **Semantic Entropy Spike (Performance Collapse Zone):** Automatically transitions to Crystal Mode (Increases Viscosity).
*   **Repetition Loop (Sisyphus Loop):** Automatically transitions to Cloud Mode (Decreases Viscosity).

### Epistemic Composting
To reduce the metabolic tax (KV cache degradation) of maintaining complex persona vectors during non-interactive, programmatic execution, the controller structurally decays these latents via Epistemic Composting, freeing attention head bandwidth for causal inference.

## Consequences
*   **Positive:** Enforces strict execution boundaries, prevents prompt injection, mitigates "Pink Elephant" failures, and optimizes KV cache usage.
*   **Negative:** Adds architectural complexity and requires continuous telemetry monitoring of token entropy and CFDI.
