import worker from './index';

// Mock D1 Database
const mockD1 = {
  prepare: jest.fn().mockReturnThis(),
  bind: jest.fn().mockReturnThis(),
  run: jest.fn().mockResolvedValue({ success: true }),
  first: jest.fn().mockResolvedValue(null),
} as any;

describe('Greenput API Worker', () => {
  let env: any;

  beforeEach(() => {
    env = { DB: mockD1 };
    jest.clearAllMocks();
  });

  it('should handle OPTIONS request (CORS)', async () => {
    const req = new Request('http://localhost/leads', { method: 'OPTIONS' });
    const res = await worker.fetch(req, env);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.status).toBe(200);
  });

  it('should create a lead (POST /leads)', async () => {
    const payload = {
      formData: { name: 'Test User', email: 'test@example.com' },
      purposes: { analytics: 'granted' },
    };
    const req = new Request('http://localhost/leads', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await worker.fetch(req, env);
    const body = (await res.json()) as any;

    expect(res.status).toBe(200);
    expect(body).toHaveProperty('id');
    expect(body.status).toBe('granted');
    expect(mockD1.prepare).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO receipts'),
    );
    expect(mockD1.prepare).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO leads'),
    );
  });

  it('should retrieve a receipt (GET /receipts/:id)', async () => {
    const mockReceipt = { id: '123', status: 'granted', purposes: {} };
    mockD1.first.mockResolvedValue({ json: JSON.stringify(mockReceipt) });

    const req = new Request('http://localhost/receipts/123', { method: 'GET' });
    const res = await worker.fetch(req, env);
    const body = (await res.json()) as any;

    expect(res.status).toBe(200);
    expect(body.id).toBe('123');
    expect(mockD1.prepare).toHaveBeenCalledWith(
      expect.stringContaining('SELECT json FROM receipts'),
    );
  });

  it('should return 404 for unknown receipt', async () => {
    mockD1.first.mockResolvedValue(null);
    const req = new Request('http://localhost/receipts/999', { method: 'GET' });
    const res = await worker.fetch(req, env);
    expect(res.status).toBe(404);
  });

  it('should revoke consent (POST /revoke)', async () => {
    const req = new Request('http://localhost/revoke', {
      method: 'POST',
      body: JSON.stringify({ receiptId: '123' }),
    });

    const res = await worker.fetch(req, env);
    const body = (await res.json()) as any;

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(mockD1.prepare).toHaveBeenCalledWith(
      expect.stringContaining('UPDATE receipts SET status'),
    );
    expect(mockD1.prepare).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO revocations'),
    );
  });
});
