import { NextResponse, type NextRequest } from "next/server";
import { decrypt, SESSION_COOKIE_NAME } from "@/lib/auth/session";

// /p/* is the client-facing proposal page — token-gated, never a session.
const PUBLIC_PREFIXES = ["/login", "/signup", "/p/", "/api/", "/invite/", "/forgot-password", "/reset-password"];

// Optimistic cookie check only; the DAL (requireUser) is the real gate next to the data.
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_PREFIXES.some((p) => pathname === p.replace(/\/$/, "") || pathname.startsWith(p))) return NextResponse.next();
  const session = await decrypt(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.redirect(new URL("/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\.png$).*)"],
};
