"use server";

import { redirect } from "next/navigation";
import { requireViewerSession } from "@/lib/auth/session";
import {
  getDemoOnboardingState,
  normalizeIntent,
  normalizeMode,
  setDemoOnboardingState
} from "@/lib/onboarding/demo-state";
import {
  buildManualMoneyEvent,
  calculateDailySpendingPower,
  createFinStarterHandoff,
  createGoldieInsight,
  getFirstValueDurationSeconds
} from "@/lib/finance/first-value";
import { awardProsperCoins } from "@/lib/simulator/demo-simulator";
import { appendDemoAnalyticsEvent } from "@/lib/telemetry/demo-event-store";
import { getRequestContext } from "@/lib/telemetry/request-context";

export async function saveOnboardingPreferencesAction(formData: FormData) {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const current = await getDemoOnboardingState();
  const selectedIntent = normalizeIntent(formData.get("intent"));
  const mode = normalizeMode(formData.get("mode"));
  const occurredAt = new Date().toISOString();
  const onboardingStartedAt =
    current.onboardingStartedAt === new Date(0).toISOString()
      ? occurredAt
      : current.onboardingStartedAt;

  await setDemoOnboardingState({
    ...current,
    selectedIntent,
    mode,
    onboardingStartedAt,
    finHandoff: selectedIntent === "invest-first" ? createFinStarterHandoff() : current.finHandoff
  });

  await appendDemoAnalyticsEvent({
    event: "onboarding.preferences.saved",
    occurredAt,
    userId: session.userId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: requestContext.path,
    selectedIntent,
    mode,
    targetTimeToValueSeconds: 80
  });

  if (selectedIntent === "invest-first") {
    const reward = await awardProsperCoins({
      userId: session.userId,
      idempotencyKey: `invest-first-starter:${session.userId}`,
      requestId: requestContext.requestId,
      traceId: requestContext.traceId,
      reasonCode: "INVEST_FIRST_STARTER",
      coins: 20,
      occurredAt,
      referenceType: "onboarding_intent"
    });

    await appendDemoAnalyticsEvent({
      event: "rewards.awarded",
      occurredAt,
      userId: session.userId,
      requestId: requestContext.requestId,
      traceId: requestContext.traceId,
      path: requestContext.path,
      selectedIntent,
      mode,
      targetTimeToValueSeconds: 80,
      coins: reward.ledgerEvent.coins,
      reasonCode: reward.ledgerEvent.reasonCode,
      headline: reward.ledgerEvent.explanation,
      message: `Balance now ${reward.summary.availableCoins} ProsperCoins.`
    });
  }

  redirect(`/app/onboarding?intent=${selectedIntent}`);
}

export async function submitBudgetFirstAction(formData: FormData) {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const current = await getDemoOnboardingState();
  const merchantLabel = String(formData.get("merchantLabel") ?? "").trim() || "Recent expense";
  const amountMajor = Number(formData.get("amountMajor") ?? 0);
  const categoryId = String(formData.get("categoryId") ?? "everyday-spend");
  const mode = normalizeMode(formData.get("mode"));

  const moneyEvent = buildManualMoneyEvent({
    userId: session.userId,
    amountMajor,
    merchantLabel,
    categoryId,
    currency: "DKK"
  });

  const dailySpendingPowerMinor = calculateDailySpendingPower(moneyEvent.amountMinor);
  const insight = createGoldieInsight({
    merchantLabel,
    amountMinor: moneyEvent.amountMinor,
    currency: moneyEvent.currency,
    dailySpendingPowerMinor
  });
  const onboardingStartedAt =
    current.onboardingStartedAt === new Date(0).toISOString()
      ? new Date().toISOString()
      : current.onboardingStartedAt;
  const firstValueCompletedAt = new Date().toISOString();
  const firstValueSeconds = getFirstValueDurationSeconds(onboardingStartedAt, firstValueCompletedAt);

  await setDemoOnboardingState({
    ...current,
    selectedIntent: "budget-first",
    mode,
    onboardingStartedAt,
    firstValueCompletedAt,
    firstMoneyEvent: {
      merchantLabel,
      amountMinor: moneyEvent.amountMinor,
      currency: moneyEvent.currency,
      occurredAt: moneyEvent.occurredAt,
      categoryId,
      sourceType: "manual",
      verificationState: "user_confirmed"
    },
    firstInsight: {
      ...insight,
      currency: moneyEvent.currency,
      dailySpendingPowerMinor
    },
    finHandoff: createFinStarterHandoff(moneyEvent.currency)
  });

  const reward = await awardProsperCoins({
    userId: session.userId,
    idempotencyKey: `first-awareness:${session.userId}:${categoryId}:${moneyEvent.amountMinor}:${onboardingStartedAt}`,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    reasonCode: "FIRST_AWARENESS_ACTION",
    coins: 30,
    occurredAt: firstValueCompletedAt,
    referenceType: "money_event"
  });

  await appendDemoAnalyticsEvent({
    event: "onboarding.first-value.completed",
    occurredAt: firstValueCompletedAt,
    userId: session.userId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: requestContext.path,
    selectedIntent: "budget-first",
    mode,
    targetTimeToValueSeconds: 80,
    firstValueSeconds,
    merchantLabel,
    amountMinor: moneyEvent.amountMinor,
    currency: moneyEvent.currency,
    dailySpendingPowerMinor,
    headline: insight.headline,
    message: `Reward balance after first value: ${reward.summary.availableCoins} ProsperCoins.`
  });

  await appendDemoAnalyticsEvent({
    event: "rewards.awarded",
    occurredAt: firstValueCompletedAt,
    userId: session.userId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: requestContext.path,
    selectedIntent: "budget-first",
    mode,
    targetTimeToValueSeconds: 80,
    coins: reward.ledgerEvent.coins,
    reasonCode: reward.ledgerEvent.reasonCode,
    headline: reward.ledgerEvent.explanation,
    message: `Balance now ${reward.summary.availableCoins} ProsperCoins.`
  });

  redirect("/app?firstValue=budget&reward=awarded");
}
