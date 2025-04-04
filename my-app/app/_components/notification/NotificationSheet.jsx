"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import EmptyList from "../EmptyList";
import { getUserNotifications } from "@/app/lib/data-service";
import { markNotificationAsRead } from "@/app/lib/actions/notificationAction";
import InvitationNotification from "./InvitationNotification";

function NotificationSheet({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      setIsLoading(true);
      try {
        const data = await getUserNotifications(userId);
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNotifications();
  }, [userId]);

  const markAsRead = async (id) => {
    await markNotificationAsRead(id);
  };

  return (
    <SheetContent className="overflow-scroll">
      <SheetHeader>
        <SheetTitle>Notifications</SheetTitle>
        <SheetDescription>
          View your latest notifications here.
        </SheetDescription>
      </SheetHeader>

      <div className="grid gap-4 py-4">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-12 w-full animate-pulse bg-gray-300 rounded-md"
            ></div>
          ))
        ) : notifications?.length > 0 ? (
          notifications.map((notification) => {
            if (
              notification.type === "invite_request" ||
              "invite_accepted" ||
              "invite_rejected"
            ) {
              return (
                <InvitationNotification
                  key={notification._id}
                  requested={notification.type === "invite_request"}
                  notification={notification}
                />
              );
            }
            return (
              <div
                key={notification._id}
                className="p-3 bg-sidebar-border rounded-md flex flex-col items-start gap-2"
              >
                <div>
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => markAsRead(notification._id)}
                >
                  Mark as Read
                </Button>
              </div>
            );
          })
        ) : (
          <EmptyList
            count={0}
            title="No Notifications"
            message="You have no notifications"
          />
        )}
      </div>
    </SheetContent>
  );
}

export default NotificationSheet;
