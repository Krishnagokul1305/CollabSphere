import { NextResponse } from "next/server";
import { getProjectUsers } from "@/app/lib/data-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { owner, members } = await getProjectUsers(id, true);

    const users = [
      ...members.map((member) => ({
        ...member,
        user: undefined,
        ...member?.user,
      })),
    ];

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching project members:", error);
    return NextResponse.json(
      { error: "Failed to fetch project members" },
      { status: 500 }
    );
  }
}
