"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, Menu } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 text-center">
      <div className="md:hidden mb-6">
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
        <MessageSquare className="h-10 w-10 text-primary" />
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-2">
        No conversation selected
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        Choose a conversation from the sidebar or start a new one to begin
        chatting.
      </p>
    </div>
  );
}
