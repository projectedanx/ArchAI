# ADR-016: Action-Alignment Loss for Causal Policy Binding

## 1. Context and Problem Statement
In sequential multi-agent games, a critical divergence emerges between an agent's predictive capabilities (Literal Theory of Mind, Head A) and its strategic execution (Functional Theory of Mind, Head B). This "thought-action gap" manifests when an agent accurately predicts a predictable or biased opponent but fails to exploit them, defaulting instead to unexploitative, high-entropy Nash equilibria.

The core issue stems from standard Cross-Entropy training, which maximizes next-token prediction accuracy but does not causally bind the agent's policy to those predictions, leading to behavioral-predictive decoupling and high variance in policy gradients against non-stationary opponents.

## 2. Decision
We will implement a differentiable **Action-Alignment Loss** ($\mathcal{L}_{\text{Align}}$) as a bounded regret objective to bridge this gap. This module mathematically forces the agent's policy (Head B) to match the optimal Best Response derived from its prediction of the opponent's strategy (Head A).

## 3. Mathematical Formalization (Regret Minimization)
The Action-Alignment Loss is defined as the distance between the expected utility of the selected policy and the optimal Best Response:

*   **Opponent's Predicted Policy (Head A):** $\hat{p} = \text{Softmax}(\mathbf{z}^{-i})$
*   **Focal Agent's Policy (Head B):** $p = \text{Softmax}(\mathbf{z}^i)$
*   **Expected Action Utilities:** $E(a^i) = [U \hat{p}]_{a^i}$
*   **Expected Policy Utility:** $\mathbb{E}_{p, \hat{p}}[U] = p^T U \hat{p}$
*   **Oracle Best Response (Hard):** $V^*(\hat{p}) = \max_{j} [U \hat{p}]_j$

### 3.1 Parametric Trade-off Modeling
To ensure dense gradient flow and prevent optimization instability caused by the sparse subgradients of the hard `max` operator, we implement the **Boltzmann Best-Response Approximation** using LogSumExp:

$$V^*_{\tau}(\hat{p}) = \tau \log \sum_{j} \exp\left(\frac{[U \hat{p}]_j}{\tau}\right)$$

where $\tau > 0$ is a temperature parameter that balances precision (low $\tau$) with smooth gradient exploration (high $\tau$).

## 4. Consequences
- **Positive:** Mathematically eliminates unexploitative Nash equilibrium basins, enforcing optimal exploitation of biased opponents.
- **Positive:** Restores smooth gradient flow across all possible actions via the Boltzmann approximation.
- **Negative:** Introduces additional computational overhead during the forward/backward pass for computing expected utilities and LogSumExp.
- **Negative:** Requires an explicit, differentiable payoff matrix ($U$) defining the utility topology of the game space.

## 5. Implementation Status
The `ActionAlignmentLoss` PyTorch module is implemented and verified under `research/action_alignment_loss.py`.
