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
  return `# Preview Hosted Durability Smoke Report\n\n- **Generated at:** ${result.generatedAt}\n- **Environment label:** ${result.environmentLabel}\n- **Supabase base URL:** ${result.supabaseUrl}\n- **Audit mode:** ${result.auditMode}\n- **Ledger mode:** ${result.ledgerMode}\n- **Analytics mode:** ${result.analyticsMode}\n- **Audit table:** ${result.auditTable}\n- **Ledger table:** ${result.ledgerTable}\n- **Analytics table:** ${result.analyticsTable}\n- **Actor user:** ${result.actorUserId}\n- **Subject user:** ${result.subjectUserId}\n- **Request id:** ${result.requestId}\n- **Trace id:** ${result.traceId}\n\n## Checks\n\n- Hosted-only audit mode enforced: **PASS**\n- Hosted-only ledger mode enforced: **PASS**\n- Hosted-only analytics mode enforced: **PASS**\n- Audit write/read round-trip: **PASS**\n- Reward credit write/read round-trip: **PASS**\n- Starter trade write/read round-trip: **PASS**\n- Analytics write/read round-trip: **PASS**\n- No local audit sink created: **${result.localAuditSinkCreated ? 'FAIL' : 'PASS'}**\n- No local ledger sink created: **${result.localLedgerSinkCreated ? 'FAIL' : 'PASS'}**\n- No local analytics sink created: **${result.localAnalyticsSinkCreated ? 'FAIL' : 'PASS'}**\n\n## Audit proof\n\n- Event code: \`${result.auditEventCode}\`\n- Read-back count for request id: **${result.auditReadBackCount}**\n\n## Ledger proof\n\n- Records read back: **${result.ledgerRecordCount}**\n- Available coins after trade: **${result.availableCoinsAfterTrade}**\n- Total earned coins: **${result.totalEarnedCoins}**\n- Total debited coins: **${result.totalDebitedCoins}**\n- Ledger location: \`${result.ledgerPath}\`\n\n## Analytics proof\n\n- Events read back for request id: **${result.analyticsReadBackCount}**\n- Summary event count: **${result.analyticsSummaryEventCount}**\n- Analytics location: \`${result.analyticsPath}\`\n- First-value target met: **${result.analyticsTargetMet === true ? 'YES' : result.analyticsTargetMet === false ? 'NO' : 'UNKNOWN'}**\n\n## Notes\n\nThis report proves the hosted PostgREST audit + ledger + analytics paths. It does **not** soften the ProsperPals alpha NO-GO by itself. Interview evidence, broader hosted durability, receipt-state durability, and operator-boundary gaps still need separate proof.\n`; }

async function main() {
  const missingEnv = getMissingEnv();
  if (missingEnv.length) {
    throw new Error(`Missing required env vars: ${missingEnv.join(', ')}`);
  }

  assertHostedOnlyMode('PROSPERPALS_AUDIT_DURABILITY_MODE', 'hosted-only');
  assertHostedOnlyMode('PROSPERPALS_LEDGER_DURABILITY_MODE', 'hosted-only');
  assertHostedOnlyMode('PROSPERPALS_ANALYTICS_DURABILITY_MODE', 'hosted-only');

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pp-hosted-smoke-'));
  const localAuditPath = path.join(tempDir, 'demo-operator-audit.jsonl');
  const localLedgerPath = path.join(tempDir, 'demo-ledger.jsonl');
  const localAnalyticsPath = path.join(tempDir, 'demo-analytics.jsonl');
  process.env.PROSPERPALS_DEMO_AUDIT_PATH = localAuditPath;
  process.env.PROSPERPALS_DEMO_LEDGER_PATH = localLedgerPath;
  process.env.PROSPERPALS_DEMO_ANALYTICS_PATH = localAnalyticsPath;

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

  if (localAuditSinkCreated || localLedgerSinkCreated || localAnalyticsSinkCreated) {
    throw new Error('Hosted smoke run created a local fallback sink, which means fail-closed durability was not preserved.');
  }

  const result = {
    generatedAt: new Date().toISOString(),
    environmentLabel,
    supabaseUrl: process.env.PROSPERPALS_SUPABASE_URL,
    auditMode: process.env.PROSPERPALS_AUDIT_DURABILITY_MODE,
    ledgerMode: process.env.PROSPERPALS_LEDGER_DURABILITY_MODE,
    analyticsMode: process.env.PROSPERPALS_ANALYTICS_DURABILITY_MODE,
    auditTable: process.env.PROSPERPALS_AUDIT_TABLE ?? 'demo_operator_audit_events',
    ledgerTable: process.env.PROSPERPALS_LEDGER_TABLE ?? 'demo_ledger_records',
    analyticsTable: process.env.PROSPERPALS_ANALYTICS_TABLE ?? 'demo_analytics_events',
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
    localAuditSinkCreated,
    localLedgerSinkCreated,
    localAnalyticsSinkCreated
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
