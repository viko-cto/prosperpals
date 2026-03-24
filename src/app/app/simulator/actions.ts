"use server";

import { redirect } from "next/navigation";
import { requireViewerSession } from "@/lib/auth/session";
import { getEffectiveFeatureFlags } from "@/lib/feature-flags/config";
import { getDemoOnboardingState } from "@/lib/onboarding/demo-state";
import { executeStarterTrade } from "@/lib/simulator/demo-simulator";
import { appendDemoAnalyticsEvent } from "@/lib/telemetry/demo-event-store";
import { getRequestContext } from "@/lib/telemetry/request-context";

export async function submitStarterTradeAction(formData: FormData) {
  const session = await requireViewerSession();
  const requestContext = await getRequestContext();
  const internalUser = session.email.endsWith("@prosperpals.local");
  const flags = await getEffectiveFeatureFlags({
    countryCode: "DK",
    internalUser
  });
  const onboardingState = await getDemoOnboardingState(session.userId);
  const assetId = String(formData.get("assetId") ?? "").trim().toUpperCase();
  const occurredAt = new Date().toISOString();
  const mode = onboardingState.mode;
  const selectedIntent = onboardingState.selectedIntent;

  if (!flags.simulatorStarter) {
    redirect(`/app/simulator?trade=feature_disabled&asset=${assetId}`);
  }

  const result = await executeStarterTrade({
    userId: session.userId,
    assetId,
    idempotencyKey: `starter-trade:${session.userId}:${assetId}`,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    occurredAt
  });

  if (result.status === "executed" && result.trade) {
    await appendDemoAnalyticsEvent({
      event: "simulator.trade.executed",
      occurredAt,
      userId: session.userId,
      requestId: requestContext.requestId,
      traceId: requestContext.traceId,
      path: requestContext.path,
      selectedIntent,
      mode,
      targetTimeToValueSeconds: 80,
      assetId: result.trade.assetId,
      assetName: result.trade.assetName,
      quoteFreshnessSeconds: result.trade.quoteFreshnessSeconds,
      tradeStatus: result.status,
      coins: result.trade.starterTradeCoins,
      headline: result.trade.learningHeadline,
      message: result.message
    });

    redirect(`/app/simulator?trade=executed&asset=${result.trade.assetId}`);
  }

  await appendDemoAnalyticsEvent({
    event: "simulator.trade.blocked",
    occurredAt,
    userId: session.userId,
    requestId: requestContext.requestId,
    traceId: requestContext.traceId,
    path: requestContext.path,
    selectedIntent,
    mode,
    targetTimeToValueSeconds: 80,
    assetId: result.asset.assetId,
    assetName: result.asset.name,
    quoteFreshnessSeconds: result.asset.freshnessSeconds,
    tradeStatus: result.status,
    message: result.message,
    headline: result.asset.blockedReason ?? result.asset.freshnessLabel
  });

  redirect(`/app/simulator?trade=${result.status}&asset=${result.asset.assetId}`);
}
