# Parametric Trade-off Analysis of TDD Loop Convergence vs. Multi-Model Cascade Latency

## Domain: High-Performance AI Platform Engineering
**Goal:** Map the parametric frontier between TDD Loop Convergence, Model Size, and Token-Latency Overheads.

---

### 1. Multi-Model Cascade Tuning

A homogeneous architecture (using a single large model for all tasks) is computationally inefficient. A cascading architecture distributes cognitive load based on the complexity of the task phase within the TDD loop.

*   **Phase 1: Planning & Architecture (High Cognitive Load):**
    *   **Model:** Gemini 3 Pro (with high `thinking_level`).
    *   **Task:** Parses the user intent, defines the Red Phase test constraints, and sets up the structural plan.
    *   **Cost/Latency:** High token cost, high latency. Acceptable because it occurs once per ticket.
*   **Phase 2: Iterative Implementer (ReAct Green Phase - Low Cognitive Load, High Frequency):**
    *   **Model:** Gemini 2.5 Flash.
    *   **Task:** Generates syntax patches and reacts to the sanitized test runner logs.
    *   **Cost/Latency:** Low token cost, low latency. Necessary for rapid iterations (e.g., 5-15 loops to reach green).

**Cost-Optimization Frontier (Conceptual Equation):**
$$ C_{total} = \left( \lambda_{plan} \cdot \theta_{pro} \right) + \sum_{i=1}^{k} \left( \lambda_{iter_i} \cdot \theta_{flash} \right) $$
Where $C_{total}$ is total cost, $\lambda_{plan}$ is token volume for planning, $\theta_{pro}$ is the cost-per-token of the Pro model, $k$ is the number of ReAct loops, and $\theta_{flash}$ is the cost-per-token of the Flash model.

### 2. The "Doom Loop" Breaking Threshold ($k_{max}$)

Unbounded agent loops can spiral into "Doom Loops" where the model repeatedly tries and fails to fix a problem, consuming massive token budgets.

**Mathematical Derivation of $k_{max}$:**
Let $P(success | k)$ be the probability of reaching a passing test on iteration $k$. Empirical data (e.g., AndroidBuildBench) suggests $P(success | k)$ decays exponentially after a certain threshold.

We define the Expected Marginal Utility (EMU) of iteration $k$:
$$ EMU_k = P(success | k) \cdot V_{solve} - C_k $$
Where $V_{solve}$ is the value of a solved ticket and $C_k$ is the token cost of iteration $k$.

When $EMU_k < 0$, the loop must be broken. Based on SWE-Bench Verified data, successful repairs average 10.6 turns, while failures spin to token exhaustion.
We set the hard threshold: **$k_{max} = 10$**. If iteration 10 fails, the system triggers the Epistemic Escrow halt, saving roughly 3M tokens per failure event.

### 3. Context Compression & State Retention (The Sliding Window)

As the TDD loop iterates, the context window fills with repetitive compiler errors. If the token count exceeds $C_{max}$ (e.g., 300K), critical global instructions (e.g., from `GEMINI.md`) may be pushed out of the model's active attention span (Context Rot).

**State-Pruning Algorithm:**
```python
def prune_context(history: List[Message], max_tokens: int = 300000) -> List[Message]:
    """
    Ensures global rules are anchored while compressing execution logs.
    """
    anchored_rules = history[0] # Always retain system prompt & GEMINI.md

    # Calculate current usage
    current_tokens = sum(count_tokens(msg) for msg in history)

    if current_tokens < max_tokens:
        return history

    # Isolate execution logs (skip the first rule message and the last 3 active turns)
    middle_logs = history[1:-3]
    active_window = history[-3:]

    # Apply LLM-based summarization to the middle logs to preserve symbolic scars
    compressed_middle = summarize_logs(middle_logs, target_ratio=0.1)

    return [anchored_rules, compressed_middle] + active_window
```
This ensures the agent retains the *lessons* of past failures (Symbolic Scars) without the token weight of the raw stack traces.
