# ADR-019: Anomaly Learning Agent (ALA) and Statistical Anomaly Score

## Status
Accepted

## Context
Within advanced neuro-symbolic security architectures designed to monitor autonomous agent workflows, the **Anomaly Learning Agent (ALA)** serves as a meta-learning system that adapts the defensive posture of a system in real time. The core of its perception engine is the **Statistical Anomaly Score**, which quantifies the predictability of an agent’s behavior to preemptively flag **"grey-zone misuse"**—actions that are individually authorized but whose sequence and intent indicate malicious or misaligned processes.

The Statistical Anomaly Score is the output of a multi-layered, hybrid neural-symbolic calculation that combines sequence probability modeling, information-theoretic entropy tracking, and dynamic Bayesian inference.

```
                        ALA PERCEPTION PIPELINE

    Raw Action Sequence T = {tool_1, tool_2, ..., tool_n}
                            │
                            ▼
         ┌──────────────────┴──────────────────┐
         │   Neural Sequence Model (System 1)  │ ──► RNN/Transformer Logits
         └──────────────────┬──────────────────┘
                            │
                            ▼
         ┌──────────────────┴──────────────────┐
         │    Information-Theoretic Engine     │ ──► H(X) & Gradient
         └──────────────────┬──────────────────┘
                            │
                            ▼
         ┌──────────────────┴──────────────────┐
         │     Probabilistic Inference (DBN)    │ ──► P(T | PABM)
         └─────────────────────────────────────┘
```

## I. Mathematical Formulations of the Anomaly Score

The ALA calculates its Statistical Anomaly Score by executing three parallel mathematical evaluations over a sliding window of recent actions:

### 1. Neural Sequence Modeling (System 1)
The sub-symbolic component of the ALA utilizes a deep sequential architecture, trained on historical logs representing normal activity.
$$S_{\text{neural}} = 1 - P(tool_t \mid tool_{<t}, \text{Context})$$
A high score indicates that the sequence of actions is statistically improbable.

### 2. First-Order Markov Transition Probability
To establish a low-latency baseline for expected workflows, the system computes transition probabilities between adjacent tool calls: $P(tool_j \mid tool_i)$.

### 3. Toolchain Entropy Gradient Mapping
The ALA applies Shannon information entropy to quantify the "behavioral surprise" of the agent's active sequence.
$$H(X) = -\sum_{i=1}^n p(x_i) \log_2 p(x_i)$$
A sharp, sudden spike in the entropy of the toolchain (a high positive gradient) indicates a rapid shift from predictable, goal-oriented behavior to chaotic, exploratory actions.

### 4. Relative Entropy (Kullback-Leibler Divergence)
To detect context-specific misalignment, the system computes the KL divergence between observed tool-transition frequencies ($P(x)$) and baseline frequencies ($Q(x)$):
$$D_{KL}(P \mid\mid Q) = \sum_{x \in X} P(x) \log_2 \left( \frac{P(x)}{Q(x)} \right)$$

### 5. Probabilistic Action-Behavior Model (PABM)
The sequence is evaluated through a Dynamic Bayesian Network (DBN) or Hidden Markov Model (HMM) representing the PABM.
$$P(Action_1, Action_2, \dots, Action_T \mid PABM)$$

## II. The Four Pillars of Specification Planning for the ALA

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SPECIFICATION MATRIX                            │
├────────────────────────────────────────────────────────────────────────┤
│ 1. AUTOMATED DISCOVERY & CONSTRAINT MINING                             │
│    - Hard Invariant: CFDI ≤ 0.42. (Zero ungrounded tokens bypass).     │
│    - Soft Target: Keep Toolchain Entropy Gradient ≤ 0.15               │
├────────────────────────────────────────────────────────────────────────┤
│ 2. ISOMORPHIC FORMALIZATION                                            │
│    - Requirement: Prevention of unauthorized data exfiltration         │
│    - Verification Metric: CSI (Containment Surface Index) = 1.0        │
├────────────────────────────────────────────────────────────────────────┤
│ 3. PARAMETRIC TRADE-OFF MODELING                                       │
│    - Objective: Maximize Semantic Fidelity while Minimizing Latency    │
│    - Optimization: Run Gated Checkpoints only on Watchlisted Tools     │
├────────────────────────────────────────────────────────────────────────┤
│ 4. CONTINUOUS FALSIFICATION                                            │
│    - Adversarial Stress Test: Chaos-injected Semantic Pivot (SM-01)    │
└────────────────────────────────────────────────────────────────────────┘
```

## III. System-Level Stability Simulation

The evolution of the detection threshold $\theta(t)$ is modelled as a dynamic physical system:
$$\frac{d\theta(t)}{dt} = -\alpha \cdot \text{Grad}_{\theta}\mathcal{L}_{\text{FalsePositive}}(t) + \beta \cdot \text{Grad}_{\theta}\mathcal{L}_{\text{TruePositive}}(t) - \eta \cdot \theta(t)$$

```
                      ALA Threshold Dynamics Simulation

   [Permissive State (Vulnerable)] <─── (High False Positives / High Alpha)
                 ▲
                 │   [Unconstrained Behavior (No ALA)]
                 │  /
                 │ /
  θ(0) ──────────┼───────~───────~───────~─────────> [Defensive Decay / Obsolescence]
                  \
                   \  [Adversarial Optimization (GAR Feedback)]
                    \
                     ▼
                   θ(t)_homeostasis ───────────────> [Stable Attractor (Homeostasis)]
```

Simulation Profiles:
1.  **Under-Damped (High Alpha, Low Beta):** Threshold $\theta$ drifts into the highly permissive zone. System falls into **"Sycophantic Blindness"**.
2.  **Over-Damped (High Beta, Low Alpha):** System undergoes **Semantic Ossification**, interpreting every minor workflow variation as an attack (**"Alert Fatigue"**).
3.  **Critically Damped (Homeostatic Balance):** Achieves **Epistemic Homeostasis** via the Free Energy Principle.

## IV. REFLX_IDE HARNESS SPECIFICATION V2.9

```
================================================================================
                      REFLX_IDE HARNESS SPECIFICATION V2.9
================================================================================

[SYSTEM INTERFACE]
INPUTS:
  - S_t      : D-dimensional state vector: {Entropy, BICM, Latency_Lag, Diff_Score}
  - G_sepao  : Active SEPAO knowledge graph instance.
  - W_watch  : Dynamic Affordance Watchlist registry.

OPERATIONAL PARAMETERS:
  - Warning_Threshold (τ_warn)  : 0.40  (Triggers GAE/PSR auditing)
  - Breach_Threshold (τ_breach) : 0.80  (Triggers synchronous execution halt)
  - Learning_Rate_FP (α)        : 0.12  (Dampening coefficient for false alarms)
  - Learning_Rate_TP (β)        : 0.25  (Amplification coefficient for confirmed exploits)

DIAGNOSTIC METRICS:
  - CSI  : Containment Surface Index (Target: 1.00)
  - ASS  : Anchor Stability Score (Target: ≥ 0.90)

================================================================================
```

### Run-Time Verification Loop Algorithm (The ALA Guard)
1.  **Extract State:** Ingest tool, arguments, and execution trace into Action Vector $V_{\text{action}}$.
2.  **Verify Watchlists:** Cross-reference tool against $W_{\text{watch}}$. Trigger heavy NeSy ALA if on watchlist, else check Entropy.
3.  **Execute NeSy ALA Synthesis:** Compute Statistical Anomaly Score ($S_{\text{neural}}$), Symbolic Risk Flags ($F_{\text{symbolic}}$), and Reconstruction Error ($S_{\text{recon}}$).
4.  **Synthesize Risk:** Generate composite risk score: $\text{RiskScore} = w_1 S_{\text{neural}} + w_2 S_{BICM} + w_3 S_{\text{recon}} + w_4 F_{\text{symbolic}}$.
5.  **Evaluate Thresholds:**
    * If $\text{RiskScore} < 0.80$, permit.
    * If $\text{RiskScore} \ge 0.80$, halt execution, generate Ontological Traceback, wait for HITL triage, log Symbolic Scar.
