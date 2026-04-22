import { NextResponse, type NextRequest } from "next/server";

import { allowRequest } from "@/lib/rate-limit";

function rateLimitForPath(pathname: string) {
  if (pathname.startsWith("/api/public")) {
    return { limit: 100, windowMs: 60_000 };
  }
  if (pathname.startsWith("/api/auth")) {
    return { limit: 10, windowMs: 60_000 };
  }
  if (pathname.startsWith("/api")) {
    return { limit: 300, windowMs: 60_000 };
  }
  return null;
}

export function middleware(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    const hasSession = request.cookies.has("next-auth.session-token") || request.cookies.has("__Secure-next-auth.session-token");
    if (!hasSession && process.env.NODE_ENV === "production") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const rate = rateLimitForPath(pathname);
  if (rate) {
    const ip = request.headers.get("x-forwarded-for") ?? "local";
    const result = allowRequest(`${pathname}:${ip}`, rate.limit, rate.windowMs);
    if (!result.allowed) {
      return NextResponse.json({ error: { code: "rate_limited", message: "Too many requests.", requestId } }, { status: 429 });
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Request-Id", requestId);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:;",
  );
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
