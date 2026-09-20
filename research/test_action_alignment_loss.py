import torch
import unittest
from action_alignment_loss import ActionAlignmentLoss

class TestActionAlignmentLoss(unittest.TestCase):
    def setUp(self):
        # Rock Paper Scissors payoff matrix
        # 0: Rock, 1: Paper, 2: Scissors
        self.payoff_matrix = torch.tensor([
            [0.0, -1.0, 1.0],
            [1.0, 0.0, -1.0],
            [-1.0, 1.0, 0.0]
        ])
        self.loss_smooth = ActionAlignmentLoss(self.payoff_matrix, use_smooth=True, temperature=0.1)
        self.loss_hard = ActionAlignmentLoss(self.payoff_matrix, use_smooth=False)

    def test_nash_trap(self):
        # Opponent plays rock with 100% confidence
        predicted_opponent_logits = torch.tensor([[100.0, 0.0, 0.0]])
        # Agent plays nash equilibrium (uniform)
        agent_logits = torch.tensor([[0.0, 0.0, 0.0]])

        # The regret for playing uniform when optimal is paper (utility=1) should be 1.0
        # Expected utility of uniform is 0
        loss = self.loss_hard(agent_logits, predicted_opponent_logits)
        self.assertAlmostEqual(loss.item(), 1.0, places=4)

    def test_optimal_play(self):
        # Opponent plays rock with 100% confidence
        predicted_opponent_logits = torch.tensor([[100.0, -100.0, -100.0]])
        # Agent plays paper with 100% confidence
        agent_logits = torch.tensor([[-100.0, 100.0, -100.0]])

        # The regret should be ~0
        loss = self.loss_hard(agent_logits, predicted_opponent_logits)
        self.assertAlmostEqual(loss.item(), 0.0, places=4)

    def test_smoothness(self):
        # Check that smooth version is slightly higher than hard version for non-extreme logits
        predicted_opponent_logits = torch.tensor([[2.0, 0.0, 0.0]])
        agent_logits = torch.tensor([[0.0, 1.0, 0.0]])

        loss_smooth = self.loss_smooth(agent_logits, predicted_opponent_logits)
        loss_hard = self.loss_hard(agent_logits, predicted_opponent_logits)

        self.assertTrue(loss_smooth.item() >= loss_hard.item())

if __name__ == '__main__':
    unittest.main()
