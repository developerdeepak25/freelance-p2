import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth, refreshAccessToken, UserJwtPayload } from "./utils/auth";


export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // Function to verify JWT
  const verifyToken = async (token: string): Promise<UserJwtPayload | null> => {
    try {
      return await verifyAuth(token, "access");
    } catch (error) {
      console.error("JWT verification error:", error);
      return null;
    }
  };

  // Function to handle token refresh
  const handleTokenRefresh = async (): Promise<string | null> => {
    if (!refreshToken) return null;
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      // console.log("newAccessToken", newAccessToken);

      if (newAccessToken) {
        const response = NextResponse.next();
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          // maxAge: 10, //! 10s temperolly
          maxAge: 15 * 60,
        });
        return newAccessToken;
      }
    } catch (error) {
      console.error("Token refresh error:", error);
    }
    return null;
  };

  // If trying to access login page
  if (pathname === "/login") {
    if (accessToken) {
      const decoded = await verifyToken(accessToken);
      if (decoded) {
        // User is already authenticated, redirect to admin
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
    // Not authenticated, allow access to login page
    return NextResponse.next();
  }

  // For protected routes (dashboard, admin, and api/auth/* except login)
  if (
    pathname.startsWith("/admin") ||
    (pathname.startsWith("/api/") && !pathname.startsWith("/api/public"))
  ) {
    let token = accessToken;
    let decoded = token ? await verifyToken(token) : null;

    // If access token is invalid or expired, try to refresh
    if (!decoded && refreshToken) {
      const newAccessToken = await handleTokenRefresh();
      if (newAccessToken) {
        token = newAccessToken;
        decoded = await verifyToken(newAccessToken);
      }
    }

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
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/:path*",
    "/login",
    "/admin",
  ],
};
