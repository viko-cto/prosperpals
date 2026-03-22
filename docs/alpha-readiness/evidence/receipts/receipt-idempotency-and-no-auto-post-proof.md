# Receipt Idempotency and No-Auto-Post Proof

**Date:** 2026-03-22  
**Evidence type:** repo-state execution note  
**Decision use:** separates what is already safe (`no auto-post before review`) from what is still unsafe (`duplicate confirmation can create duplicate money truth`).

## Verdict

### Proven now
- Receipt candidates do **not** auto-post to canonical truth before user review.

### Not proven — and currently false in the demo runtime
- Reconfirming the same receipt candidate does **not** stay idempotent.

A same-candidate double confirmation currently creates duplicate confirmation records and duplicate reviewed money events.

## Positive evidence: no auto-post before review

The current automated test suite passed on 2026-03-22, including:
- `receipt OCR candidates stay reviewable until explicit confirmation`

That test proves the intended trust boundary:
- pending candidate exists after capture,
- `latestConfirmed` is still empty,
- only after confirmation does the reviewed receipt land.

## Negative evidence: duplicate confirmation is currently possible

A temp-runtime execution in this run confirmed the same candidate twice. The result was:

```json
{
  "candidateId": "d55914bb-e20b-4461-8bfd-a55e6175eaaa",
  "firstConfirmationId": "8407b7a9-e93c-4405-9f65-a875106302bf",
  "secondConfirmationId": "016c4efb-4589-4cbc-8cf0-1c5c6fd55aed",
  "confirmationCount": 2,
  "recordKinds": [
    "receipt_candidate",
    "receipt_candidate",
    "receipt_confirmation",
    "receipt_candidate",
    "receipt_confirmation"
  ],
  "uniqueMoneyEventIds": 2
}
```

### Meaning
For one `candidateId`, the current flow can produce:
- two `receipt_confirmation` records,
- two distinct reviewed `moneyEventId` values,
- and therefore duplicate canonical money truth.

## Why this happens in the current code

`confirmReceiptCandidate(...)` searches for the latest matching `receipt_candidate` by `candidateId`, but it does **not** reject or short-circuit if a confirmation already exists for that candidate.

Unlike the ProsperCoin/trade demo ledger, the receipt confirmation path does not currently use a candidate-scoped idempotency guard.

## Practical alpha readout

This note supports:
- **Ambiguous candidates never auto-post to canonical truth** — yes.
- **Reprocessing the same receipt does not create duplicate truth** — no, still an open blocker.

## Blocking implication for alpha readiness

The hosted alpha should remain **NO-GO** on receipt realism until the repo can show:
1. candidate-scoped receipt confirmation idempotency,
2. a passing automated test for duplicate confirm suppression,
3. and an updated lineage note proving the same candidate cannot create two reviewed money events.