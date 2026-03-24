create table if not exists public.demo_analytics_events (
  id uuid primary key,
  userId uuid not null,
  eventName text not null,
  occurredAt timestamptz not null,
  requestId text not null,
  traceId uuid not null,
  eventPayload jsonb not null,
  inserted_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists demo_analytics_events_user_occurred_at_idx
  on public.demo_analytics_events (userId, occurredAt desc, inserted_at desc);

create index if not exists demo_analytics_events_name_occurred_at_idx
  on public.demo_analytics_events (eventName, occurredAt desc, inserted_at desc);

create index if not exists demo_analytics_events_request_idx
  on public.demo_analytics_events (requestId, occurredAt desc);

comment on table public.demo_analytics_events is
  'Hosted durable founder-visible onboarding, reward, simulator, and receipt telemetry for ProsperPals alpha cohort learning.';
