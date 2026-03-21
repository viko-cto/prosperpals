# Receipt Realism Evidence Folder

Store trust-critical receipt-path traces here.

## Minimum required evidence
- 1 happy-path trace
- 1 ambiguous / low-confidence trace
- 1 failure-path trace
- explicit idempotency / no-auto-post confirmation

## Example filenames
- `receipt-lineage-happy-path.md`
- `receipt-lineage-ambiguous-path.md`
- `receipt-lineage-failure-path.md`
- `receipt-idempotency-and-no-auto-post-proof.md`

## Every trace should show
- how the receipt entered the system,
- where the stored asset metadata lives,
- how parser/provider origin is recorded,
- what the user sees,
- whether correction is required,
- and how canonical truth is protected from uncertain output.
