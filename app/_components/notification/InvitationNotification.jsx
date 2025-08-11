"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInvite, rejectInvite } from "@/app/lib/actions/projectAction";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

function InvitationNotification({ notification, requested = false }) {
  const queryClient = useQueryClient();

  const { mutate: acceptMutation, isPending: isAccepting } = useMutation({
    mutationFn: () =>
      acceptInvite(
        notification.project,
        notification.recipient,
        notification._id
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", notification.recipient],
      });
      toast.success("Invitation accepted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to accept invitation");
      console.error("Error accepting invitation");
    },
  });

  const { mutate: rejectMutation, isPending: isRejecting } = useMutation({
    mutationFn: () =>
      rejectInvite(
        notification.project,
        notification.recipient,
        notification._id
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", notification.recipient],
      });
      toast.success("Invitation rejected successfully!");
    },
    onError: (error) => {
      toast.error("Failed to reject invitation");
      console.error("Error rejecting invitation:", error);
    },
  });

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
            disabled={isAccepting || isRejecting}
            onClick={() => acceptMutation()}
          >
            {isAccepting ? "Accepting..." : "Accept"}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            disabled={isAccepting || isRejecting}
            onClick={() => rejectMutation()}
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default InvitationNotification;
