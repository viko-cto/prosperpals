create table if not exists public.demo_receipt_records (
  rowId uuid primary key,
  userId uuid not null,
  recordKind text not null,
  entityId uuid not null,
  candidateId uuid null,
  artifactId uuid not null,
  occurredAt timestamptz not null,
  requestId text not null,
  traceId uuid not null,
  recordPayload jsonb not null,
  inserted_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists demo_receipt_records_user_occurred_at_idx
  on public.demo_receipt_records (userId, occurredAt desc, inserted_at desc);

create index if not exists demo_receipt_records_kind_occurred_at_idx
  on public.demo_receipt_records (recordKind, occurredAt desc, inserted_at desc);

create index if not exists demo_receipt_records_candidate_idx
  on public.demo_receipt_records (candidateId, occurredAt desc, inserted_at desc);

create index if not exists demo_receipt_records_artifact_idx
  on public.demo_receipt_records (artifactId, occurredAt desc, inserted_at desc);

comment on table public.demo_receipt_records is
  'Hosted durable receipt candidate, failure, and confirmation records for the ProsperPals alpha review lane.';

create table if not exists public.demo_receipt_artifacts (
  artifactId uuid primary key,
  userId uuid not null,
  occurredAt timestamptz not null,
  requestId text not null,
  traceId uuid not null,
  storageMode text not null,
  storagePath text not null,
  fileName text not null,
  mimeType text not null,
  sizeBytes integer not null,
  parserProvider text not null,
  parserModel text not null,
  providerReference text not null,
  sourceHint text not null,
  artifactPayload jsonb not null,
  artifactPayloadBase64 text not null,
  inserted_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists demo_receipt_artifacts_user_occurred_at_idx
  on public.demo_receipt_artifacts (userId, occurredAt desc, inserted_at desc);

create index if not exists demo_receipt_artifacts_provider_idx
  on public.demo_receipt_artifacts (providerReference, occurredAt desc, inserted_at desc);

comment on table public.demo_receipt_artifacts is
  'Hosted durable receipt artifact metadata and bounded demo payloads for the ProsperPals alpha receipt review lane.';
