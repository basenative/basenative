/// <reference types="@cloudflare/workers-types" />
/**
 * Greenput API Worker
 * Handles Lead Intake, Receipt Retrieval, and Revocation.
 */

interface Env {
  DB: D1Database;
}

interface LeadData {
  formData: any; // Ideally typed from shared domain
  purposes: Record<string, string>;
}

interface RevocationRequest {
  receiptId: string;
  reason?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // POST /leads - Submit a new lead + consent
      if (path === '/leads' && method === 'POST') {
        const data = (await request.json()) as LeadData;

        // Validation (Basic)
        if (!data.formData || !data.purposes) {
          return new Response('Missing formData or purposes', {
            status: 400,
            headers: corsHeaders,
          });
        }

        // Generate Receipt ID
        const receiptId = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        // Calculate hash of the data
        const dataStr = JSON.stringify(data.formData);
        const dataHashBuffer = await crypto.subtle.digest(
          'SHA-256',
          new TextEncoder().encode(dataStr),
        );
        const dataHash = Array.from(new Uint8Array(dataHashBuffer))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

        const receipt = {
          id: receiptId,
          timestamp,
          policyVersion: 'v1.0-lead-flow',
          purposes: data.purposes,
          dataHash,
          status: 'granted',
        };

        // Store in D1
        // DB Schema: receipts (id TEXT PRIMARY KEY, json TEXT, status TEXT)
        // DB Schema: leads (id TEXT PRIMARY KEY, receipt_id TEXT, data TEXT)

        await env.DB.prepare(
          'INSERT INTO receipts (id, json, status) VALUES (?, ?, ?)',
        )
          .bind(receiptId, JSON.stringify(receipt), 'granted')
          .run();

        await env.DB.prepare(
          'INSERT INTO leads (id, receipt_id, data) VALUES (?, ?, ?)',
        )
          .bind(crypto.randomUUID(), receiptId, dataStr)
          .run();

        return new Response(JSON.stringify(receipt), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /receipts/:id
      if (path.startsWith('/receipts/') && method === 'GET') {
        const id = path.split('/').pop();
        if (!id)
          return new Response('Bad Request', {
            status: 400,
            headers: corsHeaders,
          });

        const result = await env.DB.prepare(
          'SELECT json FROM receipts WHERE id = ?',
        )
          .bind(id)
          .first<{ json: string }>();

        if (!result) {
          return new Response('Not Found', {
            status: 404,
            headers: corsHeaders,
          });
        }

        return new Response(result.json, {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // POST /revoke - Revoke consent
      if (path === '/revoke' && method === 'POST') {
        const { receiptId, reason } =
          (await request.json()) as RevocationRequest;

        if (!receiptId) {
          return new Response('Missing receiptId', {
            status: 400,
            headers: corsHeaders,
          });
        }

        // Update Status
        await env.DB.prepare('UPDATE receipts SET status = ? WHERE id = ?')
          .bind('revoked', receiptId)
          .run();

        // Log Revocation
        await env.DB.prepare(
          'INSERT INTO revocations (id, receipt_id, reason, timestamp) VALUES (?, ?, ?, ?)',
        )
          .bind(
            crypto.randomUUID(),
            receiptId,
            reason || 'User initiated',
            new Date().toISOString(),
          )
          .run();

        return new Response(JSON.stringify({ success: true }), {
          headers: corsHeaders,
        });
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });
    } catch (e: any) {
      return new Response(`Error: ${e.message}`, {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
