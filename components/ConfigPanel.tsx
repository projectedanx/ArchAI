
import React from 'react';
import { AgentRole, WorkflowState } from '../types';
import { PERSONAS } from '../constants';
import { Settings, Play, Shield, Zap, Palette, Map, Brain, Globe, Anchor, Flame, Archive, Network } from 'lucide-react';

/**
 * Props for the ConfigPanel component.
 * @property {WorkflowState} state - The current workflow state containing agent configurations and toggles.
 * @property {function} onUpdate - Callback function to update partial properties of the workflow state.
 * @property {function} onStart - Callback function to initiate the agent orchestration workflow.
 */
interface ConfigPanelProps {
  state: WorkflowState;
  onUpdate: (updates: Partial<WorkflowState>) => void;
  onStart: () => void;
}

/**
 * Renders the configuration interface allowing users to set the architectural goal.
 *
 * @param {ConfigPanelProps} props - The component props.
 * @returns {JSX.Element} The rendered ConfigPanel component.
 */
const ConfigPanel: React.FC<ConfigPanelProps> = ({ state, onUpdate, onStart }) => {
  /**
   * Handles the selection change for an agent's persona.
   *
   * @param {AgentRole} role - The role being configured.
   * @param {string} personaId - The ID of the newly selected persona.
   */
  const handlePersonaChange = (role: AgentRole, id: string) => {
    onUpdate({
      agentConfigs: {
        ...state.agentConfigs,
        [role]: id,
      },
    });
  };

  const getIcon = (role: AgentRole) => {
    switch (role) {
      case 'Planner': return <Map className="w-4 h-4" />;
      case 'Security': return <Shield className="w-4 h-4" />;
      case 'Performance': return <Zap className="w-4 h-4" />;
      case 'Style': return <Palette className="w-4 h-4" />;
      case 'Sovereign': return <Anchor className="w-4 h-4" />;
      case 'Cartographer': return <Network className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-100">
          <Settings className="w-6 h-6 text-indigo-400" />
          Refactoring Configuration
        </h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-400">Architectural Goal</label>
          <textarea
            className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            value={state.goal}
            onChange={(e) => onUpdate({ goal: e.target.value })}
            placeholder="Describe the refactoring objective..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(PERSONAS) as AgentRole[]).map((role) => (
          <div key={role} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-200">
              {getIcon(role)}
              {role} Agent
            </div>
            <div className="space-y-2">
              {PERSONAS[role].map((persona) => (
                <div
                  key={persona.id}
                  onClick={() => handlePersonaChange(role, persona.id)}
                  className={`cursor-pointer p-3 rounded-md border transition-all ${
                    state.agentConfigs[role] === persona.id
                      ? 'bg-indigo-900/30 border-indigo-500/50'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-indigo-300">{persona.name}</span>
                    {state.agentConfigs[role] === persona.id && (
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{persona.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900/50 border border-slate-800 rounded-lg p-4 gap-4">
        <div className="flex flex-wrap gap-6">
           <label className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-10 h-6 rounded-full p-1 transition-colors ${state.deepThinkingEnabled ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${state.deepThinkingEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <input 
                type="checkbox" 
                className="hidden" 
                checked={state.deepThinkingEnabled} 
                onChange={(e) => onUpdate({ deepThinkingEnabled: e.target.checked })} 
            />
            <span className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <Brain className="w-4 h-4" /> Deep Thinking
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
             <div className={`w-10 h-6 rounded-full p-1 transition-colors ${state.webSearchEnabled ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${state.webSearchEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <input 
                type="checkbox" 
                className="hidden" 
                checked={state.webSearchEnabled} 
                onChange={(e) => onUpdate({ webSearchEnabled: e.target.checked })} 
            />
            <span className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> Web Search
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
             <div className={`w-10 h-6 rounded-full p-1 transition-colors ${state.escrowEnabled ? 'bg-blue-600' : 'bg-slate-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${state.escrowEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <input
                type="checkbox"
                className="hidden"
                checked={state.escrowEnabled}
                onChange={(e) => onUpdate({ escrowEnabled: e.target.checked })}
            />
            <span className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <Archive className="w-4 h-4" /> Epistemic Escrow
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
             <div className={`w-10 h-6 rounded-full p-1 transition-colors ${state.ddxEnabled ? 'bg-amber-600' : 'bg-slate-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${state.ddxEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <input 
                type="checkbox" 
                className="hidden" 
                checked={state.ddxEnabled} 
                onChange={(e) => onUpdate({ ddxEnabled: e.target.checked })} 
            />
            <span className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> DDx Protocol
            </span>
          </label>
        </div>

        <button
          onClick={onStart}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-medium flex items-center gap-2 transition-colors shadow-lg shadow-indigo-900/20"
        >
          <Play className="w-4 h-4" />
          Initialize Agents
        </button>
      </div>
    </div>
  );
};

export default ConfigPanel;