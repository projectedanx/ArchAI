from typing import List

class TensionMetric:
    def __init__(self, cch: float, csd: float):
        self.cch = cch
        self.csd = csd
        self.ratio = cch / csd if csd > 0 else float('inf')

class HeisenbergAuditController:
    """
    Parametric model for tuning the Heisenberg Limit of Auditing in Multi-Agent Consensus Networks.
    Balances Cost of Coherence Overhead (CCH) against Cost of Structural Discovery (CSD).
    """
    def __init__(self, cpi_threshold: float = 0.95, base_cfdi_threshold: float = 0.42):
        self.cpi_threshold = cpi_threshold
        self.base_cfdi_threshold = base_cfdi_threshold
        self.current_cfdi_threshold = base_cfdi_threshold
        self.tension_state: TensionMetric = TensionMetric(1.0, 1.0)

        self.all_tools = [
            "fast_heuristic_check",
            "semantic_drift_monitor",
            "deep_symbolic_z3_solver",
            "full_ast_recompilation"
        ]

    def calculate_cch(self, verification_depth: int, tokens: int) -> float:
        """
        Calculates Cost of Coherence Overhead (CCH)
        CCH ∝ Verification Depth x Tokens
        """
        return float(verification_depth * tokens)

    def calculate_csd(self, temperature: float, variance: float) -> float:
        """
        Calculates Cost of Structural Discovery (CSD)
        CSD ∝ Temperature x Variance
        """
        return float(temperature * variance)

    def calculate_tension(self, cch: float, csd: float) -> float:
        """
        Returns the Tension Metric (Novelty vs. Grounding)
        """
        return cch / csd if csd > 0 else float('inf')

    def update_tension_state(self, cch: float, csd: float):
        """
        Dynamically adjusts internal thresholds based on current CCH/CSD tension.
        """
        self.tension_state = TensionMetric(cch, csd)

        # If Tension is low (high CSD, low CCH -> High Novelty), we need to tighten the CFDI
        # threshold to ensure we don't drift completely out of bounds.
        # If Tension is high (high CCH, low CSD -> High Coherence), we can relax the CFDI
        # threshold slightly to allow for more structural discovery without halting.

        # Baseline ratio is arbitrary for this implementation, let's use 1000 as pivot
        pivot = 1000.0

        if self.tension_state.ratio < pivot:
            # High novelty mode, tighten constraints
            self.current_cfdi_threshold = self.base_cfdi_threshold * (self.tension_state.ratio / pivot)
            # Ensure it doesn't go below a hard floor
            self.current_cfdi_threshold = max(0.10, self.current_cfdi_threshold)
        else:
            # High coherence mode, relax constraints
            relaxation_factor = min(1.5, self.tension_state.ratio / pivot)
            self.current_cfdi_threshold = self.base_cfdi_threshold * relaxation_factor

    def get_active_tools(self) -> List[str]:
        """
        Dynamically registers agent-tools based on the tension metric to preserve context window limits.
        """
        active_tools = ["fast_heuristic_check"] # Always active

        if self.tension_state.ratio > 500:
            active_tools.append("semantic_drift_monitor")

        if self.tension_state.ratio > 5000:
            active_tools.append("deep_symbolic_z3_solver")
            active_tools.append("full_ast_recompilation")

        return active_tools
