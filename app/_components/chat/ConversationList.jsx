import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MessageCircle } from "lucide-react";
import { getAllProjectsWithDetails } from "@/app/lib/data-service";
import { formatDateTime } from "@/app/utils/helper";
import Link from "next/link";
import ConversationLayout from "./ConversationLayout";
import { cn } from "@/lib/utils";

export default async function ConversationList() {
  const data = await getAllProjectsWithDetails();

  return (
    <ConversationLayout>
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Chats</h2>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 p-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors"
          />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="px-2 pb-4">
          {data?.length > 0 ? (
            <div className="space-y-1">
              {data.map((conversation) => (
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
                  {/* Avatar */}
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
              ))}
            </div>
          ) : (
            <EmptyConversationsState />
          )}
        </div>
      </ScrollArea>
    </ConversationLayout>
  );
}

function EmptyConversationsState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <MessageCircle className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-foreground mb-2">
        No conversations yet
      </h3>
      <p className="text-sm text-muted-foreground max-w-[200px]">
        Start a new conversation by selecting a project from your workspace
      </p>
    </div>
  );
}
