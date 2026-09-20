export interface SimulationConfig {
  cfdi_threshold: number;
  drift_threshold_xi: number;
  coupling_gain_beta_base: number;
  gamma_damping: number;
}

export interface LatentState {
  velocity_F_gen: [number, number];
  gradient_Phi_anchor: [number, number];
  cfdi: number;
  drift_sdc: number;
}

export class VCPSimulator {
  private config: SimulationConfig;

  constructor(config: SimulationConfig) {
    this.config = config;
  }

  isVCPActive(cfdi: number): boolean {
    return cfdi > this.config.cfdi_threshold;
  }

  computePhasePortrait(state: LatentState, r_vcp: [number, number] = [0, 0]): [number, number] {
    // Escrow trigger: if drift is critically high (e.g., > 0.70 arbitrarily for this test bounds)
    // or if CFDI is catastrophic.
    if (state.drift_sdc >= 0.70) {
      throw new Error("Epistemic Escrow Circuit Breaker Tripped: Catastrophic Semantic Phase Transition (CSPT)");
    }

    const { velocity_F_gen, gradient_Phi_anchor, cfdi } = state;
    const { gamma_damping, coupling_gain_beta_base } = this.config;

    const beta = this.isVCPActive(cfdi) ? coupling_gain_beta_base : 0;

    const dCx = velocity_F_gen[0] - (gamma_damping * gradient_Phi_anchor[0]) - (beta * r_vcp[0]);
    const dCy = velocity_F_gen[1] - (gamma_damping * gradient_Phi_anchor[1]) - (beta * r_vcp[1]);

    return [dCx, dCy];
  }
}
