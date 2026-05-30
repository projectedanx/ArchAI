/// file: DOMAIN_GLOSSARY.md ///
# 📖 Domain Glossary & Ubiquitous Language

> **MANDATE:** This glossary defines the rigid bounded context vocabulary for the Architecture AI project. Any deviation or undefined term used by an agent constitutes a "Xenolinguistic Risk" and must be blocked by the Semantic Hypervisor Daemon.

## Core Architectural Entities

| Term | Definition | Semantic Bounding |
| :--- | :--- | :--- |
| **Nitinol Memory** | The architectural capacity to encode JSON-RPC failures into hard constraints, preventing repeated malformations. | Integrated via the Nitinol Failure Ledger (NFL). |
| **Mereological Bounding** | The strict enforcement of scope boundaries to distinguish variables within closures from globals. | Prevents transitivity fallacies. |
| **CFRSG** | Conflict-Free Replicated Semantic Graph. The persistent, incrementally-updated DAG underlying VANCE. | Edges must be strictly directional and typed. |
| **Agentic Engineering** | The practice of treating LLMs as deterministic software artifacts within strict workflow constraints, rather than probabilistic conversational agents. | Not interchangeable with "prompt engineering" or "chatbots". |
| **Sovereign AI** | An AI agent operating with deterministic local constraints and explicit decision-making autonomy within predefined architectural boundaries. | Must run within the `Client-Side Agentic Orchestration` pattern. |
| **Epistemic Escrow** | A quarantine state (`EscrowStore`) where contradictory agent outputs (CFDI > 0.15) are held until a human provides a Semantic Mutex Lock. | Data structure: `EscrowEntry[]`. Status MUST be `'Quarantined'`. |
| **Symbolic Scar Ratchet** | A permanent, immutable constraint injected into the system generated from resolved Epistemic Escrow conflicts. | Modifies `executeStareDecisis`. Cannot be overwritten by AI. |
| **Stare Decisis Operator** | The cognitive subroutine responsible for enforcing historical constraints (ADRs and Scar Ratchets) against new architectural proposals. | Binary output state: `NO_CONFLICT` or `HARD_BLOCK [SCAR-ID]`. |
| **DDx Protocol** | The "Differential Diagnosis" Exclusion Engine. A subroutine that acts as the devil's advocate, identifying 3 failure modes and 1 kill question for any consensus path. | Tied to boolean toggle `ddxEnabled`. |

## Metrological Concepts

| Term | Definition | Context |
| :--- | :--- | :--- |
| **Betti-1 Loop** | A topological cycle in a dependency graph indicating a circular dependency deadlock. | Detected via DFS cycle detection in IMPORTS subgraph. |
| **Draft-Conditioned Constrained Decoder (DCCD)** | The validation layer enforcing the LSP 3.17 schema at the generation boundary. | Must validate prior to JSON-RPC payload emission. |
| **CFDI** | Confidence-Fidelity Divergence Index. Measures the variance between agent proposals. | `CFDI > 0.15` triggers Epistemic Escrow. |
| **DCCD** | Dynamic Contextual Confidence Guardrails. Modifies data schema rigidness based on agent confidence. | Confidence > 0.85 = `StrictPlanSchema`. Confidence <= 0.85 = `BranchedPlanSchema`. |
| **Semantic Saponification** | The mathematical washing out of precise disciplinary definitions into generic approximations by an LLM attempting to average out conflicts. | Strictly prohibited by `AGENTS.md` Rule 1. |
| **Interpretive Fracture** | The failure condition where an agent misunderstands domain terminology, leading to logic branching errors. | Mitigated by strict adherence to this glossary. |
| **RCC-8** | Region Connection Calculus 8. A set of topological relations used to enforce spatial geometry when defining interacting software components. | Required for all architectural diagrams and textual mappings. |

## System States & Triggers

| Term | Definition |
| :--- | :--- |
| **Rebuttal Phase** | Turn 2 of the Dynamic Recursive Loop where agents refine their stance based on Turn 1 peer feedback. |
| **Semantic Mutex Lock** | A human-authorized resolution to an Epistemic Escrow conflict, binding the logic shear. |
| **15/85 Schema Inversion** | The architectural pattern executing DCCD. |

*This glossary must be cross-referenced prior to generating any new documentation or code.*
