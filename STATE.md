# 🛡️ System State & Critical Infrastructure

> **WARNING TO AGENTS:** This file represents the immutable truth of the project's current state. Read this before proposing any refactors. Do not hallucinate file existence.

## 🚦 Current Status
**Phase:** AACH_Integration (Purposeful Adaptation Phase)
**Active Workflow:** Dynamic Recursive Loop + Domain-Native Operators (Stare Decisis, DDx) + DCCD 15/85 Schema Inversion + Epistemic Escrow EscaIation + Verification Co-Processor (VCP) + Differentiable Cache Augmentation
**Last Update:** Integrated Anomaly Learning Agent (ALA) via ADR-019, introducing the Statistical Anomaly Score logic, Toolchain Entropy Gradient mapping, and Dynamic Threshold Simulation. Integrated Collaborative Cognition (IKEA Effect) via ADR-017, Chaos Falsification Engine, and SMM Stability modeling. Integrated Autonomous Adaptive Cognitive Harness (AACH) frameworks including Homomorphic Schema Compiler, Epistemic Action Orchestrator, and Disequilibratory Goal Engine simulations (ADR-014). Integrated Verifiable Cognition Stack (VCS) and JIT Orchestrator simulation script. Integrated Chrono-Topological Governance Agent (CTGA) for Betti-1 loop tracking. Integrated Rheological Controllers (ADR-012), Epistemic Composting, and Sovereign Governance frameworks including `AGENTS.md` and `DOMAIN_GLOSSARY.md` for deterministic metrology. Epistemic Escrow and DCCD codified in ADRs 005 & 006. Action-Alignment Loss codified in ADR-016. Integrated VCP (ADR-013) enforcing REFLX_IDE HARNESS SPECIFICATION V2.9.
**Recent Shift:** Instantiated VANCE CFRSG topological indexing paradigm (ADR-007) and Symbiotic Isomorphism Tracking for Human-AI collaboration (ADR-008). Synthesized Edge-Tier Gateways & BFF Taxonomy (ADR-010) enforcing SCAR-GATEWAY-DECOUPLE and SCAR-BFF-BINDING invariants. Synthesized Reflexive Repair Loop (ADR-011) enforcing Generative Ratchet and LVR injection. Synthesized Cybernetic Agentic TDD Frameworks including Zero-Trust Isolation, Parametric Trade-offs, and Multimodal UI Verification.

## 🏗️ Critical Infrastructure (DO NOT DELETE OR SIMPLIFY)

The following files contain core logic that must be preserved during any refactoring.

| File Path | Complexity | Critical Logic / Functions | Risk of Regression |
| :--- | :--- | :--- | :--- |
| **`research/ctga_topological_tracking.ts`** | 🟡 Medium | CTGA, RTA, Zigzag Persistent Homology tracking. | Medium. Protects against circular reasoning loops in MAS. |
| **`docs/adr/010-edge-tier-bff-taxonomy.md`** | 🟡 Medium | BFF vs API Gateway topological bounds. | Medium. Protects against UI rendering logic drift in gateways. |
| **`docs/adr/011-reflexive-repair-loop.md`** | 🔴 High | Reflexive Repair Loop, LVR, F-IPI. | High. Protects against stochastic agent volatility. |
| **`docs/adr/012-rheological-controller.md`** | 🔴 High | VVP, RMS, Epistemic Composting. | High. Enforces deterministic execution boundaries. |
| **`docs/adr/013-verification-co-processor.md`** | 🔴 High | VCP, Differentiable Cache Augmentation, SDC/CFDI gating. | High. Protects against latent semantic drift and covert reasoning. |
| **`docs/adr/016-action-alignment-loss.md`** | 🔴 High | Action-Alignment Loss, Boltzmann Approximation. | High. Enforces strategic optimality against predicted behaviors. |
| **`docs/adr/017-ikea-effect-collaborative-cognition.md`** | 🟡 Medium | 4 Pillars of Collaborative Cognition. | Medium. Protects against Intent Drift and Agency Laundering. |
| **`docs/adr/019-anomaly-learning-agent.md`** | 🔴 High | ALA, Statistical Anomaly Score, Toolchain Entropy Gradient. | High. Protects against grey-zone misuse and covert misaligned actions. |
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
