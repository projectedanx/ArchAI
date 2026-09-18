/// file: STATE.md ///
# 🛡️ System State & Critical Infrastructure

> **WARNING TO AGENTS:** This file represents the immutable truth of the project's current state. Read this before proposing any refactors. Do not hallucinate file existence.

## 🚦 Current Status
**Phase:** Cognitive_Rheology_Integration (Contract Execution Phase)
**Active Workflow:** Dynamic Recursive Loop + Domain-Native Operators (Stare Decisis, DDx) + DCCD 15/85 Schema Inversion + Epistemic Escrow EscaIation
**Last Update:** Integrated Rheological Controllers (ADR-012), Epistemic Composting, and Sovereign Governance frameworks including `AGENTS.md` and `DOMAIN_GLOSSARY.md` for deterministic metrology. Epistemic Escrow and DCCD codified in ADRs 005 & 006.
**Recent Shift:** Instantiated VANCE CFRSG topological indexing paradigm (ADR-007) and Symbiotic Isomorphism Tracking for Human-AI collaboration (ADR-008). Synthesized Edge-Tier Gateways & BFF Taxonomy (ADR-010) enforcing SCAR-GATEWAY-DECOUPLE and SCAR-BFF-BINDING invariants. Synthesized Reflexive Repair Loop (ADR-011) enforcing Generative Ratchet and LVR injection.

## 🏗️ Critical Infrastructure (DO NOT DELETE OR SIMPLIFY)

The following files contain core logic that must be preserved during any refactoring.

| File Path | Complexity | Critical Logic / Functions | Risk of Regression |
| :--- | :--- | :--- | :--- |
| **`docs/adr/010-edge-tier-bff-taxonomy.md`** | 🟡 Medium | BFF vs API Gateway topological bounds. | Medium. Protects against UI rendering logic drift in gateways. |
| **`docs/adr/011-reflexive-repair-loop.md`** | 🔴 High | Reflexive Repair Loop, LVR, F-IPI. | High. Protects against stochastic agent volatility. |
| **`docs/adr/012-rheological-controller.md`** | 🔴 High | VVP, RMS, Epistemic Composting. | High. Enforces deterministic execution boundaries. |
| **`App.tsx`** | 🔴 High | `runAgentLoop`, `executeStareDecisis`, `executeDDx`, `conversationFlow`, `evaluateCFDI`. | High. The orchestration logic now includes pre-flight and pre-consensus operator checks, plus CFDI routing. Integrates `SymbioticResonance` tracker. |
| **`components/SymbioticResonance.tsx`** | 🟢 Low | `SymbioticResonance` telemetry component. | Low. UI metric mapping Epistemic Value via Golden Scar Protocol. |
| **`services/geminiService.ts`** | 🔴 High | `executeStareDecisis`, `executeDDx`, `generateConsensusPlan`. | Critical. Ensure prompts are correctly wired to the Sovereign roles and DCCD schema branching is respected. |
| **`types.ts`** | 🟡 Medium | `DecisionRecord`, `WorkflowState`, `EscrowEntry`, `ScarRatchet`. | Medium. Data model changes underpinning Escrow and Ratcheting. |
| **`prompts.ts`** | 🟢 Low | `PROMPTS.OPERATORS`, `PERSONAS`. | Low. Centralized operator instructions governed by Metrological rules. |
| **`AGENTS.md`** | 🔴 High | Epistemic Bounding, Anti-Saponification rules. | Critical. This file dictates execution parameters for all agents. |
| **`DOMAIN_GLOSSARY.md`** | 🔴 High | Rigid vocabulary bounding context. | Critical. Prevents Xenolinguistic Risk and Interpretive Fracture. |

## 🧩 Mocked Data / Stubs (Actionable)

The following components currently use mock data and *should* be connected to real backends in future steps.

1.  **`DECISION_LOG` (App.tsx):** Currently static mock data (ADR-001, ADR-004, etc.). Should be loaded from a Vector DB or `decisions.json` file.
2.  **`HISTORICAL_DRIFT` (App.tsx):** Static data.

## 🧠 Active Context Variables

*   **`ddxEnabled`:** Boolean toggle for the DDx Protocol operator.
*   **`decisionLog`:** Array of `DecisionRecord` objects used by Stare Decisis.
*   **`escrowStore`:** Array of `EscrowEntry` objects holding quarantined Tension Nodes.
*   **`scarRegistry`:** Array of `ScarRatchet` objects (Ingested architectural failures driving Auto-Ratcheting).
*   **`CFDI`:** Confidence-Fidelity Divergence Index metric evaluated during loops.

## 🚫 Negative Constraints (The "No-Go" Zone)

1.  **Do NOT** revert `generateAgentTurn` to a single-parameter function.
2.  **Do NOT** remove the `thinkingConfig` from the Gemini service.
3.  **Do NOT** implement file-system writes directly in the browser environment.
4.  **Do NOT** average out cognitive conflicts (CFDI > 0.15) to force consensus; they MUST route to Epistemic Escrow.

## 1. Ground Truth
*   **PKC Topology**: The repository integrates a Sovereign Personal Knowledge Corpus (`pkc_manifest.yml`) defining cryptographic provenance and relational semantic edges for all internal domain knowledge.

### Infrastructure State
*   **Automated Zotero Ingestion Loop**: `scripts/zotero_ingestion_loop.py` actively monitors and stubs the neuro-symbolic extraction of attached PDFs.
*   **Git-Anchored Context Hashing**: `.git/hooks/pre-commit` enforces SHA-256 state matching between raw files and the manifest.
