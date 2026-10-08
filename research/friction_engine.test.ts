import { describe, it, expect } from 'vitest';
import { FrictionEngine, CognitiveParallax, MontageSynthesisResult } from './friction_engine';

describe('Friction Engine - L7.5 Dialectical Resonance', () => {
    it('should calculate cognitive parallax correctly', () => {
        const engine = new FrictionEngine();

        const propA = { confidence: 0.8, entropy: 0.2, topologicalDepth: 5 };
        const propB = { confidence: 0.6, entropy: 0.5, topologicalDepth: 3 };

        const parallax: CognitiveParallax = engine.computeParallax(propA, propB);

        expect(parallax.divergenceIndex).toBeGreaterThan(0);
        expect(parallax.divergenceIndex).toBeCloseTo(0.41, 1);
        expect(parallax.requiresMontage).toBe(true);
    });

    it('should perform Montage Synthesis when parallax exceeds threshold', () => {
        const engine = new FrictionEngine();
        const parallax: CognitiveParallax = { divergenceIndex: 0.45, requiresMontage: true };

        const result: MontageSynthesisResult = engine.executeMontageSynthesis(parallax, "thesis A", "antithesis B");

        expect(result.resolutionProtocol).toBeDefined();
        expect(result.scarTissueCreated).toBe(true);
        expect(result.syntheticOutput).toContain("[Φ]"); // Golden Scar tension marker
    });
});
