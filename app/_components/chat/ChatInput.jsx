"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createMessage } from "@/app/lib/actions/messageAction";
import { Send } from "lucide-react";

export default function ChatInput({ projectId, userId, onSend }) {
  const [message, setMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await createMessage({
        project: projectId,
        content: message,
        sender: userId,
      }),
    onSuccess: (newMessage) => {
      onSend?.(newMessage);
      setMessage(""); // clear input after sending
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
            onChange={(e) => setMessage(e.target.value)}
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
