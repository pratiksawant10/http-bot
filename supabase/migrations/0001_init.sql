create extension if not exists "pgcrypto";

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  created_at timestamptz default now()
);
create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz default now()
);
create table if not exists folders (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references collections(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);
create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  collection_id uuid references collections(id) on delete set null,
  folder_id uuid references folders(id) on delete set null,
  name text not null,
  description text,
  tags text[] default '{}',
  method text not null,
  url text not null,
  params jsonb default '[]'::jsonb,
  headers jsonb default '[]'::jsonb,
  auth jsonb default '{}'::jsonb,
  body jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists environments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);
create table if not exists environment_variables (
  id uuid primary key default gen_random_uuid(),
  environment_id uuid not null references environments(id) on delete cascade,
  key text not null,
  value text not null,
  is_secret boolean default false,
  created_at timestamptz default now()
);
create table if not exists request_runs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  request_id uuid references requests(id) on delete set null,
  request_snapshot jsonb not null,
  status int,
  ok boolean,
  latency_ms int,
  size_bytes int,
  response_headers jsonb,
  response_body_text text,
  response_body_json jsonb,
  error_text text,
  created_at timestamptz default now()
);

create index if not exists idx_collections_workspace on collections(workspace_id);
create index if not exists idx_requests_workspace on requests(workspace_id);
create index if not exists idx_env_workspace on environments(workspace_id);
create index if not exists idx_runs_workspace on request_runs(workspace_id);
create index if not exists idx_runs_request on request_runs(request_id);
create index if not exists idx_runs_created on request_runs(created_at desc);

alter table workspaces enable row level security;
alter table collections enable row level security;
alter table folders enable row level security;
alter table requests enable row level security;
alter table environments enable row level security;
alter table environment_variables enable row level security;
alter table request_runs enable row level security;

create policy "workspace owner" on workspaces using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "collections by workspace owner" on collections using (exists(select 1 from workspaces w where w.id=workspace_id and w.owner_id=auth.uid())) with check (exists(select 1 from workspaces w where w.id=workspace_id and w.owner_id=auth.uid()));
create policy "folders by workspace owner" on folders using (exists(select 1 from collections c join workspaces w on w.id=c.workspace_id where c.id=collection_id and w.owner_id=auth.uid())) with check (exists(select 1 from collections c join workspaces w on w.id=c.workspace_id where c.id=collection_id and w.owner_id=auth.uid()));
create policy "requests by workspace owner" on requests using (exists(select 1 from workspaces w where w.id=workspace_id and w.owner_id=auth.uid())) with check (exists(select 1 from workspaces w where w.id=workspace_id and w.owner_id=auth.uid()));
create policy "envs by workspace owner" on environments using (exists(select 1 from workspaces w where w.id=workspace_id and w.owner_id=auth.uid())) with check (exists(select 1 from workspaces w where w.id=workspace_id and w.owner_id=auth.uid()));
create policy "env vars by workspace owner" on environment_variables using (exists(select 1 from environments e join workspaces w on w.id=e.workspace_id where e.id=environment_id and w.owner_id=auth.uid())) with check (exists(select 1 from environments e join workspaces w on w.id=e.workspace_id where e.id=environment_id and w.owner_id=auth.uid()));
create policy "runs by workspace owner" on request_runs using (exists(select 1 from workspaces w where w.id=workspace_id and w.owner_id=auth.uid())) with check (exists(select 1 from workspaces w where w.id=workspace_id and w.owner_id=auth.uid()));
