# Architecture AI: Sovereign Cognitive OS

**Architecture AI** is a multi-agent architectural governance platform designed to prevent "Context Rot" and "Architectural Senescence" through rigorous, consensus-based decision-making.

Unlike standard chatbots, this system operates on the principles of **Agentic Engineering** and **Sovereign AI**, treating LLM agents as deterministic software artifacts rather than stochastic chat interfaces. This repository functions as a Bricolage environment driven by the V.I.P.E.R ('The Gaffer') and 0xCARTO architectural personas, demanding explicit boundaries, Paraconsistent Logic (PAL2v), and strictly typed outputs.

## 🚀 Core Philosophy & Epistemic Infrastructure

The system is built upon the following theoretical frameworks and empirical documentation:

1.  **The 12-Factor Agent Methodology:** Enforcing stateless processes, explicit configuration, and epistemic rigor.
2.  **Domain-Native Operators:** Utilizing specialized cognitive subroutines (e.g., *Stare Decisis* for consistency, *DDx* for exclusion).
3.  **Architectural Gerontology:** Proactively auditing code for "healthspan" using cognitive complexity metrics to prevent drift.
4.  **Epistemic Escrow Sandbox:** Holding conflicting agent propositions within a topological boundary until Human Semantic Mutex Locks resolve the tension.

### 📚 Essential Bounded Context Documents
To contribute or operate within this repository, adherence to these context-bounding documents is mandatory:
- **[0xCARTO Synthesis & Pluriversal Knowledge Capsule](docs/0xCARTO_SYNTHESIS.md)**: Extracted dependency topography, CI analysis, entropy audit, and symbolic scars.
- **[System Architecture](ARCHITECTURE.md)**: Outlines the Client-Side Agentic Orchestration structure and DCCD guardrails.
- **[Domain Glossary](DOMAIN_GLOSSARY.md)**: Enforces explicit definitions for entities like 'Nitinol Memory' and 'Symbiotic Resonance' to prevent Interpretive Fracture.
- **[Sovereign State Definition](STATE.md)**: Immutable state context ensuring baseline architectural fidelity.
- **[Agent Execution Directives](AGENTS.md)**: Rigid operational rules bounding agentic response structures (e.g., Anti-Saponification rules).

## ⚡ Key Features
*   **Sovereign Personal Knowledge Corpus (PKC):** Integrated `pkc_manifest.yml` for rigorous, cryptographically verifiable graph topology and contextual bounding.

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
*   **Testing Infrastructure:** Vitest and React Testing Library (`npm run test`)

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
    > ⚠️ **NOMINATIVE TRAP ALERT:** Note that while the codebase context implies a missing `DATABASE_URL` for vector DB logging, the `.env.example` mapping and live runtime omit this setup. Ensure database environment variables are configured if implementing future DB features.

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
2.  **Persona Selection:** Choose the specific personas you want to active for each Agent Role (Planner, Security, Performance, Style, Sovereign). Each persona has a unique perspective defined by its system prompt (`prompts.ts`).
3.  **System Capabilities:** Toggle advanced features like "Enable Web Search", "Deep Thinking", and the "Epistemic Escrow Sandbox" based on the complexity of your goal.
4.  **Initialize Agents:** Click "Initialize Agents" to start the consensus workflow.
5.  **Agent Workflow:** Observe the agents as they analyze the goal, debate approaches, and refine their stances. The Audit Trail on the right will log every system action.
6.  **Consensus Plan:** Once the agents reach a consensus, the system will synthesize a final architectural plan, complete with ADRs, migration steps, and risk mitigation strategies. You can view the semantic diff projection and architectural drift timeline on the right.
7.  **Epistemic Escrow:** If any agent's response creates significant cognitive tension (CFDI > 0.15), it will be quarantined in the Epistemic Escrow. You can review these entries and elevate them to "Scar Ratchets" to prevent future regressions.
8.  **Symbiotic Isomorphism:** Observe the `SymbioticResonance` telemetry component in the sidebar, which tracks the dynamic cognitive tension between AI Fidelity and Human Intuition via the Golden Scar Protocol.

## 📜 License

Proprietary Sovereign Architecture.


## 📘 Documentation Mandate & Lessons Learned

### Automated JSDoc Enforcement
During recent ecosystem maintenance, automated AST traversal (via `ts-morph`) was deployed to systematically audit and enforce complete JSDoc coverage across all exported functions, classes, and variable declarations.

**High-Value Insights:**
1.  **AST Modification Volatility:** When modifying raw AST nodes directly (especially injecting comments into JSX variable declarations), `ts-morph` can struggle with complex tree replacements. **Lesson:** Fallback to exact text replacement using regex for specific docstring insertions after identifying nodes to maintain structural integrity.
2.  **Destructured Parameter Parsing:** In React, destructured props (e.g., `{ state, onResolve }`) obfuscate standard parameter naming. **Lesson:** The automated doc generator must detect inline objects and parse out the individual fields to maintain high-quality `param` documentation (e.g., `@param props (state, onResolve)`).
3.  **Comprehensive Coverage:** It is insufficient to only document `function` declarations. `const MyComponent = () => {}` structure dominates React, requiring targeted sweeps of exported variable declarations to ensure 100% component telemetry coverage.

## 🧠 Personal Knowledge Corpus (PKC) & Cognitive Sovereignty

This system has been upgraded to implement the **Personal Knowledge Corpus (PKC) Framework**. This establishes a structured, stateful "Semantic Tether" replacing the standard stochastic LLM interaction model.

### New Components:
*   **`pkc_manifest.yml`**: The Sovereign PKC YAML Schema Specification. This serves as the master contract for content nodes, cryptographic provenance, and semantic edges.
*   **Workflow A (Git-Anchored Context Hashing)**: A `.git/hooks/pre-commit` script is installed to automatically compute SHA-256 hashes of markdown files and bind them into the `pkc_manifest.yml` metadata, ensuring semantic integrity against silent data drift.
*   **Workflow B (Automated Flesh-to-Symbol Ingestion)**: Located at `scripts/zotero_ingestion_loop.py`. This script watches for incoming Zotero PDF attachments and (via stubbed implementation) extracts text and queries local LLMs to seamlessly integrate external research into your graph topology.

### Requirements for PKC Workflows:
*   Python 3
*   `PyYAML`
*   `watchdog`
*   `pdfplumber` (for Workflow B full implementation)

### Git Hooks Installation
To enable the Context Hashing pre-commit hook automatically, this repository has been configured to use the `scripts/` directory for git hooks:
```bash
git config core.hooksPath scripts
```

---

## 🏛️ Architecture Blueprint: The Qualitative Experience Database (QED)

To build a personal qualitative database for Retrieval-Augmented Generation (RAG) that satisfies the demands of high-integrity systems engineering, we must move beyond the naive collection of unstructured markdown files. A production-grade **Personal Qualitative Database (PQD)** must be treated as an **Epistemic Workbench**—a structured, version-controlled, and cryptographically verifiable repository designed to compile "lived experience" into highly grounded, drift-resistant context payloads.

The architecture of a PQD translates subjective human experience (e.g., physical trial data, raw system logs, and unboxing evaluations) into structured, queryable data features while preserving **Purpose Fidelity** and **Semantic Invariance**.

### Step I: Isomorphic Schema Design (The Knowledge Representation Layer)

The foundational step is defining a machine-readable schema that governs the ingestion of qualitative data. Rather than storing plain text, each entry in the database must compile into an **Executable Context Bundle (CxB)** adhering to a strict **Minimal Explainability Metadata Schema (MEMS)**.

```yaml
# Minimal Explainability Metadata Schema (MEMS) for Qualitative Ingestion
$schema: "http://json-schema.org/draft-07/schema#"
title: "Qualitative_Experience_Node_v1.0"
type: object
required:
  - node_id
  - temporal_anchor
  - qualitative_payload
  - sensory_causal_indicators
  - ontological_alignments
  - cryptographic_provenance
properties:
  node_id:
    type: string
    pattern: "^QEN-{8}-[a-f0-9]{4}$"
  temporal_anchor:
    type: string
    format: "date-time"
  qualitative_payload:
    type: object
    required: [experience_type, raw_observation, counterfactual_variance]
    properties:
      experience_type: { type: string, enum: [ "Direct_Trial", "Failure_Incident", "Socratic_Review" ] }
      raw_observation: { type: string, description: "Unfiltered, jargon-free log of the qualitative phenomenon." }
      counterfactual_variance: { type: string, description: "What failed to occur, documenting unchosen trajectories." }
  sensory_causal_indicators:
    type: object
    required: [causal_perturbation_index, structural_roughness]
    properties:
      causal_perturbation_index: { type: number, minimum: 0, maximum: 10 }
      structural_roughness: { type: number, minimum: 0, maximum: 1 }
  ontological_alignments:
    type: array
    items: { type: string, description: "Explicit links to baseline semantic genome schemas." }
  cryptographic_provenance:
    type: object
    required: [agent_did, verifiable_signature]
```

#### Key Engineering Invariants of the Schema:
1.  **The "Lived Experience" Payload**: To prevent the retrieval module from compiling "AI slop" or generic web documentation, the `raw_observation` block is restricted exclusively to first-person, qualitative telemetry. This includes raw terminal outputs, physical unboxing logs, API latency audits, and specific edge-case anomalies.
2.  **The Archive of Absence (Counterfactual Variance)**: Every qualitative node must explicitly document the unchosen paths and failed alternatives. This prevents **compression-induced shortcut hallucinations** by providing the RAG agent with explicit context on what did *not* work.
3.  **Semantic Anchoring**: All terms are mapped directly to a local, version-controlled **Semantic Genome** (e.g., standardizing custom domain concepts). This enforces semantic stability and protects the database against **Memory Poisoning** and **Interpretive Fracture**.

### Step II: Ingestion Pipeline & Feature Grouping (The Computational Layer)

To transform raw markdown, audio transcripts, or GitHub commits into structured MEMS nodes, implement a **Neuro-Symbolic Ingestion Pipeline**.

```
                     +---------------------------------+
                     | Raw Qualitative Input Streams   |
                     | (Markdown, Transcripts, Commits)|
                     +----------------+----------------+
                                      |
                                      v
                     +---------------------------------+
                     |     Semantic Parser GNN         |
                     | (Translates to Symbolic Atoms)  |
                     +----------------+----------------+
                                      |
                                      v
                     +---------------------------------+
                     |   Feature Store Structuring     |
                     | (SQL Feature Groups & Metadata) |
                     +----------------+----------------+
                                      |
                     +----------------+----------------+
                     |                                 |
                     v                                 v
        +-------------------------+       +-------------------------+
        |  Semantic-Relational    |       |   Cryptographic Proof   |
        |   Domain Lift (SRDL)    |       |   & Merkle Root Anchor  |
        +------------+------------+       +------------+------------+
                     |                                 |
                     +----------------+----------------+
                                      |
                                      v
                     +---------------------------------+
                     |     Immutable Audit Ledger      |
                     |     (Verifiable Provenance)     |
                     +---------------------------------+
```

#### 1. Ingestion and Feature Store Structuring:
*   Utilize a cloud-native or local **Feature Store** (e.g., Abacus.AI feature groups or SQLite) to programmatically ingestion streaming and batch files.
*   Define a dedicated **Feature Group** represented by named table definitions. Set up SQL and Python transforms to automate dataset refreshes and cleanups upon the introduction of new qualitative raw logs.
*   Configure the ingestion worker to perform **Semantic-Relational Domain Lifting (SRDL)**. This translates highly specific, non-standard natural language descriptions into generalized, high-dimensional vector embeddings, preventing downstream retrieval failures caused by lexical mismatch.

#### 2. Cryptographic Provenance Anchoring:
*   Each ingested node must be sealed with a **SemanticCommit**. The node is hashed (SHA-256) and signed using the creator's **Decentralized Identifier (DID)** to generate a **Verifiable Credential (VC)**.
*   Periodically compile these credentials into a Merkle-tree and anchor the root hash to an immutable ledger (or local git tag history). This establishes an auditable, tamper-evident **Intellectual Supply Chain** for your RAG knowledge base.

### Step III: Adaptive Retrieval and the Semantic Firewall (The Security Layer)

Naive vector databases are highly vulnerable to **Retrieval-Induced Drift** and **Context Poisoning**. To secure the retrieval layer:

```
                            +-----------------------+
                            |      User Query       |
                            +-----------+-----------+
                                        |
                                        v
                            +-----------------------+
                            |   Semantic Firewall   |
                            | (Quarantines Attack)  |
                            +-----------+-----------+
                                        |
                                        v
                            +-----------------------+
                            |  Contextual Retriever |
                            |      (RAG Query)      |
                            +-----------+-----------+
                                        |
                                        v
                            +-----------------------+
                            |  Topological Audit    |
                            | (TDA / Semantic Drift)|
                            +-----------+-----------+
                                        |
                    +-------------------+-------------------+
                    |                                       |
       SD Score <= Threshold                       SD Score > Threshold
                    |                                       |
                    v                                       v
        +-----------------------+               +-----------------------+
        |   Synthesized Output  |               |   Epistemic Escrow    |
        |      Compilation      |               |     (HITL Halt)       |
        +-----------------------+               +-----------------------+
```

1.  **The Semantic Firewall**: Embed a **Semantic Firewall** as an intercepting proxy before the database is queried. The firewall applies **Dynamic Affordance Profiling** to restrict the active action space, checking incoming queries against security allow-lists to block prompt injections and RAG exploits.
2.  **Topological Alignment Auditing**: During the retrieval phase, implement a **Semantic Drift Monitor Agent (SDMA)**. When context is pulled from the database, the SDMA applies **Topological Data Analysis (TDA)** to compute a real-time **Semantic Drift Score (SDS)**. If the retrieved concept manifold shows topological deformation (such as "concept leakage" or semantic voids) relative to your baseline ontology, the system flags a risk.
3.  **The Epistemic Escrow Circuit Breaker**: If the computed **Confidence-Fidelity Divergence (CFD)** or SDS exceeds a strict threshold (e.g., $SDS > 0.05$), the system activates an **Epistemic Escrow**. The execution pipeline halts, imposing "positive friction" and routing the corrupted context bundle to the human operator for manual, reflexive re-alignment.

### Part IV: Deep Research Prompts

Derived from the concepts discovered in the corpus of sources, the following highly structured research prompts are designed to stress-test, evaluate, and reverse-engineer these advanced database behaviors.

#### Research Prompt 1: Topological Manifold Deformations and Latent Semantic Satiation
```yaml
Product-Requirements-Prompt: Topological_RAG_Manifold_Deformation_Audit_v1.0
Domain: Latent Space Diagnostics & Information Theory
Goal: Formulate a rigorous mathematical and visualization protocol to detect and map "Topological Voids" and "Semantic Ruptures" in a high-dimensional RAG context space subjected to recursive, multi-agent query feedback loops.
Persona: Trans-National Latent Space Topologist & Cognitive Systems Architect

Preconditions:
  - Input: Access to a simulated 100-turn recursive RAG pipeline querying a personal qualitative dataset of "lived experience" templates (AccountingOntology-v3.0.yaml).
  - Target Concepts: "Resilience", "Purpose Fidelity", "Epistemic Humility".
  - Baseline State: An initial high-dimensional vector space mapping of the core ontology.

Constraints_and_Invariants:
  - Strict Dimensional Invariance: All semantic drift analyses must use Topological Data Analysis (TDA) and persistent homology (Betti numbers $\beta_0$, $\beta_1$) to quantify deformations.
  - Zero Anthropomorphism: Avoid any reference to AI "intuition" or "thought"; represent all shifts purely as geometric, coordinate, and distance-based vector metrics.
  - Failsafe Invariant: Any detected Confidence-Fidelity Divergence (CFD) spike ($CFD > 0.4$) must trigger a simulated Epistemic Escrow event, freezing the state space.

Execution_Plan:
  1. Map the Chrono-Topological Signature: Detail the mathematical implementation for extracting persistent homology coordinates from the vector point cloud over 100 recursive epochs. Define how topological voids (Betti-1 features) are tracked as "semantic scars."
  2. Simulate Concept Leakage and Satiation: Model a progressive concept drift triggered by "Plugin Updates" and "Saturated Market Pressures" in a simulated headless CMS architecture. Quantify how "latent semiotic gravity" collapses specialized role-based vocabularies into generic representations.
  3. Formulate the Semantic-Relational Domain Lifting (SRDL) Protocol: Architect a declarative schema (JSON/YAML) that dynamically adjusts the vector distance metric (cosine, Euclidean) based on the "structural roughness" and "causal perturbation index" of the retrieved nodes.
  4. Design the Forensic Trajectory Map: Build a 4D visualization spec (using Plotly/D3.js blueprints) that traces the "Chrono-Trace" of the concept manifold's decay. Explain how a human-in-the-loop auditor can click a mutated node to perform a "semantic backtrace" to its raw ingestion provenance.

Self_Test:
  - Confirm the TDA algorithm successfully flags simulated "trauma nodes" as geometric deformations ($\Delta > 0.3$).
  - Verify that the CFD calculation mathematically triggers a complete halt of the simulated pipeline under high semantic noise.
```

#### Research Prompt 2: Algorithmic Kintsugi and the Symbolic Scar Registry
```yaml
Product-Requirements-Prompt: Algorithmic_Kintsugi_Vector_Healing_v1.0
Domain: Anti-Fragile Software Design & Generative Database Engineering
Goal: Architect an automated self-healing pipeline that converts RAG retrieval failures (hallucinations, context rot) into structured "Symbolic Scars" used as generative priors to immunize the database against future semantic pathogens.
Persona: Lead Systems Architect & Cognitive Resilience Engineer

Preconditions:
  - Access to a simulated "RAG Failure Log" detailing context truncation, positional bias (lost-in-the-middle), and semantic contamination events.
  - System Components: Ingestion Engine, Semantic Auditor (Symbolic), Vector Search Database (Neural), and Scar Tissue Archive (STA).

Constraints_and_Invariants:
  - Anti-Fragility Mandate: The system must show a convex, non-linear positive response to simulated "misinformation attacks." The objective function must optimize for long-term capability gain from short-term volatility.
  - Non-Destructive Mitigation: The self-correction loop must utilize "Therapeutic Forgetting" to prune harmful semantic associations without erasing original historical records or causing catastrophic forgetting.
  - Least Privilege Access: Specialized sub-agents must operate within isolated context windows to prevent "context bleeding" and token-ink ratio waste.

Execution_Plan:
  1. Map the Trauma-Topological Bias Cartography (TTBC): Analyze the RAG failure log to visualize retrieval anomalies as topological "exclusion zones" in your personal qualitative database.
  2. Implement the Symbolic Scar Registry (SSR): Abstract each failure into a structured, immutable data object containing the event's high-dimensional signature and the precise point of "coherence lock" breakdown.
  3. Execute Algorithmic Reparation: Utilize Failure-Informed Prompt Inversion (FIPI) to mutate the database's "Verifiable Cognitive Constitution." Show how these "scars" act as structural "pulls" that actively steer future generation away from failed pathways.
  4. Perform a Budget Opti Analysis: Draft an economic justification balancing the Cost of Coherence Overhead (CCH) against the Cost of Structural Discovery (CSD) during the self-healing cycle, proving that the risk of creative exploration is financially rational.

Self_Test:
  - Simulate a RAG retrieval failure and verify the system successfully logs a "Symbolic Scar" to the STA.
  - Run a mock optimization cycle and confirm that the mutated prompt shows a >30% reduction in "representational mimesis" compared to standard, un-audited prompting.
```

#### Research Prompt 3: Decolonial Prompt Scaffolding and Pluriversal Ontological Reconciliation
```yaml
Product-Requirements-Prompt: Decolonial_Ontology_Reconciliation_v1.0
Domain: Epistemic Justice & Semantic Interoperability
Goal: Formulate a decolonial prompt scaffolding architecture that prevents "aesthetic flattening" and "cultural flattening" in automated, localized geo-targeted lead generation engines.
Persona: Trans-National AI Ethicist & Conversational Grounding Architect

Preconditions:
  - Location Focus: Tier 2/3 cities characterized by high demand but highly fragmented, non-Western, or marginalized cultural contexts.
  - Target Output: Multi-lingual, culturally authentic, and local-business-aligned newsletter/leads content.

Constraints_and_Invariants:
  - Decolonial Alignment Invariant: All generated copy must actively challenge and compensate for "Western Gaze Dominance" and "promptual colonialism" present in the base LLM weights.
  - Invariant: Zero reliance on standard, highly-saturated Listicle or "Ultimate Guide" blog archetypes.
  - Epistemic Escrow Threshold: Any metric indicating a decline in the Cultural Fidelity Index ($CFI < 0.8$) or an increase in the Western Gaze Dominance Score ($WGDS > 0.2$) must instantly trip the escrow circuit breaker.

Execution_Plan:
  1. Audit the Algorithmic Gaze: Formulate an automated protocol to probe the latent space of a frontier LLM, quantifying its default aesthetic assumptions when tasked with describing local, traditional, or marginalized community practices.
  2. Design Decolonial Prompt Scaffolds: Program structured meta-prompts that force the AI to adopt a critically reflexive stance. Use "Pluriversal Resonance Filters" to ensure localized terminologies and cultural histories are represented with deep, non-extractive authenticity.
  3. Implement the Agonistic Interface: Architect a "Multi-Perspective Analysis" harness where different cultural and economic personas (e.g., local artisan vs. technocentric developer) engage in simulated Socratic debate to resolve conflicting value structures before output compilation.
  4. Configure the Epistemic Escrow: Define the exact mathematical triggers (using SDC, CFD, and Symbolic Entropy metrics) that put the content pipeline in escrow, forcing a "positive friction" pause and routing the output to community human-in-the-loop editors.

Self_Test:
  - Simulate a highly biased, Western-centric input and verify that the Decolonial Prompt Scaffold successfully recalibrates the output, demonstrating an increased Cultural Fidelity Index.
  - Confirm the Epistemic Escrow activates automatically when the simulated "Gaze Dominance" threshold is breached.
```

### Part V: Verifiable Cognition Stack (VCS) & JIT Orchestrator

The system incorporates a **JIT Orchestrator** architecture to decouple cognitive workloads and prevent Context Rot.

#### Architecture Layers:
1. **Hollow-Core Semantic Planning (Manifold $\alpha$)**: High-level strategic reasoning is executed at elevated temperatures in a highly compacted context stripped of heavy tool schemas.
2. **Ephemeral JIT Micro-Agents (Manifold $\beta$)**: Physical, state-mutating transactions are executed by short-lived sub-agents with ultra-low latency ($\sim 3\,\mu\text{s}$) and minimal memory footprint ($\sim 6.5\,\text{KiB}$).
3. **Draft-Conditioned Constrained Decoding (DCCD)**: Agents project unconstrained semantic drafts onto rigid AST schemas via token-level grammar rules, eliminating the Projection Tax.
4. **CFDI Sensing & Verification Co-Processor (VCP)**: The system monitors token-level probabilities (Confidence-Fidelity Divergence Index). A CFDI $\ge 0.15$ triggers the VCP, which intercepts deviant caches and applies Differentiable Cache Augmentation.
5. **SCoRe Self-Correction**: A strict three-attempt limit prevents thrashing. Repeated failures trigger a Saga Compensating Transaction to rollback the state.
6. **Failure Metabolism (STA & F-IPI)**: Failures are serialized as Symbolic Scars in the Scar Tissue Archive (STA). The Failure-Informed Prompt Inversion (F-IPI) engine mutates the master constitution to actively repel attention weights from past errors.
7. **Justified Uncertainty Reports (JUR)**: When in escrow, the system exports a cryptographically bound JUR to gracefully hand over the cognitive load to a human.

**Simulation:** A Python-based theoretical simulation script resides at `research/jit_orchestrator_simulation.py`, demonstrating the failure loop and successful execution via Failure-Informed Prompt Inversion.
