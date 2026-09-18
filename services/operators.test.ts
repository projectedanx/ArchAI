import { describe, it, expect, vi, beforeEach } from 'vitest';
import { executeStareDecisis } from './operators';
import { DecisionRecord, ScarRatchet } from '../types';

let mockedText = "SCAR-scar-1234 CONFLICT";

vi.mock('@google/genai', () => {
    class GoogleGenAI {
        constructor() {}
        models = {
            generateContent: vi.fn().mockImplementation(() => Promise.resolve({
                text: mockedText
            }))
        };
    }
    return { GoogleGenAI };
});

describe('executeStareDecisis', () => {
    beforeEach(() => {
        process.env.API_KEY = "test_key";
    });

    it('should block execution when a ScarRatchet conflict exists', async () => {
        mockedText = "SCAR-scar-1234 CONFLICT";
        const goal = "Implement a feature";
        const decisionLog: DecisionRecord[] = [];
        const scarRegistry: ScarRatchet[] = [
            {
                id: 'scar-1234',
                sourceEscrowId: 'escrow-99',
                timestamp: '2023-01-01T00:00:00Z',
                constraint: 'Never bypass strict schema validation',
                description: 'Bypassing strict schema validation leads to semantic saponification.'
            }
        ];

        const result = await executeStareDecisis(goal, decisionLog, scarRegistry);
        // It returns the text currently. We want it to be explicitly a block or contain the text.
        // Let's modify the executeStareDecisis operator to properly format a HARD BLOCK if it detects a scar violation.
        // The prompt says "If CONFLICT with SCAR RATCHET: This is a HARD BLOCK. Explicitly cite the [SCAR-ID]..."
        // Our test expects it to return a formatted block message instead of just passing the text through.
        expect(result).toContain("HARD BLOCK");
    });
});
