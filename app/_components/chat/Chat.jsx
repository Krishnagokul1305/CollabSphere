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

export default function ChatArea({ projectId, messages = [], user }) {
  const [chatMessages, setChatMessages] = useState(messages);
  const scrollRef = useRef(null);
  const userId = user.id;

  useEffect(() => {
    fetch("/api/socketio");
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit("join-room", { userId, projectId });

    return () => {
      socket.disconnect();
    };
  }, [projectId, userId]);

  useEffect(() => {
    const handleMessage = (msg) => {
      setChatMessages((prev) => {
        const exists = prev.some((m) => m.id === msg.id);
        return exists
          ? prev
          : [...prev, { ...msg, isMe: msg?.sender?.id == userId }];
      });
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [userId]);

  useEffect(() => {
    const handleDelete = ({ messageId }) => {
      setChatMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    };

    socket.on("message-deleted", handleDelete);

    return () => {
      socket.off("message-deleted", handleDelete);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = (msg) => {
    socket.emit("message", msg);
  };

  const handleDeleteMessage = (messageId) => {
    socket.emit("delete-message", { messageId, projectId });
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
              <Message
                key={i}
                message={message}
                onDelete={handleDeleteMessage}
              />
            ))}
            {/* <TypingIndicator /> */}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </div>

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
