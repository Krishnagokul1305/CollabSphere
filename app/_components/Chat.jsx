"use client";

import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { socket } from "../lib/socket";
import { Message } from "./Message";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "1",
      text: "Hey, how are you doing?",
      time: "10:00 AM",
      isMe: false,
    },
    {
      id: "2",
      sender: "me",
      text: "I'm good, thanks! How about you?",
      time: "10:02 AM",
      isMe: true,
    },
    {
      id: "3",
      sender: "1",
      text: "Doing well! Just working on that project we discussed.",
      time: "10:05 AM",
      isMe: false,
    },
    {
      id: "4",
      sender: "me",
      text: "Great! I've made some progress on my end too.",
      time: "10:07 AM",
      isMe: true,
    },
    {
      id: "5",
      sender: "1",
      text: "Can you share your updates?",
      time: "10:10 AM",
      isMe: false,
    },
    {
      id: "6",
      sender: "me",
      text: "Sure, I'll send you the details later today.",
      time: "10:12 AM",
      isMe: true,
    },
  ]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = (newMessage) => {
    const formattedMessage = {
      message: newMessage,
      time: "Now",
      isSender: true,
      name: "You",
      avatar: "/receiver-avatar.png",
    };
    setMessages((prev) => [...prev, formattedMessage]);
    socket.emit("sendMessage", formattedMessage);
  };

  return (
    <div className="w-full mx-auto bg-sidebar h-screen flex flex-col justify-between rounded-lg">
      <div className="md:p-5 p-3 py-7 space-y-5 md:space-y-3 flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg}
            avatar={msg.isMe ? undefined : ""}
            userName={msg.isMe ? "You" : ""}
          />
        ))}
      </div>
      <div className="border-t">
        <ChatInput />
      </div>
    </div>
  );
}
