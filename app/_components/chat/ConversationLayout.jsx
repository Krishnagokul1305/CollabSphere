"use client";

import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

function ConversationLayout({ children }) {
  const { isActive } = useChat();

  return (
    <div
      className={cn(
        "hidden flex-col justify-center items-center h-screen min-h-screen w-full lg:w-96 md:border-r border-border",
        {
          block: !isActive,
          "md:block": isActive,
        }
      )}
    >
      {children}
    </div>
  );
}

export default ConversationLayout;
