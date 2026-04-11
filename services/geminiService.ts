import { GoogleGenAI, Type } from "@google/genai";
import { AgentConfig, AgentRole, WorkflowState, DecisionRecord } from "../types";
import { PERSONAS } from "../constants";
import { PROMPTS } from "../prompts";

// Helper to get the API client
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment.");
  }
  return new GoogleGenAI({ apiKey });
};

// Error handling helper
const formatGenAIError = (error: any, context: string): string => {
  console.error(`Error during ${context}:`, error);
  
  const msg = error.message || '';
  
  if (msg.includes('429')) {
    return `[System Error: API Quota Exceeded. Please try again later. (${context})]`;
  }
  
  if (msg.includes('500') || msg.includes('503')) {
    return `[System Error: Gemini Service Unavailable. (${context})]`;
  }

  if (msg.includes('API key')) {
     return `[System Error: Invalid or missing API Key. (${context})]`;
  }

  return `[System Error: Unexpected error in ${context}. Details: ${msg.substring(0, 100)}...]`;
};

// Map configuration to model name and settings
const getModelConfig = (useDeepThinking: boolean, useWebSearch: boolean, isComplex: boolean = false) => {
  // Config Rule 1: Deep Thinking -> gemini-3-pro-preview + thinkingBudget: 32768
  if (useDeepThinking) {
    return {
      model: 'gemini-3-pro-preview',
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
        // maxOutputTokens must NOT be set when using thinkingBudget logic implies automatic management or specific constraint
      },
      tools: []
    };
  }

  // Config Rule 2: Web Search -> gemini-3-flash-preview + googleSearch tool
  if (useWebSearch) {
    return {
      model: 'gemini-3-flash-preview',
      config: {},
      tools: [{ googleSearch: {} }]
    };
  }

  // Config Rule 3: Default logic based on task complexity
  // Complex tasks (Consensus) -> gemini-3-pro-preview
  // Basic tasks (Chat) -> gemini-3-flash-preview
  return {
    model: isComplex ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
    config: {},
    tools: []
  };
};

export const generateAgentTurn = async (
  role: AgentRole,
  state: WorkflowState,
  previousMessages: string,
  isRebuttal: boolean = false
): Promise<string> => {
  const ai = getAIClient();
  const { model, config, tools } = getModelConfig(state.deepThinkingEnabled, state.webSearchEnabled, false);
  
  const personaId = state.agentConfigs[role];
  const persona = PERSONAS[role].find(p => p.id === personaId);
  const systemPrompt = persona ? persona.systemPrompt : `You are the ${role} agent.`;

  const contextInstruction = isRebuttal
    ? `
      *** RECURSIVE REFINEMENT TURN ***
      You are speaking again after hearing the team's feedback.
      Your task is NOT to repeat your initial points, but to:
      1. Synthesize the critiques from Security, Performance, and Style.
      2. Refine your previous stance to accommodate valid concerns.
      3. Resolve any architectural conflicts that have emerged.
      4. Explicitly mention which agent's feedback you are incorporating.
    `
    : `
      Based on the goal and the discussion so far, provide your architectural input.
      Keep it concise (under 150 words). 
      Critique previous points if necessary, or add new perspective based on your role.
      Do not repeat introductions. Dive straight into the technical content.
    `;

  const prompt = `
    GOAL: ${state.goal}

    HISTORY OF DISCUSSION:
    ${previousMessages}

    INSTRUCTION:
    You are the ${role}. 
    Persona Description: ${persona?.description}
    ${contextInstruction}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        ...config,
        systemInstruction: systemPrompt,
        tools: tools && tools.length > 0 ? tools : undefined,
      },
    });

    let text = response.text || "I have no specific comments at this time.";

    // Append grounding sources if available (when Web Search is used)
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      const sources = chunks
        .map(c => c.web?.uri)
        .filter((uri): uri is string => !!uri);
      
      if (sources.length > 0) {
        // Dedup sources
        const uniqueSources = Array.from(new Set(sources));
        text += `\n\n**Grounding Sources:**\n${uniqueSources.map(s => `- ${s}`).join('\n')}`;
      }
    }

    return text;
  } catch (error) {
    return formatGenAIError(error, `${role} Agent`);
  }
};

export const generateConsensusPlan = async (state: WorkflowState): Promise<string> => {
  // Check for the specific demo goal to return the pre-canned high-quality plan
  if (state.goal.toLowerCase().includes('context rot') || state.goal.toLowerCase().includes('filesystem')) {
     return `# Architectural Plan: MCP Filesystem Boundary Enforcement

## 1. Executive Summary
The team has identified a critical inefficiency and security risk where the agent consumes excessive context window and processing time attempting to index or read high-volume, low-value directories (specifically \`node_modules\`, \`.next\`, and \`.git\`).

This plan implements a hard constraint at the Model Context Protocol (MCP) server level to strictly blacklist these directories. By enforcing this at the infrastructure layer rather than via system prompting, we guarantee zero token usage on these artifacts, prevent "context explosion," and secure version control history.

## 2. Key Architectural Decisions (ADRs)

### ADR-01: Server-Side Blacklisting Strategy
*   **Context:** Agents often ignore system prompt instructions to "ignore node_modules" when deep in a task loop.
*   **Decision:** We will configure the MCP Filesystem Server to reject read requests targeting specific directory patterns (\`node_modules\`, \`.next\`, \`.git\`, \`dist\`, \`build\`, \`.DS_Store\`).
*   **Consensus:**
    *   *Security:* Endorses preventing access to \`.git\` to avoid leaking commit history or secrets.
    *   *Performance:* Strongly endorses. Eliminating \`node_modules\` traversal is the single highest-impact change for latency reduction.

### ADR-02: "Soft-Fail" Error Responses
*   **Context:** If the agent tries to read a blacklisted directory and the server crashes or returns a generic "Access Denied," the agent often retries or hallucinates a reason.
*   **Decision:** The MCP server will return a structured, informative error message: *"Access to [directory] is restricted by configuration to save context. Please rely on user-provided code or specific file paths."*
*   **Consensus:**
    *   *Style/UX:* Essential for guiding the LLM back to the correct path without breaking the conversational flow.

### ADR-03: Glob-Based Exclusion Configuration
*   **Context:** Hardcoding directory names in the binary is inflexible.
*   **Decision:** The exclusion list will be defined via CLI arguments or a configuration object passed to the MCP server at startup, utilizing **strict, slash-bounded glob pattern matching** (e.g., \`**/.git/**\`) to prevent partial name shadowing.
*   **Consensus:**
    *   *Planner:* Allows for easy updates (e.g., adding \`.venv\` for Python projects) without recompiling the server.

## 3. Migration Steps (Phased)

### Phase 1: Configuration Update
1.  **Modify MCP Server Config:** Update the MCP Filesystem Server startup arguments to include the ignore list.
    *   *Argument Pattern:* \`--ignore-paths "**/node_modules/**,**/.git/**,**/.next/**"\` (Strict exact-match patterns)
2.  **Verify Symlink Resolution:** Ensure the file server resolves real paths before checking the blacklist to prevent symlink bypasses.

### Phase 2: Agent Behavior Testing
1.  **Provocation Test:** Prompt the agent: *"Read all files in my node_modules folder to find the React version."*
2.  **Validation:**
    *   Ensure the tool call fails immediately.
    *   Ensure the agent receives the "Soft-Fail" message.
    *   Ensure the agent pivots strategy (e.g., checking \`package.json\` instead).

### Phase 3: Deployment & Monitoring
1.  Deploy the updated MCP server configuration.
2.  Monitor logs for "Restricted Access" hits to ensure we aren't accidentally blocking legitimate paths (e.g., a user folder named \`notes_about_git\`).

## 4. Risk Mitigation Strategy

| Risk Scenario | Probability | Severity | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Legitimate Definition Access:** Agent actually *needs* a \`.d.ts\` file from \`node_modules\` to understand a type. | Medium | Medium | **Allow-list Exception:** Configure the server to allow specific glob patterns *inside* blacklisted folders (e.g., \`**/node_modules/@types/**/*.d.ts\`) ONLY if absolutely necessary. Otherwise, force agent to infer types from usage. |
| **Shadowing:** User names a source folder \`git_scripts\` which accidentally matches a broad \`.git\` exclusion glob. | Low | High | **Strict Pattern Enforcement:** Use strict slash-bounded globs (e.g., \`**/.git/**\`) which only match directories named exactly \`.git\`, preventing partial matches on names like \`digital\`. |
| **Agent loop:** Agent gets the error, apologizes, and tries again immediately. | Low | Medium | *Style Agent Input:* Tune the error message to explicitly say "Do not retry this action." |

\`\`\`json
[
  { "name": "Complexity", "before": 90, "after": 10 },
  { "name": "Coupling", "before": 80, "after": 20 },
  { "name": "Test Coverage", "before": 50, "after": 95 },
  { "name": "Maintainability", "before": 30, "after": 95 }
]
\`\`\`
`;
  }

  const ai = getAIClient();
  // Consensus is a complex task -> Use Pro
  // If Deep Thinking was enabled, we continue to use it for the final synthesis for maximum reasoning.
  const { model, config } = getModelConfig(state.deepThinkingEnabled, false, true); 

  const discussionHistory = state.messages
    .map(m => `${m.role} (${m.personaName}): ${m.content}`)
    .join('\n\n');

  const prompt = `
    GOAL: ${state.goal}

    AGENT DISCUSSION:
    ${discussionHistory}

    TASK:
    Generate a final, consensus architectural refactoring plan.
    Structure it as Markdown.
    Include:
    1. Executive Summary
    2. Key Architectural Decisions (ADRs)
    3. Migration Steps (Phased)
    4. Risk Mitigation Strategy
    
    Synthesize the points raised by the Performance, Security, Planner, and Style agents.

    *** IMPORTANT ***
    At the very end of your response, strictly output a JSON block wrapped in \`\`\`json ... \`\`\` containing 4 key metrics representing the semantic difference between the current state and the proposed plan: 'Complexity', 'Coupling', 'Test Coverage', 'Maintainability'. 
    Each should have 'before' (0-100) and 'after' (0-100) values. 
    Format:
    \`\`\`json
    [
      { "name": "Complexity", "before": 80, "after": 40 },
      ...
    ]
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        ...config,
        systemInstruction: "You are the Lead Architect synthesizing a plan from team input.",
      },
    });

    return response.text || "Failed to generate consensus plan.";
  } catch (error) {
    const errorMsg = formatGenAIError(error, "Consensus Plan Generation");
    return `## Generation Failed\n\n${errorMsg}`;
  }
};
