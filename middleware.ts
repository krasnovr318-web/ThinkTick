import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/profile",
  "/settings",
  "/create"
];

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "thinktick-token"
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  const isProtected =
    protectedRoutes.some(
      (route) =>
        pathname.startsWith(route)
    );

  if (
    isProtected &&
    !token
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/settings/:path*",
    "/create/:path*"
  ]
};