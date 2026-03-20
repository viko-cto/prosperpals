import { getDemoLaunchAssetUniverse } from "@/lib/simulator/demo-simulator";
import { moneyEventSchema } from "@/modules/finance/contracts";

export type FirstValueDraft = {
  userId: string;
  amountMajor: number;
  currency?: string;
  merchantLabel?: string;
  categoryId?: string;
};

const STARTER_MONTHLY_DISCRETIONARY_MINOR = 720000;
const STARTER_MONTHLY_BASELINE_DAILY_MINOR = 24000;

export function buildManualMoneyEvent(input: FirstValueDraft) {
  const occurredAt = new Date().toISOString();
  const amountMinor = Math.round(input.amountMajor * 100);

  return moneyEventSchema.parse({
    userId: input.userId,
    idempotencyKey: crypto.randomUUID(),
    eventType: "expense",
    amountMinor,
    currency: (input.currency ?? "DKK").toUpperCase(),
    occurredAt,
    merchantLabel: input.merchantLabel?.trim() || "Recent expense",
    categoryId: input.categoryId?.trim() || "everyday-spend",
    sourceType: "manual",
    verificationState: "user_confirmed",
    confidenceScore: 1,
    traceId: crypto.randomUUID()
  });
}

export function calculateDailySpendingPower(amountMinor: number, date = new Date()) {
  const daysInMonth = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getUTCDate();
  const dayOfMonth = date.getUTCDate();
  const daysLeftInclusive = Math.max(daysInMonth - dayOfMonth + 1, 1);
  const remainingMinor = Math.max(STARTER_MONTHLY_DISCRETIONARY_MINOR - amountMinor, 0);

  return Math.round(remainingMinor / daysLeftInclusive);
}

export function createGoldieInsight(input: {
  merchantLabel: string;
  amountMinor: number;
  currency: string;
  dailySpendingPowerMinor: number;
}) {
  const amountMajor = formatCurrency(input.amountMinor, input.currency);
  const spendingPowerMajor = formatCurrency(input.dailySpendingPowerMinor, input.currency);
  const merchant = input.merchantLabel.trim() || "that expense";

  let headline = `Goldie logged ${amountMajor} at ${merchant}.`;
  let body = `${spendingPowerMajor}/day is still available in your starter plan for the rest of this month.`;

  if (input.amountMinor >= 150000) {
    headline = `Goldie spotted a heavier spend: ${amountMajor} at ${merchant}.`;
    body = `No shame spiral — just a useful signal. Your starter Daily Spending Power lands at ${spendingPowerMajor}/day now, so the easiest move is keeping the next 1-2 spends intentional.`;
  } else if (input.amountMinor <= 30000) {
    headline = `Goldie captured ${amountMajor} at ${merchant} without drama.`;
    body = `You still have about ${spendingPowerMajor}/day in the starter view. Small entries matter because they make the trend visible before it turns into guesswork.`;
  }

  return {
    headline,
    body,
    awardedAt: new Date().toISOString()
  };
}

export function createFinStarterHandoff(currency = "DKK") {
  return {
    handoffHeadline: "Goldie → Fin handoff is ready.",
    handoffBody:
      "Fin only takes over after Goldie makes the money picture legible. The starter asset list shows freshness honestly, including when a trade should stay blocked.",
    starterAssets: getDemoLaunchAssetUniverse()
      .slice(0, 3)
      .map((asset) => ({
        symbol: asset.symbol,
        name: asset.name,
        freshnessLabel: asset.freshnessLabel,
        whyItIsHere: asset.whyItIsHere.replace("Denmark-first launch", `Denmark-first ${currency} launch`)
      }))
  };
}

export function getFirstValueDurationSeconds(startedAt: string, completedAt: string) {
  const started = new Date(startedAt).getTime();
  const completed = new Date(completedAt).getTime();

  if (Number.isNaN(started) || Number.isNaN(completed)) {
    return null;
  }

  return Math.max(0, Math.round((completed - started) / 1000));
}

export function formatCurrency(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-DK", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(amountMinor / 100);
}

export function getStarterBaselineDailyMinor() {
  return STARTER_MONTHLY_BASELINE_DAILY_MINOR;
}
