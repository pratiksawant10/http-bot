import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabaseServer';

export default async function NewRequest(){
  const supabase = await createClient();
  const { data: ws } = await supabase.from('workspaces').select('id').limit(1).single();
  const { data } = await supabase.from('requests').insert({ workspace_id: ws?.id, name: 'New Request', method: 'GET', url: 'https://httpbin.org/get' }).select('id').single();
  redirect(`/app/requests/${data?.id}`);
}
