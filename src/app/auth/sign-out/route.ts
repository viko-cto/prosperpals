import {
  demoEmailCookieName,
  demoOperatorRoleCookieName,
  demoSessionCookieName
} from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete(demoSessionCookieName);
  response.cookies.delete(demoEmailCookieName);
  response.cookies.delete(demoOperatorRoleCookieName);
  return response;
}
