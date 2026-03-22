# Receipt Idempotency and No-Auto-Post Proof

**Date:** 2026-03-22  
**Evidence type:** repo-state execution note  
**Decision use:** proves the current demo slice now protects both trust boundaries that matter here: no auto-post before review, and no duplicate canonical truth on repeated confirmation.

## Verdict

### Proven now
- Receipt candidates do **not** auto-post to canonical truth before user review.
- Reconfirming the same receipt candidate is now **candidate-scoped and idempotent**.

A same-candidate double confirmation now returns the existing reviewed result instead of writing a second confirmation record or a second reviewed money event.

## Evidence basis

The current automated test suite passed on 2026-03-22, including:
- `receipt OCR candidates stay reviewable until explicit confirmation`
- `duplicate receipt confirmation reuses the first reviewed truth instead of writing a second one`

## Positive evidence: no auto-post before review

The review-state test still proves the original trust boundary:
- pending candidate exists after capture,
- `latestConfirmed` is still empty,
- only after confirmation does the reviewed receipt land.

## Positive evidence: duplicate confirmation is suppressed

A temp-runtime execution in this run confirmed the same candidate twice. The result pattern is now:

```json
{
  "candidateScopedIdempotency": true,
  "confirmationCount": 1,
  "confirmedCandidateCount": 1,
  "sameConfirmationIdReturned": true,
  "sameMoneyEventIdReturned": true
}
```

### Meaning
For one `candidateId`, the current flow now produces:
- one `receipt_confirmation` record,
- one reviewed `moneyEventId`,
- and one confirmed candidate state,
- even if the confirmation path is submitted again.

## Why this is now true in the current code

`confirmReceiptCandidate(...)` now checks for an existing `receipt_confirmation` with the same `candidateId` before writing new reviewed truth.

If one exists, it returns the already-confirmed candidate plus the existing confirmation/money event payload instead of appending more records.

The server action also skips duplicate analytics writes when the confirmation was already completed.

## Repo files used for this proof
- `src/lib/receipts/demo-receipts.ts`
- `src/app/app/receipts/actions.ts`
- `test/sprint-3-explainability-operator-safety.test.mjs`

## Practical alpha readout

This note now supports:
- **Ambiguous candidates never auto-post to canonical truth** — yes.
- **Reprocessing the same receipt does not create duplicate truth** — yes, in the current demo slice.

## Remaining alpha limitation

This closes the duplicate-confirmation blocker, but it does **not** by itself make hosted alpha ready.

The hosted alpha should still remain **NO-GO** on receipt realism until the repo also shows:
1. a real upload/storage/provider chain,
2. stored asset metadata linked to the parse candidate,
3. and hosted durability beyond local runtime file sinks.
