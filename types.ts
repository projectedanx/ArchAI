export type AgentRole = 'Planner' | 'Security' | 'Performance' | 'Style' | 'Sovereign';

export interface Persona {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}

export interface AgentConfig {
  role: AgentRole;
  personaId: string;
}

export interface AgentMessage {
  id: string;
  role: AgentRole;
  personaName: string;
  content: string;
  timestamp: number;
  isThinking?: boolean;
}

export interface DriftEntry {
  id: string;
  timestamp: string;
  summary: string;
  impactScore: number; // 0-100
  affectedModules: string[];
}

export interface DiffMetric {
  name: string;
  before: number;
  after: number;
}

export interface DecisionRecord {
  id: string;
  timestamp: string;
  title: string;
  status: 'Active' | 'Superseded';
  tags: string[];
}

export interface WorkflowState {
  step: 'config' | 'orchestration' | 'consensus' | 'audit';
  goal: string;
  agentConfigs: Record<AgentRole, string>; // Role -> PersonaID
  deepThinkingEnabled: boolean;
  webSearchEnabled: boolean;
  ddxEnabled: boolean; // Controls DDx Protocol
  messages: AgentMessage[];
  finalPlan: string | null;
  diffMetrics: DiffMetric[]; 
  isProcessing: boolean;
  driftTimeline: DriftEntry[];
  decisionLog: DecisionRecord[]; // For Stare Decisis
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  actor: 'User' | 'System' | AgentRole;
}