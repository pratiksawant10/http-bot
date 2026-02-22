import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

export async function GET(req: NextRequest){
  const supabase = await createClient();
  const { data:{user} } = await supabase.auth.getUser();
  if (!user) return NextResponse.json([]);
  const requestId = req.nextUrl.searchParams.get('requestId');
  const { data: ws } = await supabase.from('workspaces').select('id').eq('owner_id', user.id).single();
  let q = supabase.from('request_runs').select('*').eq('workspace_id', ws?.id).order('created_at',{ascending:false}).limit(50);
  if (requestId) q = q.eq('request_id', requestId);
  const { data } = await q;
  return NextResponse.json(data ?? []);
}
