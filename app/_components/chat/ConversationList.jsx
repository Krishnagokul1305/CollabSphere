import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { getAllProjectsWithDetails } from "@/app/lib/data-service";
import { formatDateTime } from "@/app/utils/helper";
import Link from "next/link";
import ConversationLayout from "./ConversationLayout";
import { cn } from "@/lib/utils";

export default async function ConversationList() {
  const data = await getAllProjectsWithDetails();
  // const data = [];
  console.log(data);
  return (
    <ConversationLayout>
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>

      <div className="pt-4 px-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-8 bg-sidebar-border border-none"
          />
        </div>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 py-2">
          {data?.length > 0 ? (
            data?.map((conversation) => (
              <Link
                href={`/chat/${conversation._id}`}
                key={conversation?._id}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors hover:bg-sidebar-border/50"
                )}
              >
                <Avatar>
                  <AvatarImage
                    src={conversation.avatar || "/placeholder.svg"}
                    alt={conversation.name}
                  />
                  <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs ms-8 text-gray-500 dark:text-gray-400">
                      {formatDateTime(conversation.createdAt).time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {conversation?.lastMessage || "Start Conversation"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No conversations found
            </div>
          )}
        </div>
      </ScrollArea>
    </ConversationLayout>
  );
}
