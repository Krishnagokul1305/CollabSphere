"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { createMessage } from "@/app/lib/actions/messageAction";
import { Send } from "lucide-react";
import { socket } from "@/app/lib/socket";

export default function ChatInput({ projectId }) {
  const [message, setMessage] = useState("");

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      // Clear any pending timeouts when component unmounts
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await createMessage({ project: projectId, content: message }),
    onSuccess: (newMessage) => {
      socket.emit("newMessage", { projectId, message: newMessage });
      setMessage("");
    },
  });

  const handleSend = () => {
    if (message.trim() !== "") {
      mutate();
    }
  };

  return (
    <div className="p-4 border-gray-200">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            disabled={isPending}
            placeholder="Message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);

              // Emit typing event
              socket.emit("userTyping", { projectId, user: "me" });

              // Clear previous timeout
              if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
              }

              // Set new timeout to stop typing indicator after 2 seconds
              typingTimeoutRef.current = setTimeout(() => {
                socket.emit("userStoppedTyping", { projectId, user: "me" });
              }, 2000);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="p-5 pr-10 rounded-md"
          />
        </div>
        <Button
          className="text-gray-100"
          variant="primary"
          size="icon"
          onClick={handleSend}
          disabled={isPending}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
