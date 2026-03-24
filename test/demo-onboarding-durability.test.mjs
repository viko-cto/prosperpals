import test from 'node:test';
import assert from 'node:assert/strict';

const modulePath = '../src/lib/onboarding/demo-state.ts';
const userId = '11111111-1111-4111-8111-111111111111';

function makeState(overrides = {}) {
  return {
    selectedIntent: 'budget-first',
    mode: 'lite',
    onboardingStartedAt: '2026-03-24T18:25:00.000Z',
    firstValueCompletedAt: '2026-03-24T18:26:12.000Z',
    firstMoneyEvent: {
      merchantLabel: 'Netto Nørreport',
      amountMinor: 18900,
      currency: 'DKK',
      occurredAt: '2026-03-24T18:26:12.000Z',
      categoryId: 'groceries',
      sourceType: 'manual',
      verificationState: 'user_confirmed'
    },
    firstInsight: {
      headline: 'Goldie found your first daily spending signal.',
      body: 'One confirmed spend turned into a calm starter planning insight.',
      dailySpendingPowerMinor: 27000,
      currency: 'DKK',
      awardedAt: '2026-03-24T18:26:12.000Z'
    },
    finHandoff: {
      handoffHeadline: 'Fin is ready when you are.',
      handoffBody: 'Goldie handed off a clean starter learning path to Fin.',
      starterAssets: [
        {
          symbol: 'NOVO-B.CO',
          name: 'Novo Nordisk',
          freshnessLabel: 'Fresh quote snapshot — <1 hour old',
          whyItIsHere: 'Recognizable Denmark-first starter asset.'
        }
      ]
    },
    ...overrides
  };
}

test('onboarding state can use the hosted PostgREST durability path when configured', async () => {
  const previousUrl = process.env.PROSPERPALS_SUPABASE_URL;
  const previousKey = process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
  const previousMode = process.env.PROSPERPALS_ONBOARDING_DURABILITY_MODE;
  const previousTable = process.env.PROSPERPALS_ONBOARDING_TABLE;
  const originalFetch = global.fetch;
  const storedRows = [];

  process.env.PROSPERPALS_SUPABASE_URL = 'https://prosperpals.supabase.test';
  process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = 'service-role-test-key';
  process.env.PROSPERPALS_ONBOARDING_DURABILITY_MODE = 'hosted-only';
  process.env.PROSPERPALS_ONBOARDING_TABLE = 'demo_onboarding_states';

  global.fetch = async (url, init = {}) => {
    const requestUrl = new URL(url);

    if (init.method === 'POST') {
      const payload = JSON.parse(init.body);

      for (const row of payload) {
        const existingIndex = storedRows.findIndex((candidate) => candidate.userId === row.userId);
        if (existingIndex >= 0) {
          storedRows[existingIndex] = row;
        } else {
          storedRows.push(row);
        }
      }

      return new Response(JSON.stringify(payload), {
        status: 201,
        headers: { 'content-type': 'application/json' }
      });
    }

    if (init.method === 'DELETE') {
      const filter = requestUrl.searchParams.get('userId') ?? '';
      const filteredUserId = filter.startsWith('eq.') ? decodeURIComponent(filter.slice(3)) : '';
      const nextRows = storedRows.filter((row) => row.userId !== filteredUserId);
      storedRows.splice(0, storedRows.length, ...nextRows);

      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    const filter = requestUrl.searchParams.get('userId') ?? '';
    const filteredUserId = filter.startsWith('eq.') ? decodeURIComponent(filter.slice(3)) : null;
    const payload = filteredUserId
      ? storedRows.filter((row) => row.userId === filteredUserId)
      : storedRows;

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  };

  try {
    const mod = await import(modulePath);
    const hostedState = makeState({ selectedIntent: 'invest-first', mode: 'full' });

    await mod.setDemoOnboardingState(userId, hostedState);

    const restored = await mod.getDemoOnboardingState(userId);
    assert.equal(restored.selectedIntent, 'invest-first');
    assert.equal(restored.mode, 'full');
    assert.equal(restored.firstMoneyEvent.merchantLabel, 'Netto Nørreport');
    assert.equal(restored.firstInsight.dailySpendingPowerMinor, 27000);
    assert.equal(mod.getDemoOnboardingStateLocation(), 'supabase:demo_onboarding_states');
    assert.equal(storedRows.length, 1);
    assert.equal(storedRows[0].userId, userId);
    assert.equal(storedRows[0].selectedIntent, 'invest-first');

    await mod.clearDemoOnboardingState(userId);

    const cleared = await mod.getDemoOnboardingState(userId);
    assert.equal(cleared.selectedIntent, 'budget-first');
    assert.equal(cleared.firstValueCompletedAt, undefined);
    assert.equal(storedRows.length, 0);
  } finally {
    global.fetch = originalFetch;
    if (previousUrl) process.env.PROSPERPALS_SUPABASE_URL = previousUrl;
    else delete process.env.PROSPERPALS_SUPABASE_URL;
    if (previousKey) process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = previousKey;
    else delete process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
    if (previousMode) process.env.PROSPERPALS_ONBOARDING_DURABILITY_MODE = previousMode;
    else delete process.env.PROSPERPALS_ONBOARDING_DURABILITY_MODE;
    if (previousTable) process.env.PROSPERPALS_ONBOARDING_TABLE = previousTable;
    else delete process.env.PROSPERPALS_ONBOARDING_TABLE;
  }
});
