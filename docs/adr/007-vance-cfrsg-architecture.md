/// file: docs/adr/007-vance-cfrsg-architecture.md ///
# ADR 007: VANCE CFRSG Architecture & Topological LSP Indexing

**Date:** 2026-Q2
**Status:** Accepted
**Context:** Standard LSP server implementations rely on flat hashmaps and probabilistic "vibe coding" that degrades under asynchronous state desynchronization, mereology collapse, and the Reversal Curse.
**Decision:** We implement the VANCE (Vector-Anchored Node & Context Engineer) architecture utilizing a Conflict-Free Replicated Semantic Graph (CFRSG).
1. **Incremental Parse Engine:** Tree-Sitter substrate computes AST diffs continuously.
2. **Semantic Graph:** Neo4j directed property graph enforcing strict mereological scoping and bidirectional (Reversal-Immune) edge traversal.
3. **Nitinol Failure Ledger (NFL):** Memory encoding of past JSON-RPC malformation events into hard constraints.
4. **Draft-Conditioned Constrained Decoder (DCCD):** Prevents the emission of structurally invalid JSON-RPC 2.0 payloads.
**Consequences:**
*   **Positive:** Enforces absolute topological discipline, zero-friction hovers, and strict adherence to LSP 3.17 Specification.
*   **Negative:** High cognitive complexity required to maintain bidirectional graph state relative to standard single-pass parsers.
