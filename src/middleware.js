import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const {
      payload: { role },
    } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_secret)
    );
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/forbidden", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/cart",
    "/shop",
    "/api/stores/logout",
    "/api/shop/:path",
    "/api/orders/:path",
    "/admin",
    "/api/admin/inventory/:path",
  ], // Add your protected routes
};
