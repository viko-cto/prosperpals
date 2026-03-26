import type { OperatorRole, ViewerSession } from "../auth/session";

export const operatorCapabilities = [
  "support_timeline_view",
  "receipt_capture_intervention",
  "release_flag_override"
] as const;

export type OperatorCapability = (typeof operatorCapabilities)[number];

export class CrossAccountSubjectInterventionRequiresApprovalError extends Error {
  readonly viewerUserId: string;
  readonly subjectUserId: string;
  readonly capability: OperatorCapability;

  constructor(input: {
    viewerUserId: string;
    subjectUserId: string;
    capability: OperatorCapability;
  }) {
    super(`Cross-account ${input.capability} requires an approval-backed workflow`);
    this.name = "CrossAccountSubjectInterventionRequiresApprovalError";
    this.viewerUserId = input.viewerUserId;
    this.subjectUserId = input.subjectUserId;
    this.capability = input.capability;
  }
}

type OperatorRolePolicy = {
  label: string;
  summary: string;
  capabilities: OperatorCapability[];
};

const operatorRolePolicy: Record<OperatorRole, OperatorRolePolicy> = {
  user: {
    label: "User",
    summary: "Normal alpha participant with no operator controls.",
    capabilities: []
  },
  support: {
    label: "Support-only",
    summary: "Can inspect bounded support context and use narrow receipt holds, but cannot change global release state.",
    capabilities: ["support_timeline_view", "receipt_capture_intervention"]
  },
  admin: {
    label: "Admin-only",
    summary: "Can inspect support context and apply global release overrides, but does not get the support-only receipt hold rail by default.",
    capabilities: ["support_timeline_view", "release_flag_override"]
  },
  "founder-operator": {
    label: "Founder/operator",
    summary: "Temporary alpha owner carrying both support and admin responsibilities while the dedicated hosted role system is still missing.",
    capabilities: [
      "support_timeline_view",
      "receipt_capture_intervention",
      "release_flag_override"
    ]
  }
};

export function getOperatorRolePolicy(role: OperatorRole): OperatorRolePolicy {
  return operatorRolePolicy[role];
}

export function getOperatorCapabilities(role: OperatorRole): OperatorCapability[] {
  return [...operatorRolePolicy[role].capabilities];
}

export function hasOperatorCapability(role: OperatorRole, capability: OperatorCapability) {
  return operatorRolePolicy[role].capabilities.includes(capability);
}

export function describeOperatorRole(role: OperatorRole) {
  return operatorRolePolicy[role].label;
}

export function resolveSupportSubject(input: {
  viewerUserId: string;
  requestedSubjectUserId?: string | null;
}) {
  const requested = input.requestedSubjectUserId?.trim();
  const subjectUserId = requested || input.viewerUserId;

  return {
    subjectUserId,
    isCrossAccount: subjectUserId !== input.viewerUserId
  };
}

export function assertSubjectScopedInterventionAllowed(input: {
  viewerUserId: string;
  requestedSubjectUserId?: string | null;
  capability: OperatorCapability;
  approvalGranted?: boolean;
}) {
  const resolved = resolveSupportSubject({
    viewerUserId: input.viewerUserId,
    requestedSubjectUserId: input.requestedSubjectUserId
  });

  if (resolved.isCrossAccount && !input.approvalGranted) {
    throw new CrossAccountSubjectInterventionRequiresApprovalError({
      viewerUserId: input.viewerUserId,
      subjectUserId: resolved.subjectUserId,
      capability: input.capability
    });
  }

  return resolved;
}

export function assertOperatorCapability(session: ViewerSession, capability: OperatorCapability) {
  if (!hasOperatorCapability(session.operatorRole, capability)) {
    const roleLabel = describeOperatorRole(session.operatorRole);
    throw new Error(`${roleLabel} cannot perform ${capability}`);
  }
}
