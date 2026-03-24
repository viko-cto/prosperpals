create table if not exists public.demo_operator_audit_events (
  id uuid primary key,
  occurredAt timestamptz not null,
  actorUserId uuid null,
  subjectUserId uuid null,
  eventCode text not null,
  traceId uuid null,
  requestId text not null,
  payload jsonb not null default '{}'::jsonb,
  inserted_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists demo_operator_audit_events_occurred_at_idx
  on public.demo_operator_audit_events (occurredAt desc, inserted_at desc);

create index if not exists demo_operator_audit_events_subject_event_idx
  on public.demo_operator_audit_events (subjectUserId, eventCode, occurredAt desc);

create index if not exists demo_operator_audit_events_actor_event_idx
  on public.demo_operator_audit_events (actorUserId, eventCode, occurredAt desc);

comment on table public.demo_operator_audit_events is
  'Hosted durable audit trail for ProsperPals support timeline views, interventions, and release overrides.';
