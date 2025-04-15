import { NextResponse } from "next/server";
import userModel from "@/app/lib/models/user.model";
import dbConnect from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req, { params }) {
  await dbConnect(); // Ensure DB connection

  const { token } = params;
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 }
    );
  }

  const user = await userModel.findOne({ resetToken: token });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  if (user.resetTokenExpiry < Date.now()) {
    return NextResponse.json({ message: "Token expired" }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  await userModel.updateOne(
    { resetToken: token },
    {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    }
  );

  return NextResponse.json({ message: "Password reset successfully" });
}
