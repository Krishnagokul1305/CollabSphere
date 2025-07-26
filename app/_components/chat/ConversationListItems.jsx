"use client";

import { formatDateTime } from "@/app/utils/helper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";

function ConversationListItems({ conversation }) {
  return (
    <Link
      href={`/chat/${conversation._id}`}
      key={conversation._id}
      className={cn(
        "flex items-center gap-3 rounded-xl p-3 transition-all duration-200",
        "hover:bg-muted/80 active:bg-muted",
        "border border-transparent hover:border-border/50",
        "group cursor-pointer"
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="h-12 w-12 ring-2 ring-transparent group-hover:ring-border/20 transition-all">
          <AvatarImage
            src={conversation.avatar || "/placeholder.svg"}
            alt={conversation.name}
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {conversation.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {conversation.name}
          </h3>
          <span className="text-xs text-muted-foreground font-medium flex-shrink-0">
            {formatDateTime(conversation.createdAt).time}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {conversation?.latestMessage?.text ? (
            <p className="text-sm text-muted-foreground truncate leading-tight">
              <span className="font-medium text-foreground/80">
                {conversation.latestMessage.sender?.name} :{" "}
              </span>
              {conversation.latestMessage.text}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              Start a conversation
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ConversationListItems;
