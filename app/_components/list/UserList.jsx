"use client";

import { useState } from "react";
import { Search, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const MOCK_USERS = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Hey, how are you doing?",
    time: "2m ago",
    unread: 3,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "Let's catch up later",
    time: "1h ago",
    unread: 0,
  },
  {
    id: "3",
    name: "Carol Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Did you see the new update?",
    time: "3h ago",
    unread: 1,
  },
  {
    id: "4",
    name: "Dave Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastMessage: "Meeting at 3pm tomorrow",
    time: "5h ago",
    unread: 0,
  },
  {
    id: "5",
    name: "Eve Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Thanks for your help!",
    time: "1d ago",
    unread: 0,
  },
];

export default function UserList({ onSelectUser }) {
  const [users, setUsers] = useState(MOCK_USERS);

  return (
    <div className="flex bg-sidebar flex-col h-full rounded-md">
      <div className="relative px-2 py-2 border-b flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users..." className="pl-8" />
      </div>

      <div className="flex-1 overflow-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-4 cursor-pointer border-b hover:bg-border/30"
            onClick={() => onSelectUser(user.id)}
          >
            <div className="relative">
              <Avatar className="h-11 w-11">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                  user.status === "online"
                    ? "bg-green-500"
                    : user.status === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-300"
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className=" truncate">{user.name}</p>
                <span className="text-xs text-gray-500">{user.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {user.lastMessage}
              </p>
            </div>
            {user.unread > 0 && (
              <Badge
                variant="default"
                className="h-5 w-5 rounded-full p-0 flex items-center justify-center"
              >
                {user.unread}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
