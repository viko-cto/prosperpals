#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

import {
  appendDemoAuditEvent,
  readDemoAuditEvents,
  SUPPORT_TIMELINE_VIEWED_EVENT
} from '../src/lib/audit/demo-audit.ts';
import {
  awardProsperCoins,
  executeStarterTrade,
  getDemoRewardLoopSummary,
  readDemoLedgerRecords
} from '../src/lib/simulator/demo-simulator.ts';
import {
  appendDemoAnalyticsEvent,
  getDemoAnalyticsSummary,
  readDemoAnalyticsEvents
} from '../src/lib/telemetry/demo-event-store.ts';
import {
  getDemoOnboardingState,
  getDemoOnboardingStateLocation,
  setDemoOnboardingState
} from '../src/lib/onboarding/demo-state.ts';
import {
  captureReceiptCandidate,
  confirmReceiptCandidate,
  getDemoReceiptReviewState,
  readDemoReceiptRecords
} from '../src/lib/receipts/demo-receipts.ts';

const requiredEnv = [
  'PROSPERPALS_SUPABASE_URL',
  'PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY'
];

const defaultUserId = '00000000-0000-4000-8000-000000000001';
const defaultActorUserId = '00000000-0000-4000-8000-000000000002';
const defaultTraceId = '00000000-0000-4000-8000-000000000003';

function getMissingEnv() {
  return requiredEnv.filter((name) => !process.env[name]);
}

function assertHostedOnlyMode(name, expected) {
  if (process.env[name] !== expected) {
    throw new Error(`${name} must be ${expected} for an honest hosted smoke run.`);
  }
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function makeReportMarkdown(result) {
  return `# Preview Hosted Trust-Lane Smoke Report

- **Generated at:** ${result.generatedAt}
- **Environment label:** ${result.environmentLabel}
- **Supabase base URL:** ${result.supabaseUrl}
- **Audit mode:** ${result.auditMode}
- **Ledger mode:** ${result.ledgerMode}
- **Analytics mode:** ${result.analyticsMode}
- **Onboarding mode:** ${result.onboardingMode}
- **Receipt mode:** ${result.receiptMode}
- **Audit table:** ${result.auditTable}
- **Ledger table:** ${result.ledgerTable}
- **Analytics table:** ${result.analyticsTable}
- **Onboarding table:** ${result.onboardingTable}
- **Receipt table:** ${result.receiptTable}
- **Receipt artifact table:** ${result.receiptArtifactTable}
- **Actor user:** ${result.actorUserId}
- **Subject user:** ${result.subjectUserId}
- **Request id:** ${result.requestId}
- **Trace id:** ${result.traceId}

## Checks

- Hosted-only audit mode enforced: **PASS**
- Hosted-only ledger mode enforced: **PASS**
- Hosted-only analytics mode enforced: **PASS**
- Hosted-only onboarding mode enforced: **PASS**
- Hosted-only receipt mode enforced: **PASS**
- Audit write/read round-trip: **PASS**
- Reward credit write/read round-trip: **PASS**
- Starter trade write/read round-trip: **PASS**
- Analytics write/read round-trip: **PASS**
- Onboarding write/read round-trip: **PASS**
- Receipt candidate + confirmation round-trip: **PASS**
- No local audit sink created: **${result.localAuditSinkCreated ? 'FAIL' : 'PASS'}**
- No local ledger sink created: **${result.localLedgerSinkCreated ? 'FAIL' : 'PASS'}**
- No local analytics sink created: **${result.localAnalyticsSinkCreated ? 'FAIL' : 'PASS'}**
- No local receipt sink created: **${result.localReceiptSinkCreated ? 'FAIL' : 'PASS'}**
- No local receipt artifact sink created: **${result.localReceiptArtifactSinkCreated ? 'FAIL' : 'PASS'}**
- No local receipt upload dir created: **${result.localReceiptUploadDirCreated ? 'FAIL' : 'PASS'}**

## Audit proof

- Event code: \`${result.auditEventCode}\`
- Read-back count for request id: **${result.auditReadBackCount}**

## Ledger proof

- Records read back: **${result.ledgerRecordCount}**
- Available coins after trade: **${result.availableCoinsAfterTrade}**
- Total earned coins: **${result.totalEarnedCoins}**
- Total debited coins: **${result.totalDebitedCoins}**
- Ledger location: \`${result.ledgerPath}\`

## Analytics proof

- Events read back for request id: **${result.analyticsReadBackCount}**
- Summary event count: **${result.analyticsSummaryEventCount}**
- Analytics location: \`${result.analyticsPath}\`
- First-value target met: **${result.analyticsTargetMet === true ? 'YES' : result.analyticsTargetMet === false ? 'NO' : 'UNKNOWN'}**

## Onboarding proof

- Onboarding location: \`${result.onboardingStateLocation}\`
- Selected intent after read-back: **${result.onboardingSelectedIntent}**
- Experience mode after read-back: **${result.onboardingModeValue}**
- First-value completed at persisted: **${result.onboardingFirstValueCompletedAt}**

## Receipt proof

- Receipt sink location: \`${result.receiptSinkPath}\`
- Receipt artifact location: \`${result.receiptArtifactSinkPath}\`
- Receipt records read back: **${result.receiptRecordCount}**
- Receipt confirmations read back: **${result.receiptConfirmationCount}**
- Latest artifact id: \`${result.receiptArtifactId}\`
- Confirmed candidate id: \`${result.receiptCandidateId}\`
- Pending candidate after confirmation: **${result.receiptPendingCandidateExists ? 'YES' : 'NO'}**

## Notes

This report proves the hosted PostgREST audit + ledger + analytics + onboarding + receipt paths together. It does **not** soften the ProsperPals alpha NO-GO by itself. Interview evidence and broader operator-boundary gaps still need separate proof.
`;
}

async function main() {
  const missingEnv = getMissingEnv();
  if (missingEnv.length) {
    throw new Error(`Missing required env vars: ${missingEnv.join(', ')}`);
  }

  assertHostedOnlyMode('PROSPERPALS_AUDIT_DURABILITY_MODE', 'hosted-only');
  assertHostedOnlyMode('PROSPERPALS_LEDGER_DURABILITY_MODE', 'hosted-only');
  assertHostedOnlyMode('PROSPERPALS_ANALYTICS_DURABILITY_MODE', 'hosted-only');
  assertHostedOnlyMode('PROSPERPALS_ONBOARDING_DURABILITY_MODE', 'hosted-only');
  assertHostedOnlyMode('PROSPERPALS_RECEIPT_DURABILITY_MODE', 'hosted-only');

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pp-hosted-smoke-'));
  const localAuditPath = path.join(tempDir, 'demo-operator-audit.jsonl');
  const localLedgerPath = path.join(tempDir, 'demo-ledger.jsonl');
  const localAnalyticsPath = path.join(tempDir, 'demo-analytics.jsonl');
  const localReceiptPath = path.join(tempDir, 'demo-receipts.jsonl');
  const localReceiptArtifactsPath = path.join(tempDir, 'demo-receipt-artifacts.jsonl');
  const localReceiptUploadDir = path.join(tempDir, 'receipt-uploads');

  process.env.PROSPERPALS_DEMO_AUDIT_PATH = localAuditPath;
  process.env.PROSPERPALS_DEMO_LEDGER_PATH = localLedgerPath;
  process.env.PROSPERPALS_DEMO_ANALYTICS_PATH = localAnalyticsPath;
  process.env.PROSPERPALS_DEMO_RECEIPT_PATH = localReceiptPath;
  process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH = localReceiptArtifactsPath;
  process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR = localReceiptUploadDir;

  const occurredAt = new Date().toISOString();
  const requestId = `hosted-smoke-${Date.now()}`;
  const actorUserId = process.env.PROSPERPALS_HOSTED_SMOKE_ACTOR_USER_ID ?? defaultActorUserId;
  const subjectUserId = process.env.PROSPERPALS_HOSTED_SMOKE_SUBJECT_USER_ID ?? defaultUserId;
  const traceId = process.env.PROSPERPALS_HOSTED_SMOKE_TRACE_ID ?? defaultTraceId;
  const environmentLabel = process.env.PROSPERPALS_ENV ?? 'preview';

  await appendDemoAuditEvent({
    occurredAt,
    actorUserId,
    subjectUserId,
    eventCode: SUPPORT_TIMELINE_VIEWED_EVENT,
    requestId,
    traceId,
    payload: {
      path: '/app/support',
      reason: 'Hosted durability smoke proof',
      supportTraceView: true
    }
  });

  const auditEvents = await readDemoAuditEvents({
    actorUserId,
    subjectUserId,
    eventCodes: [SUPPORT_TIMELINE_VIEWED_EVENT],
    limit: 32
  });
  const matchingAuditEvents = auditEvents.filter((event) => event.requestId === requestId);
  if (!matchingAuditEvents.length) {
    throw new Error('Audit smoke write did not round-trip through the hosted adapter.');
  }

  await appendDemoAnalyticsEvent({
    event: 'onboarding.first-value.completed',
    occurredAt,
    userId: subjectUserId,
    requestId,
    traceId,
    path: '/app/onboarding',
    selectedIntent: 'invest-first',
    mode: 'lite',
    targetTimeToValueSeconds: 80,
    firstValueSeconds: 42,
    merchantLabel: 'Netto',
    amountMinor: 18900,
    currency: 'DKK',
    dailySpendingPowerMinor: 27000,
    headline: 'Hosted analytics smoke proof landed.',
    message: 'First-value telemetry round-tripped through the hosted adapter.'
  });

  const analyticsEvents = await readDemoAnalyticsEvents(subjectUserId, 32);
  const matchingAnalyticsEvents = analyticsEvents.filter((event) => event.requestId === requestId);
  if (!matchingAnalyticsEvents.length) {
    throw new Error('Analytics smoke write did not round-trip through the hosted adapter.');
  }

  const analyticsSummary = await getDemoAnalyticsSummary(subjectUserId);

  const onboardingStateToPersist = {
    selectedIntent: 'invest-first',
    mode: 'lite',
    onboardingStartedAt: occurredAt,
    firstValueCompletedAt: occurredAt,
    firstMoneyEvent: {
      merchantLabel: 'Netto Nørreport',
      amountMinor: 18900,
      currency: 'DKK',
      occurredAt,
      categoryId: 'groceries',
      sourceType: 'manual',
      verificationState: 'user_confirmed'
    },
    firstInsight: {
      headline: 'Goldie found your first daily spending signal.',
      body: 'One confirmed spend turned into a calm starter planning insight.',
      dailySpendingPowerMinor: 27000,
      currency: 'DKK',
      awardedAt: occurredAt
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
    }
  };

  await setDemoOnboardingState(subjectUserId, onboardingStateToPersist);
  const restoredOnboardingState = await getDemoOnboardingState(subjectUserId);
  if (restoredOnboardingState.selectedIntent !== onboardingStateToPersist.selectedIntent) {
    throw new Error('Onboarding smoke write did not round-trip the selected intent through the hosted adapter.');
  }
  if (restoredOnboardingState.firstValueCompletedAt !== onboardingStateToPersist.firstValueCompletedAt) {
    throw new Error('Onboarding smoke write did not round-trip the first-value completion timestamp through the hosted adapter.');
  }

  const receiptCapture = await captureReceiptCandidate({
    userId: subjectUserId,
    requestId: `${requestId}:receipt-capture`,
    traceId,
    merchantLabel: 'Netto Nørreport',
    amountMajor: 98.5,
    categoryId: 'groceries',
    occurredAt,
    upload: {
      fileName: 'receipt-netto.jpg',
      mimeType: 'image/jpeg',
      bytes: Buffer.from('hosted receipt smoke proof')
    }
  });

  if (receiptCapture.status !== 'candidate') {
    throw new Error('Receipt smoke capture did not produce a reviewable candidate.');
  }

  const receiptConfirmation = await confirmReceiptCandidate({
    userId: subjectUserId,
    candidateId: receiptCapture.candidate.candidateId,
    requestId: `${requestId}:receipt-confirm`,
    traceId,
    merchantLabel: 'Netto Nørreport',
    amountMajor: 98.5,
    categoryId: 'groceries',
    occurredAt
  });

  if (receiptConfirmation.alreadyConfirmed) {
    throw new Error('Receipt smoke confirmation unexpectedly re-used an already confirmed candidate.');
  }

  const receiptReviewState = await getDemoReceiptReviewState(subjectUserId);
  const receiptRecords = await readDemoReceiptRecords(subjectUserId);
  const receiptConfirmationCount = receiptRecords.filter((record) => record.kind === 'receipt_confirmation').length;

  if (receiptConfirmationCount < 1 || !receiptReviewState.latestConfirmed) {
    throw new Error('Receipt smoke confirmation did not round-trip through the hosted adapter.');
  }

  await awardProsperCoins({
    userId: subjectUserId,
    idempotencyKey: `${requestId}:reward`,
    requestId,
    traceId,
    reasonCode: 'INVEST_FIRST_STARTER',
    coins: 40,
    referenceType: 'hosted_durability_smoke'
  });

  const tradeResult = await executeStarterTrade({
    userId: subjectUserId,
    assetId: 'NOVO-B',
    idempotencyKey: `${requestId}:trade`,
    requestId,
    traceId,
    occurredAt
  });

  if (tradeResult.status !== 'executed') {
    throw new Error(`Starter trade smoke run failed: ${tradeResult.status} — ${tradeResult.message}`);
  }

  const ledgerRecords = await readDemoLedgerRecords(subjectUserId);
  const summary = await getDemoRewardLoopSummary(subjectUserId);

  if (ledgerRecords.length < 3) {
    throw new Error(`Expected at least 3 hosted ledger records, received ${ledgerRecords.length}.`);
  }

  const localAuditSinkCreated = await fileExists(localAuditPath);
  const localLedgerSinkCreated = await fileExists(localLedgerPath);
  const localAnalyticsSinkCreated = await fileExists(localAnalyticsPath);
  const localReceiptSinkCreated = await fileExists(localReceiptPath);
  const localReceiptArtifactSinkCreated = await fileExists(localReceiptArtifactsPath);
  const localReceiptUploadDirCreated = await fileExists(localReceiptUploadDir);

  if (
    localAuditSinkCreated
    || localLedgerSinkCreated
    || localAnalyticsSinkCreated
    || localReceiptSinkCreated
    || localReceiptArtifactSinkCreated
    || localReceiptUploadDirCreated
  ) {
    throw new Error('Hosted smoke run created a local fallback sink, which means fail-closed durability was not preserved.');
  }

  const result = {
    generatedAt: new Date().toISOString(),
    environmentLabel,
    supabaseUrl: process.env.PROSPERPALS_SUPABASE_URL,
    auditMode: process.env.PROSPERPALS_AUDIT_DURABILITY_MODE,
    ledgerMode: process.env.PROSPERPALS_LEDGER_DURABILITY_MODE,
    analyticsMode: process.env.PROSPERPALS_ANALYTICS_DURABILITY_MODE,
    onboardingMode: process.env.PROSPERPALS_ONBOARDING_DURABILITY_MODE,
    receiptMode: process.env.PROSPERPALS_RECEIPT_DURABILITY_MODE,
    auditTable: process.env.PROSPERPALS_AUDIT_TABLE ?? 'demo_operator_audit_events',
    ledgerTable: process.env.PROSPERPALS_LEDGER_TABLE ?? 'demo_ledger_records',
    analyticsTable: process.env.PROSPERPALS_ANALYTICS_TABLE ?? 'demo_analytics_events',
    onboardingTable: process.env.PROSPERPALS_ONBOARDING_TABLE ?? 'demo_onboarding_states',
    receiptTable: process.env.PROSPERPALS_RECEIPT_TABLE ?? 'demo_receipt_records',
    receiptArtifactTable: process.env.PROSPERPALS_RECEIPT_ARTIFACT_TABLE ?? 'demo_receipt_artifacts',
    actorUserId,
    subjectUserId,
    requestId,
    traceId,
    auditEventCode: SUPPORT_TIMELINE_VIEWED_EVENT,
    auditReadBackCount: matchingAuditEvents.length,
    ledgerRecordCount: ledgerRecords.length,
    ledgerPath: summary.ledgerPath,
    availableCoinsAfterTrade: summary.availableCoins,
    totalEarnedCoins: summary.totalEarnedCoins,
    totalDebitedCoins: summary.totalDebitedCoins,
    analyticsReadBackCount: matchingAnalyticsEvents.length,
    analyticsSummaryEventCount: analyticsSummary.eventCount,
    analyticsPath: analyticsSummary.sinkPath,
    analyticsTargetMet: analyticsSummary.targetMet,
    onboardingStateLocation: getDemoOnboardingStateLocation(),
    onboardingSelectedIntent: restoredOnboardingState.selectedIntent,
    onboardingModeValue: restoredOnboardingState.mode,
    onboardingFirstValueCompletedAt: restoredOnboardingState.firstValueCompletedAt ?? null,
    receiptRecordCount: receiptRecords.length,
    receiptConfirmationCount,
    receiptSinkPath: receiptReviewState.sinkPath,
    receiptArtifactSinkPath: receiptReviewState.artifactSinkPath,
    receiptArtifactId: receiptCapture.artifact.artifactId,
    receiptCandidateId: receiptCapture.candidate.candidateId,
    receiptPendingCandidateExists: Boolean(receiptReviewState.pendingCandidate),
    localAuditSinkCreated,
    localLedgerSinkCreated,
    localAnalyticsSinkCreated,
    localReceiptSinkCreated,
    localReceiptArtifactSinkCreated,
    localReceiptUploadDirCreated
  };

  const reportPath = process.env.PROSPERPALS_HOSTED_SMOKE_REPORT_PATH;
  if (reportPath) {
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, makeReportMarkdown(result), 'utf8');
  }

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
