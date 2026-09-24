import { describe, it, expect } from 'vitest';
import {
  IdealizedModelDAG,
  BoundaryAuditor,
  DeIdealizationEngine,
  ExperimentalData
} from './systemic_deidealization_engine';

describe('Systemic De-Idealization Engine', () => {
  it('should build a formal representation of an idealized model as a DAG', () => {
    const dag = new IdealizedModelDAG('Protein Folding');

    dag.addNode('Static Ribbon Structure');
    dag.addAssumption('Static Ribbon Structure', 'Zero Flexibility');

    expect(dag.getNodes().length).toBe(1);
    expect(dag.getAssumptions('Static Ribbon Structure')).toContain('Zero Flexibility');
  });

  it('should programmatically evaluate the model at extreme limits', () => {
    const auditor = new BoundaryAuditor();
    const dag = new IdealizedModelDAG('Polymer Dynamics');
    dag.addNode('Bead-Rod Polymer');
    dag.addAssumption('Bead-Rod Polymer', 'Zero Friction');

    const evaluation = auditor.evaluateLimits(dag, { temperature: 'High', velocity: 'Extreme' });

    expect(evaluation.divergenceDetected).toBe(true);
    expect(evaluation.faultyAssumption).toBe('Zero Friction');
  });

  it('should execute a feedback loop triggering a De-Idealization routine upon >3-sigma divergence', () => {
    const engine = new DeIdealizationEngine();
    const model = new IdealizedModelDAG('Material Science Model');
    model.addNode('Surface Interaction');
    model.addAssumption('Surface Interaction', 'Zero Friction');

    const data: ExperimentalData = {
      domain: 'High-Speed Collision',
      sigmaDivergence: 3.5
    };

    const updatedModel = engine.processFeedbackLoop(model, data);

    // The engine should detect >3 sigma, find the faulty assumption, and re-inject it
    expect(updatedModel.getAssumptions('Surface Interaction')).not.toContain('Zero Friction');
    expect(updatedModel.getVariables('Surface Interaction')).toContain('Dynamic Friction Coefficient');
  });
});
