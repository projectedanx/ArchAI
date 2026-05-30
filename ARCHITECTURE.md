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
