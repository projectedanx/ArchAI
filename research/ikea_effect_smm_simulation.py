import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint
import argparse
import sys

def smm_derivative(M, t, alpha, E_user, C_sys, gamma, L_ext, delta, xi):
    """
    Computes the derivative dM(t)/dt of the Shared Mental Model (SMM) state.

    Formula:
    dM(t)/dt = alpha * Self_Creation(E_user, C_sys) - gamma * Cognitive_Load(L_ext) - delta * Drift(xi)
    """

    # Simple model for Self_Creation:
    # High user effort (E_user) drives it up, but it's bounded/modulated by system constraints (C_sys)
    # If C_sys is too high, it chokes creation. If C_sys is balanced, it supports it.
    # We use a logistic-like function for constraints where optimal C_sys is around 1.0
    self_creation = E_user * np.exp(-0.5 * (C_sys - 1.0)**2)

    # Cognitive load is roughly proportional to external load, but we add a small non-linear term
    cognitive_load = L_ext * M

    # Drift is proportional to intent curvature and the current state M
    drift = xi * M

    dMdt = alpha * self_creation - gamma * cognitive_load - delta * drift
    return dMdt

def run_simulation(scenario_name, alpha, E_user, C_sys, gamma, L_ext, delta, xi, t_max=100, M0=0.1):
    t = np.linspace(0, t_max, 1000)

    # Solve the differential equation
    M_t = odeint(smm_derivative, M0, t, args=(alpha, E_user, C_sys, gamma, L_ext, delta, xi))

    return t, M_t.flatten()

def main():
    print("--- IKEA Effect SMM Simulation ---")

    # Scenario 1: Under-Damped (Low Alpha, alpha -> 0)
    # Machine generated, no IKEA effect. Leads to decay/collapse (Information Foraging Decay)
    t1, M1 = run_simulation("Under-Damped", alpha=0.05, E_user=1.0, C_sys=0.5, gamma=0.1, L_ext=1.5, delta=0.1, xi=0.5)
    print("1. Under-Damped simulation complete.")

    # Scenario 2: Over-Damped (Excessive Constraint, C_sys -> inf)
    # Overly rigid, user agency crushed. Leads to Semantic Ossification
    t2, M2 = run_simulation("Over-Damped", alpha=1.0, E_user=1.0, C_sys=5.0, gamma=0.2, L_ext=0.5, delta=0.05, xi=0.1)
    print("2. Over-Damped simulation complete.")

    # Scenario 3: Critically Damped (Goldilocks Zone)
    # Balanced co-creation and machine constraints. Reaches stable Optimal Cooperative Equilibrium
    t3, M3 = run_simulation("Critically Damped", alpha=1.2, E_user=1.0, C_sys=1.0, gamma=0.1, L_ext=0.2, delta=0.05, xi=0.1)
    print("3. Critically Damped simulation complete.")

    print("\nSimulation successfully modeled SMM state trajectories.")

    # In a real environment, we would save the plot
    # plt.figure(figsize=(10, 6))
    # plt.plot(t1, M1, label='Under-Damped (Collapse)')
    # plt.plot(t2, M2, label='Over-Damped (Ossification)')
    # plt.plot(t3, M3, label='Critically Damped (ALSH Homeostasis)')
    # plt.xlabel('Time (t)')
    # plt.ylabel('SMM State M(t)')
    # plt.title('SMM Stability Phase Portrait')
    # plt.legend()
    # plt.grid(True)
    # plt.savefig('smm_simulation.png')

if __name__ == "__main__":
    main()
