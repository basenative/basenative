export interface Purpose {
  /** Unbundled, unique identifier (e.g., 'analytics_google') */
  id: string;
  /** Human readable name */
  name: string;
  /** Plain language description (6th-8th grade reading level) */
  description: string;
  /** True strictly if the application function breaks without this */
  isEssential: boolean;
}

export interface DataCategory {
  id: string; // e.g., 'email', 'ip_address'
  name: string;
  description: string;
  examples: string[]; // e.g., ['user@example.com']
  sensitivity: 'low' | 'medium' | 'high';
}

export interface Processor {
  id: string;
  name: string; // e.g., "Google LLC", "AWS"
  role: 'controller' | 'processor' | 'subprocessor';
  location: string; // Country/Region
  policyUrl: string;
}
