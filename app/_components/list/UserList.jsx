import { Search, Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { formatDateTime } from "@/app/utils/helper";
import { getAllProjectsWithDetails } from "@/app/lib/data-service";

export default async function UserList() {
  const projects = await getAllProjectsWithDetails();
  if (!projects) return null;
  return (
    <div className="flex bg-sidebar flex-col h-full rounded-md">
      <div className="relative px-2 py-2 border-b flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users..." className="pl-8" />
      </div>

      <div className="flex-1 overflow-auto">
        {projects?.map((project) => (
          <Link
            href={`/chat/${project._id}`}
            key={project._id}
            className="flex items-center gap-3 p-4 cursor-pointer border-b hover:bg-border/30"
          >
            <div className="relative">
              <Avatar className="h-11 w-11">
                <AvatarImage
                  src={project.avatar || "/placeholder.svg"}
                  alt={project.name}
                />
                <AvatarFallback>
                  <Users className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                  project.status === "online"
                    ? "bg-green-500"
                    : project.status === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-300"
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className=" truncate">{project.name}</p>
                <span className="text-xs text-gray-500">
                  {project?.latestMessage?.createdAt
                    ? formatDateTime(project?.latestMessage?.createdAt).time
                    : formatDateTime(project?.createdAt).time}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {project.latestMessage || "No messages"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
