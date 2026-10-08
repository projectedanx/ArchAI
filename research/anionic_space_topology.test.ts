import { describe, it, expect } from 'vitest';
import { AnionicSpaceTopology, InformationStructure } from './anionic_space_topology';

describe('Anionic Space Topology - L2.9 Anionic Architecture', () => {
    it('should calculate void density of an information structure', () => {
        const topology = new AnionicSpaceTopology();
        const structure: InformationStructure = {
            totalTokens: 100,
            omittedTokens: 25,
            redactionNodes: 2
        };

        const voidDensity = topology.calculateVoidDensity(structure);
        expect(voidDensity).toBe(0.25);
    });

    it('should generate an anionic cipher for redaction points', () => {
        const topology = new AnionicSpaceTopology();
        const structure: InformationStructure = {
            totalTokens: 100,
            omittedTokens: 25,
            redactionNodes: 2
        };

        const cipher = topology.generateAnionicCipher(structure);
        expect(cipher).toHaveLength(2);
        expect(cipher[0]).toContain("ANIONIC_RED_");
    });
});
