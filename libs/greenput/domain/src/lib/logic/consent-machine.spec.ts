import { Purpose } from '../models/definitions';
import { ConsentStateMachine } from './consent-machine';

describe('ConsentStateMachine', () => {
  // Polyfill crypto for Node.js environment in jest if needed,
  // typically Nx jest setup handles this or we mock it.
  // We'll write the test assuming generic availability or mock it.

  beforeAll(() => {
    // Mock crypto if it's not available in the test runner's global scope
    if (!global.crypto) {
      Object.defineProperty(global, 'crypto', {
        value: {
          randomUUID: () => 'mock-uuid',
          subtle: {
            digest: async () => new Uint8Array([1, 2, 3]), // mock hash
          },
        },
      });
      Object.defineProperty(global, 'TextEncoder', {
        value: class {
          encode = (s: string) => Buffer.from(s);
        },
      });
    }
  });

  it('starts in unknown state', () => {
    const machine = new ConsentStateMachine();
    expect(machine.state.status).toBe('unknown');
  });

  it('can grant consent and generates a receipt', async () => {
    const machine = new ConsentStateMachine();
    const receipt = await machine.grant({ marketing: 'granted' });

    expect(machine.state.status).toBe('consented');
    expect(receipt.purposes['marketing']).toBe('granted');
    expect(receipt.hash).toBeDefined();
    expect(machine.hasConsentFor('marketing')).toBe(true);
  });

  it('can refuse all', async () => {
    const machine = new ConsentStateMachine();
    const purposes: Purpose[] = [
      {
        id: 'analytics',
        name: 'Analytics',
        description: '',
        isEssential: false,
      },
    ];

    await machine.refuseAll(purposes);

    expect(machine.state.status).toBe('consented'); // "Consented to nothing" is still a valid consented state (agreement reached)
    expect(machine.hasConsentFor('analytics')).toBe(false);
    expect(machine.state.currentReceipt?.purposes['analytics']).toBe('denied');
  });

  it('revocation invalidates consent', async () => {
    const machine = new ConsentStateMachine();
    await machine.grant({ marketing: 'granted' });

    expect(machine.hasConsentFor('marketing')).toBe(true);

    machine.revoke('User decision');

    expect(machine.state.status).toBe('revoked');
    expect(machine.hasConsentFor('marketing')).toBe(false);
    expect(machine.state.lastRevocation).toBeDefined();
  });
});
