create table if not exists public.demo_onboarding_states (
  userId uuid primary key,
  selectedIntent text not null,
  mode text not null,
  onboardingStartedAt timestamptz not null,
  firstValueCompletedAt timestamptz null,
  statePayload jsonb not null,
  updatedAt timestamptz not null default timezone('utc'::text, now()),
  inserted_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists demo_onboarding_states_updated_at_idx
  on public.demo_onboarding_states (updatedAt desc, inserted_at desc);

create index if not exists demo_onboarding_states_intent_mode_idx
  on public.demo_onboarding_states (selectedIntent, mode, updatedAt desc);

comment on table public.demo_onboarding_states is
  'Hosted durable onboarding continuity state for ProsperPals alpha so first-value progress no longer has to live only in cookies.';
