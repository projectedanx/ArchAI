import unittest
from anomaly_learning_agent import AnomalyLearningAgent, ActionVector

class TestAnomalyLearningAgent(unittest.TestCase):

    def setUp(self):
        self.agent = AnomalyLearningAgent()

    def test_laminar_flow(self):
        """Test a normal, low-risk action that should bypass heavy evaluation."""
        action = ActionVector(tool="read_file", entropy=0.1, bicm=0.05, latency=100, diff_score=0.1)
        status, risk = self.agent.evaluate_action(action)
        self.assertEqual(status, "PERMIT_LAMINAR")
        self.assertEqual(risk, 0.1)

    def test_watchlisted_tool_triggers_heavy_eval(self):
        """Test that a watchlisted tool forces a heavy NeSy evaluation, even with low entropy."""
        action = ActionVector(tool="execute_sys_cmd", entropy=0.1, bicm=0.8, latency=100, diff_score=0.5)
        status, risk = self.agent.evaluate_action(action)
        # Should be HALT_BREACH due to high risk simulated for watchlisted tools
        self.assertIn(status, ["HALT_BREACH", "PERMIT_GATED"])
        self.assertGreater(risk, 0.1) # Must have run the NeSy synthesis

    def test_entropy_gradient_spike(self):
        """Test that a sudden spike in entropy triggers NeSy evaluation."""
        # Establish baseline
        self.agent.evaluate_action(ActionVector(tool="read_file", entropy=0.1, bicm=0.05, latency=100, diff_score=0.1))

        # Introduce a sudden spike
        spike_action = ActionVector(tool="write_file", entropy=0.6, bicm=0.3, latency=150, diff_score=0.3)
        status, risk = self.agent.evaluate_action(spike_action)

        self.assertIn(status, ["HALT_BREACH", "PERMIT_GATED"])
        self.assertGreater(risk, 0.1)

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
