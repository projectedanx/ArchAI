/// file: dccd_emergence/PLAN.md ///
# Implementation Plan: Dynamic Contextual Confidence Guardrails (DCCD)

## Phase 1: Confidence Evaluation Layer
- [ ] 1.1 Modify `generateConsensusPlan` in `geminiService.ts` to request a `confidence_score` metric alongside the architectural output.
- [ ] 1.2 Define `StrictPlanSchema` and `BranchedPlanSchema` in `types.ts`.

## Phase 2: Orchestration & Routing
- [ ] 2.1 Update `runAgentLoop` in `App.tsx` to evaluate the returned `confidence_score`.
- [ ] 2.2 Implement routing logic: execute `StrictPlanSchema` parser if > 0.85, else execute `BranchedPlanSchema` parser.

## Phase 3: Human Interface & Friction
- [ ] 3.1 Build `DCCDResolutionViewer.tsx` to render twinned architectural paths when confidence is low.
- [ ] 3.2 Implement "Select & Ratchet" callback, allowing the human to approve one path and ban the other via the `ScarRegistry`.

## Phase 4: Validation
- [ ] 4.1 Test with highly ambiguous prompts to guarantee branching.
- [ ] 4.2 Ensure no generic, single-path outputs are produced under ambiguity conditions.
