"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Smile, X } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };
  return (
    <div className="p-4 border-gray-200">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="p-5 pr-10 rounded-md"
          />
          <Button
            size="icon"
            className="absolute bg-transparent right-0 top-0 h-full"
          >
            <Smile className="h-10 w-10 text-gray-500" />
          </Button>
        </div>
        <Button size="icon" onClick={handleSend} className="rounded-md p-5">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
