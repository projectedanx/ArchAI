export interface FictivePrinciple {
  id: string;
  assumption: string;
  computationalUtility: string;
  explanatoryUtility: string;
}

export class FictiveOntology {
  private principles: Map<string, FictivePrinciple> = new Map();

  addPrinciple(principle: FictivePrinciple): void {
    this.principles.set(principle.id, principle);
  }

  getPrinciple(id: string): FictivePrinciple | undefined {
    return this.principles.get(id);
  }
}

export interface CognitivePerformance {
  variableManipulationCompetence: number;
  causalDependencyIdentification: number;
  crossDomainTransferSuccess: number;
}

export class GraspingMetricCalculator {
  computeScore(performance: CognitivePerformance): number {
    return (
      performance.variableManipulationCompetence +
      performance.causalDependencyIdentification +
      performance.crossDomainTransferSuccess
    ) / 3.0;
  }
}

export interface DomainContext {
  framework: string;
  problemDomain: string;
  defeatersPresent: string[];
}

export interface UnderstandingResult {
  understandingScore: number;
  factiveAccuracy: number;
  insight: string;
}

export class UnderstandingSimulator {
  evaluateUnderstanding(context: DomainContext): UnderstandingResult {
    // If using Newtonian Gravity for Astrophysics, factive accuracy is compromised by GR defeaters
    let factiveAccuracy = 1.0;
    let understandingScore = 0.9; // Baseline high understanding

    if (context.framework === 'Newtonian Gravity' && context.defeatersPresent.some(d => d.includes('General Relativistic'))) {
      factiveAccuracy = 0.6; // Factually incorrect at limits
      // Understanding score remains high because the structural mapping is competent
      understandingScore = 0.85;
    }

    return {
      understandingScore,
      factiveAccuracy,
      insight: 'Demonstrates how non-factive understanding tolerates approximation and fictive principles despite strict falsity at fundamental scales.'
    };
  }
}
