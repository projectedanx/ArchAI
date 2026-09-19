/// file: ARCHITECTURE.md ///
# System Architecture

## Overview

The application utilizes a **Client-Side Agentic Orchestration** pattern. Unlike traditional backends, the React client (`App.tsx`) acts as the primary "Loop Orchestrator," managing the lifecycle of multiple specialized agents (`geminiService.ts`) to achieve consensus while maintaining epistemic rigor.

## 🧠 Cognitive Architecture

### 1. The "Triple Gate" Pattern
Current implementation focuses on the **Cognitive Gate**:
*   **Input Gate:** (Planned) NeMo Guardrails to filter malicious intent.
*   **Cognitive Gate:** Enforced via `types.ts` (Strict State), `geminiService.ts` (Persona Prompts), and Domain-Native Operators.
*   **Execution Gate:** (Planned) MCP Server validation before file writes.

### 2. S5-Modal Attention & Epistemic Escrow
To prevent "Semantic Saponification" (the averaging out of valid architectural conflicts), the system implements an Epistemic Escrow flow governed by Paraconsistent Annotated Logic (PAL2v) principles.
*   If the Confidence-Fidelity Divergence Index (`CFDI`) between agent proposals exceeds `0.15`, the consensus generation is halted.
*   The contradiction is routed to an `EscrowStore`.
*   A Human Operator asynchronously reviews the escrow and defines a `Semantic Mutex Lock`, converted into a `ScarRatchet` to bind future generations.

### 3. Dynamic Contextual Confidence Guardrails (DCCD)
The system executes a 15/85 Schema Inversion to prevent Hallucinated Syntax under ambiguity.
*   **Confidence > 0.85:** `StrictPlanSchema` is enforced.
*   **Confidence <= 0.85:** Execution halts, and a `BranchedPlanSchema` (Twinning) is generated to explicitly map the topological divergence for human resolution.

### 4. The Dynamic Recursive Loop
Located in `App.tsx` -> `runAgentLoop`, the system implements a multi-turn conversation flow:
1.  **Discovery Phase:** Agents (Planner, Security, Perf, Style) generate initial independent assessments.
2.  **Rebuttal Phase:** Agents run again with `isRebuttal=true`, synthesizing feedback from previous turns.
3.  **Consensus Phase:** A final call to `generateConsensusPlan` synthesizes the history into a Markdown artifact, governed by DCCD.

### 5. Model Routing Strategy (`geminiService.ts`)
We employ a **Tiered Model Strategy** based on the "12-Factor Agent" principles:
*   **Complex/Reasoning Tasks:** `gemini-3-pro-preview` (with Thinking Budget).
*   **Search/Simple Tasks:** `gemini-3-flash-preview` (with Google Search Tool).
*   **Configuration:** Config is injected at runtime via `ConfigPanel`, not hardcoded.

## 📂 File Structure & Responsibilities

*   **`App.tsx`**: The "Runtime." Holds `WorkflowState` (Memory) and manages the `AgentOrchestrator` (UI).
*   **`services/geminiService.ts`**: The "Cognitive Layer." Wraps the Google GenAI SDK and handles prompt engineering (Persona injection).
*   **`components/PlanViewer.tsx`**: The "Dashboard." Visualizes the output of the consensus mechanism.
*   **`constants.ts`**: The "Ontology." Defines the rigid personas and initial goals.
*   **`AGENTS.md`**: Executable infrastructure dictating execution parameters and metric bounds.
*   **`DOMAIN_GLOSSARY.md`**: Rigid bounded context vocabulary to prevent Xenolinguistic Risk.

## 🔗 Data Flow

`User Goal` -> `ConfigPanel` -> `App State` -> `Agent Orchestrator` -> `Gemini API` -> `AgentMessage` -> `App State` -> `PlanViewer`

## Edge-Tier Constraints

- **Gateway Topology:** Domain-agnostic central API Gateways must remain decoupled from UI rendering logic (Invariant `SCAR-GATEWAY-DECOUPLE`).
- **BFF Topology:** Backends for Frontends (BFF) must be strictly mapped one-to-one with client deployments and isolated from Shared Persistence Traps (Invariant `SCAR-BFF-BINDING`).

## 6. Personal Knowledge Corpus (PKC) & Context Engineering

The architecture integrates a strict Personal Knowledge Corpus layer defined by `pkc_manifest.yml`.
This acts as a structural inversion of the "statefulness vacuum", transforming the knowledge base into an Executable Context Bundle (CxB).

*   **Sovereign YAML Specification**: `pkc_manifest.yml` dictates cryptographic node verification, neuro-symbolic meaning space anchors, and RCC-8 topological semantic edges.
*   **Git-Anchored Pre-Commit Pipeline**: Prevents semantic drift by automatically hashing updated markdown files against the manifest via `.git/hooks/pre-commit`.
*   **Flesh-to-Symbol Ingestion**: Background telemetry (`scripts/zotero_ingestion_loop.py`) designed to hook unstructured data (PDFs) into the strict topological graph via Llama-3 extraction pipelines (stubbed).

## 5. JIT Orchestrator & Verifiable Cognition Stack (VCS)

The architecture has evolved to integrate a **JIT Orchestrator** managing a **Verifiable Cognition Stack (VCS)**. This decouples the cognitive workload into distinct layers to enforce absolute alignment at runtime, addressing context rot and projection tax.

### VCS Layers

1.  **Hollow-Core Semantic Planning (Manifold $\alpha$)**: High-level strategic reasoning is executed freely at elevated temperatures. The orchestrator maintains a highly compacted context stripped of heavy, passive tool definitions and OpenAPI schemas, preventing the typical 16% to 50% tooling context consumption tax.
2.  **Ephemeral JIT Micro-Agents (Manifold $\beta$)**: Physical, state-mutating transactions (e.g., codebase edits) are handled by dynamically instantiated JIT Micro-Agents. These sub-agents utilize ultra-low $\sim 3\,\mu\text{s}$ initialization latency and minimal $\sim 6.5\,\text{KiB}$ memory footprints. They isolate the tooling tax within their local context and are autophagically destroyed on a per-step basis, returning only compressed JSON summaries.
3.  **Draft-Conditioned Constrained Decoding (DCCD)**: JIT agents apply DCCD logit-masking to project unconstrained semantic drafts onto rigid Abstract Syntax Tree (AST) schemas via token-level grammar rules, eliminating the Projection Tax.
4.  **Verification Co-Processor (VCP) & CFDI Sensing**: The system continuously monitors token-level probabilities and schema conformance to calculate the **Confidence-Fidelity Divergence Index (CFDI)**. If CFDI breaches the **Algorithmic Shame** threshold ($\ge 0.15$), the asynchronous Verification Co-Processor (VCP) intervenes, applying **Differentiable Cache Augmentation** to inject pre-compiled corrective "soft tokens".
5.  **SCoRe Self-Correction & Saga Compensating Transactions**: A strict three-attempt limit governs the self-repair loop to prevent thrashing and Reward Hacking. If compilation fails thrice, a Saga Compensating Transaction triggers an immediate, non-destructive filesystem rollback.
6.  **Failure Metabolism (STA & F-IPI)**: Failed trajectories are serialized as **Symbolic Scars** in the **Scar Tissue Archive (STA)**. The **Failure-Informed Prompt Inversion (F-IPI)** engine mutates the master constitution by prepending these scars as active negative constraints, repelling attention weights from past execution errors.
7.  **Epistemic Escrow & Justified Uncertainty Reports (JUR)**: Upon entering escrow, autonomous execution is suspended, and a cryptographically bound, machine-readable Justified Uncertainty Report (JUR) is exported, gracefully handing cognitive load back to a human operator.

### Implementation Reference
A theoretical simulation of this architecture resides in `research/jit_orchestrator_simulation.py`, demonstrating excessive schema drift, escrow gating, and immunized execution via Failure-Informed Prompt Inversion.


### 5. Staged Advantage Estimation (SAE)
The system implements Staged Advantage Estimation (SAE) to optimize Tree-structured Off-policy Optimization (Tree-OPO) when parsing hierarchical agent completion paths.
*   **Dual-Scale Advantage Balancing**: Dynamically interpolates between $O(N)$ expectation heuristic and Formal QP Projection based on Spectral Information Discrepancy ($\Psi$).
*   **Asynchronous Multi-Threaded ADMM Projector**: Lock-free parallel constraint solver decoupling $L_2$-norm projections from topological tree constraints.
*   **Entropy-Weighted Advantage Recovery (EWAR)**: Mitigates "Semantic Saponification" where preference alignment collapses variance on complex manifolds by forcing scaled variance thresholds via inverse log-probability projection.
