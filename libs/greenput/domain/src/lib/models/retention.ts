export type RetentionUnit = 'days' | 'months' | 'years' | 'forever' | 'session';

export interface RetentionPeriod {
  value: number;
  unit: RetentionUnit;
  /** e.g. "We keep this for 30 days" */
  description: string;
  /** e.g. "Required for billing cycle auditing" */
  justification: string;
}
