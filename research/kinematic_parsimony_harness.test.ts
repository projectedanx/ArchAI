import { describe, it, expect } from 'vitest';
import {
  KinematicParsimonyHarness,
  OrbitalTelemetry,
  OccamLossCompiler,
  ModelBreakingSimulator,
  ModelType,
  GalileanConstraint
} from './kinematic_parsimony_harness';

describe('Kinematic Parsimony Harness', () => {
  it('should ingest planetary orbital telemetry', () => {
    const harness = new KinematicParsimonyHarness();
    const telemetry: OrbitalTelemetry = {
      target: 'Mars',
      dataPoints: [
        { time: 0, position: [1.5, 0, 0] },
        { time: 10, position: [1.4, 0.5, 0] }
      ]
    };
    harness.ingest(telemetry);
    expect(harness.getTelemetry().length).toBe(1);
    expect(harness.getTelemetry()[0].target).toBe('Mars');
  });

  it('should calculate BIC and prefer parsimonious law over epicyclic curve-fitting', () => {
    const compiler = new OccamLossCompiler();

    // Model A: Geocentric epicycles
    // High parameter count, low error (over-fitted)
    const modelA = { type: ModelType.GEOCENTRIC_EPICYCLIC, parameters: 25, error: 0.05, n: 100 };

    // Model B: Keplerian ellipses
    // Low parameter count, low error (parsimonious)
    const modelB = { type: ModelType.HELIOCENTRIC_KEPLERIAN, parameters: 6, error: 0.1, n: 100 };

    const bicA = compiler.calculateBIC(modelA.error, modelA.parameters, modelA.n);
    const bicB = compiler.calculateBIC(modelB.error, modelB.parameters, modelB.n);

    expect(bicB).toBeLessThan(bicA); // Lower BIC is better
  });

  it('should simulate Galileo-type "Model Breaking" via Modus Tollens falsification', () => {
    const simulator = new ModelBreakingSimulator();

    const constraint: GalileanConstraint = {
      observation: 'Venus exhibits full phase cycles',
      implication: 'Venus must orbit the Sun, not the Earth'
    };

    const result = simulator.evaluateConstraint(ModelType.GEOCENTRIC_EPICYCLIC, constraint);

    expect(result.falsified).toBe(true);
    expect(result.reason).toContain('Modus Tollens');
    expect(result.abductiveTransitionTo).toBe(ModelType.HELIOCENTRIC_KEPLERIAN);
  });
});
