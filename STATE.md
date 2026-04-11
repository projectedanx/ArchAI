# 🛡️ System State & Critical Infrastructure

> **WARNING TO AGENTS:** This file represents the immutable truth of the project's current state. Read this before proposing any refactors. Do not hallucinate file existence.

## 🚦 Current Status
**Phase:** Beta / Feature Complete
**Active Workflow:** Dynamic Recursive Loop + Domain-Native Operators (Stare Decisis, DDx)
**Last Update:** Implemented Stare Decisis (Consistency) and DDx (Exclusion) Operators.

## 🏗️ Critical Infrastructure (DO NOT DELETE OR SIMPLIFY)

The following files contain core logic that must be preserved during any refactoring.

| File Path | Complexity | Critical Logic / Functions | Risk of Regression |
| :--- | :--- | :--- | :--- |
| **`App.tsx`** | 🔴 High | `runAgentLoop`, `executeStareDecisis`, `executeDDx`, `conversationFlow`. | High. The orchestration logic now includes pre-flight and pre-consensus operator checks. |
| **`services/geminiService.ts`** | 🔴 High | `executeStareDecisis`, `executeDDx`. | Critical. Ensure prompts are correctly wired to the Sovereign roles. |
| **`types.ts`** | 🟡 Medium | `DecisionRecord`, `WorkflowState.decisionLog`, `WorkflowState.ddxEnabled`. | Medium. Data model changes. |
| **`prompts.ts`** | 🟢 Low | `PROMPTS.OPERATORS`. | Low. Centralized operator instructions. |

## 🧩 Mocked Data / Stubs (Actionable)

The following components currently use mock data and *should* be connected to real backends in future steps.

1.  **`DECISION_LOG` (App.tsx):** Currently static mock data (ADR-001, ADR-004, etc.). Should be loaded from a Vector DB or `decisions.json` file.
2.  **`HISTORICAL_DRIFT` (App.tsx):** Static data.

## 🧠 Active Context Variables

*   **`ddxEnabled`:** Boolean toggle for the DDx Protocol operator.
*   **`decisionLog`:** Array of `DecisionRecord` objects used by Stare Decisis.

## 🚫 Negative Constraints (The "No-Go" Zone)

1.  **Do NOT** revert `generateAgentTurn` to a single-parameter function.
2.  **Do NOT** remove the `thinkingConfig` from the Gemini service.
3.  **Do NOT** implement file-system writes directly in the browser environment.
