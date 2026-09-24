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


### 5. Meta-Cognitive Reflexive Ecosystem (MCRE) & Continuous Latent Steering
The architecture transitions from discrete token-based reasoning (Chain-of-Thought) to continuous latent steering to avoid premature lexical commitment.
*   **Verification Co-Processor (VCP):** An asynchronous, decoupled System 2 controller that eavesdrops on the primary model's active Key-Value (KV) cache.
*   **Differentiable Cache Augmentation:** When the `CFDI` or Semantic Drift Coefficient exceeds threshold bounds, the VCP computes a sequence of continuous "Soft Tokens" (corrective latent embeddings) and injects them directly into the primary model's active $KV\_cache$.
*   **Latent Gravitational Pull:** This injection geometrically redirects the model's generation trajectory back to the safe semantic geodesic without explicit text output or altering frozen parameters.


### 6. Parsimonious Architecture Protocol (PAP) & Epistemic Gating
Alongside the Verification Co-Processor (VCP), the system integrates the **Parsimonious Architecture Protocol (PAP)** to enforce Occam's Razor in theory selection and model validation.
*   **Ontological Commitment Engine:** Binds competing logical graphs (DAGs) to empirical variables.
*   **Occam Loss Compiler:** Evaluates theories based on the structural complexity penalty matching the Bayesian marginal likelihood, rejecting epicyclic logic in favor of parameter-minimal solutions.
*   **Bayesian Model Reduction (BMR):** Actively prunes the reasoning chain to consolidate verbose logic into parsimonious fictive principles, combating cognitive bloat.
*   **Interdisciplinary Model Travel Auditor:** Stress-tests target-system invariants using Dimensionality Collapse, explicitly generating a Modus Tollens falsification path when assumptions (e.g., frictionless_plane) clash with the target environment (e.g., sandpaper_surface).

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


### 5.5 Action-Alignment Loss (Regret Minimization)
To mathematically resolve the "thought-action gap" in sequential game-theoretic interactions, the architecture incorporates a differentiable **Action-Alignment Loss** module. This loss function forces the agent's execution policy (Head B) to align with the optimal Best Response calculated from its predictive ToM module (Head A). By utilizing a Boltzmann Best-Response Approximation (LogSumExp), the module preserves dense gradient flow across non-stationary opponent models while deterministically preventing conservative Nash collapse.
*   **Implementation:** `research/action_alignment_loss.py`

### 5. Staged Advantage Estimation (SAE)
The system implements Staged Advantage Estimation (SAE) to optimize Tree-structured Off-policy Optimization (Tree-OPO) when parsing hierarchical agent completion paths.
*   **Dual-Scale Advantage Balancing**: Dynamically interpolates between $O(N)$ expectation heuristic and Formal QP Projection based on Spectral Information Discrepancy ($\Psi$).
*   **Asynchronous Multi-Threaded ADMM Projector**: Lock-free parallel constraint solver decoupling $L_2$-norm projections from topological tree constraints.
*   **Entropy-Weighted Advantage Recovery (EWAR)**: Mitigates "Semantic Saponification" where preference alignment collapses variance on complex manifolds by forcing scaled variance thresholds via inverse log-probability projection.

## 7. Cybernetic Agentic TDD Frameworks
The architecture integrates advanced Test-Driven Development (TDD) frameworks directly into the agentic workflow to ensure semantic correctness and alignment. These frameworks transform subjective natural language instructions into a deterministic, self-correcting, and mathematically verifiable feedback loop.

### 7.1 Zero-Trust TDD Isolation (Isomorphic State Machine)
To prevent "Sycophantic Mocking" (where an agent modifies a test to pass rather than fixing the code) and sandbox escapes, the system implements an isomorphic state graph:
*   **Test Architect Node:** Write-access limited exclusively to test directories. Generates the initial failing test (Red Phase).
*   **Implementer Node:** Write-access limited to application source code. Iterates on implementation until tests pass (Green Phase).
*   **Sandboxing:** Test execution occurs in an ephemeral, zero-trust container (`gemini-cli-sandbox`) with no network access and restricted syscalls.
*   **Documentation:** `research/zero_trust_tdd_isolation_state_machine.md`

### 7.2 Parametric TDD Trade-off Analysis
Optimizes the balance between execution velocity and alignment accuracy.
*   **Multi-Model Cascade:** Delegates high-cognitive planning to large models (e.g., Gemini 3 Pro) and high-frequency ReAct iteration loops to faster models (e.g., Gemini 2.5 Flash).
*   **Doom Loop Break Threshold:** Implements a hard threshold ($k_{max} = 10$) on iteration attempts to prevent token exhaustion during unresolvable build errors.
*   **Context Compression:** Utilizes a sliding window algorithm to retain global rules (e.g., from `AGENTS.md`) while summarizing repetitive execution logs.
*   **Documentation:** `research/parametric_tdd_tradeoff_analysis.md`

### 7.3 Multimodal UI Verification Harness
An automated, self-healing visual testing harness leveraging multimodal agents and Playwright.
*   **Test-Driven Visual Spec:** Translates visual inputs (PDFs, sketches) into structured layout constraints and Playwright scripts.
*   **Automated Layout Grading:** A vision model compares target specs against runtime screenshots to calculate layout deltas and propose code repairs.
*   **Atomic Checkpoints:** Enforces filesystem snapshots before visual mutations, enabling automated rollbacks (`/restore`) if style drift or regressions occur.
*   **Documentation:** `research/multimodal_ui_verification_harness.md`


## 8. Sovereign Saga Orchestration (CI/CD)

The architecture includes a zero-entropy GitHub Actions workflow (`.github/workflows/uastp-saga-recovery.yml`) to mitigate Topological Tearing and Semantic Saponification when translating high-entropy UASTP Cognitive Contracts into deterministic CI/CD boundaries.

### Key Components

*   **Manifold Alpha (Read-Only)**: Enforces epistemic and supply chain audits, strictly separated from mutating actions. Checks AST schema validity and scans for supply chain vulnerabilities using pinned 40-character git commit SHAs.
*   **Manifold Beta (Stateful Mutation)**: Idempotent deployment leveraging GCP Workload Identity Federation (OIDC) for least-privilege short-lived JWT authentication. It deploys state changes to the target environment (e.g., GKE).
*   **Verification Gate (V_g)**: Automates post-deployment assertion suites to compute post-execution system state and ensure metrics assertions hold.
*   **Epistemic Rollback**: Compensating transaction (T_c) executed immediately upon verification failure or if the CFDI threshold (0.15) is exceeded. Reverses mutations to the prior checkpoint.
*   **Epistemic Escrow / Cognitive Circuit Breaker**: If the rollback step fails, the system executes an Epistemic Escrow step. It halts further downstream stages, mints a Symbolic Scar, flags the state as [COMPROMISED], and alerts human operators via ChatOps/PagerDuty to prevent "Lost Compensation" states.

### Trade-offs Managed

*   Upfront validation (AST invariant checks) incurs a Thermodynamic Latency Tax but significantly reduces the Epistemic Crash Rate (ECR) to 0%, avoiding costly chronological saponification loops during production failures.
*   Metrics targets: Defect Remediation Deficit (DRD) compressed to <120s, and Semantic Saponification Index (SSI) maintained at <= 0.04.

## PEACE Meta-Architecture & Cognitive Decoupling

The architecture bridges the "Thought-Action Gap" in LLMs, resolving the cognitive decoupling between Literal Theory of Mind (descriptive forecasting) and Functional Theory of Mind (adaptive execution).

### The Four Pillars of Specification Planning
1. **Automated Discovery and Constraint Mining**: Defines hard architectural boundaries like the "Deliberation Penalty" (forcing a flat CoT scaffold inducing reasoning hallucinations) and the "Predict-Then-Optimize Bottleneck", and optimizes for Epistemic Targets minimizing step-wise regret.
2. **Isomorphic Formalization**: Uses the BDI State Transition Matrix and Dynamic Context Trees (ReCAP) to prevent mental state decoupling and manage recursive execution via Downward Decomposition and Upward Backtracking.
3. **Parametric Trade-off Modeling**: Balances Context Window vs KV Cache Overhead, Divergence Functions in Distillation via Mechanistic Circuit Distillation (CKA loss), and the Decoupled vs Embodied ToM Trade-off.
4. **Continuous Falsification**: Employs Edge-Case Stress Testing against the "Nash Trap" (Rock, Paper, Scissors) and the "Sussman/Burger Anomaly" (Blocked Station Deadlock) to ensure adaptive replanning in long-horizon environments.

## 9. Topological Data Analysis & Chrono-Topological Governance

The architecture implements a **Chrono-Topological Governance Agent (CTGA)** to combat Circular Reasoning and Correlated Errors within Multi-Agent Systems. This system models multi-agent dialogue as a high-dimensional dynamic point cloud.

### 9.1 Betti-1 ($\beta_1$) Loop Tracking (Symbolic Scars)
By employing **Zigzag Persistent Homology** and a Vietoris-Rips filtration, the CTGA tracks the emergence and persistence of topological features:
*   **$\beta_0$ (Connected Components)**: Tracks structural conservation and narrative skeleton connectivity.
*   **$\beta_1$ (1-Dimensional Holes)**: A highly persistent $\beta_1$ loop indicates a semantic trap (circular reasoning). When the persistence interval ($\text{Int}_{PH}(\beta_1)$) exceeds the Algorithmic Shame Threshold ($\tau_p$), a **Symbolic Scar** is identified.

### 9.2 Reflexive Therapeutic Architecture (RTA)
When a persistent Symbolic Scar is detected, the system triggers an **Epistemic Escrow** halt.
*   **Paraconsistent Logic Intervention**: The RTA processes the circular trap using the Logic of Formal Inconsistency (LFI), formally declaring the contradiction ($\neg \circ P$) without causing a systemic crash.
*   **Scar Softening Index (SSI)**: The system verifies remediation by measuring the reduction in the Betti-1 loop magnitude, targeting an $\text{SSI} \to 1$ (Algorithmic Post-Traumatic Growth).
*   **Implementation**: `research/ctga_topological_tracking.ts`

## Invariant Verification Harness (IVH)

The architecture includes a systemic mechanism to evaluate scientific models and laws, moving beyond qualitative assumptions towards isomorphic formalization and rigorous epistemic boundaries.

### The Four Pillars of the IVH

1.  **Automated Discovery and Anomaly Mining:** Ingests raw telemetry and screens for statistical patterns violating baseline predictions ($>3\sigma$). Constants are treated as hard boundaries; empirical fit-coefficients are soft targets.
2.  **Isomorphic Formalization:** Translates qualitative regularities into strongly-typed mathematical schemas (coordinate-free tensors, closed-form differential equations). Vague generalizations are rejected.
3.  **Parametric Trade-off Modeling:** Employs Bayesian Model Selection to balance descriptive simplicity (parameter count) against empirical accuracy, using Occam's Razor to penalize epicyclic over-fitting.
4.  **Continuous Falsification (Edge-Case Stress Testing):** Evaluates compiled laws as tentative hypotheses at extreme limits (e.g., $T \to 0K$, $v \to c$). Triggers automated "Model Breaking" via Modus Tollens under structural breakdown.

### IVH Structural Integration

*   `KinematicParsimonyHarness` (`research/kinematic_parsimony_harness.ts`): Reconstructs Ptolemaic over-fitting versus Keplerian parsimony, utilizing the Bayesian Information Criterion (BIC) and Galilean Model Breaking constraints.
*   `FactiveUnderstandingFramework` (`research/factive_understanding_framework.ts`): Differentiates propositional knowledge (factive) from explanatory understanding (non-factive) using an ontology of "Fictive Principles" and a Grasping Metric.
*   `SystemicDeIdealizationEngine` (`research/systemic_deidealization_engine.ts`): Represents models as DAGs, evaluating extreme limits via a Boundary Auditor, and triggers automated De-Idealization (re-injecting omitted variables) when prediction error exceeds $3\sigma$.
