import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MessageCircle } from "lucide-react";
import { getAllProjectsWithDetails } from "@/app/lib/data-service";

import ConversationLayout from "./ConversationLayout";
import ConversationListItems from "./ConversationListItems";

export default async function ConversationList() {
  const data = await getAllProjectsWithDetails();

  return (
    <ConversationLayout>
      <div className="flex-shrink-0 p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Chats</h2>
      </div>

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
      <ScrollArea className="flex-1">
        <div className="px-2 pb-4">
          {data?.length > 0 ? (
            <div className="space-y-1">
              {data.map((conversation) => (
                <ConversationListItems
                  conversation={conversation}
                  key={conversation._id}
                />
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
