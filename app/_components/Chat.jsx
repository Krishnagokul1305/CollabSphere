"use client";

import { useEffect, useState } from "react";
import { Message } from "./Message";
import ChatInput from "./ChatInput";
import { socket } from "../lib/socket";
// https://www.youtube.com/watch?v=b79LOKfXzOk
export default function Chat() {
  const [messages, setMessages] = useState([
    {
      message: "The UI is 90% complete, just need to add animations!",
      time: "2d ago",
      isSender: false,
      name: "Diana T.",
      avatar: "/sender-avatar.png",
    },
    {
      message: "Okay, keep me updated!",
      time: "3h ago",
      isSender: true,
      name: "Daniel A.",
      avatar: "/receiver-avatar.png",
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
    <div className="max-w-6xl mx-auto h-screen flex flex-col justify-between rounded-lg">
      <div className="md:p-4 space-y-5 md:space-y-3 flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}
