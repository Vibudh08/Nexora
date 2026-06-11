import { NextRequest, NextResponse } from "next/server";

import { getServerEnv } from "@/lib/env/server-env";

function unauthorized(message = "Authentication required.") {
  return new NextResponse(message, {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Nexora Admin"' },
  });
}

export function proxy(request: NextRequest) {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = getServerEnv();

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    return new NextResponse("Admin access is not configured.", { status: 503 });
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) return unauthorized();

  try {
    const [username, password] = atob(authorization.slice(6)).split(":");
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return unauthorized("Invalid admin credentials.");
    }
  } catch {
    return unauthorized("Invalid authorization header.");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

