import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data:{user} } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({error:'Unauthorized'},{status:401});
  const payloadRaw = await req.json();
  const payload = z.object({ requestId: z.string().uuid().optional(), environmentId: z.string().uuid().optional(), runMode: z.enum(['server','browser']).optional(), request: z.any().optional() }).parse(payloadRaw);
  let request = payload.request;
  if (payload.requestId) {
    const { data } = await supabase.from('requests').select('*').eq('id', payload.requestId).single();
    request = data;
  }
  if (!request) return NextResponse.json({error:'No request payload'},{status:400});
  const start = performance.now();
  try {
    const res = await fetch(request.url, { method: request.method, headers: Object.fromEntries((request.headers ?? []).filter((h:any)=>h.enabled).map((h:any)=>[h.key,h.value])), body: request.body?.mode==='json'?request.body?.json:request.body?.raw, signal: AbortSignal.timeout(30000) });
    const response_body_text = await res.text();
    const latency_ms = Math.round(performance.now()-start);
    const headersObj = Object.fromEntries(res.headers.entries());
    const size_bytes = new TextEncoder().encode(response_body_text).length;
    let response_body_json = null;
    try { response_body_json = JSON.parse(response_body_text); } catch {}
    const { data: ws } = await supabase.from('workspaces').select('id').eq('owner_id', user.id).single();
    const runInsert = { workspace_id: ws?.id, request_id: request.id ?? null, request_snapshot: request, status: res.status, ok: res.ok, latency_ms, size_bytes, response_headers: headersObj, response_body_text, response_body_json };
    const { data: run } = await supabase.from('request_runs').insert(runInsert).select('id').single();
    return NextResponse.json({ ...runInsert, id: run?.id });
  } catch (e:any) {
    return NextResponse.json({ error_text: 'Request failed' }, { status: 500 });
  }
}
