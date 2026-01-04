import { ConsentReceipt, ConsentStatus } from '../models/receipt';

// Minimal implementation of a hash function for browser/node compatibility
// In a real crypto-strict enviroment, we'd use SubtleCrypto, but for this domain model
// we will use a rigorous JSON stringify + SHA-256 (simulated or real if env allows).
// For now, to keep it sync and simple for the "Check" phase, we'll use a placeholder
// robust hash or a sync simulation if `crypto` isn't async-friendly in the model.

// ACTUALLY: We should use async for the receipt generation to allow for proper crypto.

export class ReceiptGenerator {
  /**
   * Generates a cryptographically verifiable receipt.
   */
  static async generate(
    policyVersion: string,
    purposes: Record<string, ConsentStatus>,
    subjectId?: string,
  ): Promise<ConsentReceipt> {
    const timestamp = new Date().toISOString();
    const id = crypto.randomUUID();

    const payload = {
      id,
      timestamp,
      policyVersion,
      purposes,
      subjectId,
    };

    // stable stringify for hashing
    const stableString = JSON.stringify(payload, Object.keys(payload).sort());
    const hash = await this.sha256(stableString);

    return {
      ...payload,
      hash,
      userAgent:
        typeof navigator !== 'undefined'
          ? navigator.userAgent
          : 'server-rendering',
    };
  }

  private static async sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}
