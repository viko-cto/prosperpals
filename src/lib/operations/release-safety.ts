import { promises as fs } from "node:fs";
import path from "node:path";
import { describeReleaseFlagOverride, getActiveReleaseFlagOverrides } from "../audit/demo-audit.ts";
import { getEffectiveFeatureFlags } from "../feature-flags/config.ts";
import { buildSafeNotificationPayload } from "../notifications/contracts.ts";
import { getDemoLaunchAssetUniverse } from "../simulator/demo-simulator.ts";

export type ReleaseSafetyCheck = {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
};

function describeAuditedOverride(flagName: "receiptCapture" | "simulatorStarter", detail: string) {
  return `${describeReleaseFlagOverride(flagName)} is currently forced off by an actor-audited release override. ${detail}`;
}

export async function getReleaseSafetySummary(context: {
  countryCode?: string;
  internalUser?: boolean;
} = {}) {
  const migrationDir = path.join(process.cwd(), "supabase", "migrations");
  const migrationFiles = await fs
    .readdir(migrationDir)
    .then((files) => files.filter((file) => file.endsWith(".sql")).sort())
    .catch(() => [] as string[]);

  const [flags, activeOverrides] = await Promise.all([
    getEffectiveFeatureFlags(context),
    getActiveReleaseFlagOverrides()
  ]);
  const overrideByFlag = new Map(activeOverrides.map((override) => [override.flagName, override]));
  const assets = getDemoLaunchAssetUniverse();
  const staleQuoteBlocked = assets.some((asset) => !asset.tradeable && Boolean(asset.blockedReason));
  const notificationPayload = buildSafeNotificationPayload("portfolio-check-in");

  const receiptCaptureOverride = overrideByFlag.get("receiptCapture");
  const simulatorStarterOverride = overrideByFlag.get("simulatorStarter");

  const checks: ReleaseSafetyCheck[] = [
    {
      id: "manual-entry-flag",
      label: "Manual capture enabled",
      ok: flags.manualEntry,
      detail: flags.manualEntry
        ? "Manual logging stays available even if automated rails lag behind."
        : "Manual capture is unexpectedly disabled."
    },
    {
      id: "receipt-capture-flag",
      label: "Receipt capture flag enabled",
      ok: flags.receiptCapture,
      detail: flags.receiptCapture
        ? "Receipt review flow is allowed for the Denmark-first implementation slice."
        : receiptCaptureOverride
          ? describeAuditedOverride(
              "receiptCapture",
              `Applied by ${receiptCaptureOverride.actorUserId ?? "unknown"} at ${receiptCaptureOverride.occurredAt} for ${receiptCaptureOverride.scope}.`
            )
          : "Receipt capture is unexpectedly disabled."
    },
    {
      id: "simulator-starter-flag",
      label: "Fin starter simulator enabled",
      ok: flags.simulatorStarter,
      detail: flags.simulatorStarter
        ? "The reward-to-simulator loop can still be smoke-tested end to end."
        : simulatorStarterOverride
          ? describeAuditedOverride(
              "simulatorStarter",
              `Applied by ${simulatorStarterOverride.actorUserId ?? "unknown"} at ${simulatorStarterOverride.occurredAt} for ${simulatorStarterOverride.scope}.`
            )
          : "Simulator starter flow is unexpectedly disabled."
    },
    {
      id: "stale-quote-block",
      label: "Stale quote safety",
      ok: staleQuoteBlocked,
      detail: staleQuoteBlocked
        ? "At least one launch asset is intentionally trade-blocked when freshness degrades."
        : "No stale quote block was detected in the launch asset universe."
    },
    {
      id: "notification-contract",
      label: "Notification privacy contract",
      ok: Boolean(notificationPayload.title && notificationPayload.body),
      detail: `Safe template preview: ${notificationPayload.title}`
    },
    {
      id: "migration-presence",
      label: "Migration safety baseline",
      ok: migrationFiles.length > 0,
      detail: migrationFiles.length
        ? `Latest migration: ${migrationFiles.at(-1)}`
        : "No SQL migrations were found under supabase/migrations."
    }
  ];

  return {
    migrationDir,
    migrationFiles,
    checks,
    latestMigration: migrationFiles.at(-1) ?? null,
    monotonic: migrationFiles.every((file, index) => index === 0 || file >= migrationFiles[index - 1]),
    activeOverrides
  };
}
