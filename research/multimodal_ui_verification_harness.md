# Automated Self-Healing Multimodal UI Verification Harness

## Domain: QA Automation & Vision-ML Engineering
**Goal:** Engineer an automated, self-healing visual testing harness using multimodal agents and Playwright Replay Loops.

---

### 1. Test-Driven Visual Spec (The Multimodal Red Phase)

Traditional UI testing relies on brittle CSS selectors. This harness utilizes a vision-language model (e.g., Gemini 3 Pro) to interpret unstructured visual inputs (sketches, Figma PDFs) into deterministic visual constraints.

*   **Ingestion:** The user submits a `design_spec.pdf` or hand-drawn layout.
*   **Translation (Agent A):** The agent parses the visual document and generates a structured JSON representation of the layout constraints (e.g., "Login button must be 40px high, right-aligned, hex #0044FF").
*   **Test Generation:** The agent translates these constraints into a Playwright test script.
*   **Execution:** The Playwright script runs against the baseline code. It takes a screenshot and performs pixel-match or bounding-box assertions. It intentionally fails (Red Phase), proving the test correctly identifies the missing or incorrect UI elements.

**JSON-RPC Tool Definition (Playwright Execution):**
```json
{
  "name": "execute_visual_test",
  "description": "Runs a Playwright script and returns layout divergence metrics and DOM snapshots.",
  "parameters": {
    "type": "object",
    "properties": {
      "script_path": { "type": "string" },
      "target_url": { "type": "string" }
    },
    "required": ["script_path", "target_url"]
  }
}
```

### 2. Automated Layout Grading & Code Repair (The Multimodal Green Phase)

Once the baseline failure is established, the repair loop begins.

*   **Observation:** The harness executes the UI, capturing a high-resolution screenshot and the DOM state.
*   **Grading:** The vision model is provided the *target* design spec and the *current* screenshot. It calculates the layout delta (e.g., "Margin-top is 10px, expected 24px").
*   **Code Mutation (Agent B):** Based on the visual delta, the Implementer agent proposes changes directly to the React component or CSS module.
*   **Re-Execution:** The Playwright test runs again. The loop repeats until the visual delta is below the acceptable threshold (e.g., $95\%$ structural alignment).

### 3. Verification and Checkpointing (Atomic Rollbacks)

To prevent the agent from progressively mangling the UI during iteration (style drift), the harness enforces atomic filesystem snapshots.

*   **Checkpoint Creation:** Before *any* code modification in the Green Phase, the harness creates a shadow Git stash or a local file backup.
*   **Regression Check:** Alongside the specific visual test, a broader visual regression suite runs to ensure the new CSS rule hasn't broken adjacent components.
*   **Rollback Trigger:** If the layout delta *increases* (the UI gets worse) for two consecutive turns, or if a global regression test fails, the harness automatically invokes the `/restore` command, reverting the filesystem to the last known good state and notifying the agent of the failed path.

**Architectural Block Diagram:**
```text
[Design Spec (PDF/Image)] ---> [Agent A: Test Architect] ---> [Playwright Script (spec.test.ts)]
                                                                     |
                                                                     V
[Current UI Codebase] <--- [Agent B: Implementer] <======== [Sandbox Execution]
       |                           ^                                 |
       | (Mutate)                  | (Delta Feedback)                |
       V                           |                                 V
[Atomic Checkpoint] ----------------------------------------> [Screenshot & DOM State]
```
