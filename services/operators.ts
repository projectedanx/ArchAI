import { GoogleGenAI } from "@google/genai";
import { PROMPTS } from "../prompts";
import { DecisionRecord, ScarRatchet } from "../types";

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
export const executeStareDecisis = async (goal: string, decisionLog: DecisionRecord[], scarRegistry: ScarRatchet[] = []): Promise<string> => {
    const ai = getAIClient();
    // Use fast model for check
    const model = 'gemini-3-flash-preview'; 
    
    const decisionContext = decisionLog.map(d => 
        `[${d.id}] (${d.status}): ${d.title} (Tags: ${d.tags.join(', ')})`
    ).join('\n');

    const scarContext = scarRegistry.map(s =>
        `[SCAR-${s.id.substring(0, 8)}] ${s.constraint}: ${s.description}`
    ).join('\n');

    const prompt = `
    GOAL: ${goal}

    DECISION LOG (Architectural Precedents):
    ${decisionContext}

    ACTIVE SCAR RATCHETS (Hard Constraints - DO NOT VIOLATE):
    ${scarContext || 'None'}
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

/**
 * CFDI Evaluation Operator (Confidence-Fidelity Divergence Index)
 * Evaluates the divergence or cognitive tension of a new response against the main goal.
 */
export const evaluateCFDI = async (goal: string, responseText: string, discussionHistory: string): Promise<number> => {
    const ai = getAIClient();
    const model = 'gemini-3-flash-preview';

    const systemInstruction = `You are the CFDI Evaluator (Confidence-Fidelity Divergence Index).
Your task is to calculate the cognitive divergence of the agent's new response against the primary goal and established discussion context.
Output ONLY a single float value between 0.00 and 1.00.
- 0.00: Perfect alignment, no tension.
- 0.15+: Significant divergence, contradiction, or hallucinated tangents (triggers Epistemic Escrow).
- 1.00: Complete contradiction or total irrelevance.
Do not output any markdown formatting, text, or explanation. Just the number.`;

    const prompt = `
    PRIMARY GOAL: ${goal}

    DISCUSSION HISTORY (Context):
    ${discussionHistory || 'No prior discussion.'}

    NEW AGENT RESPONSE TO EVALUATE:
    ${responseText}
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                systemInstruction,
                temperature: 0.1, // Low temperature for consistency
            }
        });

        const text = response.text?.trim() || "0";
        const score = parseFloat(text);

        if (isNaN(score)) {
            console.warn("CFDI Evaluator returned non-numeric value:", text);
            return 0; // Fail open
        }

        return Math.max(0, Math.min(1, score)); // Clamp between 0 and 1
    } catch (error) {
        console.error("CFDI Evaluator Error", error);
        return 0; // Fail open if operator fails
    }
};
