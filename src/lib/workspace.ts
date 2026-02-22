import { SupabaseClient } from '@supabase/supabase-js';

export async function ensureWorkspace(supabase: SupabaseClient, userId: string) {
  const { data: existing } = await supabase.from('workspaces').select('id').eq('owner_id', userId).maybeSingle();
  if (existing?.id) return existing.id;
  const { data: workspace } = await supabase.from('workspaces').insert({ owner_id: userId, name: 'My Workspace' }).select('id').single();
  if (workspace?.id) {
    await supabase.from('environments').insert({ workspace_id: workspace.id, name: 'Default' });
  }
  return workspace?.id;
}
