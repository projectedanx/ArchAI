# System Architecture

## Overview

The application utilizes a **Client-Side Agentic Orchestration** pattern. Unlike traditional backends, the React client (`App.tsx`) acts as the primary "Loop Orchestrator," managing the lifecycle of multiple specialized agents (`geminiService.ts`) to achieve consensus.

## 🧠 Cognitive Architecture

### 1. The "Triple Gate" Pattern
Current implementation focuses on the **Cognitive Gate**:
*   **Input Gate:** (Planned) NeMo Guardrails to filter malicious intent.
*   **Cognitive Gate:** Enforced via `types.ts` (Strict State) and `geminiService.ts` (Persona Prompts).
*   **Execution Gate:** (Planned) MCP Server validation before file writes.

### 2. The Dynamic Recursive Loop
Located in `App.tsx` -> `runAgentLoop`, the system implements a multi-turn conversation flow:
1.  **Discovery Phase:** Agents (Planner, Security, Perf, Style) generate initial independent assessments.
2.  **Refinement Phase (Rebuttal):** `Planner` and `Security` run again with `isRebuttal=true`, synthesizing feedback from previous turns.
3.  **Consensus Phase:** A final call to `generateConsensusPlan` synthesizes the entire history into a Markdown artifact.

### 3. Model Routing Strategy (`geminiService.ts`)
We employ a **Tiered Model Strategy** based on the "12-Factor Agent" principles:
*   **Complex/Reasoning Tasks:** `gemini-3-pro-preview` (with Thinking Budget).
*   **Search/Simple Tasks:** `gemini-3-flash-preview` (with Google Search Tool).
*   **Configuration:** Config is injected at runtime via `ConfigPanel`, not hardcoded in the prompt.

## 📂 File Structure & Responsibilities

*   **`App.tsx`**: The "Runtime." Holds `WorkflowState` (Memory) and manages the `AgentOrchestrator` (UI).
*   **`services/geminiService.ts`**: The "Cognitive Layer." Wraps the Google GenAI SDK and handles prompt engineering (Persona injection).
*   **`components/PlanViewer.tsx`**: The "Dashboard." Visualizes the output of the consensus mechanism (Drift Timeline, Semantic Diff).
*   **`constants.ts`**: The "Ontology." Defines the rigid personas and initial goals.

## 🔗 Data Flow

`User Goal` -> `ConfigPanel` -> `App State` -> `Agent Orchestrator` -> `Gemini API` -> `AgentMessage` -> `App State` -> `PlanViewer`
