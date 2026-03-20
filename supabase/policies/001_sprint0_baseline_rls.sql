alter table public.profiles enable row level security;
alter table public.consent_grants enable row level security;
alter table public.money_events enable row level security;
alter table public.money_event_revisions enable row level security;
alter table public.prospercoin_ledger_events enable row level security;
alter table public.virtual_portfolios enable row level security;
alter table public.virtual_trade_executions enable row level security;
alter table public.audit_events enable row level security;

create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "consent_grants_select_own"
  on public.consent_grants
  for select
  using (auth.uid() = grantor_user_id);

create policy "consent_grants_insert_own"
  on public.consent_grants
  for insert
  with check (auth.uid() = grantor_user_id);

create policy "money_events_select_own"
  on public.money_events
  for select
  using (auth.uid() = user_id);

create policy "virtual_trade_executions_select_own"
  on public.virtual_trade_executions
  for select
  using (auth.uid() = user_id);
