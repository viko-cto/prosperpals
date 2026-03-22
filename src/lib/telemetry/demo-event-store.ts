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

const DEFAULT_RUNTIME_DIR = path.join(process.cwd(), ".prosperpals-runtime");
const DEFAULT_SINK_PATH = path.join(DEFAULT_RUNTIME_DIR, "demo-analytics.jsonl");

function getSinkPath() {
  return process.env.PROSPERPALS_DEMO_ANALYTICS_PATH ?? DEFAULT_SINK_PATH;
}

async function ensureSinkDir() {
  await fs.mkdir(path.dirname(getSinkPath()), { recursive: true });
}

export async function appendDemoAnalyticsEvent(event: DemoAnalyticsEvent) {
  const parsed = demoAnalyticsEventSchema.parse(event);
  await ensureSinkDir();
  await fs.appendFile(getSinkPath(), `${JSON.stringify(parsed)}\n`, "utf8");
  return parsed;
}

export async function readDemoAnalyticsEvents(userId: string, limit = 8): Promise<DemoAnalyticsEvent[]> {
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
      .filter((event): event is DemoAnalyticsEvent => Boolean(event && event.userId === userId))
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
    sinkPath: getSinkPath(),
    recentEvents,
    eventCount: recentEvents.length,
    latestFirstValue,
    targetMet: latestFirstValue?.firstValueSeconds != null
      ? latestFirstValue.firstValueSeconds <= latestFirstValue.targetTimeToValueSeconds
      : null
  };
}
