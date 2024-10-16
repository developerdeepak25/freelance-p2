import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./utils/auth";

interface UserJwtPayload {
  jti: string;
  iat: number;
  // Add any other fields that are in your JWT payload
}

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  console.log("authHeader", authHeader); // TODO: remove it
  const { pathname } = request.nextUrl;

  // Function to verify JWT
  const verifyToken = async (): Promise<UserJwtPayload | null> => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    const token = authHeader.split(" ")[1];
    try {
      return await verifyAuth(token);
    } catch (error) {
      console.error("JWT verification error:", error);
      return null;
    }
  };

  // If trying to access login page
  if (pathname === "/login") {
    const decoded = await verifyToken();
    console.log("decoded", decoded);

    if (decoded) {
      // User is already authenticated, redirect to admin
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // Not authenticated, allow access to login page
    return NextResponse.next();
  }

  // For protected routes (dashboard, admin, and api/auth/* except login)
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    (pathname.startsWith("/api/") && !pathname.startsWith("/api/public"))
  ) {
    const decoded = await verifyToken();
    if (!decoded) {
      // For API routes, return 401 Unauthorized instead of redirecting
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      // For non-API routes, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Authenticated, attach user data and continue
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-data", JSON.stringify(decoded));
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // For all other routes, continue without modification
  return NextResponse.next();
}

// Apply to specific routes
export const config = {
  // matcher: ["/dashboard/:path*", "/admin/:path*", "/api/auth/:path*", "/login"],
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/:path*"],
};
