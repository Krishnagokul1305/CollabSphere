"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";
import ChatInput from "./ChatInput";
import EmptyChat from "./EmptyChat";
import { useEffect, useState, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import socket from "@/app/lib/socket";
import TypingIndicator from "./TypingIndicator";

export default function ChatArea({ projectId, messages = [], user }) {
  const [chatMessages, setChatMessages] = useState(messages);
  const scrollRef = useRef(null);
  const userId = user.id;

  useEffect(() => {
    socket.connect();
    socket.emit("join-room", { userId, projectId });

    socket.on("message", (msg) => {
      setChatMessages((prev) => [
        ...prev,
        { ...msg, isMe: msg?.sender?.id == userId },
      ]);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => {
      socket.disconnect();
    };
  }, [projectId, userId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = (msg) => {
    socket.emit("message", msg);
  };

  if (!projectId) return <EmptyChat />;

  return (
    <div className="flex flex-col bg-sidebar h-screen max-h-screen overflow-hidden">
      <header className="flex-shrink-0 flex items-center justify-between p-5 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/chat">Chat</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/chat/${projectId}`}>
                Project
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {chatMessages.map((message, i) => (
              <Message key={i} message={message} />
            ))}
            <TypingIndicator />
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Chat Input */}
      <div className="flex-shrink-0 border-t">
        <ChatInput
          projectId={projectId}
          user={user}
          onSend={handleSendMessage}
        />
      </div>
    </div>
  );
}
