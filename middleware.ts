import { NextResponse, type NextRequest } from "next/server";
import { demoSessionCookieName } from "@/lib/auth/session";

const APP_PATH_PREFIX = "/app";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();
  const sessionId = request.cookies.get("pp_session_id")?.value ?? crypto.randomUUID();
  const traceId = request.headers.get("x-trace-id") ?? crypto.randomUUID();
  const demoUserId = request.cookies.get(demoSessionCookieName)?.value;

  requestHeaders.set("x-request-id", requestId);
  requestHeaders.set("x-session-id", sessionId);
  requestHeaders.set("x-trace-id", traceId);
  requestHeaders.set("x-invoke-path", request.nextUrl.pathname);

  if (demoUserId) {
    requestHeaders.set("x-demo-user-id", demoUserId);
  }

  const isProtectedRoute = request.nextUrl.pathname.startsWith(APP_PATH_PREFIX);
  const hasSession = Boolean(demoUserId);

  if (isProtectedRoute && !hasSession) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("next", request.nextUrl.pathname);
    const response = NextResponse.redirect(signInUrl);
    response.cookies.set("pp_session_id", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/"
    });
    response.headers.set("x-request-id", requestId);
    response.headers.set("x-trace-id", traceId);
    return response;
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.set("pp_session_id", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
  response.headers.set("x-request-id", requestId);
  response.headers.set("x-trace-id", traceId);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
