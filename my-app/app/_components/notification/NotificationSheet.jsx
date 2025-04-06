"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import EmptyList from "../EmptyList";
import { getUserNotifications } from "@/app/lib/data-service";
import {
  markNotificationAsRead,
  deleteUserNotifications,
} from "@/app/lib/actions/notificationAction";
import InvitationNotification from "./InvitationNotification";
import Spinner from "../Spinner";

function NotificationSheet({ userId }) {
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getUserNotifications(userId),
    enabled: !!userId,
  });

  const { mutate: clearNotifications, isPending: isClearing } = useMutation({
    mutationFn: () => deleteUserNotifications(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
    onError: (err) => {
      console.error("Error deleting notifications:", err);
    },
  });

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  return (
    <SheetContent className="overflow-scroll">
      <SheetHeader>
        <SheetTitle>Notifications</SheetTitle>
        <SheetDescription>
          View your latest notifications here.
        </SheetDescription>
      </SheetHeader>

      {notifications.length > 0 && (
        <Button
          variant="primary"
          className="mt-4 ms-auto block"
          size="sm"
          onClick={() => clearNotifications()}
          disabled={isClearing}
        >
          {isClearing ? <Spinner /> : "Clear All"}
        </Button>
      )}

      <div className="grid gap-4 py-4">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-12 w-full animate-pulse bg-gray-300 rounded-md"
            ></div>
          ))
        ) : isError ? (
          <p className="text-red-500">Failed to load notifications</p>
        ) : notifications?.length > 0 ? (
          notifications.map((notification) => {
            const isInvitation =
              notification.type === "invite_request" ||
              notification.type === "invite_accepted" ||
              notification.type === "invite_rejected";

            if (isInvitation) {
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
