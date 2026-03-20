create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text,
  country_code text not null default 'DK',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.consent_grants (
  id uuid primary key default gen_random_uuid(),
  grantor_user_id uuid not null references auth.users (id) on delete cascade,
  grantee_scope text not null,
  data_category text not null check (data_category in ('learning_progress', 'household_summary', 'family_preview')),
  access_level text not null check (access_level in ('view', 'share', 'coach')),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  trace_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.money_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  idempotency_key text not null,
  event_type text not null check (event_type in ('expense', 'income', 'refund', 'transfer_adjustment')),
  amount_minor bigint not null,
  currency text not null check (char_length(currency) = 3),
  occurred_at timestamptz not null,
  merchant_label text,
  category_id text,
  source_type text not null check (source_type in ('manual', 'receipt_ocr', 'pdf_csv_bridge', 'mobilepay', 'psd2')),
  verification_state text not null check (verification_state in ('user_confirmed', 'parsed_reviewed', 'import_verified', 'system_suspect')),
  confidence_score numeric(5,4) not null check (confidence_score >= 0 and confidence_score <= 1),
  import_job_id uuid,
  artifact_id uuid,
  trace_id uuid,
  created_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);

create index if not exists idx_money_events_user_occurred_at
  on public.money_events (user_id, occurred_at desc);

create table if not exists public.money_event_revisions (
  id uuid primary key default gen_random_uuid(),
  money_event_id uuid not null references public.money_events (id) on delete cascade,
  changed_fields jsonb not null default '[]'::jsonb,
  old_value jsonb not null default '{}'::jsonb,
  new_value jsonb not null default '{}'::jsonb,
  changed_by uuid references auth.users (id) on delete set null,
  reason_code text not null,
  changed_at timestamptz not null default now()
);

create table if not exists public.prospercoin_ledger_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  idempotency_key text not null,
  event_kind text not null check (event_kind in ('credit', 'debit', 'reversal')),
  delta_coins integer not null,
  reason_code text not null,
  reference_type text not null,
  reference_id uuid,
  trace_id uuid,
  created_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);

create index if not exists idx_prospercoin_ledger_events_user_created_at
  on public.prospercoin_ledger_events (user_id, created_at desc);

create table if not exists public.virtual_portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  base_currency text not null default 'DKK',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (user_id, status)
);

create table if not exists public.market_price_snapshots (
  id uuid primary key default gen_random_uuid(),
  asset_id text not null,
  price_minor bigint not null,
  currency text not null check (char_length(currency) = 3),
  provider text not null,
  delay_class text not null check (delay_class in ('fresh', 'delayed_but_acceptable', 'stale_blocked')),
  freshness_seconds integer not null,
  captured_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.virtual_trade_executions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  portfolio_id uuid not null references public.virtual_portfolios (id) on delete cascade,
  idempotency_key text not null,
  asset_id text not null,
  units numeric(18,8) not null check (units > 0),
  execution_price_snapshot_id uuid not null references public.market_price_snapshots (id) on delete restrict,
  coins_debited integer not null check (coins_debited > 0),
  trace_id uuid,
  executed_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);

create index if not exists idx_virtual_trade_executions_user_executed_at
  on public.virtual_trade_executions (user_id, executed_at desc);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users (id) on delete set null,
  subject_user_id uuid references auth.users (id) on delete set null,
  event_code text not null,
  trace_id uuid,
  request_id text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_events_subject_created_at
  on public.audit_events (subject_user_id, created_at desc);

create table if not exists public.outbox_events (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  aggregate_type text not null,
  aggregate_id uuid not null,
  trace_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);
