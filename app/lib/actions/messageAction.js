"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import messageModel from "../models/message.model";
import dbConnect from "../db";

export async function createMessage({ project, content }) {
  await dbConnect();
  console.log(project, content);
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const sender = session.user.id;

  await messageModel.create({
    project,
    sender,
    content,
  });
}
