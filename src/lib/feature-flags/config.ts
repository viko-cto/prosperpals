export type FeatureFlagName =
  | "manualEntry"
  | "receiptCapture"
  | "simulatorStarter"
  | "familyPreview"
  | "mobilepayBeta"
  | "psd2Beta"
  | "supportTraceView";

export type FeatureFlagContext = {
  countryCode?: string;
  cohort?: string;
  internalUser?: boolean;
};

const defaultFlags: Record<FeatureFlagName, boolean> = {
  manualEntry: true,
  receiptCapture: true,
  simulatorStarter: true,
  familyPreview: true,
  mobilepayBeta: false,
  psd2Beta: false,
  supportTraceView: false
};

function readFlagOverrides(): Partial<Record<FeatureFlagName, boolean>> {
  const raw = process.env.PROSPERPALS_FEATURE_FLAGS_JSON;

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as Partial<Record<FeatureFlagName, boolean>>;
  } catch {
    return {};
  }
}

export function evaluateFeatureFlags(context: FeatureFlagContext = {}) {
  const overrides = readFlagOverrides();
  const merged = { ...defaultFlags, ...overrides };

  return {
    ...merged,
    mobilepayBeta:
      merged.mobilepayBeta && (context.internalUser || context.countryCode === "DK"),
    psd2Beta: merged.psd2Beta && context.internalUser === true,
    supportTraceView: merged.supportTraceView && context.internalUser === true
  } satisfies Record<FeatureFlagName, boolean>;
}
