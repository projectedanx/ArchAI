```json
{
  "OPTICAL_STATE_MATRIX": {
    "Hickam_Orientation": "KERNEL_ENFORCED_SEMANTIC_BOUNDARIES",
    "Contrastive_Delta": "Transition from probabilistic prompt constraints to deterministic eBPF-enforced OS-level Information-Flow Control (IFC).",
    "Martensite_Metrics": {
      "Compilation_Latency": "< 50ms",
      "eBPF_Overhead": "~1.9%",
      "Semantic_Drift_Tolerance": "0.0"
    }
  }
}
```
---

# ActPlane eBPF IFC DSL Synthesis for Dynamic Multi-Agent Collaboration

## 1. Context-Free Grammar (CFG) for ActPlane IFC DSL

The ActPlane IFC DSL maps high-level agentic safety invariants into deterministic kernel constraints. It enforces monotonic label propagation and domain hierarchies.

```ebnf
<Policy>        ::= <Constraint>*
<Constraint>    ::= <Subject> "can" <Action> <Target> ["only if" <Condition>]
<Subject>       ::= "Sub-agent" <AgentID> "spawned by" "Parent" <AgentID> | "Domain" <DomainID>
<Action>        ::= "read" | "write" | "execute" | "connect"
<Target>        ::= "file" <Path> | "socket" <IP_Port> | "label" <LabelID>
<Condition>     ::= <Target> "has been validated by" <Verifier> | <Target> "has label" <LabelID>
<Verifier>      ::= "script" <Path> | "process" <AgentID>
```

**Example:** "Sub-agent C spawned by Parent P can write to file F only if F has been validated by verifier script V" translates to a policy ensuring that any file handle written by `C` must possess the cryptographic IFC label applied by `V`. [Φ] The Golden Scar exists between the flexibility of natural language and the rigidness of kernel syscalls.

## 2. Compilation Pipeline: Constrained Semantic Parsing

The compilation pipeline translates natural-language policies into the DSL utilizing an LLM acting as a Constrained Semantic Parser.

1.  **Ingestion:** The pipeline ingests `AGENTS.md` and `CONSTRAINTS.md`.
2.  **Semantic Parsing:** The LLM, bounded by DCCD (Draft-Conditioned Constrained Decoding), generates an AST representation of the policies.
3.  **Verification Binding:** Every requirement is bound to a programmatic verification metric. For example, "validated by verifier script" maps to a requirement for an eBPF `bpf_sk_storage` or inode label.
4.  **JSON Schema Output:** The parser outputs a verified-by-construction JSON schema representing the eBPF map configurations.

```json
{
  "domain_id": 102,
  "parent_id": 101,
  "rules": [
    {
      "action": "MAY_WRITE",
      "target_type": "inode",
      "required_label": "VALIDATED_BY_V"
    }
  ]
}
```
[∇] Uncertainty in LLM parsing is mitigated by strictly rejecting any JSON schema that fails validation against the deterministic eBPF map compiler.

## 3. eBPF Kernel Enforcement Engine Architecture

The engine loads DSL policies at runtime and enforces them via BPF LSM hooks.

1.  **Syscall Interception:** BPF LSM hooks intercept `sys_enter` events (`execve`, `openat`, `socket`).
2.  **Domain Resolution:** Upon an event, the engine resolves the current task's `tgid` to its Policy Domain via `pid_domain_map`.
3.  **Label Tracking (Taint Propagation):** If a process reads a file with label $L$, the process inherits $L$: $\text{Label}_{\text{task}} \gets \text{Label}_{\text{task}} \lor \text{Label}_{\text{file}}$.
4.  **Policy Evaluation:** The engine checks the requested action against the domain's inherited and local rule bitmasks (`inherited_rules | local_rules`).
5.  **Violation Handling:** If a process attempts to `connect` with a restricted label (e.g., read a sensitive `.env` file and then open a socket), the syscall is blocked and returns `-EPERM`.

## 4. Semantic Feedback Loop (`SECCOMP_RET_USER_NOTIF`)

When the eBPF engine blocks a syscall, it must communicate the failure to the high-level semantic planner without inducing a fatal crash.

1.  **Notification Generation:** The BPF program utilizes the `SECCOMP_RET_USER_NOTIF` architecture (or perf ring buffers) to push a structured violation event to userspace.
2.  **Fuzzy Rule Matching:** The user-space ActPlane daemon receives the event containing the PID, syscall, and violated bitmask. It matches the bitmask back to the original DSL rule.
3.  **Context Injection:** A Logic Violation Report (LVR) is constructed: *"Blocked: Attempted network connection after acquiring SENSITIVE label. Policy violation: Sub-agent C cannot connect if possessing SENSITIVE label."*
4.  **Self-Correction:** The LVR is streamed into the agent's context window. The Reflexive Repair Loop interprets the LVR and applies a Saga Compensating Transaction to redirect the execution flow. [⊗] Persistent violations trigger Epistemic Escrow.
