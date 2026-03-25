import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const userId = '11111111-1111-4111-8111-111111111111';
const traceId = '77777777-7777-4777-8777-777777777777';

async function withTempRuntime(run) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pp-receipt-durability-'));
  const previous = {
    receipts: process.env.PROSPERPALS_DEMO_RECEIPT_PATH,
    receiptArtifacts: process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH,
    receiptUploads: process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR
  };

  process.env.PROSPERPALS_DEMO_RECEIPT_PATH = path.join(tempDir, 'demo-receipts.jsonl');
  process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH = path.join(tempDir, 'demo-receipt-artifacts.jsonl');
  process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR = path.join(tempDir, 'receipt-uploads');

  try {
    await run({ tempDir });
  } finally {
    if (previous.receipts) process.env.PROSPERPALS_DEMO_RECEIPT_PATH = previous.receipts;
    else delete process.env.PROSPERPALS_DEMO_RECEIPT_PATH;

    if (previous.receiptArtifacts) process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH = previous.receiptArtifacts;
    else delete process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH;

    if (previous.receiptUploads) process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR = previous.receiptUploads;
    else delete process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR;

    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

test('receipt review records and uploaded artifacts can use the hosted PostgREST durability path when configured', async () => {
  await withTempRuntime(async () => {
    const previousUrl = process.env.PROSPERPALS_SUPABASE_URL;
    const previousKey = process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
    const previousMode = process.env.PROSPERPALS_RECEIPT_DURABILITY_MODE;
    const previousRecordTable = process.env.PROSPERPALS_RECEIPT_TABLE;
    const previousArtifactTable = process.env.PROSPERPALS_RECEIPT_ARTIFACT_TABLE;
    const originalFetch = global.fetch;
    const storedRecordRows = [];
    const storedArtifactRows = [];

    process.env.PROSPERPALS_SUPABASE_URL = 'https://prosperpals.supabase.test';
    process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = 'service-role-test-key';
    process.env.PROSPERPALS_RECEIPT_DURABILITY_MODE = 'hosted-only';
    process.env.PROSPERPALS_RECEIPT_TABLE = 'demo_receipt_records';
    process.env.PROSPERPALS_RECEIPT_ARTIFACT_TABLE = 'demo_receipt_artifacts';

    global.fetch = async (url, init = {}) => {
      const target = String(url);

      if (target.includes('/demo_receipt_artifacts')) {
        if (init.method === 'POST') {
          const payload = JSON.parse(init.body);
          storedArtifactRows.push(...payload);
          return new Response(JSON.stringify(payload), {
            status: 201,
            headers: { 'content-type': 'application/json' }
          });
        }

        return new Response(JSON.stringify(storedArtifactRows), {
          status: 200,
          headers: { 'content-type': 'application/json' }
        });
      }

      if (target.includes('/demo_receipt_records')) {
        if (init.method === 'POST') {
          const payload = JSON.parse(init.body);
          storedRecordRows.push(...payload);
          return new Response(JSON.stringify(payload), {
            status: 201,
            headers: { 'content-type': 'application/json' }
          });
        }

        return new Response(JSON.stringify(storedRecordRows), {
          status: 200,
          headers: { 'content-type': 'application/json' }
        });
      }

      throw new Error(`Unexpected fetch target: ${target}`);
    };

    try {
      const receipts = await import('../src/lib/receipts/demo-receipts.ts');

      const captured = await receipts.captureReceiptCandidate({
        userId,
        requestId: 'receipt-hosted-req-001',
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
      assert.equal(storedArtifactRows.length, 1);
      assert.equal(storedRecordRows.length, 1);
      assert.equal(storedArtifactRows[0].artifactId, captured.artifact.artifactId);
      assert.equal(
        storedArtifactRows[0].artifactPayloadBase64,
        Buffer.from('fake-jpeg-binary').toString('base64')
      );
      assert.match(captured.artifact.storagePath, /^supabase:demo_receipt_artifacts:/);

      const confirmed = await receipts.confirmReceiptCandidate({
        userId,
        candidateId: captured.candidate.candidateId,
        requestId: 'receipt-hosted-req-002',
        traceId,
        merchantLabel: 'Netto Nørreport',
        amountMajor: 98.5,
        categoryId: 'groceries'
      });

      assert.equal(confirmed.alreadyConfirmed, false);
      assert.equal(storedRecordRows.length, 3);

      const reviewState = await receipts.getDemoReceiptReviewState(userId);
      const artifacts = await receipts.readDemoReceiptArtifactRecords(userId);
      const records = await receipts.readDemoReceiptRecords(userId);
      const confirmations = records.filter((record) => record.kind === 'receipt_confirmation');

      assert.equal(reviewState.sinkPath, 'supabase:demo_receipt_records');
      assert.equal(reviewState.artifactSinkPath, 'supabase:demo_receipt_artifacts');
      assert.equal(artifacts.length, 1);
      assert.equal(confirmations.length, 1);
      assert.equal(reviewState.confirmationCount, 1);
      assert.equal(reviewState.pendingCandidate, undefined);
      assert.equal(reviewState.latestArtifact?.artifactId, captured.artifact.artifactId);
      assert.equal(reviewState.latestConfirmed?.candidateId, captured.candidate.candidateId);

      await assert.rejects(
        fs.readFile(process.env.PROSPERPALS_DEMO_RECEIPT_PATH, 'utf8'),
        /ENOENT/
      );
      await assert.rejects(
        fs.readFile(process.env.PROSPERPALS_DEMO_RECEIPT_ARTIFACTS_PATH, 'utf8'),
        /ENOENT/
      );
      await assert.rejects(
        fs.access(process.env.PROSPERPALS_DEMO_RECEIPT_UPLOAD_DIR),
        /ENOENT/
      );
    } finally {
      global.fetch = originalFetch;
      if (previousUrl) process.env.PROSPERPALS_SUPABASE_URL = previousUrl;
      else delete process.env.PROSPERPALS_SUPABASE_URL;
      if (previousKey) process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY = previousKey;
      else delete process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY;
      if (previousMode) process.env.PROSPERPALS_RECEIPT_DURABILITY_MODE = previousMode;
      else delete process.env.PROSPERPALS_RECEIPT_DURABILITY_MODE;
      if (previousRecordTable) process.env.PROSPERPALS_RECEIPT_TABLE = previousRecordTable;
      else delete process.env.PROSPERPALS_RECEIPT_TABLE;
      if (previousArtifactTable) process.env.PROSPERPALS_RECEIPT_ARTIFACT_TABLE = previousArtifactTable;
      else delete process.env.PROSPERPALS_RECEIPT_ARTIFACT_TABLE;
    }
  });
});
