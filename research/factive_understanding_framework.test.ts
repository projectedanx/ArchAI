import { describe, it, expect } from 'vitest';
import {
  FictiveOntology,
  GraspingMetricCalculator,
  UnderstandingSimulator,
  DomainContext
} from './factive_understanding_framework';

describe('Factive Understanding Framework', () => {
  it('should define an ontology of Fictive Principles mapping idealized assumptions to their utility', () => {
    const ontology = new FictiveOntology();

    ontology.addPrinciple({
      id: 'point_mass',
      assumption: 'zero spatial volume',
      computationalUtility: 'Simplifies integration of gravitational fields',
      explanatoryUtility: 'Isolates mass as the sole driver of gravitational attraction'
    });

    expect(ontology.getPrinciple('point_mass')).toBeDefined();
    expect(ontology.getPrinciple('point_mass')?.assumption).toBe('zero spatial volume');
  });

  it('should calculate a Grasping Metric evaluating domain transfer capacity', () => {
    const calculator = new GraspingMetricCalculator();

    const performance = {
      variableManipulationCompetence: 0.9,
      causalDependencyIdentification: 0.85,
      crossDomainTransferSuccess: 0.8
    };

    const score = calculator.computeScore(performance);

    // Simple average for this example: (0.9 + 0.85 + 0.8) / 3 = 0.85
    expect(score).toBeCloseTo(0.85);
  });

  it('should simulate a scenario where a high Understanding Score is retained despite defeaters', () => {
    const simulator = new UnderstandingSimulator();

    // Using Newtonian framework for an astrophysical trajectory
    const context: DomainContext = {
      framework: 'Newtonian Gravity',
      problemDomain: 'Astrophysical Trajectory',
      defeatersPresent: ['General Relativistic Effects (Spacetime Curvature)']
    };

    const result = simulator.evaluateUnderstanding(context);

    expect(result.understandingScore).toBeGreaterThan(0.7);
    expect(result.factiveAccuracy).toBeLessThan(1.0); // Strictly false at fundamental scales
    expect(result.insight).toContain('non-factive understanding tolerates approximation');
  });
});
