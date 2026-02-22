import { createClient } from '@/lib/supabaseServer';
import { RequestBuilder } from '@/components/requests/request-builder';

export default async function RequestPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const supabase = await createClient();
  const { data: request } = await supabase.from('requests').select('*').eq('id',id).single();
  const { data: envs } = await supabase.from('environments').select('id,name').order('created_at');
  return <RequestBuilder initialRequest={request} environments={envs ?? []}/>;
}
