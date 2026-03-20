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
  createGoldieInsight
} from "@/lib/finance/first-value";

export async function saveOnboardingPreferencesAction(formData: FormData) {
  const current = await getDemoOnboardingState();
  const selectedIntent = normalizeIntent(formData.get("intent"));
  const mode = normalizeMode(formData.get("mode"));

  await setDemoOnboardingState({
    ...current,
    selectedIntent,
    mode,
    onboardingStartedAt:
      current.onboardingStartedAt === new Date(0).toISOString()
        ? new Date().toISOString()
        : current.onboardingStartedAt,
    finHandoff: selectedIntent === "invest-first" ? createFinStarterHandoff() : current.finHandoff
  });

  redirect(`/app/onboarding?intent=${selectedIntent}`);
}

export async function submitBudgetFirstAction(formData: FormData) {
  const session = await requireViewerSession();
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
    merchantLabel: merchantLabel,
    amountMinor: moneyEvent.amountMinor,
    currency: moneyEvent.currency,
    dailySpendingPowerMinor
  });

  await setDemoOnboardingState({
    ...current,
    selectedIntent: "budget-first",
    mode,
    onboardingStartedAt:
      current.onboardingStartedAt === new Date(0).toISOString()
        ? new Date().toISOString()
        : current.onboardingStartedAt,
    firstValueCompletedAt: new Date().toISOString(),
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

  redirect("/app?firstValue=budget");
}
