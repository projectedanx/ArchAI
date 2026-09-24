import unittest
from heisenberg_audit_parametric_model import HeisenbergAuditController, TensionMetric

class TestHeisenbergAuditController(unittest.TestCase):
    def setUp(self):
        self.controller = HeisenbergAuditController(cpi_threshold=0.95, base_cfdi_threshold=0.42)

    def test_tension_metric_calculation(self):
        # Calculate tension: Cost of Coherence (CCH) vs Cost of Structural Discovery (CSD)
        cch = self.controller.calculate_cch(verification_depth=5, tokens=1000)
        csd = self.controller.calculate_csd(temperature=0.8, variance=1.5)

        self.assertEqual(cch, 5000)
        self.assertAlmostEqual(csd, 1.2)

        tension = self.controller.calculate_tension(cch, csd)
        self.assertAlmostEqual(tension, 5000 / 1.2)

    def test_dynamic_cfdi_tuning(self):
        # High CSD implies high novelty -> should tighten CFDI (lower threshold)
        cch = 1000
        csd = 5.0
        self.controller.update_tension_state(cch, csd)
        self.assertLess(self.controller.current_cfdi_threshold, self.controller.base_cfdi_threshold)

        # High CCH implies high coherence -> should loosen CFDI (higher threshold)
        cch = 10000
        csd = 0.5
        self.controller.update_tension_state(cch, csd)
        self.assertGreater(self.controller.current_cfdi_threshold, self.controller.base_cfdi_threshold)

    def test_agent_tool_registry_adjustment(self):
        # If tension metric (CCH/CSD) is extremely low (high novelty), heavy tools should be disabled
        self.controller.update_tension_state(cch=100, csd=10.0)
        tools = self.controller.get_active_tools()
        self.assertNotIn("deep_symbolic_z3_solver", tools)
        self.assertIn("fast_heuristic_check", tools)

        # If tension metric is high (high coherence needed), heavy tools should be enabled
        self.controller.update_tension_state(cch=10000, csd=0.1)
        tools = self.controller.get_active_tools()
        self.assertIn("deep_symbolic_z3_solver", tools)

if __name__ == '__main__':
    unittest.main()
