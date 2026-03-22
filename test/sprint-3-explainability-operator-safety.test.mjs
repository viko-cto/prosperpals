import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const userId = '11111111-1111-4111-8111-111111111111';
const traceId = '77777777-7777-4777-8777-777777777777';

async function withTempRuntime(run) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pp-sprint3-'));
  const previous = {
    receipts: process.env.PROSPERPALS_DEMO_RECEIPT_PATH,
    receiptArtifacts: process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH,
    receiptUploads: process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR,
    ledger: process.env.PROSPERPALS_DEMO_LEDGER_PATH,
    analytics: process.env.PROSPERPALS_DEMO_ANALYTICS_PATH
  };

  process.env.PROSPERPALS_DEMO_RECEIPT_PATH = path.join(tempDir, 'demo-receipts.jsonl');
  process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH = path.join(tempDir, 'demo-receipt-artifacts.jsonl');
  process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR = path.join(tempDir, 'receipt-uploads');
  process.env.PROSPERPALS_DEMO_LEDGER_PATH = path.join(tempDir, 'demo-ledger.jsonl');
  process.env.PROSPERPALS_DEMO_ANALYTICS_PATH = path.join(tempDir, 'demo-analytics.jsonl');

  try {
    await run({ tempDir });
  } finally {
    if (previous.receipts) process.env.PROSPERPALS_DEMO_RECEIPT_PATH = previous.receipts;
    else delete process.env.PROSPERPALS_DEMO_RECEIPT_PATH;

    if (previous.receiptArtifacts) process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH = previous.receiptArtifacts;
    else delete process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH;

    if (previous.receiptUploads) process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR = previous.receiptUploads;
    else delete process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR;

    if (previous.ledger) process.env.PROSPERPALS_DEMO_LEDGER_PATH = previous.ledger;
    else delete process.env.PROSPERPALS_DEMO_LEDGER_PATH;

    if (previous.analytics) process.env.PROSPERPALS_DEMO_ANALYTICS_PATH = previous.analytics;
    else delete process.env.PROSPERPALS_DEMO_ANALYTICS_PATH;

    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

test('receipt OCR candidates stay reviewable until explicit confirmation', async () => {
  await withTempRuntime(async () => {
    const receipts = await import('../src/lib/receipts/demo-receipts.ts');

    const candidate = await receipts.captureReceiptCandidate({
      userId,
      requestId: 'receipt-req-001',
      traceId,
      merchantLabel: 'Foetex City',
      amountMajor: 226.45,
      categoryId: 'groceries'
    });

    const beforeConfirm = await receipts.getDemoReceiptReviewState(userId);
    assert.equal(beforeConfirm.pendingCandidate.candidateId, candidate.candidateId);
    assert.equal(beforeConfirm.latestConfirmed, undefined);
    assert.match(beforeConfirm.pendingCandidate.reviewMessage, /review/i);
    assert.equal(beforeConfirm.latestArtifact.storageMode, 'simulated');
    assert.match(beforeConfirm.latestArtifact.providerReference, /^simulated:/);

    const confirmed = await receipts.confirmReceiptCandidate({
      userId,
      candidateId: candidate.candidateId,
      requestId: 'receipt-req-002',
      traceId,
      merchantLabel: 'Føtex City',
      amountMajor: 226.45,
      categoryId: 'groceries'
    });

    const afterConfirm = await receipts.getDemoReceiptReviewState(userId);
    assert.equal(afterConfirm.pendingCandidate, undefined);
    assert.equal(afterConfirm.latestConfirmed.candidateId, candidate.candidateId);
    assert.equal(afterConfirm.confirmationCount, 1);
    assert.equal(confirmed.moneyEvent.sourceType, 'receipt_ocr');
    assert.equal(confirmed.moneyEvent.verificationState, 'parsed_reviewed');
    assert.equal(confirmed.confirmation.correctionApplied, true);
    assert.equal(confirmed.alreadyConfirmed, false);
  });
});

test('uploaded receipt artifacts persist metadata and stay linked to candidate lineage', async () => {
  await withTempRuntime(async ({ tempDir }) => {
    const receipts = await import('../src/lib/receipts/demo-receipts.ts');

    const candidate = await receipts.captureReceiptCandidate({
      userId,
      requestId: 'receipt-req-020',
      traceId,
      merchantLabel: 'Netto Nørreport',
      amountMajor: 98.5,
      categoryId: 'groceries',
      upload: {
        fileName: 'receipt-netto.jpg',
        mimeType: 'image/jpeg',
        bytes: Buffer.from('fake-jpeg-binary')
      }
    });

    const artifacts = await receipts.readDemoReceiptArtifactRecords(userId);
    assert.equal(artifacts.length, 1);
    assert.equal(artifacts[0].artifactId, candidate.artifactId);
    assert.equal(artifacts[0].storageMode, 'uploaded');
    assert.equal(artifacts[0].mimeType, 'image/jpeg');
    assert.equal(artifacts[0].parserProvider, 'demo-ocr-upload-gateway');
    assert.match(candidate.sourceHint, /demo-ocr-upload-gateway/);

    const stored = await fs.readFile(artifacts[0].storagePath, 'utf8');
    assert.equal(stored, 'fake-jpeg-binary');
    assert.ok(artifacts[0].storagePath.startsWith(path.join(tempDir, 'receipt-uploads')));
  });
});

test('duplicate receipt confirmation reuses the first reviewed truth instead of writing a second one', async () => {
  await withTempRuntime(async () => {
    const receipts = await import('../src/lib/receipts/demo-receipts.ts');

    const candidate = await receipts.captureReceiptCandidate({
      userId,
      requestId: 'receipt-req-010',
      traceId,
      merchantLabel: 'Netto Nørreport',
      amountMajor: 98.5,
      categoryId: 'groceries'
    });

    const first = await receipts.confirmReceiptCandidate({
      userId,
      candidateId: candidate.candidateId,
      requestId: 'receipt-req-011',
      traceId,
      merchantLabel: 'Netto Nørreport',
      amountMajor: 98.5,
      categoryId: 'groceries'
    });

    const second = await receipts.confirmReceiptCandidate({
      userId,
      candidateId: candidate.candidateId,
      requestId: 'receipt-req-012',
      traceId,
      merchantLabel: 'Netto Nørreport',
      amountMajor: 98.5,
      categoryId: 'groceries'
    });

    const records = await receipts.readDemoReceiptRecords(userId);
    const confirmations = records.filter((record) => record.kind === 'receipt_confirmation');
    const confirmedCandidates = records.filter(
      (record) => record.kind === 'receipt_candidate' && record.reviewStatus === 'confirmed'
    );

    assert.equal(first.alreadyConfirmed, false);
    assert.equal(second.alreadyConfirmed, true);
    assert.equal(second.confirmation.id, first.confirmation.id);
    assert.equal(second.moneyEvent.id, first.moneyEvent.id);
    assert.equal(confirmations.length, 1);
    assert.equal(confirmedCandidates.length, 1);
  });
});

test('notification contract blocks private financial details', async () => {
  const notifications = await import('../src/lib/notifications/contracts.ts');

  const safe = notifications.buildSafeNotificationPayload('coins-waiting');
  assert.match(safe.title, /ProsperCoins/i);
  assert.throws(
    () => notifications.assertNotificationPayloadSafe({
      title: 'Netto 226.45 DKK posted',
      body: 'Your groceries category is over budget and safe to spend dropped.',
      deepLink: '/app'
    }),
    /privacy boundary/i
  );
});

test('support console aggregates safe timeline data and release checks', async () => {
  await withTempRuntime(async () => {
    const receipts = await import('../src/lib/receipts/demo-receipts.ts');
    const simulator = await import('../src/lib/simulator/demo-simulator.ts');
    const telemetry = await import('../src/lib/telemetry/demo-event-store.ts');
    const support = await import('../src/lib/support/demo-support.ts');

    const candidate = await receipts.captureReceiptCandidate({
      userId,
      requestId: 'receipt-req-003',
      traceId,
      merchantLabel: 'Rema 1000',
      amountMajor: 148.5,
      categoryId: 'groceries'
    });

    await receipts.confirmReceiptCandidate({
      userId,
      candidateId: candidate.candidateId,
      requestId: 'receipt-req-004',
      traceId,
      merchantLabel: 'Rema 1000',
      amountMajor: 148.5,
      categoryId: 'groceries'
    });

    await simulator.awardProsperCoins({
      userId,
      idempotencyKey: 'invest-first-starter:support-user',
      requestId: 'reward-req-003',
      traceId,
      reasonCode: 'INVEST_FIRST_STARTER',
      coins: 40,
      referenceType: 'onboarding_intent'
    });

    const trade = await simulator.executeStarterTrade({
      userId,
      assetId: 'NOVO-B',
      idempotencyKey: 'starter-trade:support-user:novo',
      requestId: 'trade-req-003',
      traceId
    });

    assert.equal(trade.status, 'executed');

    await telemetry.appendDemoAnalyticsEvent({
      event: 'receipt.candidate.confirmed',
      occurredAt: new Date().toISOString(),
      userId,
      requestId: 'analytics-req-001',
      traceId,
      path: '/app/receipts',
      selectedIntent: 'budget-first',
      mode: 'lite',
      targetTimeToValueSeconds: 80,
      merchantLabel: 'Rema 1000',
      amountMinor: 14850,
      currency: 'DKK',
      dailySpendingPowerMinor: 23800,
      headline: 'Goldie logged the reviewed receipt.',
      message: 'Receipt review posted a canonical event after confirmation.'
    });

    const consoleState = await support.getDemoSupportConsole(userId, {
      countryCode: 'DK',
      internalUser: true
    });

    assert.ok(consoleState.timeline.length >= 4);
    assert.ok(consoleState.timeline.some((item) => item.type === 'receipt'));
    assert.ok(consoleState.timeline.some((item) => item.type === 'ledger'));
    assert.ok(consoleState.releaseSafety.checks.some((check) => check.id === 'notification-contract' && check.ok));
    assert.match(consoleState.redactionPolicy.join(' '), /Notification contracts forbid merchant names/i);
  });
});
