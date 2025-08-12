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
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "../modal/Modal";
import Members from "./Members";
import TypingIndicator from "./TypingIndicator";

export default function ChatArea({ projectId, messages = [], user }) {
  const [chatMessages, setChatMessages] = useState(messages);
  const [typingUsers, setTypingUsers] = useState([]);
  const scrollRef = useRef(null);
  const userId = user.id;

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
    socket.on("typing", ({ user }) => {
      setTypingUsers((prev) => {
        if (prev.some((u) => u.id === user.id)) return prev;
        return [...prev, user];
      });
    });

    socket.on("stop_typing", ({ user }) => {
      setTypingUsers((prev) => prev.filter((u) => u.id !== user.id));
    });

    return () => {
      socket.off("typing");
      socket.off("stop_typing");
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
      <header className="flex-shrink-0 flex items-center justify-between p-3 border-b">
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
        <Modal
          title="Members"
          description="View all members in your Project."
          Trigger={
            <Button
              variant={"ghost"}
              className="flex md:space-y-0 p-2 px-5 gap-2 items-center text-sm border rounded-full "
            >
              <Users className="h-4 w-4" /> Members
            </Button>
          }
        >
          <Members projectId={projectId} />
        </Modal>
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
            {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}
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
