import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const modulePath = '../src/lib/simulator/demo-simulator.ts';
const userId = '11111111-1111-4111-8111-111111111111';
const traceId = '77777777-7777-4777-8777-777777777777';

async function withTempLedger(run) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pp-ledger-'));
  const ledgerPath = path.join(tempDir, 'demo-ledger.jsonl');
  const previousPath = process.env.PROSPERPALS_DEMO_LEDGER_PATH;
  process.env.PROSPERPALS_DEMO_LEDGER_PATH = ledgerPath;

  try {
    const mod = await import(modulePath);
    await run({ ledgerPath, mod });
  } finally {
    if (previousPath) {
      process.env.PROSPERPALS_DEMO_LEDGER_PATH = previousPath;
    } else {
      delete process.env.PROSPERPALS_DEMO_LEDGER_PATH;
    }

    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

test('starter rewards stay idempotent when the same key is retried', async () => {
  await withTempLedger(async ({ mod }) => {
    const first = await mod.awardProsperCoins({
      userId,
      idempotencyKey: 'first-awareness:test-user',
      requestId: 'reward-req-001',
      traceId,
      reasonCode: 'FIRST_AWARENESS_ACTION',
      coins: 30,
      referenceType: 'money_event'
    });

    const second = await mod.awardProsperCoins({
      userId,
      idempotencyKey: 'first-awareness:test-user',
      requestId: 'reward-req-002',
      traceId,
      reasonCode: 'FIRST_AWARENESS_ACTION',
      coins: 30,
      referenceType: 'money_event'
    });

    assert.equal(first.ledgerEvent.id, second.ledgerEvent.id);
    assert.equal(second.summary.availableCoins, 30);
    assert.equal(second.summary.totalEarnedCoins, 30);
  });
});

test('virtual trade retries return the original execution without double-debiting', async () => {
  await withTempLedger(async ({ mod }) => {
    await mod.awardProsperCoins({
      userId,
      idempotencyKey: 'invest-first-starter:test-user',
      requestId: 'reward-req-003',
      traceId,
      reasonCode: 'INVEST_FIRST_STARTER',
      coins: 40,
      referenceType: 'onboarding_intent'
    });

    const first = await mod.executeStarterTrade({
      userId,
      assetId: 'NOVO-B',
      idempotencyKey: 'starter-trade:test-user:novo',
      requestId: 'trade-req-001',
      traceId
    });

    const second = await mod.executeStarterTrade({
      userId,
      assetId: 'NOVO-B',
      idempotencyKey: 'starter-trade:test-user:novo',
      requestId: 'trade-req-002',
      traceId
    });

    assert.equal(first.status, 'executed');
    assert.equal(second.status, 'executed');
    assert.equal(first.trade.id, second.trade.id);
    assert.equal(second.summary.totalDebitedCoins, first.trade.starterTradeCoins);
    assert.equal(second.summary.availableCoins, 40 - first.trade.starterTradeCoins);
  });
});

test('stale launch assets are blocked honestly before a trade is written', async () => {
  await withTempLedger(async ({ mod, ledgerPath }) => {
    await mod.awardProsperCoins({
      userId,
      idempotencyKey: 'invest-first-starter:test-user',
      requestId: 'reward-req-004',
      traceId,
      reasonCode: 'INVEST_FIRST_STARTER',
      coins: 40,
      referenceType: 'onboarding_intent'
    });

    const result = await mod.executeStarterTrade({
      userId,
      assetId: 'ORSTED',
      idempotencyKey: 'starter-trade:test-user:orsted',
      requestId: 'trade-req-003',
      traceId
    });

    const file = await fs.readFile(ledgerPath, 'utf8');
    const lines = file.split('\n').filter(Boolean);

    assert.equal(result.status, 'blocked-stale');
    assert.match(result.message, /blocked/i);
    assert.equal(lines.length, 1);
    assert.equal(result.summary.totalDebitedCoins, 0);
    assert.equal(result.summary.availableCoins, 40);
  });
});


test('reward and trade records can use the hosted PostgREST durability path when configured', async () => {
  await withTempLedger(async ({ mod, ledgerPath }) => {
    const previousUrl = process.env.PROSPERPALS_SUPABASE_URL;
    const previousKey = process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
    const previousMode = process.env.PROSPERPALS_LEDGER_DURABILITY_MODE;
    const previousTable = process.env.PROSPERPALS_LEDGER_TABLE;
    const originalFetch = global.fetch;
    const storedRows = [];

    process.env.PROSPERPALS_SUPABASE_URL = 'https://prosperpals.supabase.test';
    process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = 'service-role-test-key';
    process.env.PROSPERPALS_LEDGER_DURABILITY_MODE = 'hosted-only';
    process.env.PROSPERPALS_LEDGER_TABLE = 'demo_ledger_records';

    global.fetch = async (_url, init = {}) => {
      if (init.method === 'POST') {
        const payload = JSON.parse(init.body);
        storedRows.push(...payload);
        return new Response(JSON.stringify(payload), {
          status: 201,
          headers: { 'content-type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(storedRows), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    };

    try {
      await mod.awardProsperCoins({
        userId,
        idempotencyKey: 'invest-first-starter:test-user:hosted',
        requestId: 'reward-req-hosted-001',
        traceId,
        reasonCode: 'INVEST_FIRST_STARTER',
        coins: 40,
        referenceType: 'onboarding_intent'
      });

      const trade = await mod.executeStarterTrade({
        userId,
        assetId: 'NOVO-B',
        idempotencyKey: 'starter-trade:test-user:hosted:novo',
        requestId: 'trade-req-hosted-001',
        traceId
      });

      const records = await mod.readDemoLedgerRecords(userId);
      const summary = await mod.getDemoRewardLoopSummary(userId);

      assert.equal(trade.status, 'executed');
      assert.equal(records.length, 3);
      assert.equal(records[0].kind, 'prospercoin_ledger');
      assert.equal(records[1].kind, 'virtual_trade_execution');
      assert.equal(records[2].kind, 'prospercoin_ledger');
      assert.equal(summary.availableCoins, 15);
      assert.equal(summary.totalEarnedCoins, 40);
      assert.equal(summary.totalDebitedCoins, 25);
      assert.match(summary.ledgerPath, /^supabase:demo_ledger_records$/);
      await assert.rejects(fs.readFile(ledgerPath, 'utf8'), /ENOENT/);
    } finally {
      global.fetch = originalFetch;
      if (previousUrl) process.env.PROSPERPALS_SUPABASE_URL = previousUrl;
      else delete process.env.PROSPERPALS_SUPABASE_URL;
      if (previousKey) process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = previousKey;
      else delete process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
      if (previousMode) process.env.PROSPERPALS_LEDGER_DURABILITY_MODE = previousMode;
      else delete process.env.PROSPERPALS_LEDGER_DURABILITY_MODE;
      if (previousTable) process.env.PROSPERPALS_LEDGER_TABLE = previousTable;
      else delete process.env.PROSPERPALS_LEDGER_TABLE;
    }
  });
});
