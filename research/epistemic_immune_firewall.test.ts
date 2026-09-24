import { describe, it, expect, beforeEach } from 'vitest';
import {
  EpistemicImmuneFirewall,
  ScientificClaim,
  VerifiableCredential
} from './epistemic_immune_firewall';

describe('Epistemic Immune Firewall', () => {
  let firewall: EpistemicImmuneFirewall;

  beforeEach(() => {
    firewall = new EpistemicImmuneFirewall();
  });

  it('should detect and prevent Citation Circularity', () => {
    const previousClaim: ScientificClaim = {
      id: 'claim-001',
      thesis: 'Agent behavior is deterministic under high thermal load.',
      sources: ['external-paper-A'],
      confidence: 0.9
    };

    // Process first claim to store it in history
    firewall.evaluateClaim(previousClaim);

    const circularClaim: ScientificClaim = {
      id: 'claim-002',
      thesis: 'Thermal load dictates deterministic execution.',
      sources: ['claim-001'], // Citing its own previous hallucination/claim
      confidence: 0.95
    };

    const isCircular = firewall.detectCitationCircularity(circularClaim);
    expect(isCircular).toBe(true);

    const result = firewall.evaluateClaim(circularClaim);
    expect(result.approved).toBe(false);
    expect(result.reason).toContain('Citation Circularity Detected');
  });

  it('should generate a Verifiable Credential for an approved claim', () => {
    const validClaim: ScientificClaim = {
      id: 'claim-003',
      thesis: 'Topological boundaries prevent drift.',
      sources: ['external-paper-B', 'verified-dataset-C'],
      confidence: 0.88
    };

    const result = firewall.evaluateClaim(validClaim);
    expect(result.approved).toBe(true);
    expect(result.vc).toBeDefined();

    if (result.vc) {
        expect(result.vc.issuer).toBe('Epistemic_Immune_Firewall_Node');
        expect(result.vc.credentialSubject.claimId).toBe('claim-003');
        expect(result.vc.proof.type).toBe('Ed25519Signature2018');
        expect(result.vc.proof.jws).toBeDefined();
    }
  });

  it('should trigger the Adversarial Counter-Argumentation Unit (ACU)', () => {
    const weakClaim: ScientificClaim = {
      id: 'claim-004',
      thesis: 'All agents eventually converge.',
      sources: ['unverified-blog'],
      confidence: 0.4 // Low confidence triggers ACU or fails outright
    };

    const acuResult = firewall.runACU(weakClaim);
    expect(acuResult.counterArguments.length).toBeGreaterThan(0);
    expect(acuResult.structuralFlawsFound).toBeDefined();
  });
});
