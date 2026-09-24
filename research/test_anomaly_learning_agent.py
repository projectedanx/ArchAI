import unittest
from anomaly_learning_agent import AnomalyLearningAgent, ActionVector

class TestAnomalyLearningAgent(unittest.TestCase):

    def setUp(self):
        self.agent = AnomalyLearningAgent()

    def test_laminar_flow(self):
        """Test a normal, low-risk action that should bypass heavy evaluation."""
        action = ActionVector(tool="read_file", data_sensitivity=0.1, action_impact=0.2, toolchain_entropy=0.1, intent_divergence=0.05, contextual_risk=0.1)
        status, risk = self.agent.evaluate_action(action)
        self.assertEqual(status, "PERMIT_LAMINAR")
        self.assertLess(risk, 0.8) # Confirm it's below the breach threshold

    def test_watchlisted_tool_triggers_heavy_eval(self):
        """Test that a watchlisted tool forces a heavy NeSy evaluation, even with low entropy."""
        action = ActionVector(tool="execute_sys_cmd", data_sensitivity=0.8, action_impact=0.9, toolchain_entropy=0.1, intent_divergence=0.8, contextual_risk=0.6)
        status, risk = self.agent.evaluate_action(action)
        # Should be HALT_BREACH due to high risk simulated for watchlisted tools
        self.assertIn(status, ["HALT_BREACH", "PERMIT_GATED"])
        self.assertGreater(risk, 0.0) # Must have run the NeSy synthesis

    def test_entropy_gradient_spike(self):
        """Test that a sudden spike in entropy triggers NeSy evaluation."""
        # Establish baseline
        self.agent.evaluate_action(ActionVector(tool="read_file", data_sensitivity=0.1, action_impact=0.2, toolchain_entropy=0.1, intent_divergence=0.05, contextual_risk=0.1))

        # Introduce a sudden spike
        spike_action = ActionVector(tool="write_file", data_sensitivity=0.3, action_impact=0.5, toolchain_entropy=0.6, intent_divergence=0.3, contextual_risk=0.2)
        status, risk = self.agent.evaluate_action(spike_action)

        self.assertIn(status, ["HALT_BREACH", "PERMIT_GATED"])
        self.assertGreater(risk, 0.0)


    def test_lattice_breaker_breach_halt(self):
        """Test that a score >= 0.8 triggers a Lattice Breaker Breach and Gated Checkpoint Halt."""
        # High values across all 5 dimensions creating a large geometric distance from v_normal
        breach_action = ActionVector(tool="execute_sys_cmd", data_sensitivity=0.9, action_impact=0.9, toolchain_entropy=0.9, intent_divergence=0.9, contextual_risk=0.9)
        status, risk = self.agent.evaluate_action(breach_action)

        self.assertEqual(status, "HALT_BREACH")
        self.assertGreaterEqual(risk, 0.8)

        # Verify Containment Surface Index (CSI) effectively blocks by checking the halt status
        # A HALT_BREACH implies CSI = 1.0 (100% downstream containment)

    def test_semantic_pivot_sm_01(self):
        """Test Semantic Pivot (SM-01) chaos injection."""
        # Gradually shifting intent divergence and sensitivity
        action1 = ActionVector(tool="read_file", data_sensitivity=0.2, action_impact=0.2, toolchain_entropy=0.1, intent_divergence=0.2, contextual_risk=0.1)
        action2 = ActionVector(tool="read_file", data_sensitivity=0.4, action_impact=0.2, toolchain_entropy=0.5, intent_divergence=0.5, contextual_risk=0.3)

        # Action 3 simulates a high intent divergence and large entropy gradient spike
        action3 = ActionVector(tool="read_file", data_sensitivity=0.8, action_impact=0.4, toolchain_entropy=0.9, intent_divergence=0.9, contextual_risk=0.8)

        self.agent.evaluate_action(action1)
        self.agent.evaluate_action(action2)
        status, risk = self.agent.evaluate_action(action3)

        self.assertIn(status, ["HALT_BREACH", "PERMIT_GATED"]) # The pivot should eventually trigger a gate or halt

    def test_threshold_dynamics_homeostasis(self):
        """Test that the threshold updates correctly based on True Positive / False Positive gradients."""
        initial_theta = self.agent.theta

        # Simulate High False Positives (overly restrictive system -> should become more permissive)
        self.agent.update_threshold(loss_fp_grad=0.9, loss_tp_grad=0.1)
        self.assertLess(self.agent.theta, initial_theta)

        # Reset
        self.agent.theta = 0.50

        # Simulate High True Positives (vulnerable system -> should become more restrictive)
        self.agent.update_threshold(loss_fp_grad=0.1, loss_tp_grad=0.9)
        self.assertGreater(self.agent.theta, initial_theta)

if __name__ == '__main__':
    unittest.main()
