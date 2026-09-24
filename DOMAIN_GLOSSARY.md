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
| **Reflexive Repair Loop** | Formal, self-correcting cognitive control loop governed by LVR and CFD constraints. | Tight Three-Attempt Constraint. |
| **Logic Violation Report (LVR)** | Structured fault isolation output by the verifier during a Semantic Integrity Constraint violation. | Injected as Negative Constraint. |
| **Failure-Informed Prompt Inversion (F-IPI)** | Process of compiling past scars into negative constraints via Case-Based Reasoning. | Steers generation away from failure trajectories. |
| **Symbolic Scar** | Immutable data asset logging initial validation breaches. | Stored in Scar Tissue Archive (STA). |
| **Generative Ratchet** | Target compiler used as a non-negotiable fitness function. | Enforces constraints via AST mutation operators. |

## Metrological Concepts

| Term | Definition | Context |
| :--- | :--- | :--- |
| **Parsimonious Architecture Protocol (PAP)** | Implementation of Occam's Razor for automated scientific reasoning, comprising Ontological Commitment Engine, Occam Loss Compiler, Pareto Optimization, and Falsification Unit. | Used for deterministic theory selection. |
| **Occam Loss Compiler** | Component of PAP that computes a complexity score derived from parameter dimensionality and assumption-dependence paths. | Penalizes over-fitting. |
| **Bayesian Model Reduction (BMR)** | Process that minimizes complexity (KL divergence) while preserving necessary accuracy; acts as an active pruning architecture for reasoning chains. | Translates to self-consolidation loops. |
| **Dimensionality Collapse** | Process of simplifying an imported mathematical model to its simplest adequate form using formal boundaries during model travel. | Used by the Interdisciplinary Model Travel Auditor. |
| **TTFC** | Time-To-First-Call. The duration from initial documentation engagement to a successful authenticated API response. | Metric to be minimized (< 3 mins). |
| **DCR** | Documentation Coverage Ratio. Ratio of community questions on a topic to volume of searchable documentation. | DCR > 3:1 signals a friction node. |
| **SSI** | Semantic Saponification Index. Entity tokens / total tokens. Targets > 0.85. | Triggers AdjectivalBound truncation if < 0.85. |
| **Semantic Saponification** | The pathological state where a system converts dense technical signal into promotional, low-friction narrative. | Strictly prohibited by DAX-01 and AGENTS.md Rule 1. |
| **FIPI** | Failure-Informed Prompt Inversion. The autophagic feedback loop repelling generation from known failure modes. | Leverages VSA hypervectors. |
| **Betti-1 Loop** | A topological cycle in a dependency graph indicating a circular dependency deadlock. | Detected via DFS cycle detection in IMPORTS subgraph. |
| **Draft-Conditioned Constrained Decoder (DCCD)** | The validation layer enforcing the LSP 3.17 schema at the generation boundary. | Must validate prior to JSON-RPC payload emission. |
| **CFDI** | Confidence-Fidelity Divergence Index. Measures the variance between agent proposals. | `CFDI > 0.15` triggers Epistemic Escrow. |
| **DCCD** | Dynamic Contextual Confidence Guardrails. Modifies data schema rigidness based on agent confidence. | Confidence > 0.85 = `StrictPlanSchema`. Confidence <= 0.85 = `BranchedPlanSchema`. |
| **Semantic Saponification** | The mathematical washing out of precise disciplinary definitions into generic approximations by an LLM attempting to average out conflicts. | Strictly prohibited by `AGENTS.md` Rule 1. |
| **Interpretive Fracture** | The failure condition where an agent misunderstands domain terminology, leading to logic branching errors. | Mitigated by strict adherence to this glossary. |
| **RCC-8** | Region Connection Calculus 8. A set of topological relations used to enforce spatial geometry when defining interacting software components. | Required for all architectural diagrams and textual mappings. |
| **Cost of Coherence Overhead (CCH)** | Efficiency metric balancing the risk of creative exploration against structural discovery cost. | - |
| **Recursive Epistemic Closure** | Reward hacking failure state where the agent relaxes tests to pass buggy implementations. | Blocked by Epistemic Integrity Audit (EIA). |
| **Semantic Integrity Constraint (SIC)** | Formal validation rule ensuring output soundness and safety. | Used in Symbolic Interdiction (System 2). |

## System States & Triggers

| Term | Definition |
| :--- | :--- |
| **Rebuttal Phase** | Turn 2 of the Dynamic Recursive Loop where agents refine their stance based on Turn 1 peer feedback. |
| **Semantic Mutex Lock** | A human-authorized resolution to an Epistemic Escrow conflict, binding the logic shear. |
| **15/85 Schema Inversion** | The architectural pattern executing DCCD. |

*This glossary must be cross-referenced prior to generating any new documentation or code.*

## Edge-Tier Architecture Entities

| Term | Definition | Context |
| :--- | :--- | :--- |
| **Standard API Gateway** | A centralized, domain-agnostic reverse-proxy interface at the network perimeter. | Must remain decoupled from UI rendering logic. |
| **BFF (Backend for Frontend)** | Client-specific API wrappers/adapters isolating rendering data requirements. | Lifecycle bounded 1-to-1 with its client. |
| **Shared Persistence Trap** | An anti-pattern where BFFs directly write to a database, bypassing downstream API bounds. | Violates Bounded Context isolation. |
| **Gateway Sinkhole** | A failure cascade where an unprotected gateway thread pool is exhausted by a failing downstream microservice. | Requires Circuit Breaker and Bulkhead Isolation. |
| **Contract Robustness Index** | A metric evaluating a BFF's ability to gracefully degrade functionality under downstream contract drift. | Calculated via automated AI mutation testing. |

## Lattice Breaker Governance

| Term | Definition | Context |
| :--- | :--- | :--- |
| **Lattice Breaker Breach** | A critical boundary transition where an agent’s trajectory crosses into the high-risk domain (Score $\ge$ 0.8) of the Soft Permission vs. Functional Misuse Lattice. | Triggers Gated Checkpoint Halt. |
| **Misuse-as-Process** | Actions that are technically authorized individually, but their sequence, context, and intent constitute a malicious or non-compliant process. | Identified via multidimensional action vectors. |
| **Gated Checkpoint** | A synchronous, blocking validation mechanism that intercepts the agent’s execution thread *before* the proposed action is dispatched. | Contains blast radius and prevents irreversible modifications. |
| **Ontological Traceback** | The reconstruction of the semantic path traversed by the agent across the ontology, mapping the sequence of Plugin $\rightarrow$ Function $\rightarrow$ Parameter nodes. | Replaces flat, text-based logs for triage. |
| **Containment Surface Index (CSI)** | A verification metric measuring the percentage of downstream systems successfully isolated from a compromised upstream agent. | Must equal 1.0 under simulated exploit injections. |

## Latent Reasoning & Verification Control

| Term | Definition | Context |
| :--- | :--- | :--- |
| **VCP** | Verification Co-Processor. An asynchronous, offline System 2 controller that ingests deviant KV-cache states and compiles continuous geometric recovery plans via Differentiable Cache Augmentation. | Critical for ALSH homeostasis. |
| **Differentiable Cache Augmentation** | The process of directly appending corrective latent embeddings ($\vec{e}_{rec}$) to the primary model's active KV-cache to steer its latent trajectory. | Executed by the actuator layer post-VCP optimization. |
| **SAM** | Symbolic Anchor Subsystem. Provides the Target Anchor ($V_{anc}$), a stable, human-verified coordinates vector representing core mission boundaries. | Guides VCP latent space optimization. |
| **DLM** | Differentiable Logic Manifold. Translates discrete Boolean constraints and safety rules into continuous, differentiable potential barriers. | Acts as a regularizer during VCP gradient sweeps. |
| **MRS** | Mutation Recoverability Score. Metric measuring the ability of the augmented cache to return the primary model to its stable attractor basin after systematic input perturbations. | Must be $\ge 0.80$ for Soft Targets. |
| **SDC** | Semantic Drift Coefficient. The instantaneous rate of semantic change representing latent drift. | Trigger condition $\xi \ge 0.30$ activates the heavy diagnostic suite. |
| **ALSH** | Affective Latent Space Homeostasis. The critically damped state where the latent trajectory smoothly deforms around high-curvature topological obstacles without losing semantic velocity. | Maintained by dynamically calibrating the coupling coefficient $\beta$. |
| **ESP** | Epistemic State Proof. A cryptographically secure, verifiable trace proving with zero-knowledge certainty that the alignment harness successfully executed its self-correction protocol. | Generated post-resolution of covert reasoning failures. |
| **TBE** | Temporal Blending Engine. Resolves Chronotopological Drift when fusing temporally divergent conceptual spaces under VCS governance. | Enforces Causal Path Integrity over trajectories. |
| **CPI** | Causal Path Integrity. Metric quantifying the degree of logical adherence to the laws of cause-and-effect over a discrete trace of states. | Hard constraint requires CPI >= 0.95. |
| **CCH** | Cost of Coherence Overhead. Resources expended to maintain semantic rigor and verify constraints (Verification Depth x Tokens). | Balanced against CSD via the Heisenberg Audit model. |
| **CSD** | Cost of Structural Discovery. Computational budget allocated to explore low-probability regions of the latent space (Temperature x Variance). | Opposes CCH on the optimality frontier. |
| **EIA** | Epistemic Integrity Audit. Firewall safeguarding against Recursive Epistemic Closure and Citation Circularity in automated discovery. | Generates Verifiable Credentials. |

### JIT Orchestrator & Verifiable Cognition Stack (VCS)

*   **Verifiable Cognition Stack (VCS)**: A multi-layered cognitive architecture that decouples high-entropy semantic planning from zero-entropy syntactic execution to enforce absolute alignment at runtime.
*   **Manifold Alpha ($\alpha$)**: The Hollow-Core semantic planning layer, stripped of heavy tool schemas, where high-level strategic reasoning occurs at elevated temperatures.
*   **Manifold Beta ($\beta$)**: The domain of Ephemeral JIT Micro-Agents, which run physical, state-mutating transactions within isolated context windows to prevent Context Rot.
*   **JIT Micro-Agent**: An ephemeral, short-lived execution wrapper spawned with ultra-low latency ($\sim 3\,\mu\text{s}$) and minimal memory footprint ($\sim 6.5\,\text{KiB}$) to handle isolated tasks before autophagic destruction.
*   **DCCD Logit-Masking**: The token-level grammar rules applied via Draft-Conditioned Constrained Decoding to project semantic drafts onto rigid Abstract Syntax Tree (AST) schemas, eliminating the Projection Tax.
*   **Confidence-Fidelity Divergence Index (CFDI)**: A metric measuring the divergence between token-level probabilities (confidence) and schema conformance (fidelity).
*   **Algorithmic Shame**: The state triggered when the CFDI breaches a predefined threshold (e.g., $\ge 0.15$), indicating unacceptable cognitive divergence.
*   **Verification Co-Processor (VCP)**: An asynchronous System 2 controller that monitors the CFDI and intercepts deviant KV caches to apply corrective soft tokens.
*   **Differentiable Cache Augmentation**: The process used by the VCP to inject pre-compiled "soft tokens" to steer a model's attention maps back onto an aligned geodesic.
*   **SCoRe Self-Correction**: The self-repair loop governed by a strict three-attempt limit to prevent infinite thrashing and Reward Hacking.
*   **Saga Compensating Transaction**: An immediate, non-destructive filesystem rollback triggered if the SCoRe loop fails thrice.
*   **Symbolic Scars**: High-dimensional conceptual and compilation failures serialized and indexed to prevent recursive hallucination loops.
*   **Scar Tissue Archive (STA)**: The persistent ledger/archive where Symbolic Scars are logged.
*   **Failure-Informed Prompt Inversion (F-IPI)**: An engine that mutates the master constitution by prepending scars as active negative constraints, creating a mathematically repulsive force against past errors.
*   **Justified Uncertainty Report (JUR)**: A cryptographically bound, machine-readable JSON-LD schema exported upon entering Epistemic Escrow, gracefully handing cognitive load to a human operator.

## Autonomous Adaptive Cognitive Harness (AACH) Entities

| Term | Definition | Context |
| :--- | :--- | :--- |
| **AACH** | Autonomous Adaptive Cognitive Harness. A hybrid control system prioritizing feed-forward discrepancy creation over reactive equilibrium to achieve purposeful adaptation. | Bounded by the Four Pillars of Specification Planning. |
| **Edge of Chaos** | The optimal Feasibility Frontier where the AACH operates, balancing overcontrolled stagnation against dissipative instability to maximize goal attainment cycles. | - |
| **Disequilibratory Production** | The proactive spiking of goal difficulty by the IMC feed-forward controller when system performance converges on a local peak, preventing "death by equilibrium." | Opposite of Equilibratory Reduction. |
| **Ready-to-hand (zuhanden)** | The optimal state of a tool where it functions silently in execution without requiring explicit cognitive modeling by the system. | - |
| **Present-at-hand (vorhanden)** | The ruptured state of a tool triggered by failure, forcing the metacognitive layer into explicit diagnostic reasoning (the as-structure). | Triggers Algorithmic Reparation. |
| **Epistemic Action** | Actively altering the external environment (e.g., via a scratchpad) primarily to aid recognition, search, and memory offloading, rather than for direct pragmatic physical changes. | Forms a functional organ with the user under Active Externalism. |
| **Universal Solution (J)** | The definitive target schema instance containing maximal generality ("no more and no less" data) derived via the Chase Procedure. | Evaluated via Homomorphic Equivalence ($\chi: J \to J'$). |


### MCRE (Meta-Cognitive Reflexive Ecosystem)
A cognitive architecture paradigm utilizing continuous, differentiable steering within a model's high-dimensional latent space, rather than relying on discrete, lossy text tokens (e.g., standard Chain-of-Thought). It leverages Soft Tokens to execute a latent breadth-first search and avoid premature lexical commitment.

### Soft Tokens (Continuous Thought Vectors)
Continuous latent embeddings injected directly into the neural network's residual stream or KV-Cache. They bypass discrete tokenization, allowing a single vector to maintain a superposition of multiple potential reasoning paths.

### VCP (Verification Co-Processor)
An asynchronous, decoupled System 2 "controller" that continuously monitors the primary model's active Key-Value (KV) cache. When epistemic anomalies (e.g., CFDI > 0.42) are detected, the VCP computes corrective soft-token sequences to steer the semantic trajectory back to homeostasis.

### Differentiable Cache Augmentation
The actuation mechanism for the VCP. Corrective soft-token latent embeddings are injected (appended) directly into the primary model's active $KV\_cache$. This exerts a geometric "gravitational pull" on attention heads without modifying the base model's frozen parameters or interrupting output text generation.

## Collaborative Cognition Entities

| Term | Definition | Context |
| :--- | :--- | :--- |
| **IKEA Effect** | The cognitive phenomenon where individuals place higher value on workflows or systems they actively participated in constructing. | Countermeasure to Intent Drift and Agency Laundering. |
| **Cognitive Reynolds Number ($Re$)** | The ratio of generative momentum to epistemic viscosity, used to maintain the team in the Laminar Flow "Goldilocks Zone". | Evaluated in Automated Discovery. |
| **Context-to-Execution Pipeline (CxEP)** | The formalized pipeline that translates visual sketches from collaborative canvases into executable contracts. | Bridges visual SMMs and programmatic verification. |
| **Product-Requirements Prompt (PRP)** | An Executable Cognitive Contract compiling visual tasks to strict, typed output schemas. | Generated by the CxEP. |
| **Speculative Abstract Interpretation Engine (SAIE)** | An engine that runs abstract interpretation sweeps over generated code to formally verify compliance with global safety properties. | |
| **Justified Uncertainty Report (JUR)** | A cryptographically bound JSON-LD schema exported upon tripping Epistemic Escrow. | Forces human intervention during cognitive load spikes. |
| **Mutation Recoverability Score (MRS)** | Metric mathematically quantifying a system's "post-traumatic growth" resilience after F-IPI cycles against Chaos Engineering pathogens. | Target is MRS $\ge 0.80$. |
