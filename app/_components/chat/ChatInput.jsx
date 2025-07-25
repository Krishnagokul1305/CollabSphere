"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { createMessage } from "@/app/lib/actions/messageAction";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useClickAway } from "react-use";

export default function ChatInput({ projectId, user, onSend }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const userId = user.id;

  // Close emoji picker when clicking outside
  useClickAway(emojiPickerRef, () => setShowEmojiPicker(false));

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await createMessage({
        project: projectId,
        content: message,
        sender: userId,
      });
    },
    onSuccess: (newMessage) => {
      onSend?.({ ...newMessage, sender: { ...newMessage.sender, ...user } });
      setMessage("");
    },
  });

  const handleSend = () => {
    if (message.trim() !== "") {
      mutate();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newMessage =
        message.slice(0, start) + emojiData.emoji + message.slice(end);
      setMessage(newMessage);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          start + emojiData.emoji.length;
        textarea.focus();
      }, 0);
    }
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative p-4 border-gray-200">
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-full left-4 mb-2 z-50 shadow-lg rounded-lg border bg-background"
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={320}
            height={400}
            previewConfig={{ showPreview: false }}
            skinTonesDisabled
            searchDisabled={false}
          />
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            disabled={isPending}
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-32 resize-none rounded-md pr-12"
            rows={1}
          />
          {/* Emoji Button inside textarea */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={isPending}
          >
            <Smile className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        <Button
          className="text-gray-100 py-5"
          variant="primary"
          size="icon"
          onClick={handleSend}
          disabled={isPending || message.trim() === ""}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
