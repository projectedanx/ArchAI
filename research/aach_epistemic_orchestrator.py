from typing import Dict, List, Any, Tuple

class ScratchpadState:
    """Represents the active epistemic scratchpad matrix."""
    def __init__(self, initial_state: Dict[str, Any]):
        self.state = initial_state

    def __repr__(self):
        return str(self.state)

class EpistemicOrchestrator:
    """Orchestrates Joint Human-AI Active Coupling via the Epistemic Scratchpad."""
    def __init__(self, initial_matrix: Dict[str, Any]):
        self.scratchpad = ScratchpadState(initial_state=initial_matrix)
        self.trace_log: List[str] = [f"Step 0 (Epistemic Matrix): {self.scratchpad}"]

    def perform_epistemic_action(self, action_name: str, updates: Dict[str, Any]):
        """Executes an Exploratory Epistemic Action Cycle."""
        self.trace_log.append(f"Action: {action_name}")
        for key, value in updates.items():
            self.scratchpad.state[key] = value

        self.trace_log.append(f"State Update: {self.scratchpad}")

        # Apply Optimal Feedback Control
        self.optimal_feedback_control()

        # Check Logical Constraints
        if not self.check_logical_constraints():
            self.trace_log.append("WARNING: Constraint Violation Detected -> Triggering 'present-at-hand' Review.")
            self.algorithmic_reparation()

    def optimal_feedback_control(self):
        """Allows task-irrelevant variance, targets task-interfering anomalies."""
        # Simulated logic: Ignoring string phrasing, focusing on numerical overlaps
        coords = self.scratchpad.state.get('coordinates', [])
        unique_coords = set(coords)
        if len(coords) != len(unique_coords):
            self.trace_log.append("OFC: Detected task-interfering anomaly (coordinate overlap). Correcting...")
            self.scratchpad.state['coordinates'] = list(unique_coords)

    def check_logical_constraints(self) -> bool:
        """Simulates checking hard logic constraints on the scratchpad."""
        coords = self.scratchpad.state.get('coordinates', [])
        # Constraint: no coordinate can be negative
        for coord in coords:
            if isinstance(coord, tuple) and any(c < 0 for c in coord):
                return False
        return True

    def algorithmic_reparation(self):
        """Diagnoses error and re-samples strategy."""
        self.trace_log.append("ALGORITHMIC REPARATION: Diagnosing constraint error...")
        coords = self.scratchpad.state.get('coordinates', [])
        # Repair: absolute value of negative coordinates
        repaired_coords = []
        for coord in coords:
            if isinstance(coord, tuple):
                repaired_coords.append(tuple(abs(c) for c in coord))
            else:
                repaired_coords.append(coord)
        self.scratchpad.state['coordinates'] = repaired_coords
        self.trace_log.append(f"State Repaired: {self.scratchpad}")

    def run_simulation(self):
        # Action 1: Valid task
        self.perform_epistemic_action("Plot Item A", {"coordinates": [(1, 2)]})

        # Action 2: Trigger overlap (OFC fixes it)
        self.perform_epistemic_action("Plot Item B", {"coordinates": [(1, 2), (1, 2)]})

        # Action 3: Trigger negative coordinate violation (Algorithmic Reparation fixes it)
        self.perform_epistemic_action("Plot Item C", {"coordinates": [(1, 2), (-3, 4)]})

if __name__ == "__main__":
    print("[Active Externalism Cognitive Orchestrator: DES Class]")
    orchestrator = EpistemicOrchestrator(initial_matrix={"coordinates": []})
    orchestrator.run_simulation()

    print("\n--- Execution Trace ---")
    for log in orchestrator.trace_log:
        print(log)
    print("--- Final Verified Optimal Solution ---")
    print(orchestrator.scratchpad)
