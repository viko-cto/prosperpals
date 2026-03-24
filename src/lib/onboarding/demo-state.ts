import { cookies } from "next/headers.js";
import { z } from "zod";

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

type HostedOnboardingConfig = {
  url: string;
  serviceKey: string;
  table: string;
  mode: "prefer-hosted" | "hosted-only";
};

const firstMoneyEventSummarySchema = z.object({
  merchantLabel: z.string().min(1).max(120),
  amountMinor: z.number().int().positive(),
  currency: z.string().length(3),
  occurredAt: z.string().datetime(),
  categoryId: z.string().min(1).max(80),
  sourceType: z.literal("manual"),
  verificationState: z.literal("user_confirmed")
});

const firstInsightSummarySchema = z.object({
  headline: z.string().min(1).max(200),
  body: z.string().min(1).max(400),
  dailySpendingPowerMinor: z.number().int().nonnegative(),
  currency: z.string().length(3),
  awardedAt: z.string().datetime()
});

const finHandoffAssetSchema = z.object({
  symbol: z.string().min(1).max(20),
  name: z.string().min(1).max(120),
  freshnessLabel: z.string().min(1).max(120),
  whyItIsHere: z.string().min(1).max(240)
});

const finHandoffSummarySchema = z.object({
  handoffHeadline: z.string().min(1).max(200),
  handoffBody: z.string().min(1).max(400),
  starterAssets: z.array(finHandoffAssetSchema).max(12)
});

const demoOnboardingStateSchema = z.object({
  selectedIntent: z.enum(["budget-first", "invest-first", "family-preview"]),
  mode: z.enum(["full", "lite", "off"]),
  onboardingStartedAt: z.string().datetime(),
  firstValueCompletedAt: z.string().datetime().optional(),
  firstMoneyEvent: firstMoneyEventSummarySchema.optional(),
  firstInsight: firstInsightSummarySchema.optional(),
  finHandoff: finHandoffSummarySchema.optional()
});

const DEMO_STATE_COOKIE = "pp_demo_onboarding";
const DEFAULT_HOSTED_TABLE = "demo_onboarding_states";

const DEFAULT_STATE: DemoOnboardingState = {
  selectedIntent: "budget-first",
  mode: "lite",
  onboardingStartedAt: new Date(0).toISOString()
};

function isIsoDateTime(value: unknown): value is string {
  return typeof value === "string" && z.string().datetime().safeParse(value).success;
}

function toCanonicalOnboardingState(value: unknown): DemoOnboardingState {
  if (!value || typeof value !== "object") {
    return DEFAULT_STATE;
  }

  const parsed = value as Partial<DemoOnboardingState>;

  return demoOnboardingStateSchema.parse({
    selectedIntent:
      parsed.selectedIntent === "invest-first" || parsed.selectedIntent === "family-preview"
        ? parsed.selectedIntent
        : DEFAULT_STATE.selectedIntent,
    mode:
      parsed.mode === "full" || parsed.mode === "off"
        ? parsed.mode
        : DEFAULT_STATE.mode,
    onboardingStartedAt: isIsoDateTime(parsed.onboardingStartedAt)
      ? parsed.onboardingStartedAt
      : DEFAULT_STATE.onboardingStartedAt,
    firstValueCompletedAt: isIsoDateTime(parsed.firstValueCompletedAt)
      ? parsed.firstValueCompletedAt
      : undefined,
    firstMoneyEvent: parsed.firstMoneyEvent
      ? firstMoneyEventSummarySchema.parse(parsed.firstMoneyEvent)
      : undefined,
    firstInsight: parsed.firstInsight
      ? firstInsightSummarySchema.parse(parsed.firstInsight)
      : undefined,
    finHandoff: parsed.finHandoff
      ? finHandoffSummarySchema.parse(parsed.finHandoff)
      : undefined
  });
}

function getHostedOnboardingConfig(): HostedOnboardingConfig | null {
  const url =
    process.env.PROSPERPALS_SUPABASE_URL
    ?? process.env.NEXT_PUBLIC_SUPABASE_URL
    ?? process.env.SUPABASE_URL;
  const serviceKey =
    process.env.PROSPERPALS_SUPABASE_SERVICE_ROLE_KEY
    ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    serviceKey,
    table: process.env.PROSPERPALS_ONBOARDING_TABLE ?? DEFAULT_HOSTED_TABLE,
    mode:
      process.env.PROSPERPALS_ONBOARDING_DURABILITY_MODE === "hosted-only"
        ? "hosted-only"
        : "prefer-hosted"
  };
}

function getHostedOnboardingUrl(config: HostedOnboardingConfig, query = "") {
  return `${config.url}/rest/v1/${config.table}${query}`;
}

export function getDemoOnboardingStateLocation() {
  const hostedConfig = getHostedOnboardingConfig();
  return hostedConfig ? `supabase:${hostedConfig.table}` : `cookie:${DEMO_STATE_COOKIE}`;
}

async function readLocalOnboardingState(): Promise<DemoOnboardingState> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(DEMO_STATE_COOKIE)?.value;

  if (!raw) {
    return DEFAULT_STATE;
  }

  try {
    return toCanonicalOnboardingState(JSON.parse(raw));
  } catch {
    return DEFAULT_STATE;
  }
}

async function setLocalOnboardingState(state: DemoOnboardingState) {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_STATE_COOKIE, JSON.stringify(demoOnboardingStateSchema.parse(state)), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });
}

async function clearLocalOnboardingState() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_STATE_COOKIE);
}

function parseHostedOnboardingRows(payload: unknown) {
  if (!Array.isArray(payload)) {
    throw new Error("Hosted onboarding read returned a non-array payload");
  }

  return payload
    .map((entry) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const state = "statePayload" in entry
        ? entry.statePayload
        : "state" in entry
          ? entry.state
          : entry;

      try {
        return toCanonicalOnboardingState(state);
      } catch {
        return null;
      }
    })
    .filter((state): state is DemoOnboardingState => Boolean(state));
}

async function readHostedOnboardingState(userId: string): Promise<DemoOnboardingState> {
  const config = getHostedOnboardingConfig();

  if (!config) {
    return DEFAULT_STATE;
  }

  const response = await fetch(
    getHostedOnboardingUrl(
      config,
      `?select=statePayload&userId=eq.${encodeURIComponent(userId)}&limit=1`
    ),
    {
      headers: {
        apikey: config.serviceKey,
        Authorization: `Bearer ${config.serviceKey}`
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Hosted onboarding read failed: ${response.status} ${response.statusText}`);
  }

  return parseHostedOnboardingRows(await response.json())[0] ?? DEFAULT_STATE;
}

async function upsertHostedOnboardingState(userId: string, state: DemoOnboardingState) {
  const config = getHostedOnboardingConfig();

  if (!config) {
    throw new Error("Hosted onboarding config is not available");
  }

  const payload = demoOnboardingStateSchema.parse(state);
  const response = await fetch(getHostedOnboardingUrl(config, "?on_conflict=userId"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify([
      {
        userId,
        selectedIntent: payload.selectedIntent,
        mode: payload.mode,
        onboardingStartedAt: payload.onboardingStartedAt,
        firstValueCompletedAt: payload.firstValueCompletedAt ?? null,
        statePayload: payload,
        updatedAt: new Date().toISOString()
      }
    ])
  });

  if (!response.ok) {
    throw new Error(`Hosted onboarding write failed: ${response.status} ${response.statusText}`);
  }

  return parseHostedOnboardingRows(await response.json())[0] ?? payload;
}

async function clearHostedOnboardingState(userId: string) {
  const config = getHostedOnboardingConfig();

  if (!config) {
    throw new Error("Hosted onboarding config is not available");
  }

  const response = await fetch(
    getHostedOnboardingUrl(config, `?userId=eq.${encodeURIComponent(userId)}`),
    {
      method: "DELETE",
      headers: {
        apikey: config.serviceKey,
        Authorization: `Bearer ${config.serviceKey}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Hosted onboarding delete failed: ${response.status} ${response.statusText}`);
  }
}

export async function getDemoOnboardingState(userId?: string): Promise<DemoOnboardingState> {
  const hostedConfig = getHostedOnboardingConfig();

  if (hostedConfig && userId) {
    try {
      return await readHostedOnboardingState(userId);
    } catch (error) {
      if (hostedConfig.mode === "hosted-only") {
        throw error;
      }
    }
  }

  return readLocalOnboardingState();
}

export async function setDemoOnboardingState(userId: string | undefined, state: DemoOnboardingState) {
  const payload = demoOnboardingStateSchema.parse(state);
  const hostedConfig = getHostedOnboardingConfig();

  if (hostedConfig && userId) {
    try {
      return await upsertHostedOnboardingState(userId, payload);
    } catch (error) {
      if (hostedConfig.mode === "hosted-only") {
        throw error;
      }
    }
  }

  await setLocalOnboardingState(payload);
  return payload;
}

export async function clearDemoOnboardingState(userId?: string) {
  const hostedConfig = getHostedOnboardingConfig();

  if (hostedConfig && userId) {
    try {
      await clearHostedOnboardingState(userId);
      return;
    } catch (error) {
      if (hostedConfig.mode === "hosted-only") {
        throw error;
      }
    }
  }

  await clearLocalOnboardingState();
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
