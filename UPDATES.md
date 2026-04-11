# 🔄 Changelog & Architectural Updates

## [Current Version] - Domain-Native Operators

### 🌟 New Features
*   **Domain-Native Operators (DNOs):** Implemented the "Cognitive Gate" architecture with two distinct operators.
    *   **Stare Decisis (Consistency Engine):** Runs before the agent loop to check the user's goal against a registry of past decisions (ADRs). Flags conflicts like "No Direct DB Access" or "gRPC Mandates".
    *   **DDx Protocol (Exclusion Engine):** A "Devil's Advocate" operator that runs before consensus (if enabled) to generate a differential diagnosis, identifying "Happy Path" biases and potential failure modes.
*   **Toggleable Protocols:** Added a "DDx Protocol" toggle in the `ConfigPanel`.
*   **Sovereign Agent Integration:** Operators output their findings into the chat stream using the "Sovereign" agent identity.

### 🔧 Refactors
*   **`services/geminiService.ts`:** Added dedicated `executeStareDecisis` and `executeDDx` functions with specialized system prompts.
*   **`App.tsx`:** Updated `runAgentLoop` to include the Stare Decisis pre-check and the DDx pre-consensus check. Added mock `DECISION_LOG`.
*   **`prompts.ts`:** Added `OPERATORS` section with specialized instructions for consistency checking and critique.

### 🐛 Fixes
*   Ensured operator outputs are correctly typed as `AgentMessage` and persisted in the conversation history.
