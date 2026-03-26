import { cookies, headers } from "next/headers";

export const operatorRoles = ["user", "support", "admin", "founder-operator"] as const;
export type OperatorRole = (typeof operatorRoles)[number];

export type ViewerSession = {
  userId: string;
  email: string;
  operatorRole: OperatorRole;
  authProvider: "demo-cookie" | "supabase";
};

const DEMO_COOKIE = "pp_demo_session";
const DEMO_EMAIL_COOKIE = "pp_demo_email";
const DEMO_OPERATOR_ROLE_COOKIE = "pp_demo_operator_role";

export function isInternalOperatorEmail(email: string) {
  return email.toLowerCase().endsWith("@prosperpals.local");
}

function parseOperatorRole(value: string | null | undefined): OperatorRole | null {
  if (!value) {
    return null;
  }

  return operatorRoles.find((role) => role === value) ?? null;
}

export function normalizeOperatorRole(value: string | null | undefined, email: string): OperatorRole {
  if (!isInternalOperatorEmail(email)) {
    return "user";
  }

  return parseOperatorRole(value) ?? "founder-operator";
}

export async function getViewerSession(): Promise<ViewerSession | null> {
  const cookieStore = await cookies();
  const demoSession = cookieStore.get(DEMO_COOKIE)?.value;

  if (!demoSession) {
    return null;
  }

  const headerStore = await headers();
  const email = (
    cookieStore.get(DEMO_EMAIL_COOKIE)?.value
    ?? headerStore.get("x-demo-email")
    ?? "guest@prosperpals.demo"
  ).trim().toLowerCase();
  const operatorRole = normalizeOperatorRole(
    cookieStore.get(DEMO_OPERATOR_ROLE_COOKIE)?.value
    ?? headerStore.get("x-demo-operator-role"),
    email
  );

  return {
    userId: demoSession,
    email,
    operatorRole,
    authProvider: "demo-cookie"
  };
}

export async function requireViewerSession(): Promise<ViewerSession> {
  const session = await getViewerSession();

  if (!session) {
    throw new Error("Unauthenticated request reached an authenticated boundary.");
  }

  return session;
}

export const demoSessionCookieName = DEMO_COOKIE;
export const demoEmailCookieName = DEMO_EMAIL_COOKIE;
export const demoOperatorRoleCookieName = DEMO_OPERATOR_ROLE_COOKIE;
