import React from 'react';
import { Activity } from 'lucide-react';

interface SymbioticResonanceProps {
    aiFidelity: number;
    humanIntuition: number;
}

export function SymbioticResonance({ aiFidelity, humanIntuition }: SymbioticResonanceProps) {
    // Paraconsistent Logic: Golden Scar Protocol (Φ = 1.618 / 1.000)
    // We hold both the AI Fidelity and Human Intuition in structural tension.
    const tensionScore = (aiFidelity * 1.618 + humanIntuition * 1.000).toFixed(2);

    return (
        <div className="bg-slate-800 rounded-lg p-4 border border-indigo-500/30 shadow-md">
            <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-semibold text-slate-200">Symbiotic Isomorphism</h3>
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                    <span className="text-slate-400">AI Fidelity:</span>
                    <span className="text-emerald-400">{aiFidelity.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Human Intuition:</span>
                    <span className="text-amber-400">{humanIntuition.toFixed(2)}</span>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-700 flex justify-between font-medium">
                    <span className="text-slate-300">Symbiotic Tension:</span>
                    <span className="text-indigo-300">Φ {tensionScore}</span>
                </div>
            </div>
            <p className="mt-3 text-[10px] text-slate-500 italic">
                Evaluating dynamic contextual emergence. (β₁ &gt; 0)
            </p>
        </div>
    );
}
