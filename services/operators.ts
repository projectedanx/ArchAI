import { GoogleGenAI } from "@google/genai";
import { PROMPTS } from "../prompts";
import { DecisionRecord } from "../types";

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

/**
 * Stare Decisis Operator (Consistency Engine)
 * Checks the current goal against a log of Architectural Decision Records (ADRs).
 */
export const executeStareDecisis = async (goal: string, decisionLog: DecisionRecord[]): Promise<string> => {
    const ai = getAIClient();
    // Use fast model for check
    const model = 'gemini-3-flash-preview'; 
    
    const decisionContext = decisionLog.map(d => 
        `[${d.id}] (${d.status}): ${d.title} (Tags: ${d.tags.join(', ')})`
    ).join('\n');

    const prompt = `
    GOAL: ${goal}

    DECISION LOG (Architectural Precedents):
    ${decisionContext}
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                systemInstruction: PROMPTS.OPERATORS.STARE_DECISIS,
            }
        });
        return response.text || "NO_CONFLICT";
    } catch (error) {
        console.error("Stare Decisis Error", error);
        return "NO_CONFLICT"; // Fail open if operator fails
    }
};

/**
 * DDx Protocol Operator (Exclusion Engine)
 * Performs a Differential Diagnosis on the architectural discussion.
 */
export const executeDDx = async (goal: string, discussionHistory: string): Promise<string> => {
    const ai = getAIClient();
    // Use Pro model for deep reasoning/critique
    const model = 'gemini-3-pro-preview'; 

    const prompt = `
    GOAL: ${goal}

    DISCUSSION HISTORY:
    ${discussionHistory}
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                systemInstruction: PROMPTS.OPERATORS.DDX,
                thinkingConfig: { thinkingBudget: 1024 } // Modest thinking budget for critique
            }
        });
        return response.text || "DDx Analysis failed.";
    } catch (error) {
        return formatGenAIError(error, "DDx Operator");
    }
};
