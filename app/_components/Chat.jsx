"use client";

import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { socket } from "../lib/socket";
import { Message } from "./Message";
import { useParams } from "next/navigation";
import EmptyList from "./EmptyList";

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

  const params = useParams();

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      const formattedMessage = {
        id: newMessage.id,
        sender: newMessage.sender,
        text: newMessage.text,
        time: newMessage.time,
        isMe: false,
      };
      setMessages((prev) => [...prev, formattedMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = (text) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Emit to server
    socket.emit("sendMessage", {
      id: newMessage.id,
      sender: params.id,
      text: newMessage.text,
      time: newMessage.time,
    });
  };

  if (!params?.id) {
    return (
      <div className="flex flex-1 min-h-screen">
        <EmptyList
          title="Explore Messages"
          message={"Go and explore messages that you received"}
        />
      </div>
    );
  }

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
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
}
