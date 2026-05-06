/// file: dccd_emergence/STRATEGY.md ///
# DCCD Emergence Strategy: The 15/85 Schema Inversion

## 1. Axiomatic Value Proposition (AI ↔ Human)

**AI Capacity (Stochastic Breadth):**
The LLM can generate N-dimensional architectural permutations and measure its own predictive confidence (logprobs / semantic self-evaluation) at speeds humans cannot match.

**Human Capacity (Deterministic Binding):**
Humans possess the external business context required to make high-risk, irreversible structural decisions. Humans cannot enumerate all edge cases, but they alone can authorize a boundary.

**The Synergistic Inversion:**
Currently, AI systems hallucinate certainty when faced with ambiguous prompts, leading to Semantic Saponification (smooth, useless averages). The Dynamic Contextual Confidence Guardrails (DCCD) feature inverts this. When the AI's internal confidence drops below 0.85, it is physically barred from returning a single "best guess" schema. Instead, it must extrude a "Twinned" or "Branched" schema, explicitly halting execution and demanding the human operator resolve the topological divergence. The AI provides the exact coordinates of uncertainty; the human provides the physical constraint.

## 2. Implementation Geometry

1. **Confidence Metric Extraction:** Intercept the generation payload in `geminiService.ts` to evaluate a `confidence_score`.
2. **Schema Routing (Layer 8 Guardrail):**
   - If `confidence_score` > 0.85: Apply `Strict_Schema_v1`.
   - If `confidence_score` <= 0.85: Apply `Bifurcated_Schema_v1` (Twinning).
3. **UI Halting (Positive Friction):** When a branched schema is received, the client orchestrator (`App.tsx`) halts the loop and presents the divergence to the human.
4. **Human Debridement:** The human selects the valid path, instantly converting the discarded path into a `ScarRatchet` to prevent future ambiguity.
