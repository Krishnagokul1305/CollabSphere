"use client";

import { useTransition } from "react";
import { acceptInvite, rejectInvite } from "@/app/lib/actions/projectAction";
import { Button } from "@/components/ui/button";

function InvitationNotification({ notification, requested = false }) {
  const [isPending, startTransition] = useTransition();

  const handleAccept = () => {
    startTransition(() => {
      acceptInvite(
        notification.project,
        notification.recipient,
        notification._id
      );
    });
  };

  const handleReject = () => {
    startTransition(() => {
      rejectInvite(
        notification.project,
        notification.recipient,
        notification._id
      );
    });
  };

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

      {requested && (
        <div className="flex gap-2">
          <Button
            variant="success"
            size="sm"
            disabled={isPending}
            onClick={handleAccept}
          >
            {isPending ? "Accepting..." : "Accept"}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={handleReject}
          >
            {isPending ? "Rejecting..." : "Reject"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default InvitationNotification;
