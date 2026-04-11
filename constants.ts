import { Persona, AgentRole } from './types';
import { PROMPTS } from './prompts';

export const PERSONAS: Record<AgentRole, Persona[]> = {
  Planner: [
    {
      id: 'planner-pragmatic',
      name: 'The Pragmatic Architect',
      description: 'Focuses on incremental migration and business continuity.',
      systemPrompt: PROMPTS.PLANNER.PRAGMATIC
    },
    {
      id: 'planner-visionary',
      name: 'The Visionary Futurist',
      description: 'Pushes for cutting-edge patterns and complete decoupling.',
      systemPrompt: PROMPTS.PLANNER.VISIONARY
    }
  ],
  Security: [
    {
      id: 'sec-paranoid',
      name: 'The Paranoid Android',
      description: 'Assumes everything is a threat. Zero Trust absolute.',
      systemPrompt: PROMPTS.SECURITY.PARANOID
    },
    {
      id: 'sec-compliance',
      name: 'The Compliance Officer',
      description: 'Focuses on GDPR, SOC2, and regulatory adherence.',
      systemPrompt: PROMPTS.SECURITY.COMPLIANCE
    }
  ],
  Performance: [
    {
      id: 'perf-latency',
      name: 'The Latency Hawk',
      description: 'Obsessed with milliseconds and edge caching.',
      systemPrompt: PROMPTS.PERFORMANCE.LATENCY
    },
    {
      id: 'perf-scaler',
      name: 'The Scale Master',
      description: 'Focuses on throughput, horizontal scaling, and costs.',
      systemPrompt: PROMPTS.PERFORMANCE.SCALER
    }
  ],
  Style: [
    {
      id: 'style-purist',
      name: 'The Code Purist',
      description: 'Enforces DRY, SOLID, and strict linting rules.',
      systemPrompt: PROMPTS.STYLE.PURIST
    },
    {
      id: 'style-pragmatist',
      name: 'The Readable Pragmatist',
      description: 'Prioritizes readability over clever abstractions.',
      systemPrompt: PROMPTS.STYLE.PRAGMATIST
    }
  ],
  Sovereign: [
    {
      id: 'sov-archivist',
      name: 'The Scar Archivist',
      description: 'Inverts symbolic scars into generative ratchets.',
      systemPrompt: PROMPTS.SOVEREIGN.ARCHIVIST
    },
    {
      id: 'sov-resilience',
      name: 'The Antifragility Engineer',
      description: 'Focuses on self-healing and chaos engineering.',
      systemPrompt: PROMPTS.SOVEREIGN.RESILIENCE
    }
  ]
};

export const INITIAL_GOAL = "Prevent 'Context Rot' and security risks by enforcing filesystem constraints on agent access to node_modules and .git.";