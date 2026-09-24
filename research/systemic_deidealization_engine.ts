export class IdealizedModelDAG {
  private nodes: string[] = [];
  private assumptions: Map<string, string[]> = new Map();
  private variables: Map<string, string[]> = new Map();

  constructor(public modelName: string) {}

  addNode(node: string): void {
    if (!this.nodes.includes(node)) {
      this.nodes.push(node);
      this.assumptions.set(node, []);
      this.variables.set(node, []);
    }
  }

  addAssumption(node: string, assumption: string): void {
    const list = this.assumptions.get(node);
    if (list) list.push(assumption);
  }

  removeAssumption(node: string, assumption: string): void {
    let list = this.assumptions.get(node);
    if (list) {
      this.assumptions.set(node, list.filter(a => a !== assumption));
    }
  }

  addVariable(node: string, variable: string): void {
    const list = this.variables.get(node);
    if (list) list.push(variable);
  }

  getNodes(): string[] { return this.nodes; }
  getAssumptions(node: string): string[] { return this.assumptions.get(node) || []; }
  getVariables(node: string): string[] { return this.variables.get(node) || []; }
}

export interface LimitConditions {
  temperature: string;
  velocity: string;
}

export interface AuditResult {
  divergenceDetected: boolean;
  faultyAssumption?: string;
}

export class BoundaryAuditor {
  evaluateLimits(model: IdealizedModelDAG, conditions: LimitConditions): AuditResult {
    // Simple mocked logic: if velocity is Extreme, Zero Friction fails
    for (const node of model.getNodes()) {
      const assumptions = model.getAssumptions(node);
      if (conditions.velocity === 'Extreme' && assumptions.includes('Zero Friction')) {
        return { divergenceDetected: true, faultyAssumption: 'Zero Friction' };
      }
    }
    return { divergenceDetected: false };
  }
}

export interface ExperimentalData {
  domain: string;
  sigmaDivergence: number;
}

export class DeIdealizationEngine {
  processFeedbackLoop(model: IdealizedModelDAG, data: ExperimentalData): IdealizedModelDAG {
    if (data.sigmaDivergence > 3.0) {
      // Trigger De-Idealization
      for (const node of model.getNodes()) {
        const assumptions = model.getAssumptions(node);
        if (assumptions.includes('Zero Friction')) {
          model.removeAssumption(node, 'Zero Friction');
          model.addVariable(node, 'Dynamic Friction Coefficient');
        }
      }
    }
    return model;
  }
}
