create table if not exists public.demo_ledger_records (
  id uuid primary key,
  userId uuid not null,
  recordKind text not null,
  idempotencyKey text not null,
  occurredAt timestamptz not null,
  requestId text not null,
  traceId uuid not null,
  record jsonb not null,
  inserted_at timestamptz not null default timezone('utc'::text, now())
);

create unique index if not exists demo_ledger_records_user_idempotency_idx
  on public.demo_ledger_records (userId, idempotencyKey);

create index if not exists demo_ledger_records_user_occurred_at_idx
  on public.demo_ledger_records (userId, occurredAt desc, inserted_at desc);

create index if not exists demo_ledger_records_kind_occurred_at_idx
  on public.demo_ledger_records (recordKind, occurredAt desc, inserted_at desc);

comment on table public.demo_ledger_records is
  'Hosted durable reward-ledger and virtual-trade execution records for the ProsperPals alpha trust loop.';
