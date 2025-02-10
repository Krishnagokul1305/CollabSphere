import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getMe {
              id
              email
              name
              role
            }
          }
        `,
      }),
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);

    if (!data?.getMe) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("X-User-Id", data.getMe.user.id);
    requestHeaders.set("X-User-Email", data.getMe.user.email);
    requestHeaders.set("X-User-Role", data.getMe.user.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  matcher: ["/"],
};
