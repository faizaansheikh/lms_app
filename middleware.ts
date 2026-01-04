import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const decoded = token ? (jwt.decode(token) as any) : null;

  if (token && (pathname === "/" || pathname === "/home" || pathname === "/login")) {
    // Redirect based on role
    if (decoded?.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard/client", request.url));
  }

 
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (token && decoded?.role === "student" && pathname.startsWith("/dashboard/admin")) {
    return NextResponse.redirect(new URL("/dashboard/client", request.url));
  }

  if (token && decoded?.role === "admin" && pathname.startsWith("/dashboard/client")) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  
  if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/login", "/dashboard/:path*"],
};
