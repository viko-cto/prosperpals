#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repoPath = process.cwd();
const projectConfigPath = path.join(repoPath, '.vercel', 'project.json');
const defaultTokenPath = '/home/node/.config/vercel/token';
const allowedTargets = new Set(['preview', 'production']);
const allowedModes = new Set(['check', 'sync']);
const featureFlagsJson = JSON.stringify({
  mobilepayBeta: false,
  psd2Beta: false,
  familyPreview: true,
  simulatorStarter: true,
  receiptCapture: true
});

function utcDateStamp() {
  return new Date().toISOString().slice(0, 10);
}

function parseArgs(argv) {
  let target = 'preview';
  let mode = 'check';

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--target') {
      target = argv[index + 1] ?? target;
      index += 1;
      continue;
    }
    if (arg === '--mode') {
      mode = argv[index + 1] ?? mode;
      index += 1;
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  if (!allowedTargets.has(target)) {
    throw new Error(`Unsupported target "${target}". Use one of: ${Array.from(allowedTargets).join(', ')}`);
  }

  if (!allowedModes.has(mode)) {
    throw new Error(`Unsupported mode "${mode}". Use one of: ${Array.from(allowedModes).join(', ')}`);
  }

  return { target, mode };
}

function printHelp() {
  console.log(`ProsperPals Vercel env contract tool

Usage:
  node scripts/vercel-env-contract.mjs --target preview --mode check
  node scripts/vercel-env-contract.mjs --target preview --mode sync
  node scripts/vercel-env-contract.mjs --target production --mode check

Required source env vars for sync:
  PROSPERPALS_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL
  PROSPERPALS_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY
  PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY

Target URLs are resolved automatically from the linked Vercel project when possible:
  preview    -> current linked preview alias / deployment URL
  production -> current linked production alias / deployment URL

Optional explicit URL overrides:
  PROSPERPALS_PREVIEW_APP_URL or NEXT_PUBLIC_APP_URL   (preview target)
  PROSPERPALS_ALPHA_APP_URL or NEXT_PUBLIC_APP_URL     (production target when it represents alpha)

Optional:
  VERCEL_TOKEN (falls back to /home/node/.config/vercel/token)
`);
}

function getVercelToken() {
  if (process.env.VERCEL_TOKEN) {
    return process.env.VERCEL_TOKEN.trim();
  }

  if (existsSync(defaultTokenPath)) {
    return readFileSync(defaultTokenPath, 'utf8').trim();
  }

  throw new Error('Missing VERCEL_TOKEN and no token found at /home/node/.config/vercel/token');
}

function getProjectConfig() {
  if (!existsSync(projectConfigPath)) {
    throw new Error(`Missing linked Vercel project config at ${projectConfigPath}`);
  }

  const config = JSON.parse(readFileSync(projectConfigPath, 'utf8'));
  return {
    projectId: config.projectId,
    orgId: config.orgId,
    projectName: config.projectName
  };
}

async function fetchProjectMetadata(token, projectConfig) {
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${projectConfig.projectId}?teamId=${projectConfig.orgId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to inspect linked Vercel project metadata: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function normalizeDeploymentUrl(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }

  return value.startsWith('http://') || value.startsWith('https://')
    ? value.trim()
    : `https://${value.trim()}`;
}

function getDeploymentUrlCandidate(deployment) {
  if (!deployment || typeof deployment !== 'object') {
    return null;
  }

  if (Array.isArray(deployment.alias) && deployment.alias.length) {
    return normalizeDeploymentUrl(deployment.alias[0]);
  }

  return normalizeDeploymentUrl(deployment.url);
}

function getLinkedTargetUrl(projectMetadata, target) {
  const directTargetUrl = getDeploymentUrlCandidate(projectMetadata?.targets?.[target]);

  if (directTargetUrl) {
    return directTargetUrl;
  }

  const latestDeployments = Array.isArray(projectMetadata?.latestDeployments)
    ? projectMetadata.latestDeployments
    : [];

  const fallbackDeployment = latestDeployments.find((deployment) => {
    if (!deployment || typeof deployment !== 'object') {
      return false;
    }

    if (target === 'production') {
      return deployment.target === 'production';
    }

    return deployment.target !== 'production';
  });

  return getDeploymentUrlCandidate(fallbackDeployment);
}

function firstDefined(envNames) {
  for (const envName of envNames) {
    const value = process.env[envName];
    if (value && value.trim()) {
      return {
        envName,
        value: value.trim()
      };
    }
  }

  return null;
}

function resolveAppUrlEntry(target, linkedTargetUrl) {
  const envSources = target === 'preview'
    ? ['PROSPERPALS_PREVIEW_APP_URL', 'NEXT_PUBLIC_APP_URL']
    : ['PROSPERPALS_ALPHA_APP_URL', 'NEXT_PUBLIC_APP_URL'];
  const resolved = firstDefined(envSources);

  if (resolved) {
    return {
      key: 'NEXT_PUBLIC_APP_URL',
      secret: false,
      value: resolved.value,
      resolvedFrom: resolved.envName,
      missingSources: []
    };
  }

  if (linkedTargetUrl) {
    return {
      key: 'NEXT_PUBLIC_APP_URL',
      secret: false,
      value: linkedTargetUrl,
      resolvedFrom: `linked-vercel:${target}`,
      missingSources: []
    };
  }

  return {
    key: 'NEXT_PUBLIC_APP_URL',
    secret: false,
    value: null,
    resolvedFrom: null,
    missingSources: [...envSources, `linked-vercel:${target}`]
  };
}

function buildContract(target, { linkedTargetUrl } = {}) {
  const reportSuffix = target === 'preview' ? 'preview-hosted-proof' : 'alpha-hosted-proof';
  const prosperpalsEnv = target === 'preview' ? 'preview' : 'alpha';

  const literalEntries = [
    { key: 'PROSPERPALS_ENV', value: prosperpalsEnv },
    { key: 'PROSPERPALS_FEATURE_FLAGS_JSON', value: featureFlagsJson },
    { key: 'PROSPERPALS_AUDIT_DURABILITY_MODE', value: 'hosted-only' },
    { key: 'PROSPERPALS_LEDGER_DURABILITY_MODE', value: 'hosted-only' },
    { key: 'PROSPERPALS_ANALYTICS_DURABILITY_MODE', value: 'hosted-only' },
    { key: 'PROSPERPALS_ONBOARDING_DURABILITY_MODE', value: 'hosted-only' },
    { key: 'PROSPERPALS_RECEIPT_DURABILITY_MODE', value: 'hosted-only' },
    { key: 'PROSPERPALS_AUDIT_TABLE', value: 'demo_operator_audit_events' },
    { key: 'PROSPERPALS_LEDGER_TABLE', value: 'demo_ledger_records' },
    { key: 'PROSPERPALS_ANALYTICS_TABLE', value: 'demo_analytics_events' },
    { key: 'PROSPERPALS_ONBOARDING_TABLE', value: 'demo_onboarding_states' },
    { key: 'PROSPERPALS_RECEIPT_TABLE', value: 'demo_receipt_records' },
    { key: 'PROSPERPALS_RECEIPT_ARTIFACT_TABLE', value: 'demo_receipt_artifacts' },
    {
      key: 'PROSPERPALS_HOSTED_SMOKE_REPORT_PATH',
      value: `docs/alpha-readiness/evidence/hosted-hardening/generated/${reportSuffix}-${utcDateStamp()}.md`
    }
  ];

  const sourcedEntries = [
    resolveAppUrlEntry(target, linkedTargetUrl),
    {
      key: 'NEXT_PUBLIC_SUPABASE_URL',
      sources: ['PROSPERPALS_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL'],
      secret: false
    },
    {
      key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      sources: ['PROSPERPALS_SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
      secret: true
    },
    {
      key: 'PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY',
      sources: ['PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY'],
      secret: true
    }
  ].map((entry) => {
    if (!('sources' in entry)) {
      return entry;
    }

    const resolved = firstDefined(entry.sources);
    return {
      ...entry,
      value: resolved?.value ?? null,
      resolvedFrom: resolved?.envName ?? null,
      missingSources: resolved ? [] : entry.sources
    };
  });

  return [
    ...sourcedEntries,
    ...literalEntries.map((entry) => ({
      ...entry,
      resolvedFrom: 'literal',
      missingSources: [],
      secret: false
    }))
  ];
}

function runVercelCommand(token, args, input) {
  const result = spawnSync('npx', ['vercel', ...args, '--token', token, '--non-interactive'], {
    cwd: repoPath,
    input,
    encoding: 'utf8'
  });

  return {
    code: result.status ?? 1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    combined: `${result.stdout ?? ''}${result.stderr ?? ''}`.trim()
  };
}

function keyAppearsInListOutput(output, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|\\n)\\s*${escaped}(\\s|$)`, 'm').test(output);
}

function summarizeEntry(entry, isPresent) {
  const sourceLabel = entry.resolvedFrom === 'literal'
    ? 'literal'
    : entry.resolvedFrom
      ? `source:${entry.resolvedFrom}`
      : `missing:${entry.missingSources.join('|')}`;
  const valueLabel = entry.value == null
    ? '<missing>'
    : entry.secret
      ? `<resolved:${sourceLabel}>`
      : entry.value;

  return {
    key: entry.key,
    present: isPresent,
    sourceLabel,
    valueLabel,
    unresolved: entry.value == null
  };
}

function printSummary({ target, mode, projectConfig, summary, missingRemoteKeys }) {
  console.log(`# ProsperPals Vercel env contract (${mode})`);
  console.log(`- Project: ${projectConfig.projectName} (${projectConfig.projectId})`);
  console.log(`- Org: ${projectConfig.orgId}`);
  console.log(`- Target: ${target}`);
  console.log('');
  console.log('| Key | Remote | Source | Value |');
  console.log('| --- | --- | --- | --- |');
  for (const row of summary) {
    console.log(`| ${row.key} | ${row.present ? 'present' : 'missing'} | ${row.sourceLabel} | ${row.valueLabel} |`);
  }
  console.log('');
  console.log(`Missing remote keys: ${missingRemoteKeys.length}`);
}

function ensureResolvable(contract) {
  const unresolved = contract.filter((entry) => entry.value == null);
  if (!unresolved.length) {
    return;
  }

  throw new Error(`Cannot sync: missing source values for ${unresolved.map((entry) => `${entry.key}<=${entry.missingSources.join('|')}`).join(', ')}`);
}

function syncContract(token, target, summary) {
  const failures = [];

  for (const entry of summary) {
    if (entry.unresolved) {
      failures.push(`Skipped ${entry.key}: unresolved source value`);
      continue;
    }

    const command = entry.present
      ? ['env', 'update', entry.key, target]
      : ['env', 'add', entry.key, target];
    const result = runVercelCommand(token, command, `${entry.valueLabel === '<missing>' ? '' : entry.value}\n`);
    if (result.code !== 0) {
      failures.push(`${entry.key}: ${result.combined || 'unknown vercel error'}`);
      continue;
    }

    console.log(`${entry.present ? 'updated' : 'added'} ${entry.key}`);
  }

  if (failures.length) {
    throw new Error(`Sync completed with failures:\n- ${failures.join('\n- ')}`);
  }
}

async function main() {
  const { target, mode } = parseArgs(process.argv.slice(2));
  const token = getVercelToken();
  const projectConfig = getProjectConfig();
  let linkedTargetUrl = null;

  try {
    linkedTargetUrl = getLinkedTargetUrl(await fetchProjectMetadata(token, projectConfig), target);
  } catch (error) {
    console.error(`Warning: ${error instanceof Error ? error.message : error}`);
  }

  const contract = buildContract(target, { linkedTargetUrl });
  const listResult = runVercelCommand(token, ['env', 'list', target]);

  if (listResult.code !== 0) {
    throw new Error(`Failed to list Vercel env vars: ${listResult.combined}`);
  }

  const summary = contract.map((entry) => {
    const present = keyAppearsInListOutput(listResult.combined, entry.key);
    return summarizeEntry(entry, present);
  });
  const missingRemoteKeys = summary.filter((entry) => !entry.present).map((entry) => entry.key);

  printSummary({ target, mode, projectConfig, summary, missingRemoteKeys });

  if (mode === 'check') {
    if (missingRemoteKeys.length) {
      process.exitCode = 1;
    }
    return;
  }

  ensureResolvable(contract);
  const syncReadySummary = contract.map((entry) => {
    const present = keyAppearsInListOutput(listResult.combined, entry.key);
    return {
      ...entry,
      present,
      valueLabel: entry.value
    };
  });
  syncContract(token, target, syncReadySummary);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
