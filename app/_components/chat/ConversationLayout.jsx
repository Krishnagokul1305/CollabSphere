"use client";

import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

function ConversationLayout({ children }) {
  const { isActive } = useChat();
  return (
    <div
      className={cn(
        "hidden flex-col justify-center items-center h-full w-96 md:border-r border-muted",
        {
          block: !isActive,
          "lg:block": isActive,
        }
      )}
    >
      {children}
    </div>
  );
}

export default ConversationLayout;
