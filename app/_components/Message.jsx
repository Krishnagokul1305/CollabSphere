import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export function Message({ message, avatar, userName }) {
  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%]",
        message.isMe ? "ml-auto flex-row-reverse" : ""
      )}
    >
      {!message.isMe && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={userName} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div>
        <div
          className={cn(
            "rounded-lg p-3",
            message.isMe
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800"
          )}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        <div
          className={cn(
            "flex items-center mt-1 text-xs text-gray-500",
            message.isMe ? "justify-end" : ""
          )}
        >
          <span>{message.time}</span>
        </div>
      </div>
    </div>
  );
}
