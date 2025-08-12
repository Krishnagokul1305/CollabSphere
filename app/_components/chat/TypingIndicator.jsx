import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TypingIndicator({ users, className = "" }) {
  if (users.length === 0) return null;

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <TooltipProvider>
        <div className="flex -space-x-2">
          {users.slice(0, 3).map((user) => (
            <Tooltip key={user?.id}>
              <TooltipTrigger asChild>
                <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-900">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg"}
                    alt={user?.name}
                  />
                  <AvatarFallback className="text-xs">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user?.name} is typing...</p>
              </TooltipContent>
            </Tooltip>
          ))}
          {users.length > 3 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700">
                  <AvatarFallback className="text-xs">
                    +{users.length - 3}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {users
                    .slice(3)
                    .map((u) => u?.name)
                    .join(", ")}
                  {users.length > 4 ? " and others" : ""} typing...
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
      <div
        className={`flex items-center gap-1 px-3 py-4 bg-sidebar-border rounded-md w-fit ${className}`}
      >
        <span
          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></span>
        <span
          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></span>
        <span
          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></span>
      </div>
    </div>
  );
}
