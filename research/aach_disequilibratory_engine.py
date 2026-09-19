import random
import json

class MPCController:
    """Model Predictive Control feed-forward tuner."""
    def __init__(self, step_size: float = 0.1):
        self.step_size = step_size

    def equilibrate(self, current: float, target: float) -> float:
        """Minimizes deviation between current state and target goal."""
        deviation = target - current
        adjustment = deviation * self.step_size + (random.uniform(-0.02, 0.02))
        return current + adjustment

class GoalEngine:
    """Orchestrates strategic planning under volatile environments via Dual Cyclic Loops."""
    def __init__(self, initial_state: float, initial_goal: float):
        self.performance = initial_state
        self.goal = initial_goal
        self.controller = MPCController(step_size=0.15)
        self.trace = []
        self.variance_buffer = []

    def run_dual_cyclic_loop(self, epochs: int):
        self.trace.append({"epoch": 0, "performance": self.performance, "goal": self.goal, "mode": "Init"})

        for epoch in range(1, epochs + 1):
            # A. Equilibratory Reduction
            self.performance = self.controller.equilibrate(self.performance, self.goal)

            # Track variance to detect local peaks
            self.variance_buffer.append(self.performance)
            if len(self.variance_buffer) > 5:
                self.variance_buffer.pop(0)

            variance = max(self.variance_buffer) - min(self.variance_buffer)

            mode = "Equilibratory"

            # B. Disequilibratory Production (Spike the goal if variance is low/converged)
            if len(self.variance_buffer) == 5 and variance < 0.05:
                mode = "Disequilibratory Spike (Edge of Chaos)"
                # Subjective Well-Being modifier (ensure goal isn't strictly destructive)
                self.goal = self.goal * 1.5 + random.uniform(0.1, 0.3)
                self.variance_buffer = [] # Reset buffer after spike

            self.trace.append({
                "epoch": epoch,
                "performance": round(self.performance, 4),
                "goal": round(self.goal, 4),
                "mode": mode
            })

if __name__ == "__main__":
    print("[Internal Model Control Feed-Forward Goal Tuner: IMC Class]")
    engine = GoalEngine(initial_state=0.2, initial_goal=0.8)
    engine.run_dual_cyclic_loop(epochs=20)

    print("\n--- Dynamic Living Plan Trace ---")
    for t in engine.trace:
        print(f"Epoch {t['epoch']:02d} | Perf: {t['performance']:.4f} | Goal: {t['goal']:.4f} | Mode: {t['mode']}")
