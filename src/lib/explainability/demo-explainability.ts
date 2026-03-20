import { formatCurrency } from "@/lib/finance/first-value";
import { getDemoOnboardingState } from "@/lib/onboarding/demo-state";
import { getDemoReceiptReviewState } from "@/lib/receipts/demo-receipts";
import { formatProsperCoins, getDemoRewardLoopSummary } from "@/lib/simulator/demo-simulator";

export type ExplainabilityStatus =
  | "verified"
  | "parsed-reviewed"
  | "estimated"
  | "stale"
  | "review-required";

export type ExplainabilityCard = {
  id: string;
  title: string;
  status: ExplainabilityStatus;
  statusLabel: string;
  summary: string;
  explanation: string;
  userFacingWhy: string;
  inputs: string[];
  operatorNotes: string[];
};

function getStatusLabel(status: ExplainabilityStatus) {
  switch (status) {
    case "verified":
      return "Verified source path";
    case "parsed-reviewed":
      return "Parsed then user-reviewed";
    case "stale":
      return "Freshness degraded";
    case "review-required":
      return "Needs review before posting";
    default:
      return "Estimated / derived";
  }
}

export async function getDemoExplainabilityCards(userId: string): Promise<ExplainabilityCard[]> {
  const [onboardingState, rewardLoop, receiptState] = await Promise.all([
    getDemoOnboardingState(),
    getDemoRewardLoopSummary(userId),
    getDemoReceiptReviewState(userId)
  ]);

  const cards: ExplainabilityCard[] = [];

  if (onboardingState.firstInsight && onboardingState.firstMoneyEvent) {
    const sourceLabel = onboardingState.firstMoneyEvent.sourceType === "manual"
      ? "Manual money event confirmed directly by the user"
      : "Receipt-derived input confirmed in review";

    cards.push({
      id: "daily-spending-power",
      title: "Daily Spending Power",
      status: onboardingState.firstMoneyEvent.sourceType === "manual" ? "verified" : "parsed-reviewed",
      statusLabel: getStatusLabel(onboardingState.firstMoneyEvent.sourceType === "manual" ? "verified" : "parsed-reviewed"),
      summary: `${formatCurrency(onboardingState.firstInsight.dailySpendingPowerMinor, onboardingState.firstInsight.currency)}/day`,
      explanation: onboardingState.firstInsight.body,
      userFacingWhy: "You are seeing this because ProsperPals took the latest confirmed spending input, ran the starter Daily Spending Power rule, and kept the result visible instead of hiding the math behind Goldie’s tone.",
      inputs: [
        sourceLabel,
        `Merchant: ${onboardingState.firstMoneyEvent.merchantLabel}`,
        `Amount: ${formatCurrency(onboardingState.firstMoneyEvent.amountMinor, onboardingState.firstMoneyEvent.currency)}`,
        "Rule version: starter-dsp-v1",
        "Launch promise: one useful first-value insight before bank linking"
      ],
      operatorNotes: [
        `Verification state: ${onboardingState.firstMoneyEvent.verificationState}`,
        `Occurred at: ${onboardingState.firstMoneyEvent.occurredAt}`,
        "Trace path: onboarding -> canonical money event candidate -> Goldie insight"
      ]
    });
  }

  if (rewardLoop.latestReward) {
    cards.push({
      id: "prospercoins",
      title: "ProsperCoin balance",
      status: "verified",
      statusLabel: getStatusLabel("verified"),
      summary: formatProsperCoins(rewardLoop.availableCoins),
      explanation: rewardLoop.latestReward.explanation,
      userFacingWhy: "You are seeing this because ProsperCoins are derived from the append-only reward ledger, not from a mutable balance field that can drift or get overwritten.",
      inputs: [
        `Latest reward code: ${rewardLoop.latestReward.reasonCode}`,
        `Total earned: ${formatProsperCoins(rewardLoop.totalEarnedCoins)}`,
        `Total debited: ${formatProsperCoins(rewardLoop.totalDebitedCoins)}`,
        "Ledger rule: append-only reward and trade debit events"
      ],
      operatorNotes: [
        `Ledger sink: ${rewardLoop.ledgerPath}`,
        `Latest reward request trace preserved on event ${rewardLoop.latestReward.id}`,
        "Replay posture: duplicate idempotency keys return the original ledger event"
      ]
    });
  }

  if (rewardLoop.latestTrade) {
    const stale = rewardLoop.latestTrade.quoteFreshnessSeconds > 60 * 60 * 4;
    cards.push({
      id: "fin-trade",
      title: "Fin simulator explanation",
      status: stale ? "stale" : "estimated",
      statusLabel: getStatusLabel(stale ? "stale" : "estimated"),
      summary: `${rewardLoop.latestTrade.assetName} · ${rewardLoop.latestTrade.quoteFreshnessLabel}`,
      explanation: rewardLoop.latestTrade.learningBody,
      userFacingWhy: "You are seeing this because Fin always ties the simulator narrative back to the specific asset, quote snapshot freshness, and the ProsperCoin debit that funded the starter trade.",
      inputs: [
        `Asset: ${rewardLoop.latestTrade.symbol}`,
        `Starter trade cost: ${formatProsperCoins(rewardLoop.latestTrade.starterTradeCoins)}`,
        `Quote freshness: ${rewardLoop.latestTrade.quoteFreshnessSeconds}s`,
        `Portfolio estimate: ${formatProsperCoins(rewardLoop.portfolio.estimatedValueCoins)}`
      ],
      operatorNotes: [
        `Execution snapshot id: ${rewardLoop.latestTrade.executionPriceSnapshotId}`,
        `Trade trace preserved on execution ${rewardLoop.latestTrade.id}`,
        "Safety rule: stale quotes block new trades instead of pretending freshness"
      ]
    });
  }

  if (receiptState.pendingCandidate) {
    cards.push({
      id: "receipt-review",
      title: "Receipt intake review state",
      status: "review-required",
      statusLabel: getStatusLabel("review-required"),
      summary: `${receiptState.pendingCandidate.merchantLabel} · ${formatCurrency(receiptState.pendingCandidate.amountMinor, receiptState.pendingCandidate.currency)}`,
      explanation: receiptState.pendingCandidate.reviewMessage,
      userFacingWhy: "You are seeing this because ProsperPals refuses to auto-post ambiguous OCR output. The receipt stays as a candidate until you confirm the merchant, amount, and category on the review sheet.",
      inputs: [
        `Confidence: ${Math.round(receiptState.pendingCandidate.confidenceScore * 100)}%`,
        `Parse label: ${receiptState.pendingCandidate.confidenceLabel}`,
        `Source hint: ${receiptState.pendingCandidate.sourceHint}`,
        "Policy: candidate first, canonical record only after review"
      ],
      operatorNotes: [
        `Candidate id: ${receiptState.pendingCandidate.candidateId}`,
        `Artifact id: ${receiptState.pendingCandidate.artifactId}`,
        `Trace id: ${receiptState.pendingCandidate.traceId}`
      ]
    });
  } else if (receiptState.latestConfirmed) {
    cards.push({
      id: "receipt-review",
      title: "Latest confirmed receipt",
      status: "parsed-reviewed",
      statusLabel: getStatusLabel("parsed-reviewed"),
      summary: `${receiptState.latestConfirmed.merchantLabel} · ${formatCurrency(receiptState.latestConfirmed.amountMinor, receiptState.latestConfirmed.currency)}`,
      explanation: receiptState.latestConfirmed.explanation,
      userFacingWhy: "You are seeing this because the OCR draft was reviewed explicitly before it became part of the money picture. ProsperPals keeps the review boundary visible instead of pretending the parse was magically correct.",
      inputs: [
        `Confidence at parse time: ${Math.round(receiptState.latestConfirmed.confidenceScore * 100)}%`,
        `Correction applied: ${receiptState.latestConfirmed.correctionApplied ? "yes" : "no"}`,
        `Daily Spending Power after review: ${formatCurrency(receiptState.latestConfirmed.dailySpendingPowerMinor, receiptState.latestConfirmed.currency)}/day`
      ],
      operatorNotes: [
        `Money event id: ${receiptState.latestConfirmed.moneyEventId}`,
        `Candidate id: ${receiptState.latestConfirmed.candidateId}`,
        `Trace id: ${receiptState.latestConfirmed.traceId}`
      ]
    });
  }

  return cards;
}
