import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";

const DEFAULT_RUNTIME_DIR = path.join(process.cwd(), ".prosperpals-runtime");
const DEFAULT_LEDGER_PATH = path.join(DEFAULT_RUNTIME_DIR, "demo-ledger.jsonl");
const STALE_QUOTE_THRESHOLD_SECONDS = 60 * 60 * 4;
const COIN_VALUE_MINOR = 1_000;
const DEMO_PORTFOLIO_ID = "44444444-4444-4444-8444-444444444444";

type DemoAssetSeed = {
  assetId: string;
  symbol: string;
  name: string;
  snapshotId: string;
  priceMinor: number;
  currency: string;
  provider: string;
  freshnessSeconds: number;
  starterTradeCoins: number;
  whyItIsHere: string;
  learningAngle: string;
};

const DEMO_ASSET_SEEDS: DemoAssetSeed[] = [
  {
    assetId: "NOVO-B",
    symbol: "NOVO-B.CO",
    name: "Novo Nordisk",
    snapshotId: "55555555-5555-4555-8555-555555555551",
    priceMinor: 51200,
    currency: "DKK",
    provider: "launch-feed",
    freshnessSeconds: 780,
    starterTradeCoins: 25,
    whyItIsHere: "Large Nordic household name. Easy to recognize in a Denmark-first launch.",
    learningAngle: "Shows how one company story can move differently from the broader market."
  },
  {
    assetId: "SPY",
    symbol: "SPY",
    name: "S&P 500 ETF",
    snapshotId: "55555555-5555-4555-8555-555555555552",
    priceMinor: 428700,
    currency: "DKK",
    provider: "launch-feed",
    freshnessSeconds: 660,
    starterTradeCoins: 28,
    whyItIsHere: "Simple broad-market reference point for teaching diversification without hype.",
    learningAngle: "Useful for comparing one stock story with the market basket underneath it."
  },
  {
    assetId: "ORSTED",
    symbol: "ORSTED.CO",
    name: "Ørsted",
    snapshotId: "55555555-5555-4555-8555-555555555553",
    priceMinor: 33750,
    currency: "DKK",
    provider: "launch-feed",
    freshnessSeconds: 18_600,
    starterTradeCoins: 18,
    whyItIsHere: "Familiar Danish energy name with a more visibly volatile story.",
    learningAngle: "Perfect for teaching why freshness labels matter before a user trusts a simulator quote."
  }
];

const prosperCoinLedgerRecordSchema = z.object({
  kind: z.literal("prospercoin_ledger"),
  id: z.string().uuid(),
  userId: z.string().uuid(),
  idempotencyKey: z.string().min(8),
  occurredAt: z.string().datetime(),
  requestId: z.string().min(6),
  traceId: z.string().uuid(),
  eventKind: z.enum(["credit", "debit"]),
  coins: z.number().int().positive(),
  reasonCode: z.enum(["FIRST_AWARENESS_ACTION", "INVEST_FIRST_STARTER", "SIMULATOR_TRADE"]),
  referenceType: z.string().min(2).max(80),
  referenceId: z.string().uuid().optional(),
  explanation: z.string().min(1).max(240)
});

const virtualTradeExecutionRecordSchema = z.object({
  kind: z.literal("virtual_trade_execution"),
  id: z.string().uuid(),
  userId: z.string().uuid(),
  portfolioId: z.string().uuid(),
  idempotencyKey: z.string().min(8),
  occurredAt: z.string().datetime(),
  requestId: z.string().min(6),
  traceId: z.string().uuid(),
  assetId: z.string().min(1).max(40),
  symbol: z.string().min(1).max(20),
  assetName: z.string().min(1).max(120),
  executionPriceSnapshotId: z.string().uuid(),
  quotePriceMinor: z.number().int().positive(),
  quoteCurrency: z.string().length(3),
  quoteFreshnessSeconds: z.number().int().nonnegative(),
  quoteFreshnessLabel: z.string().min(1).max(120),
  starterTradeCoins: z.number().int().positive(),
  units: z.number().positive(),
  learningHeadline: z.string().min(1).max(180),
  learningBody: z.string().min(1).max(320)
});

const demoLedgerRecordSchema = z.discriminatedUnion("kind", [
  prosperCoinLedgerRecordSchema,
  virtualTradeExecutionRecordSchema
]);

export type DemoLaunchAsset = {
  assetId: string;
  symbol: string;
  name: string;
  snapshotId: string;
  priceMinor: number;
  currency: string;
  provider: string;
  capturedAt: string;
  freshnessSeconds: number;
  freshnessLabel: string;
  starterTradeCoins: number;
  tradeable: boolean;
  blockedReason?: string;
  whyItIsHere: string;
  learningAngle: string;
};

export type ProsperCoinLedgerRecord = z.infer<typeof prosperCoinLedgerRecordSchema>;
export type VirtualTradeExecutionRecord = z.infer<typeof virtualTradeExecutionRecordSchema>;
export type DemoLedgerRecord = z.infer<typeof demoLedgerRecordSchema>;

export type DemoRewardLoopSummary = {
  ledgerPath: string;
  availableCoins: number;
  totalEarnedCoins: number;
  totalDebitedCoins: number;
  latestReward?: ProsperCoinLedgerRecord;
  latestDebit?: ProsperCoinLedgerRecord;
  latestTrade?: VirtualTradeExecutionRecord;
  assetUniverse: DemoLaunchAsset[];
  portfolio: {
    positionCount: number;
    investedCoins: number;
    estimatedValueCoins: number;
    positions: Array<{
      assetId: string;
      symbol: string;
      assetName: string;
      units: number;
      costCoins: number;
      currentValueCoins: number;
      freshnessLabel: string;
      learningHeadline: string;
    }>;
  };
};

export type DemoTradeResult = {
  status: "executed" | "blocked-stale" | "blocked-insufficient-coins";
  message: string;
  asset: DemoLaunchAsset;
  trade?: VirtualTradeExecutionRecord;
  ledgerEvent?: ProsperCoinLedgerRecord;
  summary: DemoRewardLoopSummary;
};

function getLedgerPath() {
  return process.env.PROSPERPALS_DEMO_LEDGER_PATH ?? DEFAULT_LEDGER_PATH;
}

async function ensureLedgerDir() {
  await fs.mkdir(path.dirname(getLedgerPath()), { recursive: true });
}

async function readLedgerRecords(): Promise<DemoLedgerRecord[]> {
  try {
    const raw = await fs.readFile(getLedgerPath(), "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return demoLedgerRecordSchema.parse(JSON.parse(line));
        } catch {
          return null;
        }
      })
      .filter((record): record is DemoLedgerRecord => Boolean(record));
  } catch {
    return [];
  }
}

async function appendLedgerRecords(records: DemoLedgerRecord[]) {
  if (!records.length) {
    return;
  }

  await ensureLedgerDir();
  await fs.appendFile(
    getLedgerPath(),
    `${records.map((record) => JSON.stringify(record)).join("\n")}\n`,
    "utf8"
  );
}

function getFreshnessLabel(freshnessSeconds: number) {
  if (freshnessSeconds <= 15 * 60) {
    return "Fresh quote snapshot — <15 min old";
  }

  if (freshnessSeconds <= 60 * 60) {
    return "Fresh quote snapshot — <1 hour old";
  }

  if (freshnessSeconds <= STALE_QUOTE_THRESHOLD_SECONDS) {
    return "Aging quote snapshot — still review freshness before trading";
  }

  return "Feed stale — trade locked until a fresher snapshot lands";
}

export function formatProsperCoins(coins: number) {
  return `${coins} ProsperCoins`;
}

export function getDemoLaunchAssetUniverse(now = new Date()): DemoLaunchAsset[] {
  return DEMO_ASSET_SEEDS.map((asset) => ({
    assetId: asset.assetId,
    symbol: asset.symbol,
    name: asset.name,
    snapshotId: asset.snapshotId,
    priceMinor: asset.priceMinor,
    currency: asset.currency,
    provider: asset.provider,
    capturedAt: new Date(now.getTime() - asset.freshnessSeconds * 1000).toISOString(),
    freshnessSeconds: asset.freshnessSeconds,
    freshnessLabel: getFreshnessLabel(asset.freshnessSeconds),
    starterTradeCoins: asset.starterTradeCoins,
    tradeable: asset.freshnessSeconds <= STALE_QUOTE_THRESHOLD_SECONDS,
    blockedReason:
      asset.freshnessSeconds <= STALE_QUOTE_THRESHOLD_SECONDS
        ? undefined
        : "Trade is blocked because this quote is older than the education-safe freshness threshold.",
    whyItIsHere: asset.whyItIsHere,
    learningAngle: asset.learningAngle
  }));
}

function getSignedCoinDelta(record: ProsperCoinLedgerRecord) {
  return record.eventKind === "credit" ? record.coins : -record.coins;
}

function roundTo(value: number, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function getLearningCard(asset: DemoLaunchAsset) {
  switch (asset.assetId) {
    case "SPY":
      return {
        headline: "Fin anchored this trade to the market baseline.",
        body: "This is the clean teaching slice: one broad-market position that makes it easier to compare a single stock story against the wider market backdrop."
      };
    case "NOVO-B":
      return {
        headline: "Fin framed this as a company-specific starter slice.",
        body: "A recognizable Danish name makes the first simulator pick feel real, while still letting Fin explain why one company can drift away from the overall market."
      };
    default:
      return {
        headline: "Fin refused to fake freshness.",
        body: "The learning is still useful here: a simulator should tell the truth when the quote is stale instead of pretending the market is current."
      };
  }
}

function buildSummaryFromRecords(userId: string, records: DemoLedgerRecord[]): DemoRewardLoopSummary {
  const assetUniverse = getDemoLaunchAssetUniverse();
  const userRecords = records.filter((record) => record.userId === userId);
  const ledgerEvents = userRecords.filter(
    (record): record is ProsperCoinLedgerRecord => record.kind === "prospercoin_ledger"
  );
  const tradeExecutions = userRecords.filter(
    (record): record is VirtualTradeExecutionRecord => record.kind === "virtual_trade_execution"
  );

  const availableCoins = ledgerEvents.reduce((sum, record) => sum + getSignedCoinDelta(record), 0);
  const totalEarnedCoins = ledgerEvents
    .filter((record) => record.eventKind === "credit")
    .reduce((sum, record) => sum + record.coins, 0);
  const totalDebitedCoins = ledgerEvents
    .filter((record) => record.eventKind === "debit")
    .reduce((sum, record) => sum + record.coins, 0);

  const positionMap = new Map<string, { assetId: string; symbol: string; assetName: string; units: number; costCoins: number; learningHeadline: string }>();

  for (const trade of tradeExecutions) {
    const current = positionMap.get(trade.assetId) ?? {
      assetId: trade.assetId,
      symbol: trade.symbol,
      assetName: trade.assetName,
      units: 0,
      costCoins: 0,
      learningHeadline: trade.learningHeadline
    };

    current.units += trade.units;
    current.costCoins += trade.starterTradeCoins;
    current.learningHeadline = trade.learningHeadline;
    positionMap.set(trade.assetId, current);
  }

  const positions = Array.from(positionMap.values()).map((position) => {
    const asset = assetUniverse.find((entry) => entry.assetId === position.assetId);
    const currentValueCoins = asset
      ? roundTo((position.units * asset.priceMinor) / COIN_VALUE_MINOR, 2)
      : position.costCoins;

    return {
      ...position,
      currentValueCoins,
      freshnessLabel: asset?.freshnessLabel ?? "No live quote available"
    };
  });

  return {
    ledgerPath: getLedgerPath(),
    availableCoins,
    totalEarnedCoins,
    totalDebitedCoins,
    latestReward: [...ledgerEvents].reverse().find((record) => record.eventKind === "credit"),
    latestDebit: [...ledgerEvents].reverse().find((record) => record.eventKind === "debit"),
    latestTrade: tradeExecutions.at(-1),
    assetUniverse: assetUniverse.map((asset) => {
      if (positions.length > 0) {
        return {
          ...asset,
          tradeable: false,
          blockedReason: "Starter slice already executed for this demo account. Review the portfolio summary instead of stacking another first trade."
        };
      }

      return asset;
    }),
    portfolio: {
      positionCount: positions.length,
      investedCoins: totalDebitedCoins,
      estimatedValueCoins: roundTo(
        positions.reduce((sum, position) => sum + position.currentValueCoins, 0),
        2
      ),
      positions
    }
  };
}

function getRewardExplanation(reasonCode: ProsperCoinLedgerRecord["reasonCode"], coins: number) {
  switch (reasonCode) {
    case "INVEST_FIRST_STARTER":
      return `Goldie funded ${coins} ProsperCoins so Fin can teach with virtual positions before any real-money risk enters the picture.`;
    case "SIMULATOR_TRADE":
      return `Spent ${coins} ProsperCoins on a virtual trade. Ledger integrity matters more than pretending the debit happened magically.`;
    default:
      return `You earned ${coins} ProsperCoins for turning one real money action into a legible learning moment.`;
  }
}

export async function awardProsperCoins(input: {
  userId: string;
  idempotencyKey: string;
  requestId: string;
  traceId: string;
  reasonCode: Extract<ProsperCoinLedgerRecord["reasonCode"], "FIRST_AWARENESS_ACTION" | "INVEST_FIRST_STARTER">;
  coins: number;
  occurredAt?: string;
  referenceType: string;
  referenceId?: string;
}) {
  const records = await readLedgerRecords();
  const existing = records.find(
    (record) =>
      record.kind === "prospercoin_ledger" &&
      record.userId === input.userId &&
      record.idempotencyKey === input.idempotencyKey
  );

  if (existing && existing.kind === "prospercoin_ledger") {
    return {
      ledgerEvent: existing,
      summary: buildSummaryFromRecords(input.userId, records)
    };
  }

  const record = prosperCoinLedgerRecordSchema.parse({
    kind: "prospercoin_ledger",
    id: crypto.randomUUID(),
    userId: input.userId,
    idempotencyKey: input.idempotencyKey,
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    requestId: input.requestId,
    traceId: input.traceId,
    eventKind: "credit",
    coins: input.coins,
    reasonCode: input.reasonCode,
    referenceType: input.referenceType,
    referenceId: input.referenceId,
    explanation: getRewardExplanation(input.reasonCode, input.coins)
  });

  await appendLedgerRecords([record]);
  const nextRecords = [...records, record];

  return {
    ledgerEvent: record,
    summary: buildSummaryFromRecords(input.userId, nextRecords)
  };
}

export async function getDemoRewardLoopSummary(userId: string) {
  const records = await readLedgerRecords();
  return buildSummaryFromRecords(userId, records);
}

export async function executeStarterTrade(input: {
  userId: string;
  assetId: string;
  idempotencyKey: string;
  requestId: string;
  traceId: string;
  occurredAt?: string;
}): Promise<DemoTradeResult> {
  const records = await readLedgerRecords();
  const existingTrade = records.find(
    (record) =>
      record.kind === "virtual_trade_execution" &&
      record.userId === input.userId &&
      record.idempotencyKey === input.idempotencyKey
  );

  if (existingTrade && existingTrade.kind === "virtual_trade_execution") {
    const asset = getDemoLaunchAssetUniverse().find((entry) => entry.assetId === existingTrade.assetId)!;
    return {
      status: "executed",
      message: "Duplicate submit suppressed. Existing virtual trade was returned instead of debiting coins twice.",
      asset,
      trade: existingTrade,
      summary: buildSummaryFromRecords(input.userId, records)
    };
  }

  const asset = getDemoLaunchAssetUniverse().find((entry) => entry.assetId === input.assetId);

  if (!asset) {
    throw new Error(`Unknown launch asset: ${input.assetId}`);
  }

  const summaryBefore = buildSummaryFromRecords(input.userId, records);

  if (!asset.tradeable) {
    return {
      status: "blocked-stale",
      message: asset.blockedReason ?? "Trade blocked because the quote freshness is outside the safe simulator window.",
      asset,
      summary: summaryBefore
    };
  }

  if (summaryBefore.portfolio.positionCount > 0) {
    return {
      status: "blocked-insufficient-coins",
      message: "Starter trade already completed for this demo account. Review the portfolio summary instead of stacking another first slice.",
      asset,
      summary: summaryBefore
    };
  }

  if (summaryBefore.availableCoins < asset.starterTradeCoins) {
    return {
      status: "blocked-insufficient-coins",
      message: `Need ${formatProsperCoins(asset.starterTradeCoins)} to fund this starter trade.`,
      asset,
      summary: summaryBefore
    };
  }

  const occurredAt = input.occurredAt ?? new Date().toISOString();
  const learningCard = getLearningCard(asset);
  const trade = virtualTradeExecutionRecordSchema.parse({
    kind: "virtual_trade_execution",
    id: crypto.randomUUID(),
    userId: input.userId,
    portfolioId: DEMO_PORTFOLIO_ID,
    idempotencyKey: input.idempotencyKey,
    occurredAt,
    requestId: input.requestId,
    traceId: input.traceId,
    assetId: asset.assetId,
    symbol: asset.symbol,
    assetName: asset.name,
    executionPriceSnapshotId: asset.snapshotId,
    quotePriceMinor: asset.priceMinor,
    quoteCurrency: asset.currency,
    quoteFreshnessSeconds: asset.freshnessSeconds,
    quoteFreshnessLabel: asset.freshnessLabel,
    starterTradeCoins: asset.starterTradeCoins,
    units: roundTo((asset.starterTradeCoins * COIN_VALUE_MINOR) / asset.priceMinor, 6),
    learningHeadline: learningCard.headline,
    learningBody: learningCard.body
  });

  const debitLedgerEvent = prosperCoinLedgerRecordSchema.parse({
    kind: "prospercoin_ledger",
    id: crypto.randomUUID(),
    userId: input.userId,
    idempotencyKey: `${input.idempotencyKey}:debit`,
    occurredAt,
    requestId: input.requestId,
    traceId: input.traceId,
    eventKind: "debit",
    coins: asset.starterTradeCoins,
    reasonCode: "SIMULATOR_TRADE",
    referenceType: "virtual_trade_execution",
    referenceId: trade.id,
    explanation: getRewardExplanation("SIMULATOR_TRADE", asset.starterTradeCoins)
  });

  await appendLedgerRecords([trade, debitLedgerEvent]);
  const nextRecords = [...records, trade, debitLedgerEvent];

  return {
    status: "executed",
    message: `Fin executed a virtual ${asset.name} starter slice and the ProsperCoin debit landed in the immutable demo ledger.`,
    asset,
    trade,
    ledgerEvent: debitLedgerEvent,
    summary: buildSummaryFromRecords(input.userId, nextRecords)
  };
}
