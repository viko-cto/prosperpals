#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repoPath = process.cwd();
const scriptPath = path.join(repoPath, 'scripts', 'vercel-env-contract.mjs');
const outputDir = path.join(
  repoPath,
  'docs',
  'alpha-readiness',
  'evidence',
  'hosted-hardening',
  'generated'
);
const outputPath = path.join(
  outputDir,
  `vercel-env-contract-audit-${new Date().toISOString().slice(0, 10)}.md`
);
const targets = ['preview', 'production'];

function runTargetCheck(target) {
  const result = spawnSync('node', [scriptPath, '--target', target, '--mode', 'check'], {
    cwd: repoPath,
    encoding: 'utf8'
  });

  const stdout = result.stdout ?? '';
  const stderr = result.stderr ?? '';
  const combined = `${stdout}${stderr ? `\n${stderr}` : ''}`.trim();
  const missingMatch = combined.match(/Missing remote keys:\s*(\d+)/);
  const appUrlMatch = combined.match(/\| NEXT_PUBLIC_APP_URL \| [^|]+ \| [^|]+ \| ([^|]+) \|/);

  return {
    target,
    exitCode: result.status ?? 1,
    missingRemoteKeys: missingMatch ? Number.parseInt(missingMatch[1], 10) : null,
    appUrl: appUrlMatch?.[1]?.trim() ?? 'unresolved',
    output: combined || '(no output captured)'
  };
}

function summarizeStatus(run) {
  if (run.exitCode === 0 && run.missingRemoteKeys === 0) {
    return 'ready';
  }

  if (run.missingRemoteKeys != null) {
    return 'blocked';
  }

  return 'check-error';
}

function renderNote(runs) {
  const generatedAt = new Date().toISOString();
  const allReady = runs.every((run) => summarizeStatus(run) === 'ready');
  const anyCheckError = runs.some((run) => summarizeStatus(run) === 'check-error');

  return `# Vercel Env Contract Audit — Preview + Production\n\n- **Generated at:** ${generatedAt}\n- **Lane:** hosted hardening\n- **Command:** \`node scripts/hosted-env-contract-audit.mjs\`\n- **Decision posture:** ${allReady ? 'hosted env contract satisfied' : 'NO-GO remains locked'}\n\n## Why this audit exists\n\nThe ProsperPals repo already has a repeatable env-contract checker at \`scripts/vercel-env-contract.mjs\`, but the evidence lane still depended on ad-hoc terminal output and a single older preview-only note.\n\nThis audit makes the blocker current and durable by checking **both** linked Vercel targets, saving the exact output in-repo, and keeping the hosted-alpha NO-GO tied to evidence instead of memory.\n\n## Target summary\n\n| Target | Status | Missing remote keys | Resolved app URL |\n| --- | --- | ---: | --- |\n${runs
  .map((run) => `| ${run.target} | ${summarizeStatus(run)} | ${run.missingRemoteKeys ?? 'unknown'} | ${run.appUrl} |`)
  .join('\n')}\n\n## What this proves\n\n${allReady
  ? '- Both linked Vercel targets currently satisfy the recorded env contract.'
  : '- The linked Vercel targets do **not** yet satisfy the recorded env contract, so hosted durability proof is still blocked upstream of the smoke harness.'}
- The blocker is now expressed against the same repo-native contract the team would use for sync work, not a hand-maintained checklist alone.\n- The generated note is safe to cite in the alpha-readiness checklist and re-decision packet because it preserves the exact command output.\n\n## Honest next move\n\n${allReady
  ? '1. Run the hosted-only durability smoke and attach the generated trust-lane proof note before softening any checklist line.'
  : '1. Load the real Supabase URL + anon key + service role key into the env-contract sync flow for the intended target(s).'}\n${allReady
  ? '2. Keep interview evidence and operator-boundary work moving in parallel; env readiness alone is not alpha readiness.'
  : '2. Re-run this audit after sync so the repo captures which target actually moved from blocked to ready.'}\n${allReady
  ? '3. Keep the hosted alpha NO-GO locked until interview evidence and operator/access gaps are also closed.'
  : '3. Only run the hosted-only durability smoke once this note shows the target is ready; until then the hosted alpha NO-GO stays honest.'}\n\n## Raw command output\n\n${runs
  .map((run) => `### ${run.target}\n\n- Exit code: ${run.exitCode}\n\n\`\`\`text\n${run.output}\n\`\`\``)
  .join('\n\n')}\n\n## Verdict\n\n${anyCheckError
  ? 'At least one env-contract check errored before producing a clean contract summary, so treat this note as blocker evidence and re-run after fixing the checker/runtime issue.'
  : allReady
    ? 'The env contract is satisfied, but ProsperPals should still remain NO-GO until hosted smoke proof, interview evidence, and operator readiness all catch up.'
    : 'Hosted-alpha remains NO-GO. The current repo can describe and check the contract, but the linked Vercel targets are still missing required wiring.'}\n`;
}

async function main() {
  const runs = targets.map(runTargetCheck);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, renderNote(runs), 'utf8');
  console.log(outputPath);
}

await main();
