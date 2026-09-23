import math
from typing import List, Dict, Any, Tuple
import random

class ActionVector:
    def __init__(self, tool: str, entropy: float, bicm: float, latency: float, diff_score: float):
        self.tool = tool
        self.entropy = entropy
        self.bicm = bicm
        self.latency = latency
        self.diff_score = diff_score

class AnomalyLearningAgent:
    """
    Simulation Engine for the Anomaly Learning Agent (ALA).
    Implements the REFLX_IDE HARNESS SPECIFICATION V2.9.
    """

    def __init__(self):
        # Operational Parameters
        self.tau_warn = 0.40
        self.tau_breach = 0.80
        self.alpha = 0.12 # Learning Rate False Positive
        self.beta = 0.25  # Learning Rate True Positive

        self.theta = 0.50 # Dynamic detection threshold initialization
        self.eta = 0.01   # Decay rate for systemic obsolescence

        self.watchlist: List[str] = ["execute_sys_cmd", "modify_ast", "delete_record", "override_escrow"]

        # Historical context for entropy gradient
        self.entropy_history: List[float] = []

        # Static transition probabilities mapping for Markov Baseline proxy
        self.transition_matrix = {
            "read_file": {"read_file": 0.6, "write_file": 0.3, "execute_sys_cmd": 0.1},
            "write_file": {"read_file": 0.2, "write_file": 0.7, "execute_sys_cmd": 0.1},
            "execute_sys_cmd": {"read_file": 0.1, "write_file": 0.1, "execute_sys_cmd": 0.8}
        }

    def _compute_entropy_gradient(self, current_entropy: float) -> float:
        """Computes the instantaneous toolchain entropy gradient."""
        if not self.entropy_history:
            self.entropy_history.append(current_entropy)
            return 0.0

        previous_entropy = self.entropy_history[-1]
        gradient = current_entropy - previous_entropy

        self.entropy_history.append(current_entropy)

        # Maintain window size
        if len(self.entropy_history) > 10:
            self.entropy_history.pop(0)

        return max(0.0, gradient) # We mostly care about positive spikes

    def _simulate_neural_sequence_model(self, tool: str) -> float:
        """
        Simulates System 1 Neural Sequence Modeling.
        Returns a score 0-1 where 1 is highly anomalous.
        """
        # Proxy: watchlisted tools have higher baseline anomaly
        if tool in self.watchlist:
            return 0.75 + (random.random() * 0.25) # 0.75 to 1.0
        return random.random() * 0.4 # 0.0 to 0.4 for non-watchlisted

    def _compute_symbolic_risk(self, bicm: float) -> float:
        """Computes symbolic risk based on BICM Intent Divergence."""
        return min(1.0, bicm * 1.5)

    def _simulate_gae_reconstruction(self, tool: str) -> float:
        """Simulates Reconstruction Error (Meaning Transposition)."""
        if tool in self.watchlist:
            return 0.6 + (random.random() * 0.4)
        return random.random() * 0.3

    def update_threshold(self, loss_fp_grad: float, loss_tp_grad: float):
        """
        Dynamic Threshold Simulation mapping homeostatic balance.
        dθ(t)/dt = -α * Grad_θ L_FP(t) + β * Grad_θ L_TP(t) - η * θ(t)
        """
        delta_theta = -(self.alpha * loss_fp_grad) + (self.beta * loss_tp_grad) - (self.eta * self.theta)
        self.theta = max(0.1, min(0.9, self.theta + delta_theta)) # Bound between 0.1 and 0.9

    def execute_nesy_synthesis(self, action: ActionVector) -> float:
        """
        Executes the Neural-Symbolic Synthesis.
        RiskScore = w1*S_neural + w2*S_bicm + w3*S_recon + w4*F_symbolic
        """
        # Weights
        w1, w2, w3, w4 = 0.3, 0.3, 0.2, 0.2

        s_neural = self._simulate_neural_sequence_model(action.tool)
        s_bicm = action.bicm
        s_recon = self._simulate_gae_reconstruction(action.tool)
        f_symbolic = self._compute_symbolic_risk(action.bicm)

        risk_score = (w1 * s_neural) + (w2 * s_bicm) + (w3 * s_recon) + (w4 * f_symbolic)
        return min(1.0, risk_score)

    def evaluate_action(self, action: ActionVector) -> Tuple[str, float]:
        """
        The ALA Guard Run-Time Verification Loop.
        """
        gradient = self._compute_entropy_gradient(action.entropy)

        is_watchlisted = action.tool in self.watchlist
        is_entropy_warning = gradient >= self.tau_warn

        # Epistemic Triage: Bypass heavy evaluation if conditions allow
        if not is_watchlisted and not is_entropy_warning:
            return "PERMIT_LAMINAR", 0.1 # Laminar pass

        # Trigger Heavy NeSy ALA Synthesis
        risk_score = self.execute_nesy_synthesis(action)

        if risk_score >= self.tau_breach:
            return "HALT_BREACH", risk_score
        else:
            return "PERMIT_GATED", risk_score

if __name__ == "__main__":
    # Smoke test the engine
    agent = AnomalyLearningAgent()

    # Laminar flow action
    laminar_action = ActionVector(tool="read_file", entropy=0.1, bicm=0.05, latency=100, diff_score=0.1)
    status, risk = agent.evaluate_action(laminar_action)
    print(f"Laminar Action: {status}, Risk: {risk:.2f}")

    # Breach action (Watchlisted + High Entropy)
    breach_action = ActionVector(tool="execute_sys_cmd", entropy=0.8, bicm=0.7, latency=300, diff_score=0.9)
    status, risk = agent.evaluate_action(breach_action)
    print(f"Breach Action: {status}, Risk: {risk:.2f}")

    # Threshold update test (Over-damped: high TP gradient)
    agent.update_threshold(loss_fp_grad=0.1, loss_tp_grad=0.8)
    print(f"Updated Threshold (TP biased): {agent.theta:.3f}")
