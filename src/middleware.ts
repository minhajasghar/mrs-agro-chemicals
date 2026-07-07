import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-jwt-key-change-in-production-123456"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route protection (pages + API)
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    // Allow login page and login API without auth
    if (pathname === "/admin/login" || pathname === "/api/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Only track actual site pages (allowlist — blocks bots probing /login, /wp-admin, etc.)
  const publicPaths = ["/", "/about", "/contact", "/franchise", "/products"];
  const isPublicPage = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isPublicPage) {
    const ua = request.headers.get("user-agent") || "";
    let deviceType = "desktop";
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      deviceType = "tablet";
    } else if (/mobile|iphone|ipod|android|blackberry|windows phone/i.test(ua)) {
      deviceType = "mobile";
    }

    const body = JSON.stringify({
      page: pathname,
      referrer: request.headers.get("referer") || null,
      country: (request as any).geo?.country || null,
      city: (request as any).geo?.city || null,
      deviceType,
    });

    // Fire-and-forget — do not await
    fetch(`${request.nextUrl.origin}/api/track-visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)",
  ],
};
