import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function Message({ message }) {
  return (
    <div className={cn("flex gap-3", message?.isMe && "justify-end")}>
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
      <div className={cn("max-w-[75%]", message?.isMe && "order-1")}>
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
