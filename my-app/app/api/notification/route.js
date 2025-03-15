import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import notificationModel from "@/app/lib/models/notifications.model";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    console.log(userId);
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const notifications = await notificationModel.find({
      recipient: userId,
      isRead: false,
    });
    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
