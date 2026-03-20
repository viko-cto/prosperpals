import { cookies, headers } from "next/headers";

export type ViewerSession = {
  userId: string;
  email: string;
  authProvider: "demo-cookie" | "supabase";
};

const DEMO_COOKIE = "pp_demo_session";

export async function getViewerSession(): Promise<ViewerSession | null> {
  const cookieStore = await cookies();
  const demoSession = cookieStore.get(DEMO_COOKIE)?.value;

  if (!demoSession) {
    return null;
  }

  const headerStore = await headers();
  const email = headerStore.get("x-demo-email") ?? "nikolas@prosperpals.local";

  return {
    userId: demoSession,
    email,
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
