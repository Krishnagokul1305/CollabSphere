"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export default function Message({ message, onDelete }) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(message.id);
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3 group relative",
        message?.isMe && "justify-end"
      )}
    >
      {!message?.isMe && (
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={message?.sender?.avatar || "/placeholder.svg"}
            alt={message?.sender?.name}
          />
          <AvatarFallback>
            {message?.sender?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[75%] relative", message?.isMe && "order-1")}>
        {message?.isMe && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className={cn(
              "absolute -left-10 top-0 h-8 w-8 rounded-full bg-destructive/50 hover:bg-destructive/70 text-white hover:text-white transition-all duration-200 z-10",
              "opacity-100",
              "lg:opacity-0 lg:group-hover:opacity-100"
            )}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        {!message?.isMe && (
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 px-1">
            {message?.sender?.name || "Unknown User"}
          </p>
        )}
        <div
          className={cn(
            "rounded-lg p-3",
            message?.isMe
              ? "bg-primary text-primary-foreground"
              : "bg-sidebar-border"
          )}
        >
          <p className="text-sm">{message?.text}</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
          {message?.time}
        </p>
      </div>
    </div>
  );
}
