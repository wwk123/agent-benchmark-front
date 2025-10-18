/**
 * Next.js Middleware for protected routes
 * Based on approved Stage 6 plan
 * 
 * Checks for access_token cookie on protected routes
 * Redirects to login with redirect parameter if not authenticated
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected route patterns
const PROTECTED_ROUTES = [
  "/profile",
  "/submit",
  "/submissions",
];


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the route is protected
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    // Check for access token in cookies
    const accessToken = request.cookies.get("access_token");

    if (!accessToken) {
      // Redirect to login with return URL
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
