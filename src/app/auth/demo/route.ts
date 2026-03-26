import {
  demoEmailCookieName,
  demoOperatorRoleCookieName,
  demoSessionCookieName,
  normalizeOperatorRole
} from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "nikolas@prosperpals.local").trim().toLowerCase();
  const requestedOperatorRole = String(formData.get("operatorRole") ?? "").trim();
  const next = String(formData.get("next") ?? "/app");
  const userId = "11111111-1111-4111-8111-111111111111";
  const operatorRole = normalizeOperatorRole(requestedOperatorRole, email);

  const response = NextResponse.redirect(new URL(next, request.url));
  response.cookies.set(demoSessionCookieName, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
  response.cookies.set(demoEmailCookieName, email, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
  response.cookies.set(demoOperatorRoleCookieName, operatorRole, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
  return response;
}
