import dbConnect from "@/app/lib/db";
import userModel from "@/app/lib/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    if (await userModel.exists({ email })) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }
    const user = await userModel.create({ email, password, name });
    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}
