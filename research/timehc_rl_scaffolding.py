"""
Temporal-Aware & Dual-System Hierarchical Cognitive Reinforcement Learning
Domain: Post-Training RL Alignment, Dual-Process Theory, and Social Game Theory.

Implements TimeHC-RL to train an LLM to dynamically shift between intuitive System 1
responses and deliberate System 2 reasoning, preventing the "CoT deliberation penalty".
"""

class MacroPolicy:
    """
    Represents System 2 strategic planning. Runs at a lower temporal frequency
    generating high-level desires and personality-driven biases.
    """
    def __init__(self):
        self.macro_bias = "Neutral"

    def step(self, state, reward):
        """
        Updates the macro-bias based on long-term environmental rewards.
        """
        # Mock logic
        if reward > 0:
            self.macro_bias = "Cooperative"
        else:
            self.macro_bias = "Defensive"
        return self.macro_bias


class MicroPolicy:
    """
    Represents System 1 execution. Runs at a high frequency (turn-by-turn),
    generating immediate dialogue actions conditioned on the macro-bias.
    """
    def __init__(self):
        pass

    def act(self, state, macro_bias):
        """
        Generates an immediate action.
        """
        # Mock logic based on bias
        if macro_bias == "Cooperative":
            return "Offer Trade"
        elif macro_bias == "Defensive":
            return "Reject Offer"
        return "Wait"


class HierarchicalRLTrainer:
    """
    Coordinates the Macro (System 2) and Micro (System 1) policies.
    """
    def __init__(self):
        self.macro_policy = MacroPolicy()
        self.micro_policy = MicroPolicy()
        self.current_reward = 0

    def calculate_reward(self, outcome):
        """
        Derives verifiable programmatic reward from task outcomes.
        """
        if outcome == "Win":
            return 1.0
        return -1.0

    def simulate_episode(self):
        """
        Simulates an interaction bridging the thought-action gap via Dual-Process shifting.
        """
        state = "Negotiation_Phase_1"

        # Step 1: Macro Policy generates bias
        bias = self.macro_policy.step(state, self.current_reward)

        # Step 2: Micro Policy acts on the bias
        action = self.micro_policy.act(state, bias)
        print(f"[OPTICAL STATE MATRIX] System 1 Action executed: {action} (Conditioned on System 2 Bias: {bias})")

        # Step 3: Environment yields outcome
        outcome = "Win" # Mock outcome

        # Step 4: Calculate reward and update
        self.current_reward = self.calculate_reward(outcome)

        # Next macro step shows the update
        next_bias = self.macro_policy.step(state, self.current_reward)
        print(f"[OPTICAL STATE MATRIX] Updated System 2 Bias: {next_bias}")

if __name__ == "__main__":
    trainer = HierarchicalRLTrainer()
    trainer.simulate_episode()
