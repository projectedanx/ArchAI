# 📝 Implementation Roadmap

## 🔴 Immediate (Technical Debt)
- [x] **State Persistence:** `DriftEntry` and `AgentMessage` arrays are lost on refresh. Implement `localStorage` or IndexedDB persistence for the `WorkflowState`.
- [x] **Error Handling:** Improve `try/catch` blocks in `geminiService.ts` to handle specific API errors (429 Rate Limit, 500 Server Error) gracefully.

## 🟡 Short Term (Feature Parity)
- [x] **Real Drift Analysis:** Replace `diffMetrics` mock in `PlanViewer.tsx` with actual data parsed from the `generateConsensusPlan` output.
- [x] **Prompt Optimization:** Move System Prompts from `constants.ts` to a dedicated `prompts/` directory or `PROMPTS.md` to adhere to "Codebase" factors (Code vs Config).
- [x] **Export Functionality:** Add a button to export the `finalPlan` to PDF or Markdown.
- [x] **Domain-Native Operators:** Implement **Stare Decisis** (Consistency) and **DDx Protocol** (Exclusion) operators.

## 🟢 Long Term (Sovereign Architecture)
- [ ] **MCP Integration:** Implement the **Model Context Protocol** to allow the agent to actually read/write local files (`node_modules`, `.git`) safely.
    *   *Reference:* "MCP Filesystem Boundary Enforcement" plan.
- [ ] **Stare Decisis Backend:** Connect the Stare Decisis operator to a real Vector DB or `decisions.json` file loader instead of mock data.
- [ ] **NeMo Guardrails:** Integrate a proxy layer to filter inputs/outputs for toxicity and compliance.
- [ ] **12-Factor Isolation:** Containerize the agent runtime (Docker) to separate it from the UI layer.
