"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Clock, GripVertical, MoreVertical } from "lucide-react";
import ReusableDropdown from "../ReusableDropdown";
import { Button } from "@/components/ui/button";

export default function TodoListItem({ task, onToggle }) {
  return (
    <div className="flex items-center hover:bg-sidebar-border justify-between  rounded-lg p-3">
      <div className="flex items-center space-x-3">
        <GripVertical className="w-5 h-5 text-gray-600 dark:text-gray-200" />
        <Checkbox checked={task.completed} onCheckedChange={onToggle} />
        <span
          className={cn(
            "text-sm font-medium text-gray-600 dark:text-gray-200",
            task.completed && "line-through text-gray-400"
          )}
        >
          {task.text}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {task.time && (
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-200 text-xs">
            <Clock className="w-4 h-4" />
            <span>{task.time}</span>
          </div>
        )}
        <ReusableDropdown
          trigger={
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical />
            </Button>
          }
          label="Actions"
          items={[
            { label: "Edit", onClick: () => {} },
            { label: "Delete", onClick: () => {} },
          ]}
        />
      </div>
    </div>
  );
}
