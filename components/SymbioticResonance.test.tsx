import React from 'react';
import { render, screen } from '@testing-library/react';
import { SymbioticResonance } from './SymbioticResonance';
import { describe, it, expect } from 'vitest';

describe('SymbioticResonance', () => {
    it('renders the AI-Human isomorphic tension value', () => {
        render(<SymbioticResonance aiFidelity={0.8} humanIntuition={0.9} />);

        // Should find elements showing AI and Human contributions
        expect(screen.getByText(/AI Fidelity:/)).toBeInTheDocument();
        expect(screen.getByText(/Human Intuition:/)).toBeInTheDocument();

        // Should compute and display the Symbiotic Tension Score
        expect(screen.getByText(/Symbiotic Tension:/)).toBeInTheDocument();
    });
});
