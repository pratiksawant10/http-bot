import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { ensureWorkspace } from '@/lib/workspace';

export default async function Layout({children}:{children:React.ReactNode}){
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  await ensureWorkspace(supabase, user.id);
  return <AppShell>{children}</AppShell>;
}
