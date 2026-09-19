import numpy as np
from scipy.optimize import minimize
from typing import List, Dict, Tuple, Set, Union, Optional
import threading
import copy
import time


class StagedTrajectoryNode:
    """
    Represents a node (prefix state) within the MCTS trajectory hierarchy.
    """
    def __init__(self, prefix_id: str, parent_id: Optional[str] = None):
        self.prefix_id = prefix_id
        self.parent_id = parent_id
        self.children_ids: Set[str] = set()

        # Rollout metrics for expectation baseline calculations
        self.total_rollouts: int = 0
        self.successful_rollouts: int = 0
        self.has_success_completion: bool = False

class TreeOPOGroup:
    """
    Manages a group of completions originating from different prefixes
    within a shared MCTS reasoning tree. Calculates SAE advantages.
    """
    def __init__(self, group_id: str):
        self.group_id = group_id
        self.nodes: Dict[str, StagedTrajectoryNode] = {}

        # Maps index in the batch to metadata: (prefix_id, reward)
        self.samples: List[Tuple[str, float]] = []

    def add_node(self, prefix_id: str, parent_id: Optional[str] = None) -> None:
        if prefix_id not in self.nodes:
            self.nodes[prefix_id] = StagedTrajectoryNode(prefix_id, parent_id)
            if parent_id and parent_id in self.nodes:
                self.nodes[parent_id].children_ids.add(prefix_id)

    def register_sample(self, prefix_id: str, reward: float) -> int:
        """Registers an online completion rollout, updating tree metadata."""
        sample_idx = len(self.samples)
        self.samples.append((prefix_id, reward))

        # Propagate statistics upward through the prefix chain
        curr_id = prefix_id
        is_success = (reward > 0.5)

        while curr_id is not None:
            node = self.nodes[curr_id]
            node.total_rollouts += 1
            if is_success:
                node.successful_rollouts += 1
                node.has_success_completion = True
            curr_id = node.parent_id

        return sample_idx

    def get_empirical_expectation(self, prefix_id: str) -> float:
        """Computes V_E(p) -- the empirical subtree success rate."""
        node = self.nodes.get(prefix_id)
        if not node or node.total_rollouts == 0:
            return 0.0
        return node.successful_rollouts / node.total_rollouts

    # --- APPROACH 1: HEURISTIC EXPECTATION BASELINE (ANALYTIC & O(N)) ---
    def compute_heuristic_advantages(self, alpha: float = 0.5) -> np.ndarray:
        """
        Computes advantages as a'_i = r_i - alpha * V_E(p_i), followed by
        mean-centering to stabilize training and maintain tree consistency.
        """
        rewards = np.array([sample[1] for sample in self.samples], dtype=np.float64)
        raw_advantages = np.zeros_like(rewards)

        for i, (prefix_id, r_i) in enumerate(self.samples):
            v_e = self.get_empirical_expectation(prefix_id)
            # Subtract the prefix-conditioned baseline to capture local surprise
            raw_advantages[i] = r_i - alpha * v_e

        # Mean-center raw advantages to satisfy sum(a) = 0
        mean_offset = np.mean(raw_advantages)
        final_advantages = raw_advantages - mean_offset
        return final_advantages

    # --- APPROACH 2: FORMAL CONSTRAINED QUADRATIC PROGRAM (SAE QP) ---
    def build_ordering_constraints(self, margin: float = 0.01) -> List[Tuple[int, int, float]]:
        """
        Extracts C_order = C_pair U C_triplet constraint boundaries.
        Returns list of tuples: (idx_i, idx_j, margin_ij) enforcing a_i + margin <= a_j.
        """
        constraints = []
        num_samples = len(self.samples)

        # Auxiliary structures for quick lookup
        prefix_to_idxs: Dict[str, List[int]] = {}
        for idx, (prefix_id, _) in enumerate(self.samples):
            prefix_to_idxs.setdefault(prefix_id, []).append(idx)

        # Compile constraints by pairwise cross-comparison of batch samples
        for i in range(num_samples):
            p_i, r_i = self.samples[i]
            node_i = self.nodes[p_i]

            for j in range(num_samples):
                if i == j:
                    continue
                p_j, r_j = self.samples[j]
                node_j = self.nodes[p_j]

                # Helper: checks if prefix A contains prefix B
                is_prefix_relation = p_i.startswith(p_j) and p_i != p_j
                is_sibling_relation = (node_i.parent_id == node_j.parent_id) and (node_i.parent_id is not None)

                # 1. Pair-wise (Parent-Child) Consistency (C_pair)
                # If prefix_j is a prefix of prefix_i, and r_j = 0, r_i = 1, then a_j + margin <= a_i
                if is_prefix_relation and r_j < 0.5 and r_i > 0.5:
                    constraints.append((j, i, margin))

                # 2. Triplet Consistency (C_triplet)
                # If siblings are both failing (r_i = 0, r_j = 0) and neither has success completions,
                # but sibling_i has a successful deeper descendant path in the tree,
                # prioritize exploration of sibling_j by forcing a_i + margin <= a_j
                if is_sibling_relation and r_i < 0.5 and r_j < 0.5:
                    # If sibling i has successful completion, but sibling j does not
                    if node_i.has_success_completion and not node_j.has_success_completion:
                        constraints.append((i, j, margin))
                    elif not node_i.has_success_completion and not node_j.has_success_completion:
                        # Scan tree
                        has_succ_descendant = False
                        for p_k, node_k in self.nodes.items():
                            if p_k.startswith(p_i) and p_k != p_i and node_k.has_success_completion:
                                has_succ_descendant = True
                                break
                        if has_succ_descendant:
                            constraints.append((i, j, margin))

        return constraints

    def compute_sae_qp_advantages(self, margin: float = 0.01, soft: bool = True) -> np.ndarray:
        """
        Solves the constrained convex Quadratic Program for SAE advantages
        via scipy.optimize (SLSQP). Warm-started from mean-centered rewards.
        """
        rewards = np.array([sample[1] for sample in self.samples], dtype=np.float64)
        n = len(rewards)

        # Center rewards to construct r_0 seed
        r_0 = rewards - np.mean(rewards)

        # Build constraint matrix from C_order
        ordering_relations = self.build_ordering_constraints(margin)

        # Objective: minimize 0.5 * ||a - r_0||^2
        def objective(a):
            diff = a - r_0
            return 0.5 * np.dot(diff, diff)

        def jacobian(a):
            return a - r_0

        # Equational Constraint: sum(a) = 0
        eq_cons = {
            'type': 'eq',
            'fun': lambda a: np.sum(a),
            'jac': lambda a: np.ones_like(a)
        }

        # Norm Constraint: ||a||^2 <= N (soft) or ||a||^2 = N (hard)
        if soft:
            norm_cons = {
                'type': 'ineq',
                'fun': lambda a: n - np.dot(a, a),
                'jac': lambda a: -2 * a
            }
        else:
            norm_cons = {
                'type': 'eq',
                'fun': lambda a: np.dot(a, a) - n,
                'jac': lambda a: 2 * a
            }

        constraints = [eq_cons, norm_cons]

        # Add Linear Inequalities from C_order: a_j - a_i - margin >= 0
        for i_idx, j_idx, margin_val in ordering_relations:
            # We capture local indexes within lambda scoping
            ineq_fun = lambda a, i=i_idx, j=j_idx, m=margin_val: a[j] - a[i] - m
            # Derivative: sparse vector with -1 at i and +1 at j
            def ineq_jac(a, i=i_idx, j=j_idx):
                grad = np.zeros_like(a)
                grad[j] = 1.0
                grad[i] = -1.0
                return grad

            constraints.append({
                'type': 'ineq',
                'fun': ineq_fun,
                'jac': ineq_jac
            })

        # Warm start using the mean-centered reward vector
        x0 = np.copy(r_0)

        # Solve the QP using sequential least squares programming
        res = minimize(
            fun=objective,
            x0=x0,
            jac=jacobian,
            constraints=constraints,
            method='SLSQP',
            options={'ftol': 1e-9, 'maxiter': 100}
        )

        # Fallback to heuristic values in case of optimizer divergence or infeasibility
        if not res.success:
            return self.compute_heuristic_advantages(alpha=0.5)

        return res.x

    # --- APPROACH 3: DUAL-SCALE ADVANTAGE BALANCING ---
    def compute_spectral_information_discrepancy(self, kl_divergence: float = 0.1) -> float:
        '''
        Computes Psi representing the divergence between the empirical prefix-conditioned expectation
        and the unconstrained policy rewards based on spectral radius of parent-child adjacency.
        '''
        n = len(self.samples)
        if n < 2:
            return 0.0

        # Build adjacency matrices
        D_parent = np.zeros((n, n))
        D_children = np.zeros((n, n))

        for i, (p_i, _) in enumerate(self.samples):
            node_i = self.nodes.get(p_i)
            if not node_i:
                continue
            for j, (p_j, _) in enumerate(self.samples):
                node_j = self.nodes.get(p_j)
                if not node_j:
                    continue
                if node_j.parent_id == p_i:
                    D_children[i, j] = 1.0
                if node_i.parent_id == p_j:
                    D_parent[i, j] = 1.0

        diff_matrix = D_parent - D_children
        # Compute spectral radius (largest absolute eigenvalue)
        eigenvalues = np.linalg.eigvals(diff_matrix)
        spectral_radius = np.max(np.abs(eigenvalues))

        return spectral_radius * kl_divergence

    def compute_dual_scale_advantages(self, tau_equilibrium: float = 0.12, base_margin: float = 0.01, kl_divergence: float = 0.1) -> np.ndarray:
        '''
        Adaptive solver that interpolates between O(N) heuristic and QP projector.
        '''
        psi = self.compute_spectral_information_discrepancy(kl_divergence)

        if psi < tau_equilibrium:
            # Bypass SLSQP, deploy O(N) expectation heuristic to conserve compute
            return self.compute_heuristic_advantages(alpha=0.5)
        else:
            # High non-stationarity, scale constraint margin proportionally to local Shannon entropy
            # Approximating Shannon entropy of the completion token distribution by the divergence Psi
            dynamic_margin = base_margin * (1.0 + psi)
            return self.compute_sae_qp_advantages(margin=dynamic_margin, soft=True)

    # --- APPROACH 4: ASYNCHRONOUS MULTI-THREADED ADMM PROJECTOR ---
    def compute_admm_projection(self, r_0: np.ndarray, margin: float = 0.01, rho: float = 1.0, max_iter: int = 100) -> np.ndarray:
        '''
        Lock-free, vectorized Alternating Direction Method of Multipliers (ADMM) solver.
        Decouples quadratic loss ||a - r_0||^2 from sparse linear inequalities L a <= 0.
        '''
        n = len(r_0)
        a = np.copy(r_0)

        # Build constraint matrix L from C_order
        ordering_relations = self.build_ordering_constraints(margin)
        m = len(ordering_relations)

        if m == 0:
            # Analytical solution for L2-ball projection ||a||_2^2 <= N
            norm_sq = np.sum(a**2)
            if norm_sq > n:
                a = a * np.sqrt(n / norm_sq)
            return a - np.mean(a)

        L = np.zeros((m, n))
        c = np.zeros(m)
        for idx, (i_idx, j_idx, margin_val) in enumerate(ordering_relations):
            # Constraint: a_i + margin <= a_j  => a_i - a_j <= -margin
            L[idx, i_idx] = 1.0
            L[idx, j_idx] = -1.0
            c[idx] = -margin_val

        # Initialize ADMM variables
        z = np.zeros(m)
        u = np.zeros(m)

        # Precompute cache for z-update
        L_t = L.T
        L_L_t = L @ L_t
        try:
            inv_matrix = np.linalg.inv(np.eye(n) + rho * (L_t @ L))
        except np.linalg.LinAlgError:
            # Fallback if singular
            inv_matrix = np.eye(n)

        for _ in range(max_iter):
            # a-update: minimize 0.5 * ||a - r_0||^2 + (rho/2) * ||L a - z + u||^2
            a = inv_matrix @ (r_0 + rho * L_t @ (z - u))

            # z-update: projection onto non-positive orthant (c - L a)
            La = L @ a
            z = np.minimum(La + u, c)

            # u-update: dual ascent
            u = u + La - z

            # Primal-dual feasibility check
            primal_res = np.linalg.norm(La - z)
            dual_res = np.linalg.norm(rho * L_t @ (z - np.minimum(La + u, c)))

            if primal_res < 1e-5 and dual_res < 1e-5:
                break

        # L2-ball projection in O(1) time
        norm_sq = np.sum(a**2)
        if norm_sq > n:
            a = a * np.sqrt(n / norm_sq)

        # Ensure zero-mean
        a = a - np.mean(a)
        return a

    def _admm_worker(self, r_0: np.ndarray, margin: float):
        result = self.compute_admm_projection(r_0, margin)
        # Double-buffered pointer swap (simulated by updating instance state lock-free)
        self._latest_admm_advantages = result
        self._admm_running = False

    def trigger_async_admm(self, margin: float = 0.01) -> np.ndarray:
        '''
        Runs ADMM projector in a background thread pool utilizing double-buffered pointer swaps.
        Returns the latest cached advantage tensor to avoid blocking the forward-backward pass.
        '''
        if not hasattr(self, '_latest_admm_advantages'):
            self._latest_admm_advantages = self.compute_heuristic_advantages(alpha=0.5)
            self._admm_running = False

        if self._admm_running:
            return self._latest_admm_advantages

        rewards = np.array([sample[1] for sample in self.samples], dtype=np.float64)
        if len(rewards) == 0:
            return np.array([])

        r_0 = rewards - np.mean(rewards)

        self._admm_running = True
        thread = threading.Thread(target=self._admm_worker, args=(r_0, margin))
        thread.daemon = True
        thread.start()

        return self._latest_admm_advantages

    # --- APPROACH 5: ENTROPY-WEIGHTED ADVANTAGE RECOVERY (EWAR) HOOK ---
    def compute_advantage_variance_correlation(self, a_star: np.ndarray, mixed_partial_derivative: np.ndarray) -> float:
        '''
        Calculates correlation coefficient between advantage magnitude and mixed partial derivative.
        Chi = Corr(|a^*|, d^2 A / dm dtheta)
        '''
        if len(a_star) < 2:
            return 1.0

        a_mag = np.abs(a_star)

        # Avoid division by zero warnings for zero variance arrays
        if np.var(a_mag) == 0 or np.var(mixed_partial_derivative) == 0:
            return 0.0

        correlation_matrix = np.corrcoef(a_mag, mixed_partial_derivative)
        return correlation_matrix[0, 1]

    def compute_ewar_advantages(self, a_star: np.ndarray, mixed_partial: np.ndarray, prefix_log_probs: np.ndarray, accuracy_plateau: bool = True) -> np.ndarray:
        '''
        Entropy-Weighted Advantage Recovery (EWAR) hook to mitigate "Semantic Saponification".
        When correlation Chi approaches 0, forces standard-deviation norm to c=1 and scales
        advantages by inverse log-probability of parent prefix to restore structural contrast.
        '''
        chi = self.compute_advantage_variance_correlation(a_star, mixed_partial)

        # Saponification trigger threshold
        if abs(chi) < 0.1 and accuracy_plateau:
            n = len(a_star)
            # Force c=1 standard deviation normalization (L2-norm squared = n)
            norm_sq = np.sum(a_star**2)
            if norm_sq > 0:
                a_star = a_star * np.sqrt(n / norm_sq)

            # Scale by inverse log-probability to boost exploration of structurally distinct paths
            # Add small epsilon to avoid divide by zero
            inverse_log_probs = 1.0 / (np.abs(prefix_log_probs) + 1e-8)

            # Normalize the scaling factors to preserve mean=0 invariant
            scaling_factors = inverse_log_probs / np.mean(inverse_log_probs)
            a_ewar = a_star * scaling_factors

            # Recenter and enforce exact norm
            a_ewar = a_ewar - np.mean(a_ewar)
            norm_sq = np.sum(a_ewar**2)
            if norm_sq > 0:
                a_ewar = a_ewar * np.sqrt(n / norm_sq)
            return a_ewar

        return a_star
