import { cookies } from "next/headers";

export type EntryIntent = "budget-first" | "invest-first" | "family-preview";
export type ExperienceMode = "full" | "lite" | "off";

export type FirstMoneyEventSummary = {
  merchantLabel: string;
  amountMinor: number;
  currency: string;
  occurredAt: string;
  categoryId: string;
  sourceType: "manual";
  verificationState: "user_confirmed";
};

export type FirstInsightSummary = {
  headline: string;
  body: string;
  dailySpendingPowerMinor: number;
  currency: string;
  awardedAt: string;
};

export type FinHandoffSummary = {
  handoffHeadline: string;
  handoffBody: string;
  starterAssets: Array<{
    symbol: string;
    name: string;
    freshnessLabel: string;
    whyItIsHere: string;
  }>;
};

export type DemoOnboardingState = {
  selectedIntent: EntryIntent;
  mode: ExperienceMode;
  onboardingStartedAt: string;
  firstValueCompletedAt?: string;
  firstMoneyEvent?: FirstMoneyEventSummary;
  firstInsight?: FirstInsightSummary;
  finHandoff?: FinHandoffSummary;
};

const DEMO_STATE_COOKIE = "pp_demo_onboarding";

const DEFAULT_STATE: DemoOnboardingState = {
  selectedIntent: "budget-first",
  mode: "lite",
  onboardingStartedAt: new Date(0).toISOString()
};

export async function getDemoOnboardingState(): Promise<DemoOnboardingState> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(DEMO_STATE_COOKIE)?.value;

  if (!raw) {
    return DEFAULT_STATE;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<DemoOnboardingState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      firstMoneyEvent: parsed.firstMoneyEvent ?? undefined,
      firstInsight: parsed.firstInsight ?? undefined,
      finHandoff: parsed.finHandoff ?? undefined
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export async function setDemoOnboardingState(state: DemoOnboardingState) {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_STATE_COOKIE, JSON.stringify(state), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });
}

export async function clearDemoOnboardingState() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_STATE_COOKIE);
}

export function normalizeIntent(value: FormDataEntryValue | null | undefined): EntryIntent {
  if (value === "invest-first" || value === "family-preview") {
    return value;
  }

  return "budget-first";
}

export function normalizeMode(value: FormDataEntryValue | null | undefined): ExperienceMode {
  if (value === "full" || value === "off") {
    return value;
  }

  return "lite";
}

export function getIntentLabel(intent: EntryIntent) {
  switch (intent) {
    case "invest-first":
      return "Practice investing";
    case "family-preview":
      return "Preview family value";
    default:
      return "Start with Goldie";
  }
}
