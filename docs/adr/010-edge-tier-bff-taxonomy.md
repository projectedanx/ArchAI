# ADR 010: Synthesis of Edge-Tier Gateways & BFF Taxonomy

## Status
Accepted

## Context
The system requires formalizing the topological boundaries between Standard API Gateways and Backends for Frontends (BFF) patterns to prevent unmediated client-to-service communication. We must define how these paradigms partition system responsibilities while ensuring Paraconsistent Annotated Logic (PAL2v) constraints are respected, and any resulting cognitive conflicts route to Epistemic Escrow.

### Architectural Taxonomy & Structural Modeling

```
                   [ STANDARD API GATEWAY MODEL ]

                      Web / Mobile / Third-Party
                                  │
                                  ▼
                   ┌──────────────────────────────┐
                   │     Standard API Gateway     │ ◄── Unified ingress Proxy/Facade
                   └──────────────┬───────────────┘
                                  ├──────────────────────┐
                                  ▼                      ▼
                           [ Product Svc ]        [ Checkout Svc ]


                     [ BACKENDS FOR FRONTENDS MODEL ]

         Mobile Client                            Web Client
               │                                      │
               ▼                                      ▼
       ┌───────────────┐                      ┌───────────────┐
       │  Mobile BFF   │ ◄── Client-Specific  │    Web BFF    │
       └───────┬───────┘     Adapters/Façades └───────┬───────┘
               │                                      │
               ├──────────────────────┬───────────────┘
               ▼                      ▼
        [ Product Svc ]        [ Checkout Svc ]
```

#### Standard API Gateway
* **Topological Role:** Centralized, reverse-proxy interface at network perimeter. Domain-agnostic entry point.
* **Primary Concerns:** Edge infrastructure offloading (routing, TLS, rate-limiting, edge auth, monitoring).
* **Fan-Out Relationship:** One-to-Many.

#### Backend for Frontend (BFF)
* **Topological Role:** Client-specific API wrappers/adapters.
* **Primary Concerns:** Client-specific serialization, views, payload trimming, gateway aggregation.
* **Fan-Out Relationship:** One-to-One deployment boundary.

## Decision
We enforce the "Four Pillars of Specification Planning":

### I. Automated Discovery and Constraint Mining
* **Hard Boundaries (Invariants):**
  * Gateway MUST remain decoupled from UI rendering logic (Invariant `SCAR-GATEWAY-DECOUPLE`).
  * BFF lifecycle MUST strictly bind to its matching client (Invariant `SCAR-BFF-BINDING`).
* **Soft Targets (Optimizations):**
  * Gateway: Maximize RPS, minimize hop latency.
  * BFF: Minimize client-side chattiness via payload aggregation.

### II. Isomorphic Formalization
* **Gateway Isomorphism:** GoF Facade and Proxy pattern materialization.
* **BFF Isomorphism:** Interface Segregation Principle (ISP) and Adapter pattern materialization.

### III. Parametric Trade-off Modeling
* **Gateway:** Minimal operational footprint vs. Cross-team configuration bottlenecks.
* **BFF:** High team autonomy vs. Duplicated boilerplate/increased DevOps operational overhead.

### IV. Continuous Falsification and Edge-Case Stress Testing
* **The "Shared Persistence" Trap:** BFFs bypassing downstream APIs to write to databases breaks Bounded Contexts.
* **The "Gateway Sinkhole" Scenario:** Failing downstream dependencies exhausting gateway thread pools requires Bulkhead Isolation.

## Consequences
* **Positive:** Clear architectural guidelines for routing ingress traffic. Prevent tight coupling.
* **Negative:** Increased configuration complexity.
* **Escrow Integration:** Any semantic drift detected regarding Gateway/BFF boundary definitions MUST trigger Epistemic Escrow for human resolution (Semantic Mutex Lock).
