# Architecture AI: Sovereign Cognitive OS

**Architecture AI** is a multi-agent architectural governance platform designed to prevent "Context Rot" and "Architectural Senescence" through rigorous, consensus-based decision-making.

Unlike standard chatbots, this system operates on the principles of **Agentic Engineering** and **Sovereign AI**, treating LLM agents as deterministic software artifacts rather than stochastic chat interfaces.

## 🚀 Core Philosophy

The system is built upon the following theoretical frameworks:

1.  **The 12-Factor Agent Methodology:** Enforcing stateless processes, explicit configuration, and epistemic rigor.
2.  **Domain-Native Operators:** Utilizing specialized cognitive subroutines (e.g., *Stare Decisis* for consistency, *DDx* for exclusion) rather than generic prompting.
3.  **Architectural Gerontology:** Proactively auditing code for "healthspan" using cognitive complexity metrics to prevent drift.

## ⚡ Key Features

*   **Multi-Agent Consensus:** Orchestrates debate between specialized personas (Planner, Security, Performance, Style).
*   **Dynamic Recursive Loops:** Implements a "Rebuttal Phase" where agents refine their stance based on peer feedback (Synthesis & Rebuttal).
*   **Deep Thinking Integration:** Leverages `gemini-3-pro-preview` for complex reasoning tasks (`thinkingBudget: 32768`).
*   **Semantic Drift Visualization:** Tracks the impact of architectural decisions over time via the Drift Timeline.
*   **Epistemic Escrow Sandbox:** Isolates unresolved cognitive friction (CFDI > 0.15) for asynchronous human insight mining.
*   **Symbolic Scar Ratcheting:** Converts Escrow conflicts into generative constraints using the Stare Decisis Operator.
*   **Dynamic Contextual Confidence Guardrails (DCCD):** Modifies data schema rigidness based on agent confidence topology. Strict schemas applied at >0.85 confidence; twinned schema branching applied at <=0.85.
*   **Audit Trail:** Immutable logging of all agent actions and system state changes.

## 🛠️ Tech Stack

*   **Runtime:** React 19 (Client-Side Orchestration)
*   **Language:** TypeScript
*   **AI Layer:** Google GenAI SDK (`@google/genai`)
*   **Models:** `gemini-3-pro-preview` (Reasoning), `gemini-3-flash-preview` (Speed/Search)
*   **UI:** Tailwind CSS + Lucide React
*   **Visualization:** Recharts

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    The project uses standard npm package management.
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Google Gemini API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    Ensure you run it in the background if automating, e.g.
    ```bash
    npm run dev &
    ```

5.  **Build for Production:**
    ```bash
    npm run build
    ```

## 🎮 Usage Guide

1.  **Configuration:** Upon launching the application, you will be presented with the Configuration panel. Define your architectural goal in the text area provided.
2.  **Persona Selection:** Choose the specific personas you want to active for each Agent Role (Planner, Security, Performance, Style, Sovereign). Each persona has a unique perspective defined by its system prompt.
3.  **System Capabilities:** Toggle advanced features like "Enable Web Search", "Deep Thinking", and the "Epistemic Escrow Sandbox" based on the complexity of your goal.
4.  **Initialize Agents:** Click "Initialize Agents" to start the consensus workflow.
5.  **Agent Workflow:** Observe the agents as they analyze the goal, debate approaches, and refine their stances. The Audit Trail on the right will log every system action.
6.  **Consensus Plan:** Once the agents reach a consensus, the system will synthesize a final architectural plan, complete with ADRs, migration steps, and risk mitigation strategies. You can view the semantic diff projection and architectural drift timeline on the right.
7.  **Epistemic Escrow:** If any agent's response creates significant cognitive tension, it will be quarantined in the Epistemic Escrow. You can review these entries and elevate them to "Scar Ratchets" to prevent future regressions.

## 📜 License

Proprietary Sovereign Architecture.

## 🧠 High-Value Lessons Learned (Architectural Documentation Phase)

1.  **Safety Through Abstraction:** When deploying automated documentation scripts (like Python AST parsers or regex injectors) across a live React/TypeScript codebase, strict boundary conditions are vital to prevent accidental overwriting of core business logic or React Hook structures.
2.  **JSDoc/TSDoc Redundancy:** Automated insertions must verify the pre-existence of `/**` block comments. Blindly appending docstrings based on keyword triggers (e.g., `export interface`) leads to compiler-invisible noise and pollutes the IDE's IntelliSense.
3.  **Documentation as Infrastructure:** In a Sovereign AI system relying on deterministic agent personas, the system prompts (like those in `prompts.ts`) function as executable code. Documenting their intent and parameters is as critical as documenting traditional API endpoints to prevent behavioral drift.
