
import React, { useEffect, useRef } from 'react';
import { AgentMessage, WorkflowState, AgentRole } from '../types';
import { Bot, Map, Shield, Zap, Palette, Loader2, Anchor, Archive } from 'lucide-react';

/**
 * Props for the AgentOrchestrator component.
 * @property {WorkflowState} state - The current workflow state containing the conversation history and configuration.
 */
interface AgentOrchestratorProps {
  state: WorkflowState;
}

/**
 * Visualizes the ongoing conversation and debate between various architectural AI agents.
 *
 * @param {AgentOrchestratorProps} props - The component props.
 * @returns {JSX.Element} The rendered AgentOrchestrator interface.
 */
const AgentOrchestrator: React.FC<AgentOrchestratorProps> = ({ state }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.messages]);

  /**
   * Returns Tailwind CSS classes defining the color theme for a specific agent role.
   *
   * @param {AgentRole} role - The role of the agent.
   * @returns {string} The CSS classes for styling.
   */
  const getAgentColor = (role: AgentRole) => {
    switch (role) {
      case 'Planner': return 'text-blue-400 border-blue-400/30 bg-blue-950/20';
      case 'Security': return 'text-red-400 border-red-400/30 bg-red-950/20';
      case 'Performance': return 'text-amber-400 border-amber-400/30 bg-amber-950/20';
      case 'Style': return 'text-purple-400 border-purple-400/30 bg-purple-950/20';
      case 'Sovereign': return 'text-emerald-400 border-emerald-400/30 bg-emerald-950/20';
      default: return 'text-slate-400 border-slate-400/30 bg-slate-950/20';
    }
  };

  /**
   * Returns a specific React icon component representing the visual identity of an agent role.
   *
   * @param {AgentRole} role - The role of the agent.
   * @returns {JSX.Element} The rendered icon element.
   */
  const getAgentIcon = (role: AgentRole) => {
    switch (role) {
      case 'Planner': return <Map className="w-5 h-5" />;
      case 'Security': return <Shield className="w-5 h-5" />;
      case 'Performance': return <Zap className="w-5 h-5" />;
      case 'Style': return <Palette className="w-5 h-5" />;
      case 'Sovereign': return <Anchor className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/50 rounded-lg overflow-hidden border border-slate-800">
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex justify-between items-center sticky top-0 z-10">
        <h3 className="font-semibold text-slate-200 flex items-center gap-2">
          <Bot className="w-5 h-5 text-indigo-400" />
          Multi-Agent Consensus Workflow
        </h3>
        {state.isProcessing && (
           <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-950/50 px-3 py-1 rounded-full border border-indigo-500/20">
             <Loader2 className="w-3 h-3 animate-spin" />
             {state.deepThinkingEnabled ? 'Reasoning (Deep Thinking)...' : 'Agents discussing...'}
           </div>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {state.messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
            Waiting for agents to initialize...
          </div>
        )}
        
        {state.messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 px-2">
               <div className={`p-1.5 rounded-lg border ${getAgentColor(msg.role)}`}>
                 {getAgentIcon(msg.role)}
               </div>
               <div className="flex flex-col">
                  <span className={`text-sm font-bold ${getAgentColor(msg.role).split(' ')[0]}`}>
                    {msg.role} Agent
                  </span>
                  <span className="text-xs text-slate-500">
                    {msg.personaName}
                  </span>
               </div>
               <span className="ml-auto text-xs text-slate-600 font-mono">
                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </span>
            </div>
            
            <div className={`ml-10 p-4 rounded-lg rounded-tl-none border bg-slate-800/50 border-slate-700 text-slate-200 text-sm leading-relaxed shadow-sm`}>
               {msg.content}
            </div>
          </div>
        ))}
        

        {state.escrowStore?.length > 0 && (
          <div className="mt-8 border-t border-dashed border-slate-700 pt-6">
            <h4 className="text-sm font-semibold text-amber-500 flex items-center gap-2 mb-4 px-2">
              <Archive className="w-4 h-4" />
              Epistemic Escrow (Quarantined Tension Nodes)
            </h4>
            <div className="space-y-4">
              {state.escrowStore.map((entry) => (
                <div key={entry.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-2">
                     <div className={`p-1.5 rounded-lg border ${getAgentColor(entry.role)}`}>
                       {getAgentIcon(entry.role)}
                     </div>
                     <div className="flex flex-col">
                        <span className={`text-sm font-bold ${getAgentColor(entry.role).split(' ')[0]}`}>
                          {entry.role} Agent
                        </span>
                        <span className="text-xs text-slate-500">
                          {entry.personaName}
                        </span>
                     </div>
                     <div className="ml-auto flex items-center gap-2">
                       <span className="text-xs font-mono text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">
                         CFDI: {entry.cfdiScore.toFixed(2)}
                       </span>
                       <span className="text-xs text-slate-600 font-mono">
                         {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                     </div>
                  </div>

                  <div className="ml-10 p-4 rounded-lg rounded-tl-none border bg-amber-950/10 border-amber-900/50 text-slate-300 text-sm leading-relaxed shadow-sm opacity-80">
                     {entry.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {state.isProcessing && (
          <div className="flex gap-2 items-center ml-10 text-slate-500 text-sm animate-pulse">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-slate-600 delay-75" />
            <span className="w-2 h-2 rounded-full bg-slate-600 delay-150" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentOrchestrator;