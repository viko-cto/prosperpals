import { demoSessionCookieName } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "nikolas@prosperpals.local");
  const next = String(formData.get("next") ?? "/app");
  const userId = "11111111-1111-4111-8111-111111111111";

  const response = NextResponse.redirect(new URL(next, request.url));
  response.cookies.set(demoSessionCookieName, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
  response.headers.set("x-demo-email", email);
  return response;
}
