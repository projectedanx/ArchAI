import React, { useState, useCallback, useRef, useEffect } from 'react';
import { WorkflowState, AgentRole, AuditEvent, AgentMessage, DriftEntry, DiffMetric, DecisionRecord, EscrowEntry } from './types';
import { PERSONAS, INITIAL_GOAL } from './constants';
import { generateAgentTurn, generateConsensusPlan } from './services/geminiService';
import { executeStareDecisis, executeDDx, evaluateCFDI } from './services/operators';
import ConfigPanel from './components/ConfigPanel';
import AgentOrchestrator from './components/AgentOrchestrator';
import PlanViewer from './components/PlanViewer';
import AuditLog from './components/AuditLog';
import { LayoutGrid, Cpu, ListEnd } from 'lucide-react';

// Mock historical drift data
const HISTORICAL_DRIFT: DriftEntry[] = [
    {
        id: 'drift-1',
        timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
        summary: 'Monolith Separation: User Service extraction',
        impactScore: 78,
        affectedModules: ['Auth', 'UserDB', 'API Gateway']
    },
    {
        id: 'drift-2',
        timestamp: new Date(Date.now() - 86400000 * 30).toISOString(),
        summary: 'Authentication Upgrade: OAuth2 Implementation',
        impactScore: 92,
        affectedModules: ['SecurityLayer', 'LoginHandler']
    }
];

// Mock Decision Log (Stare Decisis Canon)
const DECISION_LOG: DecisionRecord[] = [
    {
        id: 'ADR-001',
        timestamp: '2023-01-15',
        title: 'Use gRPC for all internal synchronous communication',
        status: 'Active',
        tags: ['Network', 'Protocol']
    },
    {
        id: 'ADR-004',
        timestamp: '2023-03-10',
        title: 'Zero Trust: All services must mutually authenticate (mTLS)',
        status: 'Active',
        tags: ['Security']
    },
    {
        id: 'ADR-009',
        timestamp: '2023-06-22',
        title: 'No Direct Database Access from Frontend Clients',
        status: 'Active',
        tags: ['Security', 'Pattern']
    }
];

// Initial state
const INITIAL_STATE: WorkflowState = {
  step: 'config',
  goal: INITIAL_GOAL,
  agentConfigs: {
    Planner: PERSONAS.Planner[0].id,
    Security: PERSONAS.Security[0].id,
    Performance: PERSONAS.Performance[0].id,
    Style: PERSONAS.Style[0].id,
    Sovereign: PERSONAS.Sovereign[0].id,
  },
  deepThinkingEnabled: false,
  webSearchEnabled: false,
  ddxEnabled: false,
  escrowEnabled: false,
  escrowStore: [],
    scarRegistry: [],
  messages: [],
  finalPlan: null,
  diffMetrics: [],
  isProcessing: false,
  driftTimeline: HISTORICAL_DRIFT,
  decisionLog: DECISION_LOG,
};

function App() {
  // Initialize state from localStorage or defaults
  const [state, setState] = useState<WorkflowState>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('arch_ai_workflow_state');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Reset processing state to avoid stuck UI on reload
                // Ensure diffMetrics exists if loading legacy state
                // Merge with INITIAL_STATE to ensure new fields (like Sovereign config, decisionLog) are present
                return { ...INITIAL_STATE, ...parsed, isProcessing: false, decisionLog: DECISION_LOG, escrowStore: parsed.escrowStore || INITIAL_STATE.escrowStore, escrowEnabled: parsed.escrowEnabled ?? INITIAL_STATE.escrowEnabled };
            } catch (e) {
                console.error('Failed to parse workflow state:', e);
            }
        }
    }
    return INITIAL_STATE;
  });

  // Initialize audit log from localStorage
  const [auditLog, setAuditLog] = useState<AuditEvent[]>(() => {
     if (typeof window !== 'undefined') {
         const saved = localStorage.getItem('arch_ai_audit_log');
         if (saved) {
             try {
                 return JSON.parse(saved);
             } catch (e) {
                 console.error('Failed to parse audit log:', e);
             }
         }
     }
     return [];
  });
  
  // Persist state changes
  useEffect(() => {
    localStorage.setItem('arch_ai_workflow_state', JSON.stringify(state));
  }, [state]);

  // Persist audit log changes
  useEffect(() => {
    localStorage.setItem('arch_ai_audit_log', JSON.stringify(auditLog));
  }, [auditLog]);

  // Ref to prevent double-firing in strict mode or race conditions
  const processingRef = useRef(false);

  const addAuditLog = (action: string, details: string, actor: AuditEvent['actor']) => {
    const event: AuditEvent = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action,
      details,
      actor,
    };
    setAuditLog((prev) => [event, ...prev]);
  };

  const updateState = (updates: Partial<WorkflowState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleStartWorkflow = () => {
    addAuditLog('Workflow Initiated', 'Refactoring consensus started', 'User');
    updateState({ step: 'orchestration', isProcessing: true });
    
    // Begin the agent loop
    runAgentLoop();
  };

  const runAgentLoop = async () => {
    if (processingRef.current) return;
    processingRef.current = true;

    try {
      // 1. Stare Decisis Check (Pre-Flight)
      addAuditLog('Operator Active', 'Stare Decisis checking precedents...', 'System');
      const precedenceCheck = await executeStareDecisis(state.goal, state.decisionLog, state.scarRegistry);
      
      if (precedenceCheck.includes('NO_CONFLICT')) {
          addAuditLog('Operator Passed', 'No architectural conflicts found', 'System');
      } else {
          // Inject Warning
          addAuditLog('Operator Flag', 'Stare Decisis identified a conflict', 'System');
          const warningMsg: AgentMessage = {
              id: crypto.randomUUID(),
              role: 'Sovereign',
              personaName: 'Stare Decisis Operator',
              content: precedenceCheck,
              timestamp: Date.now()
          };
          setState(prev => ({
              ...prev,
              messages: [...prev.messages, warningMsg]
          }));
      }

      // Define the "Dynamic Recursive Loop"
      const conversationFlow: { role: AgentRole, isRebuttal: boolean }[] = [
        { role: 'Planner', isRebuttal: false },
        { role: 'Security', isRebuttal: false },
        { role: 'Performance', isRebuttal: false },
        { role: 'Style', isRebuttal: false },
        { role: 'Sovereign', isRebuttal: false }, 
        // Recursive Phase
        { role: 'Planner', isRebuttal: true },
        { role: 'Security', isRebuttal: true },
        { role: 'Sovereign', isRebuttal: true }
      ];

      let currentHistory = "";
      // Add Stare Decisis context to history if it exists
      if (!precedenceCheck.includes('NO_CONFLICT')) {
          currentHistory += `\n\n[SYSTEM WARNING - STARE DECISIS]: ${precedenceCheck}`;
      }
      
      for (const turn of conversationFlow) {
        const { role, isRebuttal } = turn;

        addAuditLog(
            isRebuttal ? 'Recursive Refinement' : 'Agent Activated', 
            `${role} agent is ${isRebuttal ? 'refining plan based on feedback' : 'processing goal'}`, 
            role
        );
        
        updateState({ isProcessing: true });
        
        const personaId = state.agentConfigs[role];
        const personaName = PERSONAS[role].find(p => p.id === personaId)?.name || role;

        const response = await generateAgentTurn(role, state, currentHistory, isRebuttal);
        
        let cfdiScore = 0;
        if (state.escrowEnabled) {
            cfdiScore = await evaluateCFDI(state.goal, response, currentHistory);
        }

        if (state.escrowEnabled && cfdiScore > 0.15) {
            const escrowEntry: EscrowEntry = {
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                role,
                personaName,
                content: response,
                cfdiScore,
                status: 'Quarantined'
            };

            setState(prev => ({
                ...prev,
                escrowStore: [...prev.escrowStore, escrowEntry]
            }));

            addAuditLog('Escrow Sequestration', `${role} response quarantined (CFDI: ${cfdiScore.toFixed(2)})`, 'System');
            continue; // Skip adding to messages and currentHistory
        }


        const newMessage: AgentMessage = {
          id: crypto.randomUUID(),
          role,
          personaName,
          content: response,
          timestamp: Date.now(),
        };

        currentHistory += `\n\n[${role} (${personaName}) ${isRebuttal ? '- REFINEMENT' : ''}]: ${response}`;
        
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, newMessage]
        }));
        
        addAuditLog('Agent Responded', `${role} provided ${isRebuttal ? 'revised ' : ''}input`, role);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // 2. DDx Protocol (Exclusion Engine) - Optional
      if (state.ddxEnabled) {
          addAuditLog('Operator Active', 'DDx Protocol running differential diagnosis...', 'System');
          updateState({ isProcessing: true });
          
          const ddxResponse = await executeDDx(state.goal, currentHistory);
          
          const ddxMsg: AgentMessage = {
              id: crypto.randomUUID(),
              role: 'Sovereign',
              personaName: 'DDx Operator',
              content: ddxResponse,
              timestamp: Date.now()
          };
          
          setState(prev => ({
              ...prev,
              messages: [...prev.messages, ddxMsg]
          }));
          
          currentHistory += `\n\n[SYSTEM - DDx OPERATOR]: ${ddxResponse}`;
          addAuditLog('Operator Completed', 'DDx analysis injected into stream', 'System');
          await new Promise(resolve => setTimeout(resolve, 1500)); // Reading time
      }

      // Generate Consensus
      addAuditLog('Consensus Started', 'System synthesizing final plan', 'System');
      updateState({ step: 'consensus', isProcessing: true });
      
      const rawPlanResponse = await generateConsensusPlan(state);
      
      // Parse Logic
      let diffMetrics: DiffMetric[] = [];
      let finalPlan = rawPlanResponse;
      
      const jsonMatch = rawPlanResponse.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
          try {
              const parsed = JSON.parse(jsonMatch[1]);
              if (Array.isArray(parsed)) {
                  diffMetrics = parsed;
              }
              finalPlan = rawPlanResponse.replace(jsonMatch[0], '').trim();
          } catch (e) {
              console.error("Failed to parse metrics from plan:", e);
              addAuditLog('Parsing Warning', 'Could not extract metrics from plan', 'System');
          }
      }

      const newDriftEntry: DriftEntry = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          summary: `Refactoring Plan: ${state.goal.substring(0, 40)}...`,
          impactScore: Math.floor(Math.random() * 40) + 50, 
          affectedModules: ['PaymentService', 'BillingModule', 'TransactionLedger'] 
      };

      setState(prev => ({
        ...prev,
        finalPlan: finalPlan,
        diffMetrics: diffMetrics,
        isProcessing: false,
        step: 'consensus',
        driftTimeline: [newDriftEntry, ...prev.driftTimeline]
      }));
      
      addAuditLog('Plan Generated', 'Consensus plan created', 'System');
      addAuditLog('Drift Recorded', 'Architectural drift timeline updated', 'System');

    } catch (error) {
      console.error("Workflow failed", error);
      addAuditLog('Workflow Error', 'An error occurred during execution', 'System');
      updateState({ isProcessing: false });
    } finally {
      processingRef.current = false;
    }
  };

  // Nav helper
  const NavItem = ({ step, icon: Icon, label }: { step: WorkflowState['step'], icon: any, label: string }) => (
    <button 
        onClick={() => state.isProcessing ? null : updateState({ step })}
        disabled={state.messages.length === 0 && step !== 'config'}
        className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
            state.step === step 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        } ${state.messages.length === 0 && step !== 'config' ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium hidden lg:block">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Sidebar Navigation */}
      <div className="w-16 lg:w-64 flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col p-4">
        <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Cpu className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 hidden lg:block">
                Arch<span className="text-indigo-400">AI</span>
            </h1>
        </div>

        <nav className="space-y-2 flex-1">
            <NavItem step="config" icon={LayoutGrid} label="Configuration" />
            <NavItem step="orchestration" icon={Bot} label="Agent Workflow" />
            <NavItem step="consensus" icon={ListEnd} label="Consensus Plan" />
            <NavItem step="escrow" icon={ShieldAlert} label="Epistemic Escrow" />
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-500 px-2 hidden lg:block">
                <p>Status: <span className="text-emerald-400">Online</span></p>
                <p>API: <span className="text-slate-400">Connected</span></p>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 overflow-hidden">
          {state.step === 'config' && (
            <div className="h-full overflow-y-auto">
                 <ConfigPanel 
                    state={state} 
                    onUpdate={updateState} 
                    onStart={handleStartWorkflow} 
                />
            </div>
          )}
          
          {state.step === 'orchestration' && (
            <AgentOrchestrator state={state} />
          )}

          {state.step === 'consensus' && (
            <PlanViewer state={state} />
          )}

          {state.step === 'escrow' && (
            <EscrowPanel state={state} onElevate={handleElevateToScar} />
          )}
        </div>
      </main>

      {/* Right Audit Log Panel */}
      <AuditLog events={auditLog} />
    </div>
  );
}

// Bot Icon component for Nav
function Bot({ className }: { className?: string }) {
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
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
        </svg>
    )
}


function EscrowPanel({ state, onElevate }: { state: WorkflowState, onElevate: (entry: EscrowEntry) => void }) {
  if (state.escrowStore.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <ShieldAlert className="w-16 h-16 mb-4 opacity-50" />
        <h2 className="text-xl font-medium">Escrow Empty</h2>
        <p className="mt-2 text-sm text-slate-400">No cognitive contradictions quarantined.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-amber-500" />
          Epistemic Escrow
        </h2>
        <p className="text-slate-400 mt-1 text-sm">Review quarantined cognitive contradictions and elevate them to Symbolic Scar Ratchets.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {state.escrowStore.map((entry) => (
          <div key={entry.id} className="bg-slate-900 border border-amber-900/50 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-amber-400 border border-amber-900/30">
                  CFDI: {entry.cfdiScore.toFixed(2)}
                </div>
                <h3 className="font-medium text-slate-200">{entry.role} ({entry.personaName})</h3>
              </div>
              <div className="text-xs text-slate-500">{new Date(entry.timestamp).toLocaleTimeString()}</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg text-sm text-slate-300 font-mono whitespace-pre-wrap mb-4 border border-slate-800/50 max-h-64 overflow-y-auto">
              {entry.content}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => onElevate(entry)}
                className="px-4 py-2 bg-amber-600/20 hover:bg-amber-600/40 text-amber-500 rounded-lg text-sm font-medium transition-colors border border-amber-600/30"
              >
                Elevate to Scar Ratchet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;