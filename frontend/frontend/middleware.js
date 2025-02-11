import { NextResponse } from "next/server";

export async function middleware(req) {
  // const accessToken = req.cookies.get("token")?.value;
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
  //   const refreshResponse = await fetch(
  //     "http://localhost:4000/api/auth/refresh-token",
  //     {
  //       method: "GET",
  //       credentials: "include",
  //     }
  //   );
  //   console.log("check 2");
  //   console.log(refreshResponse);
  //   if (!refreshResponse.ok) {
  //     return NextResponse.redirect("http://localhost:3000/login");
  //   }
  //   const newUserResponse = await fetch("http://localhost:4000/api/auth/me", {
  //     method: "GET",
  //     credentials: "include",
  //   });
  //   console.log("check 3");
  //   if (newUserResponse.ok) {
  //     return NextResponse.next();
  //   }
  // } catch (error) {
  //   console.error("Middleware error:", error);
  // }
  // return NextResponse.redirect("http://localhost:3000/login");
}

export const config = {
  matcher: ["/"],
};
