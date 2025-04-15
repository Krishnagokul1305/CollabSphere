import { authOptions } from "@/app/lib/auth";
import dbConnect from "@/app/lib/db";
import userModel from "@/app/lib/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  try {
    const { search } = Object.fromEntries(new URL(req.url).searchParams);

    if (!search) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }
    const users = await userModel
      .find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
        _id: { $ne: session?.user?.id },
      })
      .select("name email avatar")
      .limit(5);

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users", details: error.message },
      { status: 500 }
    );
  }
}
