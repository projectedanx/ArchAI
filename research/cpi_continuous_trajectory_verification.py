from typing import Dict, List, Tuple, Any, Optional

class CausalState:
    def __init__(self, fluents: Dict[str, int]):
        self.fluents = fluents

    def satisfies(self, conditions: Dict[str, int]) -> bool:
        for key, val in conditions.items():
            if self.fluents.get(key) != val:
                return False
        return True

    def __str__(self):
        return str(self.fluents)

class Action:
    def __init__(self, pre: Dict[str, int], eff: Dict[str, int]):
        self.pre = pre
        self.eff = eff
        self.vars = set(eff.keys())

class SymbolicScar:
    def __init__(self, violation_type: str, details: Dict[str, Any]):
        self.violation_type = violation_type
        self.details = details

class SystemAssuranceAgent:
    """
    Asynchronous System Assurance Agent (SAA) for calculating real-time
    Causal Path Integrity (CPI) over a continuous trajectory.
    """
    def __init__(self, threshold: float = 0.95, viscosity: float = 1.0, delta: float = 0.5):
        self.threshold = threshold
        self.viscosity = viscosity
        self.delta = delta
        self.scar_archive: List[SymbolicScar] = []

    def frame_operator(self, s_k: CausalState, s_k1: CausalState, a_k: Action) -> bool:
        """
        Ensures any fluent variable not explicitly modified by the action's
        effects remains invariant between state transitions.
        """
        for key in s_k.fluents:
            if key not in a_k.vars:
                if s_k.fluents[key] != s_k1.fluents.get(key):
                    return False
        return True

    def calculate_cpi(self, trace: List[Tuple[CausalState, Optional[Action]]]) -> float:
        """
        Calculates the Causal Path Integrity (CPI) score over a discrete trace.
        trace: list of tuples (state, action). The last tuple is (s_N, None).
        """
        N = len(trace)
        if N <= 1:
            return 1.0

        valid_transitions = 0
        for k in range(N - 1):
            s_k, a_k = trace[k]
            s_k1, _ = trace[k+1]

            if not a_k:
                continue

            # I(s_k |= Pre(a_k) ^ s_k+1 |= Eff(a_k) ^ Frame(s_k, s_k+1, a_k))
            pre_satisfied = s_k.satisfies(a_k.pre)
            eff_applied = s_k1.satisfies(a_k.eff)
            frame_maintained = self.frame_operator(s_k, s_k1, a_k)

            if pre_satisfied and eff_applied and frame_maintained:
                valid_transitions += 1

        return valid_transitions / (N - 1)

    def check_lipschitz_bound(self, f_constraint: float, delta_t: float) -> Tuple[bool, float]:
        """
        Enforces Lipschitz continuity bound on the latent trajectory to prevent
        Chronotopological Drift.
        L = ||f_constraint|| / mu
        ||S_t+1 - S_t|| <= L * delta_t < delta
        """
        L = f_constraint / self.viscosity
        max_displacement = L * delta_t
        is_safe = max_displacement < self.delta
        return is_safe, max_displacement

    def evaluate_trace(self, trace: List[Tuple[CausalState, Optional[Action]]]) -> bool:
        """
        Evaluates the full trace against the CPI threshold. Logs Symbolic Scars on failure.
        """
        cpi_score = self.calculate_cpi(trace)

        if cpi_score < self.threshold:
            scar = SymbolicScar(
                violation_type="CPI_THRESHOLD_BREACH",
                details={"score": cpi_score, "threshold": self.threshold, "trace_length": len(trace)}
            )
            self.scar_archive.append(scar)
            return False

        return True
