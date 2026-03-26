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
    analytics: process.env.PROSPERPALS_DEMO_ANALYTICS_PATH,
    audit: process.env.PROSPERPALS_DEMO_AUDIT_PATH
  };

  process.env.PROSPERPALS_DEMO_RECEIPT_PATH = path.join(tempDir, 'demo-receipts.jsonl');
  process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH = path.join(tempDir, 'demo-receipt-artifacts.jsonl');
  process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR = path.join(tempDir, 'receipt-uploads');
  process.env.PROSPERPALS_DEMO_LEDGER_PATH = path.join(tempDir, 'demo-ledger.jsonl');
  process.env.PROSPERPALS_DEMO_ANALYTICS_PATH = path.join(tempDir, 'demo-analytics.jsonl');
  process.env.PROSPERPALS_DEMO_AUDIT_PATH = path.join(tempDir, 'demo-operator-audit.jsonl');

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

    if (previous.audit) process.env.PROSPERPALS_DEMO_AUDIT_PATH = previous.audit;
    else delete process.env.PROSPERPALS_DEMO_AUDIT_PATH;

    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

test('receipt OCR candidates stay reviewable until explicit confirmation', async () => {
  await withTempRuntime(async () => {
    const receipts = await import('../src/lib/receipts/demo-receipts.ts');

    const captured = await receipts.captureReceiptCandidate({
      userId,
      requestId: 'receipt-req-001',
      traceId,
      merchantLabel: 'Foetex City',
      amountMajor: 226.45,
      categoryId: 'groceries'
    });

    assert.equal(captured.status, 'candidate');
    const candidate = captured.candidate;

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

    const captured = await receipts.captureReceiptCandidate({
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

    assert.equal(captured.status, 'candidate');
    const candidate = captured.candidate;

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

test('failed receipt parsing stops before candidate creation and exposes recovery proof', async () => {
  await withTempRuntime(async () => {
    const receipts = await import('../src/lib/receipts/demo-receipts.ts');

    const result = await receipts.captureReceiptCandidate({
      userId,
      requestId: 'receipt-req-030',
      traceId,
      merchantLabel: 'FAIL_PROVIDER_NETTO',
      amountMajor: 98.5,
      categoryId: 'groceries',
      upload: {
        fileName: 'receipt-netto.png',
        mimeType: 'image/png',
        bytes: Buffer.from('fake-png-binary')
      }
    });

    assert.equal(result.status, 'failed');
    assert.equal(result.failure.failureStage, 'provider_parse');
    assert.match(result.failure.userMessage, /failed safely/i);

    const reviewState = await receipts.getDemoReceiptReviewState(userId);
    const records = await receipts.readDemoReceiptRecords(userId);
    const candidates = records.filter((record) => record.kind === 'receipt_candidate');

    assert.equal(reviewState.pendingCandidate, undefined);
    assert.equal(reviewState.failureCount, 1);
    assert.equal(reviewState.latestFailure.failureCode, 'OCR_PROVIDER_UNAVAILABLE');
    assert.equal(candidates.length, 0);
  });
});

test('duplicate receipt confirmation reuses the first reviewed truth instead of writing a second one', async () => {
  await withTempRuntime(async () => {
    const receipts = await import('../src/lib/receipts/demo-receipts.ts');

    const captured = await receipts.captureReceiptCandidate({
      userId,
      requestId: 'receipt-req-010',
      traceId,
      merchantLabel: 'Netto Nørreport',
      amountMajor: 98.5,
      categoryId: 'groceries'
    });

    assert.equal(captured.status, 'candidate');
    const candidate = captured.candidate;

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
    const audit = await import('../src/lib/audit/demo-audit.ts');
    const receipts = await import('../src/lib/receipts/demo-receipts.ts');
    const simulator = await import('../src/lib/simulator/demo-simulator.ts');
    const telemetry = await import('../src/lib/telemetry/demo-event-store.ts');
    const support = await import('../src/lib/support/demo-support.ts');

    const captured = await receipts.captureReceiptCandidate({
      userId,
      requestId: 'receipt-req-003',
      traceId,
      merchantLabel: 'Rema 1000',
      amountMajor: 148.5,
      categoryId: 'groceries'
    });

    assert.equal(captured.status, 'candidate');
    const candidate = captured.candidate;

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

    await audit.recordSupportTimelineViewAudit({
      actorUserId: '22222222-2222-4222-8222-222222222222',
      subjectUserId: userId,
      requestId: 'audit-req-001',
      traceId,
      path: '/app/support',
      reason: 'support review for receipt issue',
      supportTraceView: true,
      occurredAt: new Date().toISOString()
    });

    const consoleState = await support.getDemoSupportConsole(userId, {
      countryCode: 'DK',
      internalUser: true
    });

    assert.ok(consoleState.timeline.length >= 4);
    assert.ok(consoleState.timeline.some((item) => item.type === 'audit'));
    assert.ok(consoleState.timeline.some((item) => item.type === 'receipt'));
    assert.ok(consoleState.timeline.some((item) => item.type === 'ledger'));
    assert.ok(consoleState.releaseSafety.checks.some((check) => check.id === 'notification-contract' && check.ok));
    assert.match(consoleState.redactionPolicy.join(' '), /Notification contracts forbid merchant names/i);
  });
});

test('receipt capture pause interventions are actor-audited and enforce a live intake hold until cleared', async () => {
  await withTempRuntime(async () => {
    const audit = await import('../src/lib/audit/demo-audit.ts');

    await audit.recordSupportInterventionAudit({
      actorUserId: '22222222-2222-4222-8222-222222222222',
      subjectUserId: userId,
      requestId: 'audit-req-010',
      traceId,
      path: '/app/support',
      reason: 'receipt lineage review in progress',
      supportTraceView: true,
      interventionCode: 'receipt_capture_paused',
      action: 'applied',
      occurredAt: new Date().toISOString()
    });

    const activeAfterPause = await audit.getActiveSupportInterventions(userId);
    assert.equal(activeAfterPause.length, 1);
    assert.equal(activeAfterPause[0].code, 'receipt_capture_paused');
    assert.match(activeAfterPause[0].reason, /lineage review/i);

    await assert.rejects(
      () => audit.assertReceiptCaptureAllowed(userId),
      /Support intervention active: receipt_capture_paused/
    );

    await audit.recordSupportInterventionAudit({
      actorUserId: '22222222-2222-4222-8222-222222222222',
      subjectUserId: userId,
      requestId: 'audit-req-011',
      traceId,
      path: '/app/support',
      reason: 'receipt capture reopened after support review',
      supportTraceView: true,
      interventionCode: 'receipt_capture_paused',
      action: 'cleared',
      occurredAt: new Date().toISOString()
    });

    const activeAfterClear = await audit.getActiveSupportInterventions(userId);
    assert.equal(activeAfterClear.length, 0);
    await assert.doesNotReject(() => audit.assertReceiptCaptureAllowed(userId));
  });
});

test('actor-audited release overrides can force off receipt capture and simulator starter until cleared', async () => {
  await withTempRuntime(async () => {
    const audit = await import('../src/lib/audit/demo-audit.ts');
    const flags = await import('../src/lib/feature-flags/config.ts');
    const releaseSafety = await import('../src/lib/operations/release-safety.ts');

    const baseFlags = await flags.getEffectiveFeatureFlags({
      countryCode: 'DK',
      internalUser: true
    });
    assert.equal(baseFlags.receiptCapture, true);
    assert.equal(baseFlags.simulatorStarter, true);

    await audit.recordReleaseFlagOverrideAudit({
      actorUserId: '22222222-2222-4222-8222-222222222222',
      requestId: 'audit-req-020',
      traceId,
      path: '/app/support',
      reason: 'receipt trust hardening review still open',
      scope: 'denmark-alpha-hosted',
      supportTraceView: true,
      roleUsed: 'admin',
      flagName: 'receiptCapture',
      enabled: false,
      action: 'applied',
      occurredAt: new Date().toISOString()
    });

    await audit.recordReleaseFlagOverrideAudit({
      actorUserId: '22222222-2222-4222-8222-222222222222',
      requestId: 'audit-req-021',
      traceId,
      path: '/app/support',
      reason: 'simulator trust review still open',
      scope: 'denmark-alpha-hosted',
      supportTraceView: true,
      roleUsed: 'admin',
      flagName: 'simulatorStarter',
      enabled: false,
      action: 'applied',
      occurredAt: new Date().toISOString()
    });

    const activeOverrides = await audit.getActiveReleaseFlagOverrides();
    assert.equal(activeOverrides.length, 2);
    assert.equal(activeOverrides.every((override) => override.enabled === false), true);
    assert.equal(activeOverrides.every((override) => override.roleUsed === 'admin'), true);

    const forcedOffFlags = await flags.getEffectiveFeatureFlags({
      countryCode: 'DK',
      internalUser: true
    });
    assert.equal(forcedOffFlags.receiptCapture, false);
    assert.equal(forcedOffFlags.simulatorStarter, false);

    const summaryWhileForcedOff = await releaseSafety.getReleaseSafetySummary({
      countryCode: 'DK',
      internalUser: true
    });
    assert.equal(summaryWhileForcedOff.activeOverrides.length, 2);
    assert.equal(summaryWhileForcedOff.checks.find((check) => check.id === 'receipt-capture-flag')?.ok, false);
    assert.match(
      summaryWhileForcedOff.checks.find((check) => check.id === 'receipt-capture-flag')?.detail ?? '',
      /actor-audited release override/i
    );

    await audit.recordReleaseFlagOverrideAudit({
      actorUserId: '22222222-2222-4222-8222-222222222222',
      requestId: 'audit-req-022',
      traceId,
      path: '/app/support',
      reason: 'receipt review closed',
      scope: 'denmark-alpha-hosted',
      supportTraceView: true,
      roleUsed: 'admin',
      flagName: 'receiptCapture',
      enabled: false,
      action: 'cleared',
      occurredAt: new Date().toISOString()
    });

    const partiallyClearedFlags = await flags.getEffectiveFeatureFlags({
      countryCode: 'DK',
      internalUser: true
    });
    assert.equal(partiallyClearedFlags.receiptCapture, true);
    assert.equal(partiallyClearedFlags.simulatorStarter, false);
  });
});

test('operator role policy separates support-safe and admin-only rails', async () => {
  await withTempRuntime(async () => {
    const access = await import('../src/lib/support/operator-access.ts');
    const audit = await import('../src/lib/audit/demo-audit.ts');
    const support = await import('../src/lib/support/demo-support.ts');

    assert.equal(access.hasOperatorCapability('support', 'support_timeline_view'), true);
    assert.equal(access.hasOperatorCapability('support', 'receipt_capture_intervention'), true);
    assert.equal(access.hasOperatorCapability('support', 'release_flag_override'), false);
    assert.equal(access.hasOperatorCapability('admin', 'support_timeline_view'), true);
    assert.equal(access.hasOperatorCapability('admin', 'receipt_capture_intervention'), false);
    assert.equal(access.hasOperatorCapability('admin', 'release_flag_override'), true);
    assert.equal(access.hasOperatorCapability('founder-operator', 'receipt_capture_intervention'), true);
    assert.equal(access.hasOperatorCapability('founder-operator', 'release_flag_override'), true);

    await audit.recordSupportInterventionAudit({
      actorUserId: '22222222-2222-4222-8222-222222222222',
      subjectUserId: userId,
      requestId: 'audit-req-role-001',
      traceId,
      path: '/app/support',
      reason: 'support role paused receipt capture',
      supportTraceView: true,
      roleUsed: 'support',
      interventionCode: 'receipt_capture_paused',
      action: 'applied',
      occurredAt: new Date().toISOString()
    });

    await audit.recordReleaseFlagOverrideAudit({
      actorUserId: '22222222-2222-4222-8222-222222222222',
      requestId: 'audit-req-role-002',
      traceId,
      path: '/app/support',
      reason: 'admin role forced off receipt capture',
      scope: 'denmark-alpha-hosted',
      supportTraceView: true,
      roleUsed: 'admin',
      flagName: 'receiptCapture',
      enabled: false,
      action: 'applied',
      occurredAt: new Date().toISOString()
    });

    const activeInterventions = await audit.getActiveSupportInterventions(userId);
    assert.equal(activeInterventions[0]?.roleUsed, 'support');

    const activeOverrides = await audit.getActiveReleaseFlagOverrides();
    assert.equal(activeOverrides[0]?.roleUsed, 'admin');

    const consoleState = await support.getDemoSupportConsole(userId, {
      countryCode: 'DK',
      internalUser: true
    });
    assert.ok(consoleState.timeline.some((item) => item.details.some((detail) => /Role used: support/.test(detail))));
    assert.ok(consoleState.timeline.some((item) => item.details.some((detail) => /Role used: admin/.test(detail))));
  });
});

test('support subject resolution keeps actor-vs-subject review explicit without impersonation', async () => {
  await withTempRuntime(async () => {
    const access = await import('../src/lib/support/operator-access.ts');

    assert.deepEqual(
      access.resolveSupportSubject({
        viewerUserId: userId,
        requestedSubjectUserId: undefined
      }),
      {
        subjectUserId: userId,
        isCrossAccount: false
      }
    );

    assert.deepEqual(
      access.resolveSupportSubject({
        viewerUserId: userId,
        requestedSubjectUserId: '33333333-3333-4333-8333-333333333333'
      }),
      {
        subjectUserId: '33333333-3333-4333-8333-333333333333',
        isCrossAccount: true
      }
    );
  });
});

test('cross-account subject mutations stay blocked until an approval-backed workflow exists', async () => {
  await withTempRuntime(async () => {
    const access = await import('../src/lib/support/operator-access.ts');
    const audit = await import('../src/lib/audit/demo-audit.ts');
    const support = await import('../src/lib/support/demo-support.ts');
    const subjectUserId = '33333333-3333-4333-8333-333333333333';

    assert.throws(
      () => access.assertSubjectScopedInterventionAllowed({
        viewerUserId: userId,
        requestedSubjectUserId: subjectUserId,
        capability: 'receipt_capture_intervention'
      }),
      (error) => {
        assert.equal(
          error instanceof access.CrossAccountSubjectInterventionRequiresApprovalError,
          true
        );
        assert.equal(error.subjectUserId, subjectUserId);
        assert.equal(error.capability, 'receipt_capture_intervention');
        return true;
      }
    );

    await audit.recordSupportBoundaryBlockedAudit({
      actorUserId: userId,
      subjectUserId,
      requestId: 'audit-req-boundary-001',
      traceId,
      path: '/app/support',
      reason: 'Cross-account receipt_capture_intervention stays read-only until an approval-backed workflow exists',
      supportTraceView: true,
      roleUsed: 'founder-operator',
      capability: 'receipt_capture_intervention',
      boundaryCode: 'cross_account_subject_action_requires_approval',
      occurredAt: new Date().toISOString()
    });

    await audit.recordSupportApprovalRequestedAudit({
      actorUserId: userId,
      subjectUserId,
      requestId: 'audit-req-approval-001',
      traceId,
      path: '/app/support',
      reason: 'Requesting founder approval for a bounded cross-account receipt hold',
      supportTraceView: true,
      roleUsed: 'support',
      code: 'cross_account_receipt_capture_intervention',
      requestedCapability: 'receipt_capture_intervention',
      approvalOwner: 'founder-operator',
      requestedAction: 'apply or clear a receipt capture hold for a reviewed subject outside the operator\'s own account',
      status: 'pending',
      occurredAt: new Date().toISOString()
    });

    const events = await audit.readDemoAuditEvents({
      actorUserId: userId,
      subjectUserId,
      eventCodes: [audit.SUPPORT_BOUNDARY_BLOCKED_EVENT, audit.SUPPORT_APPROVAL_REQUESTED_EVENT],
      limit: 8
    });
    assert.equal(events.length, 2);
    assert.equal(events.some((event) => event.payload.capability === 'receipt_capture_intervention'), true);
    assert.equal(events.some((event) => event.payload.approvalRequestCode === 'cross_account_receipt_capture_intervention'), true);

    const pendingApprovals = await audit.getPendingSupportApprovalRequests(subjectUserId);
    assert.equal(pendingApprovals.length, 1);
    assert.equal(pendingApprovals[0].status, 'pending');
    assert.equal(pendingApprovals[0].requestedCapability, 'receipt_capture_intervention');

    const consoleState = await support.getDemoSupportConsole(subjectUserId, {
      countryCode: 'DK',
      internalUser: true
    });
    assert.equal(consoleState.pendingApprovalRequests.length, 1);
    assert.ok(consoleState.timeline.some((item) => item.title === 'Cross-account subject action blocked'));
    assert.ok(consoleState.timeline.some((item) => item.title === 'Cross-account approval requested'));
    assert.ok(consoleState.timeline.some((item) => item.details.some((detail) => /Approval owner: founder-operator/.test(detail))));
  });
});

test('audit events can use the hosted PostgREST durability path when configured', async () => {
  await withTempRuntime(async () => {
    const previousUrl = process.env.PROSPERPALS_SUPABASE_URL;
    const previousKey = process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
    const previousMode = process.env.PROSPERPALS_AUDIT_DURABILITY_MODE;
    const originalFetch = global.fetch;
    const storedEvents = [];

    process.env.PROSPERPALS_SUPABASE_URL = 'https://prosperpals.supabase.test';
    process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = 'service-role-test-key';
    process.env.PROSPERPALS_AUDIT_DURABILITY_MODE = 'hosted-only';

    global.fetch = async (url, init = {}) => {
      if (init.method === 'POST') {
        const payload = JSON.parse(init.body);
        storedEvents.push(...payload);
        return new Response(JSON.stringify(payload), {
          status: 201,
          headers: { 'content-type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(storedEvents), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    };

    try {
      const audit = await import('../src/lib/audit/demo-audit.ts');

      await audit.recordSupportTimelineViewAudit({
        actorUserId: '22222222-2222-4222-8222-222222222222',
        subjectUserId: userId,
        requestId: 'audit-req-hosted-001',
        traceId,
        path: '/app/support',
        reason: 'hosted durability smoke test',
        supportTraceView: true,
        occurredAt: new Date().toISOString()
      });

      const events = await audit.readDemoAuditEvents({ subjectUserId: userId, limit: 8 });
      assert.equal(events.length, 1);
      assert.equal(events[0].eventCode, 'support.timeline.viewed');
      await assert.rejects(fs.readFile(process.env.PROSPERPALS_DEMO_AUDIT_PATH, 'utf8'), /ENOENT/);
    } finally {
      global.fetch = originalFetch;
      if (previousUrl) process.env.PROSPERPALS_SUPABASE_URL = previousUrl;
      else delete process.env.PROSPERPALS_SUPABASE_URL;
      if (previousKey) process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = previousKey;
      else delete process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
      if (previousMode) process.env.PROSPERPALS_AUDIT_DURABILITY_MODE = previousMode;
      else delete process.env.PROSPERPALS_AUDIT_DURABILITY_MODE;
    }
  });
});
