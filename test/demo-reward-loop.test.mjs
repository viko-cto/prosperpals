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
