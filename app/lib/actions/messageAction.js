"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import messageModel from "../models/message.model";
import dbConnect from "../db";

export async function createMessage({ project, content }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const sender = session.user.id;

  const msg = await messageModel.create({
    project,
    sender,
    content,
  });
  return {
    id: msg._id.toString(),
    sender: { senderId: msg.sender?._id?.toString() },
    text: msg.content,
    createdAt: msg.createdAt.toISOString(),
    time: msg.createdAt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    projectId: msg.project.toString(),
  };
}

export async function deleteMessage(message) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = session?.user?.id;

  if (message.sender.senderId !== userId) {
    throw new Error("You can only delete your own messages");
  }

  await messageModel.findByIdAndDelete(message.id);

  return { success: true, message: "Message deleted successfully" };
}
