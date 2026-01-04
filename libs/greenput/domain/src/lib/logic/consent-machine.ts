import { Purpose } from '../models/definitions';
import { ConsentReceipt, ConsentStatus, Revocation } from '../models/receipt';
import { ReceiptGenerator } from './receipt-generator';

export interface ConsentState {
  status: 'unknown' | 'prompted' | 'consented' | 'revoked';
  currentReceipt?: ConsentReceipt;
  lastRevocation?: Revocation;
}

export class ConsentStateMachine {
  private _state: ConsentState = { status: 'unknown' };
  private _policyVersion: string;

  constructor(policyVersion: string = '1.0.0') {
    this._policyVersion = policyVersion;
  }

  get state(): Readonly<ConsentState> {
    return this._state;
  }

  /**
   * Accepts a set of purposes.
   * Only included purposes effectively get 'granted'.
   * Omitted purposes are implicitly 'denied' if this is a full update, or ignored if partial.
   * For Greenput, we assume explicit opt-in, so standard flow is sending all statuses.
   */
  async grant(
    purposes: Record<string, ConsentStatus>,
    subjectId?: string,
  ): Promise<ConsentReceipt> {
    const receipt = await ReceiptGenerator.generate(
      this._policyVersion,
      purposes,
      subjectId,
    );

    this._state = {
      status: 'consented',
      currentReceipt: receipt,
    };

    return receipt;
  }

  /**
   * Explicitly refuses all non-essential purposes.
   */
  async refuseAll(
    availablePurposes: Purpose[],
    subjectId?: string,
  ): Promise<ConsentReceipt> {
    const statuses: Record<string, ConsentStatus> = {};

    for (const p of availablePurposes) {
      // Essential purposes cannot be refused (e.g. security, load balancing).
      // We explicitly log them as 'granted' even in a refusal flow.
      statuses[p.id] = p.isEssential ? 'granted' : 'denied';
    }

    return this.grant(statuses, subjectId);
  }

  /**
   * Revokes the current consent.
   */
  revoke(reason?: string): void {
    if (!this._state.currentReceipt) {
      throw new Error('No active consent to revoke');
    }

    const revocation: Revocation = {
      receiptId: this._state.currentReceipt.id,
      timestamp: new Date().toISOString(),
      reason,
    };

    this._state = {
      ...this._state,
      status: 'revoked',
      lastRevocation: revocation,
    };

    // NOTE: We do NOT clear currentReceipt immediately if we want to keep audit trail,
    // but the status is 'revoked', so effectively it's null logic-wise.
  }

  /**
   * Checks if a specific purpose is currently valid (consented AND not revoked).
   */
  hasConsentFor(purposeId: string): boolean {
    if (this._state.status !== 'consented' || !this._state.currentReceipt) {
      return false;
    }
    return this._state.currentReceipt.purposes[purposeId] === 'granted';
  }
}
