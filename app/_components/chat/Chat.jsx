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

export default function ChatArea({ projectId, messages = [], userId }) {
  const [chatMessages, setChatMessages] = useState(messages);
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.connect();
    socket.emit("join-room", { userId, projectId });

    socket.on("message", (msg) => {
      console.log(msg, userId);
      setChatMessages((prev) => [
        ...prev,
        { ...msg, isMe: msg?.sender == userId },
      ]);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => {
      socket.disconnect();
    };
  }, [projectId, userId]);

  const handleSendMessage = (msg) => {
    setChatMessages((prev) => [...prev, msg]);
    socket.emit("message", msg);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!projectId) return <EmptyChat />;

  return (
    <div className="flex flex-col flex-1 min-h-[90vh] overflow-hidden">
      <header className="flex items-center justify-between p-5 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/chat">Chat</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/chat/${projectId}`}>
                Project {projectId}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatMessages.map((message) => (
            <Message key={message?._id || message?.id} message={message} />
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <ChatInput
        projectId={projectId}
        userId={userId}
        onSend={handleSendMessage}
      />
    </div>
  );
}
