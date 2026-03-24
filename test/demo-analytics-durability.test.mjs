import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const modulePath = '../src/lib/telemetry/demo-event-store.ts';
const userId = '11111111-1111-4111-8111-111111111111';
const traceId = '77777777-7777-4777-8777-777777777777';

async function withTempAnalytics(run) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pp-analytics-'));
  const analyticsPath = path.join(tempDir, 'demo-analytics.jsonl');
  const previousPath = process.env.PROSPERPALS_DEMO_ANALYTICS_PATH;
  process.env.PROSPERPALS_DEMO_ANALYTICS_PATH = analyticsPath;

  try {
    const mod = await import(modulePath);
    await run({ analyticsPath, mod });
  } finally {
    if (previousPath) {
      process.env.PROSPERPALS_DEMO_ANALYTICS_PATH = previousPath;
    } else {
      delete process.env.PROSPERPALS_DEMO_ANALYTICS_PATH;
    }

    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

test('analytics events can use the hosted PostgREST durability path when configured', async () => {
  await withTempAnalytics(async ({ mod, analyticsPath }) => {
    const previousUrl = process.env.PROSPERPALS_SUPABASE_URL;
    const previousKey = process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
    const previousMode = process.env.PROSPERPALS_ANALYTICS_DURABILITY_MODE;
    const previousTable = process.env.PROSPERPALS_ANALYTICS_TABLE;
    const originalFetch = global.fetch;
    const storedRows = [];

    process.env.PROSPERPALS_SUPABASE_URL = 'https://prosperpals.supabase.test';
    process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = 'service-role-test-key';
    process.env.PROSPERPALS_ANALYTICS_DURABILITY_MODE = 'hosted-only';
    process.env.PROSPERPALS_ANALYTICS_TABLE = 'demo_analytics_events';

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
      await mod.appendDemoAnalyticsEvent({
        event: 'onboarding.first-value.completed',
        occurredAt: new Date().toISOString(),
        userId,
        requestId: 'analytics-req-hosted-001',
        traceId,
        path: '/app/onboarding',
        selectedIntent: 'budget-first',
        mode: 'lite',
        targetTimeToValueSeconds: 80,
        firstValueSeconds: 54,
        merchantLabel: 'Netto',
        amountMinor: 18900,
        currency: 'DKK',
        dailySpendingPowerMinor: 27000,
        headline: 'Goldie spotted a spend rhythm worth showing.',
        message: 'First value landed within the launch threshold.'
      });

      await mod.appendDemoAnalyticsEvent({
        event: 'rewards.awarded',
        occurredAt: new Date().toISOString(),
        userId,
        requestId: 'analytics-req-hosted-002',
        traceId,
        path: '/app/onboarding',
        selectedIntent: 'budget-first',
        mode: 'lite',
        targetTimeToValueSeconds: 80,
        coins: 30,
        reasonCode: 'FIRST_AWARENESS_ACTION',
        headline: 'ProsperCoins awarded',
        message: 'Balance now 30 ProsperCoins.'
      });

      const recent = await mod.readDemoAnalyticsEvents(userId, 8);
      const summary = await mod.getDemoAnalyticsSummary(userId);

      assert.equal(recent.length, 2);
      assert.equal(recent[0].event, 'rewards.awarded');
      assert.equal(recent[1].event, 'onboarding.first-value.completed');
      assert.equal(summary.eventCount, 2);
      assert.equal(summary.targetMet, true);
      assert.match(summary.sinkPath, /^supabase:demo_analytics_events$/);
      await assert.rejects(fs.readFile(analyticsPath, 'utf8'), /ENOENT/);
    } finally {
      global.fetch = originalFetch;
      if (previousUrl) process.env.PROSPERPALS_SUPABASE_URL = previousUrl;
      else delete process.env.PROSPERPALS_SUPABASE_URL;
      if (previousKey) process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = previousKey;
      else delete process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
      if (previousMode) process.env.PROSPERPALS_ANALYTICS_DURABILITY_MODE = previousMode;
      else delete process.env.PROSPERPALS_ANALYTICS_DURABILITY_MODE;
      if (previousTable) process.env.PROSPERPALS_ANALYTICS_TABLE = previousTable;
      else delete process.env.PROSPERPALS_ANALYTICS_TABLE;
    }
  });
});
