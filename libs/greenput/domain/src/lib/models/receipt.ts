export type ConsentStatus = 'granted' | 'denied';

/**
 * An immutable record of a consent decision.
 * MUST be cryptographically hashable to prove integrity.
 */
export interface ConsentReceipt {
  /** UUID */
  id: string;
  /** ISO 8601 Timestamp of the decision */
  timestamp: string;
  /** Hashed or anonymous subject ID */
  subjectId?: string;
  /** Map of Purpose ID -> Status */
  purposes: Record<string, ConsentStatus>;
  /** Version of the policy/definitions consented to */
  policyVersion: string;
  /** Cryptographic hash of this receipt's content */
  hash: string;
  userAgent?: string;
}

export interface Revocation {
  /** ID of the original ConsentReceipt being revoked */
  receiptId: string;
  timestamp: string;
  /** Optional reason for revocation */
  reason?: string;
}
