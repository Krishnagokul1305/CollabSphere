"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";
import ChatInput from "./ChatInput";
import EmptyChat from "./EmptyChat";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { socket } from "@/app/lib/socket";

export default function ChatArea({ projectId, messages }) {
  const [chatMessages, setChatMessages] = useState(messages || []);

  useEffect(() => {
    if (projectId) {
      socket.emit("joinRoom", { projectId });
    }

    const handleMessageReceived = (message) => {
      console.log(message);
      setChatMessages((prev) => [...prev, message]);
    };

    socket.on("messageReceived", handleMessageReceived);

    return () => {
      socket.off("messageReceived", handleMessageReceived);
    };
  }, [projectId]);
  if (!projectId) {
    return <EmptyChat />;
  }

  return (
    <div className="flex flex-col flex-1 min-h-[90vh] overflow-hidden">
      <header className="flex items-center justify-between p-5 border-b ">
        <div className="flex items-center gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/chat">Chat</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/chat/${projectId}`}>
                  {"hello"}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatMessages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <ChatInput projectId={projectId} />
    </div>
  );
}
