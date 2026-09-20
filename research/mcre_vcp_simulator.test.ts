import { describe, it, expect } from 'vitest';
import { VCPSimulator, LatentState, SimulationConfig } from './mcre_vcp_simulator';

describe('MCRE Verification Co-Processor (VCP) Simulator', () => {
  const defaultConfig: SimulationConfig = {
    cfdi_threshold: 0.42,
    drift_threshold_xi: 0.30,
    coupling_gain_beta_base: 1.0,
    gamma_damping: 0.1
  };

  it('maintains laminar homeostasis when CFDI is below threshold', () => {
    const simulator = new VCPSimulator(defaultConfig);

    // Simulate a stable state (CFDI < 0.42, Drift < 0.30)
    const initialState: LatentState = {
      velocity_F_gen: [0.5, 0.2],
      gradient_Phi_anchor: [0.1, 0.05],
      cfdi: 0.15,
      drift_sdc: 0.10
    };

    const nextStateDerivative = simulator.computePhasePortrait(initialState);

    // In laminar flow, VCP R_vec should not apply (Beta = 0)
    // dC/dt = F_gen - gamma * Phi_anchor
    expect(nextStateDerivative[0]).toBeCloseTo(0.5 - (0.1 * 0.1));
    expect(nextStateDerivative[1]).toBeCloseTo(0.2 - (0.1 * 0.05));

    expect(simulator.isVCPActive(initialState.cfdi)).toBe(false);
  });

  it('triggers VCP beta damping when CFDI exceeds threshold', () => {
    const simulator = new VCPSimulator(defaultConfig);

    // Simulate an unstable state (CFDI > 0.42)
    const deviantState: LatentState = {
      velocity_F_gen: [0.8, -0.9],
      gradient_Phi_anchor: [0.4, -0.5],
      cfdi: 0.65, // Breach
      drift_sdc: 0.45
    };

    // R_VCP corrective vector output
    const r_vcp = [ -0.7, 0.8 ];

    const nextStateDerivative = simulator.computePhasePortrait(deviantState, r_vcp);

    expect(simulator.isVCPActive(deviantState.cfdi)).toBe(true);

    // In deviant flow, beta is effectively infinity / max coupling applied
    // The test asserts that the resulting derivative is heavily influenced by R_VCP
    // Assuming simple linear coupling for the simulation:
    // dC/dt = F_gen - gamma * Phi_anchor - beta(cfdi) * R_VCP

    const expectedX = 0.8 - (0.1 * 0.4) - (1.0 * -0.7);
    const expectedY = -0.9 - (0.1 * -0.5) - (1.0 * 0.8);

    expect(nextStateDerivative[0]).toBeCloseTo(expectedX);
    expect(nextStateDerivative[1]).toBeCloseTo(expectedY);
  });

  it('enters epistemic escrow when drift delta exceeds catastrophic bounds', () => {
    const simulator = new VCPSimulator(defaultConfig);

    const catastrophicState: LatentState = {
      velocity_F_gen: [2.0, 2.0],
      gradient_Phi_anchor: [0.1, 0.1],
      cfdi: 0.95,
      drift_sdc: 0.80 // Catastrophic
    };

    expect(() => {
      simulator.computePhasePortrait(catastrophicState);
    }).toThrowError(/Epistemic Escrow Circuit Breaker Tripped/);
  });
});
