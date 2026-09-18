import React from 'react';
import { WorkflowState, BranchedPath, ScarRatchet, DriftEntry } from '../types';
import { AlertTriangle, CheckCircle2, GitBranch, ShieldAlert } from 'lucide-react';

interface DCCDResolutionViewerProps {
    state: WorkflowState;
    onResolve: (selectedPath: BranchedPath) => void;
}

/**
 * Executes the logic for DCCDResolutionViewer component/function.
 * @param props (state, onResolve) - Parameter payload containing operational data.
 * @returns React node representing the UI, or calculated result.
 */
export const DCCDResolutionViewer: React.FC<DCCDResolutionViewerProps> = ({ state, onResolve }) => {
    const pending = state.dccdPending;

    if (!pending) {
        return <div className="text-slate-400 p-8 text-center">No pending resolution.</div>;
    }

    const handleSelect = (path: BranchedPath) => {
        onResolve(path);
    };

    return (
        <div className="p-6 space-y-6 h-full overflow-y-auto">
            <div className="bg-amber-950/30 border border-amber-500/50 rounded-lg p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                    <div>
                        <h2 className="text-xl font-bold text-slate-100">DCCD Resolution Required</h2>
                        <p className="text-slate-400 text-sm">
                            System confidence dropped below 0.85 threshold ({pending.confidence_score}).
                            Semantic ambiguity detected. Please authorize a structural path to proceed.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pending.paths.map(path => (
                    <div key={path.id} className="bg-slate-900 border border-slate-700 rounded-lg p-6 flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                                <GitBranch className="w-5 h-5 text-indigo-400" />
                                {path.title}
                            </h3>
                        </div>

                        <p className="text-sm text-slate-400">{path.description}</p>

                        <div className="bg-slate-950 rounded p-4 border border-slate-800">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Rationale</h4>
                            <p className="text-sm text-slate-300">{path.rationale}</p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-800">
                            <button
                                onClick={() => handleSelect(path)}
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Authorize Path & Ratchet Alternative
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
