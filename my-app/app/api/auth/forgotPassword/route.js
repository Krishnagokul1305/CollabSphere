import dbConnect from "@/app/lib/db";
import userModel from "@/app/lib/models/user.model";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { sendResetPasswordEmail } from "@/app/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  await dbConnect();

  console.log(process.env.RESEND_API_KEY);

  const { email } = await req.json();
  const user = await userModel.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "No user found with that email" },
      { status: 404 }
    );
  }

  const expiryTime = Date.now() + 3600000; // 1 hour expiration
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetToken = resetToken;
  user.resetTokenExpiry = expiryTime;
  await user.save();

  console.log(user);
  const resetUrl = `http://localhost:3000/resetPassword?token=${resetToken}`;
  console.log(resetUrl);
  try {
    await sendResetPasswordEmail(email, resetUrl);
    console.log("Password reset email sent");
    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Resend email error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
