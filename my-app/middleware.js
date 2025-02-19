import { NextResponse } from "next/server";

const publicRoutes = [
  "/login",
  "/register",
  "/forgotPassword",
  "/resetPassword",
];

export async function middleware(req) {
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
