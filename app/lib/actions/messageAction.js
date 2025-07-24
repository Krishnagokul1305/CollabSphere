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
  console.log(msg);
  return {
    id: msg._id.toString(),
    sender: msg.sender?._id?.toString(),
    text: msg.content,
    createdAt: msg.createdAt.toISOString(),
    time: msg.createdAt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    projectId: msg.project.toString(),
  };
}
