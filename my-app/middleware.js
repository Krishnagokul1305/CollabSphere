import { NextResponse } from "next/server";

export async function middleware(req) {
  // let accessToken = req.cookies.get("token")?.value;

  // if (!accessToken) {
  //   return NextResponse.redirect("http://localhost:3000/login");
  // }

  // try {
  //   const userResponse = await fetch("http://localhost:4000/api/auth/me", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Cookie: `token=${accessToken}`,
  //     },
  //   });

  //   if (userResponse.ok) {
  //     return NextResponse.next();
  //   }

  //   const refreshToken = req.cookies.get("refreshToken")?.value;
  //   if (!refreshToken) {
  //     return NextResponse.redirect("http://localhost:3000/login");
  //   }

  //   const refreshResponse = await fetch(
  //     "http://localhost:4000/api/auth/refresh-token",
  //     {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Cookie: `refreshToken=${refreshToken}`,
  //       },
  //     }
  //   );

  //   if (!refreshResponse.ok) {
  //     return NextResponse.redirect("http://localhost:3000/login");
  //   }

  //   const data = await refreshResponse.json();
  //   console.log("Refreshed token:", data);

  //   if (!data.accessToken) {
  //     return NextResponse.redirect("http://localhost:3000/login");
  //   }

  //   const response = NextResponse.next();
  //   response.cookies.set("token", data.accessToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     path: "/",
  //   });

  //   return response;
  // } catch (error) {
  //   console.error("Middleware error:", error);
  // }

  // return NextResponse.redirect("http://localhost:3000/login");
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
