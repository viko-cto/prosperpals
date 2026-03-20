import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { newDb, DataType } from 'pg-mem';

function setupDb() {
  const migration = fs
    .readFileSync(new URL('../supabase/migrations/20260320122600_sprint0_foundation_and_trust_scaffolding.sql', import.meta.url), 'utf8')
    .replace(/create extension if not exists pgcrypto;\n?/gi, '');

  const db = newDb();
  db.public.registerFunction({
    name: 'gen_random_uuid',
    returns: DataType.uuid,
    implementation: randomUUID,
    impure: true
  });
  db.public.registerFunction({
    name: 'char_length',
    args: [DataType.text],
    returns: DataType.integer,
    implementation: (value) => value.length
  });

  db.public.none(`
    create schema auth;
    create table auth.users (
      id uuid primary key,
      email text not null
    );
  `);

  db.public.none(migration);
  return db;
}

function seedBaseRecords(db, userId) {
  db.public.none(`
    insert into auth.users (id, email)
    values ('${userId}', 'nikolas@prosperpals.local');

    insert into public.profiles (id, email, display_name)
    values ('${userId}', 'nikolas@prosperpals.local', 'Nikolas');

    insert into public.virtual_portfolios (id, user_id, base_currency, status)
    values ('22222222-2222-4222-8222-222222222222', '${userId}', 'DKK', 'active');

    insert into public.market_price_snapshots (
      id, asset_id, price_minor, currency, provider, delay_class, freshness_seconds, captured_at
    ) values (
      '33333333-3333-4333-8333-333333333333',
      'NOVO-B',
      45000,
      'DKK',
      'launch-feed',
      'fresh',
      14,
      now()
    );
  `);
}

function upsertByIdempotency(db, sql) {
  return db.public.many(sql)[0];
}

test('money events remain idempotent on retries', () => {
  const db = setupDb();
  const userId = '11111111-1111-4111-8111-111111111111';
  seedBaseRecords(db, userId);

  const first = upsertByIdempotency(db, `
    insert into public.money_events (
      user_id, idempotency_key, event_type, amount_minor, currency, occurred_at,
      merchant_label, category_id, source_type, verification_state, confidence_score
    ) values (
      '${userId}', 'money-event-001', 'expense', 4595, 'DKK', now(),
      'Netto', 'groceries', 'manual', 'user_confirmed', 1.0
    )
    on conflict (user_id, idempotency_key)
    do update set idempotency_key = excluded.idempotency_key
    returning id;
  `);

  const second = upsertByIdempotency(db, `
    insert into public.money_events (
      user_id, idempotency_key, event_type, amount_minor, currency, occurred_at,
      merchant_label, category_id, source_type, verification_state, confidence_score
    ) values (
      '${userId}', 'money-event-001', 'expense', 4595, 'DKK', now(),
      'Netto', 'groceries', 'manual', 'user_confirmed', 1.0
    )
    on conflict (user_id, idempotency_key)
    do update set idempotency_key = excluded.idempotency_key
    returning id;
  `);

  const count = db.public.one(`select count(*)::int as count from public.money_events where user_id = '${userId}' and idempotency_key = 'money-event-001'`);

  assert.equal(first.id, second.id);
  assert.equal(count.count, 1);
});

test('prospercoin ledger writes remain idempotent on retries', () => {
  const db = setupDb();
  const userId = '11111111-1111-4111-8111-111111111111';
  seedBaseRecords(db, userId);

  const first = upsertByIdempotency(db, `
    insert into public.prospercoin_ledger_events (
      user_id, idempotency_key, event_kind, delta_coins, reason_code, reference_type
    ) values (
      '${userId}', 'prospercoin-001', 'credit', 15, 'FIRST_AWARENESS_ACTION', 'money_event'
    )
    on conflict (user_id, idempotency_key)
    do update set idempotency_key = excluded.idempotency_key
    returning id;
  `);

  const second = upsertByIdempotency(db, `
    insert into public.prospercoin_ledger_events (
      user_id, idempotency_key, event_kind, delta_coins, reason_code, reference_type
    ) values (
      '${userId}', 'prospercoin-001', 'credit', 15, 'FIRST_AWARENESS_ACTION', 'money_event'
    )
    on conflict (user_id, idempotency_key)
    do update set idempotency_key = excluded.idempotency_key
    returning id;
  `);

  const count = db.public.one(`select count(*)::int as count from public.prospercoin_ledger_events where user_id = '${userId}' and idempotency_key = 'prospercoin-001'`);

  assert.equal(first.id, second.id);
  assert.equal(count.count, 1);
});

test('virtual trade executions remain idempotent on retries', () => {
  const db = setupDb();
  const userId = '11111111-1111-4111-8111-111111111111';
  seedBaseRecords(db, userId);

  const first = upsertByIdempotency(db, `
    insert into public.virtual_trade_executions (
      user_id, portfolio_id, idempotency_key, asset_id, units,
      execution_price_snapshot_id, coins_debited
    ) values (
      '${userId}', '22222222-2222-4222-8222-222222222222', 'trade-001', 'NOVO-B', 2.5,
      '33333333-3333-4333-8333-333333333333', 120
    )
    on conflict (user_id, idempotency_key)
    do update set idempotency_key = excluded.idempotency_key
    returning id;
  `);

  const second = upsertByIdempotency(db, `
    insert into public.virtual_trade_executions (
      user_id, portfolio_id, idempotency_key, asset_id, units,
      execution_price_snapshot_id, coins_debited
    ) values (
      '${userId}', '22222222-2222-4222-8222-222222222222', 'trade-001', 'NOVO-B', 2.5,
      '33333333-3333-4333-8333-333333333333', 120
    )
    on conflict (user_id, idempotency_key)
    do update set idempotency_key = excluded.idempotency_key
    returning id;
  `);

  const count = db.public.one(`select count(*)::int as count from public.virtual_trade_executions where user_id = '${userId}' and idempotency_key = 'trade-001'`);

  assert.equal(first.id, second.id);
  assert.equal(count.count, 1);
});
