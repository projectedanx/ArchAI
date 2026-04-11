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

## [V2.0 Core Proposal] - Product Backlog Expansion
### 🌟 New Features Proposed
*   **Epistemic Escrow Sandbox:** Designed the abstraction to securely hold unresolved AI contradiction nodes without dropping consensus logic.
*   **Sovereign Research Mesh:** Scoped the P2P knowledge retrieval mesh with strict PII filtering requirements.
*   **Dynamic Contextual Confidence Guardrails (DCCD):** Formalized the `15/85` schema divergence logic based on agent confidence metrics.
*   **Harmonic Resonance Matrix Dashboard:** Planned real-time topological mapping of agent dissonance.
*   **Symbolic Scar Auto-Ratcheting System:** Introduced constraints derived organically from historical architecture trauma records.

### 📚 Lessons Learned & Architectural Reflection
*   *Agentic Telemetry & Governance Integration:* Discovered that forcing an Occam's Razor approach on multi-agent debate destroys structural isomorphism. To preserve value, we need mechanisms like **Epistemic Escrow** to harbor non-linear thought.
*   *Sovereignty Gradient:* Not all agent outputs are equally certain. We realized standard schemas break when the model guesses. **DCCD** dynamically binds schema structure to confidence ratings, an essential evolution for transparent AI UX.
*   *Paraconsistent Knowledge Discovery:* We shifted our priority from "always reaching consensus" to "extracting the value of the argument". The proposed features actively weaponize system dissonance as an investigative tool rather than suppressing it.
