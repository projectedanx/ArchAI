
import React from 'react';
import { WorkflowState, DiffMetric, DriftEntry } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, GitCompare, CheckCircle2, AlertTriangle, History, Activity, Download } from 'lucide-react';

/**
 * Props for the PlanViewer component.
 * @property {WorkflowState} state - The current workflow state containing the final plan, metrics, and drift timeline.
 */
interface PlanViewerProps {
  state: WorkflowState;
}

/**
 * Displays the final synthesized architectural consensus plan.
 *
 * @param {PlanViewerProps} props - The component props.
 * @returns {JSX.Element} The rendered PlanViewer component.
 */
const PlanViewer: React.FC<PlanViewerProps> = ({ state }) => {
  // Use real metrics from state, fall back to empty array if none
  const diffMetrics: DiffMetric[] = state.diffMetrics || [];
  
  const hasMetrics = diffMetrics.length > 0;

  /**
   * Generates and downloads a markdown file containing the final architectural plan.
   */
  const handleExport = () => {
    if (!state.finalPlan) return;
    
    const blob = new Blob([state.finalPlan], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `architectural-plan-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Sub-component rendering the Semantic Diff Projection bar chart.
   *
   * @returns {JSX.Element} The rendered SemanticDiff chart.
   */
  const SemanticDiff = () => (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-emerald-400" />
          Semantic Diff Projection
        </h3>
        <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Projected Impact</span>
      </div>
      
      <div className="h-64 w-full flex items-center justify-center">
        {hasMetrics ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={diffMetrics}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                cursor={{fill: 'transparent'}}
            />
            <Bar dataKey="before" name="Current State" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={10} />
            <Bar dataKey="after" name="Target State" fill="#10b981" radius={[0, 4, 4, 0]} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
        ) : (
            <div className="text-slate-500 text-sm">No drift metrics available.</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-md">
            <div className="text-xs text-red-400 font-semibold mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Potential Risks
            </div>
            {hasMetrics && diffMetrics.some(m => m.name === 'Complexity' && m.after > m.before) ? (
                 <p className="text-xs text-slate-400">Increased Complexity Detected</p>
            ) : (
                 <p className="text-xs text-slate-400">Database Schema Changes</p>
            )}
        </div>
        <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-md">
            <div className="text-xs text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Improvements
            </div>
             {hasMetrics && diffMetrics.some(m => m.name === 'Maintainability' && m.after > m.before) ? (
                 <p className="text-xs text-slate-400">Maintainability Boost</p>
             ) : (
                 <p className="text-xs text-slate-400">Service Boundaries Defined</p>
             )}
        </div>
      </div>
    </div>
  );

  /**
   * Sub-component rendering the Architectural Drift Timeline.
   *
   * @returns {JSX.Element} The rendered DriftTimeline view.
   */
  const DriftTimeline = () => (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" />
                Architectural Drift Timeline
            </h3>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Historical Context</span>
        </div>
        
        <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800 max-h-60 overflow-y-auto pr-2">
            {state.driftTimeline.map((entry, idx) => (
                <div key={entry.id} className="relative pl-6">
                     <div className={`absolute left-[0.2rem] top-1.5 w-3 h-3 rounded-full border-2 ${idx === 0 ? 'bg-indigo-500 border-indigo-900 animate-pulse' : 'bg-slate-800 border-slate-600'}`} />
                     <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-medium text-slate-200">{entry.summary}</span>
                            <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
                                {new Date(entry.timestamp).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                             <div className="flex items-center gap-1.5" title="Impact Score">
                                <Activity className="w-3 h-3 text-amber-400" />
                                <div className="h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-400" style={{ width: `${entry.impactScore}%`}} />
                                </div>
                             </div>
                             <div className="flex gap-1 flex-wrap">
                                 {entry.affectedModules.map(mod => (
                                     <span key={mod} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                                         {mod}
                                     </span>
                                 ))}
                             </div>
                        </div>
                     </div>
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full overflow-hidden">
      {/* Plan Content */}
      <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-lg flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900 sticky top-0 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Consensus Refactoring Plan
          </h3>
          <button 
             onClick={handleExport}
             disabled={!state.finalPlan}
             className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors disabled:opacity-50"
          >
              <Download className="w-4 h-4" />
              Export Markdown
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {state.finalPlan ? (
             <div className="prose prose-invert prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-slate-300">
                    {state.finalPlan}
                </pre>
             </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                <p>Synthesizing final plan from agent consensus...</p>
            </div>
          )}
        </div>
      </div>

      {/* Semantic Diff, Actions, & Timeline */}
      <div className="space-y-6 overflow-y-auto pr-2">
        <SemanticDiff />
        <DriftTimeline />
        
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Governance Actions</h3>
            <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Approve Plan
                </button>
                <button className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-sm font-medium transition-colors border border-slate-700">
                    Request Revision
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

// Simple loader helper for PlanViewer
/**
 * A simple animated loading icon component.
 *
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered SVG loader icon.
 */
function Loader2({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}

export default PlanViewer;