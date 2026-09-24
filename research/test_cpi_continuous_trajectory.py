import unittest
import math
from typing import List, Tuple
from cpi_continuous_trajectory_verification import SystemAssuranceAgent, CausalState, Action

class TestSystemAssuranceAgent(unittest.TestCase):
    def setUp(self):
        self.saa = SystemAssuranceAgent(threshold=0.95, viscosity=1.5, delta=0.5)

    def test_cpi_calculation_valid_trace(self):
        # Create a valid trace where preconditions match effects and frame rules are respected
        s1 = CausalState({"cam": 1, "door": 0})
        a1 = Action(pre={"cam": 1}, eff={"door": 1})
        s2 = CausalState({"cam": 1, "door": 1})
        a2 = Action(pre={"door": 1}, eff={"cam": 0})
        s3 = CausalState({"cam": 0, "door": 1})

        trace = [(s1, a1), (s2, a2), (s3, None)]
        cpi = self.saa.calculate_cpi(trace)
        self.assertGreaterEqual(cpi, 0.95)

    def test_cpi_calculation_invalid_trace(self):
        # Create an invalid trace with a causal contradiction
        s1 = CausalState({"cam": 1})
        a1 = Action(pre={"cam": 1}, eff={"cam": 0})
        s2 = CausalState({"cam": 0})
        a2 = Action(pre={"cam": 1}, eff={"door": 1}) # Contradiction: requires cam=1 but cam is 0
        s3 = CausalState({"cam": 0, "door": 1})

        trace = [(s1, a1), (s2, a2), (s3, None)]
        cpi = self.saa.calculate_cpi(trace)
        self.assertLess(cpi, 0.95)

    def test_lipschitz_boundary_enforcement(self):
        # Test that trajectory steps bounded by L = ||f_constraint|| / mu * delta_t don't exceed delta
        # Delta is set to 0.5. L = f / mu.
        # For f=1.0, mu=1.5, L = 0.66. If delta_t = 0.5, step size <= 0.33 < 0.5 (safe).
        is_safe, step_size = self.saa.check_lipschitz_bound(f_constraint=1.0, delta_t=0.5)
        self.assertTrue(is_safe)
        self.assertLess(step_size, self.saa.delta)

        # For f=3.0, mu=1.5, L = 2.0. If delta_t = 0.5, step size <= 1.0 > 0.5 (unsafe).
        is_safe_2, step_size_2 = self.saa.check_lipschitz_bound(f_constraint=3.0, delta_t=0.5)
        self.assertFalse(is_safe_2)
        self.assertGreater(step_size_2, self.saa.delta)

    def test_symbolic_scar_logging(self):
        # Violating CPI should trigger symbolic scar logging
        s1 = CausalState({"cam": 1})
        a1 = Action(pre={"cam": 1}, eff={"cam": 0})
        s2 = CausalState({"cam": 0})
        a2 = Action(pre={"cam": 1}, eff={"door": 1})
        s3 = CausalState({"cam": 0, "door": 1})

        trace = [(s1, a1), (s2, a2), (s3, None)]
        self.saa.evaluate_trace(trace)
        self.assertGreater(len(self.saa.scar_archive), 0)
        self.assertEqual(self.saa.scar_archive[0].violation_type, "CPI_THRESHOLD_BREACH")

if __name__ == '__main__':
    unittest.main()
