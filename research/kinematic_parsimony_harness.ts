export interface DataPoint {
  time: number;
  position: [number, number, number];
}

export interface OrbitalTelemetry {
  target: string;
  dataPoints: DataPoint[];
}

export enum ModelType {
  GEOCENTRIC_EPICYCLIC = 'GEOCENTRIC_EPICYCLIC',
  HELIOCENTRIC_KEPLERIAN = 'HELIOCENTRIC_KEPLERIAN'
}

export class KinematicParsimonyHarness {
  private telemetryData: OrbitalTelemetry[] = [];

  ingest(telemetry: OrbitalTelemetry): void {
    this.telemetryData.push(telemetry);
  }

  getTelemetry(): OrbitalTelemetry[] {
    return this.telemetryData;
  }
}

export class OccamLossCompiler {
  /**
   * Calculates the Bayesian Information Criterion (BIC).
   * BIC = n * ln(error / n) + k * ln(n)
   * where:
   * n = number of data points
   * error = sum of squared residuals (or similar error metric)
   * k = number of free parameters
   */
  calculateBIC(error: number, k: number, n: number): number {
    // Adding a small constant to error to avoid ln(0)
    const logLikelihood = n * Math.log((error + 1e-10) / n);
    const penalty = k * Math.log(n);
    return logLikelihood + penalty;
  }
}

export interface GalileanConstraint {
  observation: string;
  implication: string;
}

export interface FalsificationResult {
  falsified: boolean;
  reason?: string;
  abductiveTransitionTo?: ModelType;
}

export class ModelBreakingSimulator {
  evaluateConstraint(modelType: ModelType, constraint: GalileanConstraint): FalsificationResult {
    if (modelType === ModelType.GEOCENTRIC_EPICYCLIC && constraint.observation.includes('Venus exhibits full phase cycles')) {
      return {
        falsified: true,
        reason: `Modus Tollens Falsification: Constraint "${constraint.observation}" is logically incompatible with the geocentric coordinate frame.`,
        abductiveTransitionTo: ModelType.HELIOCENTRIC_KEPLERIAN
      };
    }

    return { falsified: false };
  }
}
