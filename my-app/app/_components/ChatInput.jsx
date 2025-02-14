"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X } from "lucide-react";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  const handleDiscard = () => setMessage(""); // Clears input

  return (
    <div className="flex items-center gap-2 px-3 py-2 mx-auto max-w-6xl bg-sidebar rounded-lg w-full">
      {/* <Button variant="ghost" size="icon">
        <Paperclip className="h-5 w-5 text-gray-400" />
      </Button> */}
      <Input
        type="text"
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-transparent text-white placeholder-gray-400 border-none focus:ring-0 focus:outline-none w-full"
      />
      {message && (
        <Button
          className="rounded-md bg-red-500 p-5 hover:bg-red-400"
          size="icon"
          onClick={handleDiscard}
        >
          <X className="h-5 w-5 text-gray-200" />
        </Button>
      )}
      <Button
        className="rounded-md bg-sidebar-primary p-5 hover:bg-sidebar-primary/90"
        size="icon"
      >
        <Send className="h-5 w-5 text-gray-200" />
      </Button>
    </div>
  );
}
