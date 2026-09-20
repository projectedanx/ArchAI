import { describe, it, expect } from 'vitest';
import {
    OntologicalCommitmentEngine,
    OccamLossCompiler,
    BayesianModelReduction,
    InterdisciplinaryModelTravel
} from './parsimonious_architecture_protocol';

describe('Parsimonious Architecture Protocol (PAP)', () => {

    describe('OntologicalCommitmentEngine', () => {
        it('should formulate competing graphs and bind nodes to empirical variables', () => {
            const engine = new OntologicalCommitmentEngine();
            const graph = engine.formulateGraph('TheoryA');
            engine.bindNode(graph, 'node1', 'empirical_var_1');

            expect(graph.nodes.length).toBeGreaterThan(0);
            expect(graph.nodes[0].binding).toBe('empirical_var_1');
        });
    });

    describe('OccamLossCompiler', () => {
        it('should penalize complexity and correctly identify Copernican heliocentrism as superior', () => {
            const compiler = new OccamLossCompiler();

            // Copernican: Low complexity (fewer free parameters)
            const copernicanLoss = compiler.computeLoss({
                name: 'Copernican',
                parameters: 3,
                error: 0.05
            });

            // Ptolemaic: High complexity (epicycles, many free parameters)
            const ptolemaicLoss = compiler.computeLoss({
                name: 'Ptolemaic',
                parameters: 40,
                error: 0.05
            });

            expect(copernicanLoss).toBeLessThan(ptolemaicLoss);
        });
    });

    describe('BayesianModelReduction', () => {
        it('should calculate marginal likelihood and penalize unverified assumptions', () => {
            const bmr = new BayesianModelReduction();

            const simpleChain = { length: 5, unverifiedAssumptions: 0 };
            const complexChain = { length: 20, unverifiedAssumptions: 5 };

            const simpleScore = bmr.calculateMarginalLikelihood(simpleChain);
            const complexScore = bmr.calculateMarginalLikelihood(complexChain);

            // Higher score is better (evidence ~ accuracy - complexity)
            expect(simpleScore).toBeGreaterThan(complexScore);
        });

        it('should perform self-consolidation by compressing step-by-step logic', () => {
            const bmr = new BayesianModelReduction();

            const rawLogic = ['step1', 'step2', 'step3', 'step4'];
            const consolidated = bmr.selfConsolidate(rawLogic);

            expect(consolidated.length).toBeLessThan(rawLogic.length);
            expect(consolidated).toContain('fictive_principle');
        });
    });

    describe('InterdisciplinaryModelTravel', () => {
        it('should validate boundary conditions and trigger model rejection via Modus Tollens', () => {
            const auditor = new InterdisciplinaryModelTravel();

            const invalidModel = {
                assumptions: ['frictionless_plane'],
                targetSystem: 'sandpaper_surface'
            };

            expect(() => {
                auditor.validateBoundaryConditions(invalidModel);
            }).toThrowError(/Modus Tollens Falsification/);
        });
    });
});
