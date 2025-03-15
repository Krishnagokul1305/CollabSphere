"use server";

import notificationModel from "./models/notifications.model";

export async function getUserNotifications(userId, onlyUnread = false) {
  try {
    return await notificationModel.find({
      userId,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}
