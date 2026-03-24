import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";

const demoAnalyticsEventSchema = z.object({
  event: z.enum([
    "onboarding.preferences.saved",
    "onboarding.first-value.completed",
    "rewards.awarded",
    "simulator.trade.executed",
    "simulator.trade.blocked",
    "receipt.candidate.created",
    "receipt.candidate.failed",
    "receipt.candidate.confirmed"
  ]),
  occurredAt: z.string().datetime(),
  userId: z.string().uuid(),
  requestId: z.string().min(6),
  traceId: z.string().uuid(),
  path: z.string().min(1),
  selectedIntent: z.enum(["budget-first", "invest-first", "family-preview"]),
  mode: z.enum(["full", "lite", "off"]),
  targetTimeToValueSeconds: z.number().int().positive(),
  firstValueSeconds: z.number().int().nonnegative().nullable().optional(),
  merchantLabel: z.string().min(1).max(120).optional(),
  amountMinor: z.number().int().optional(),
  currency: z.string().length(3).optional(),
  dailySpendingPowerMinor: z.number().int().nonnegative().optional(),
  headline: z.string().min(1).max(200).optional(),
  coins: z.number().int().positive().optional(),
  reasonCode: z.string().min(2).max(80).optional(),
  assetId: z.string().min(1).max(40).optional(),
  assetName: z.string().min(1).max(120).optional(),
  quoteFreshnessSeconds: z.number().int().nonnegative().optional(),
  tradeStatus: z.string().min(2).max(80).optional(),
  message: z.string().min(1).max(240).optional()
});

export type DemoAnalyticsEvent = z.infer<typeof demoAnalyticsEventSchema>;

type HostedAnalyticsConfig = {
  url: string;
  serviceKey: string;
  table: string;
  mode: "prefer-hosted" | "hosted-only";
};

const DEFAULT_RUNTIME_DIR = path.join(process.cwd(), ".prosperpals-runtime");
const DEFAULT_SINK_PATH = path.join(DEFAULT_RUNTIME_DIR, "demo-analytics.jsonl");
const DEFAULT_HOSTED_TABLE = "demo_analytics_events";

function getSinkPath() {
  return process.env.PROSPERPALS_DEMO_ANALYTICS_PATH ?? DEFAULT_SINK_PATH;
}

function getHostedAnalyticsConfig(): HostedAnalyticsConfig | null {
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
    table: process.env.PROSPERPALS_ANALYTICS_TABLE ?? DEFAULT_HOSTED_TABLE,
    mode:
      process.env.PROSPERPALS_ANALYTICS_DURABILITY_MODE === "hosted-only"
        ? "hosted-only"
        : "prefer-hosted"
  };
}

function getHostedAnalyticsUrl(config: HostedAnalyticsConfig, query = "") {
  return `${config.url}/rest/v1/${config.table}${query}`;
}

function getAnalyticsLocation() {
  const hostedConfig = getHostedAnalyticsConfig();
  return hostedConfig ? `supabase:${hostedConfig.table}` : getSinkPath();
}

async function ensureSinkDir() {
  await fs.mkdir(path.dirname(getSinkPath()), { recursive: true });
}

function parseHostedAnalyticsRows(payload: unknown) {
  if (!Array.isArray(payload)) {
    throw new Error("Hosted analytics read returned a non-array payload");
  }

  return payload
    .map((entry) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const event = "eventPayload" in entry ? entry.eventPayload : ("event" in entry ? entry.event : entry);

      try {
        return demoAnalyticsEventSchema.parse(event);
      } catch {
        return null;
      }
    })
    .filter((event): event is DemoAnalyticsEvent => Boolean(event));
}

async function readHostedAnalyticsEvents(): Promise<DemoAnalyticsEvent[]> {
  const config = getHostedAnalyticsConfig();

  if (!config) {
    return [];
  }

  const response = await fetch(
    getHostedAnalyticsUrl(config, "?select=eventPayload&order=occurredAt.asc,inserted_at.asc&limit=512"),
    {
      headers: {
        apikey: config.serviceKey,
        Authorization: `Bearer ${config.serviceKey}`
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Hosted analytics read failed: ${response.status} ${response.statusText}`);
  }

  return parseHostedAnalyticsRows(await response.json());
}

async function readLocalAnalyticsEvents(): Promise<DemoAnalyticsEvent[]> {
  try {
    const raw = await fs.readFile(getSinkPath(), "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return demoAnalyticsEventSchema.parse(JSON.parse(line));
        } catch {
          return null;
        }
      })
      .filter((event): event is DemoAnalyticsEvent => Boolean(event));
  } catch {
    return [];
  }
}

async function getStoredAnalyticsEvents(): Promise<DemoAnalyticsEvent[]> {
  const config = getHostedAnalyticsConfig();

  if (!config) {
    return readLocalAnalyticsEvents();
  }

  try {
    return await readHostedAnalyticsEvents();
  } catch (error) {
    if (config.mode === "hosted-only") {
      throw error;
    }

    return readLocalAnalyticsEvents();
  }
}

async function appendHostedAnalyticsEvent(event: DemoAnalyticsEvent) {
  const config = getHostedAnalyticsConfig();

  if (!config) {
    throw new Error("Hosted analytics config is not available");
  }

  const row = {
    id: crypto.randomUUID(),
    userId: event.userId,
    eventName: event.event,
    occurredAt: event.occurredAt,
    requestId: event.requestId,
    traceId: event.traceId,
    eventPayload: event
  };

  const response = await fetch(getHostedAnalyticsUrl(config), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify([row])
  });

  if (!response.ok) {
    throw new Error(`Hosted analytics write failed: ${response.status} ${response.statusText}`);
  }

  return parseHostedAnalyticsRows(await response.json())[0] ?? demoAnalyticsEventSchema.parse(event);
}

export async function appendDemoAnalyticsEvent(event: DemoAnalyticsEvent) {
  const parsed = demoAnalyticsEventSchema.parse(event);
  const hostedConfig = getHostedAnalyticsConfig();

  if (hostedConfig) {
    try {
      return await appendHostedAnalyticsEvent(parsed);
    } catch (error) {
      if (hostedConfig.mode === "hosted-only") {
        throw error;
      }
    }
  }

  await ensureSinkDir();
  await fs.appendFile(getSinkPath(), `${JSON.stringify(parsed)}\n`, "utf8");
  return parsed;
}

export async function readDemoAnalyticsEvents(userId: string, limit = 8): Promise<DemoAnalyticsEvent[]> {
  try {
    return (await getStoredAnalyticsEvents())
      .filter((event) => event.userId === userId)
      .slice(-limit)
      .reverse();
  } catch {
    return [];
  }
}

export async function getDemoAnalyticsSummary(userId: string) {
  const recentEvents = await readDemoAnalyticsEvents(userId, 6);
  const latestFirstValue = recentEvents.find((event) => event.event === "onboarding.first-value.completed");

  return {
    sinkPath: getAnalyticsLocation(),
    recentEvents,
    eventCount: recentEvents.length,
    latestFirstValue,
    targetMet: latestFirstValue?.firstValueSeconds != null
      ? latestFirstValue.firstValueSeconds <= latestFirstValue.targetTimeToValueSeconds
      : null
  };
}
