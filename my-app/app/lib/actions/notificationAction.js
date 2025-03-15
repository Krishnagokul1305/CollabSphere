"use server";

import { revalidateTag } from "next/cache";
import Notification from "../models/notifications.model";

export async function markNotificationAsRead(notificationId) {
  await Notification.findByIdAndUpdate(notificationId, { isRead: true });
  revalidateTag("notifications");
}

export const sendNotification = async ({
  recipient,
  sender,
  project,
  type,
  message,
}) => {
  try {
    const notification = new Notification({
      recipient,
      sender: sender || null,
      project: project || null,
      type,
      message,
    });

    await notification.save();
    console.log(`Notification sent: ${message}`);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
