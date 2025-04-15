"use server";

import { revalidateTag } from "next/cache";
import Notification from "../models/notifications.model";

export async function markNotificationAsRead(notificationId) {
  await Notification.findByIdAndUpdate(notificationId, { isRead: true });
  revalidateTag("notifications");
}

export async function deleteUserNotifications(userId) {
  try {
    await Notification.deleteMany({ recipient: userId });
  } catch (error) {
    console.error("Error deleting user notifications:", error);
  }
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
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
