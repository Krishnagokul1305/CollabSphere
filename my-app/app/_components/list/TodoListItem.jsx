"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Clock, GripVertical } from "lucide-react";
import ReusableDropdown from "../ReusableDropdown";

export default function TodoListItem({ task, onToggle }) {
  console.log(task);
  return (
    <div className="flex items-start md:items-center md:flex-row gap-2 flex-col w-full hover:bg-sidebar-border justify-between  rounded-lg p-3">
      <div className="flex items-start md:items-center space-x-3 w-full">
        <ReusableDropdown
          trigger={
            <GripVertical className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-200" />
          }
          label="Actions"
          items={[
            { label: "Edit", onClick: () => {} },
            { label: "Delete", onClick: () => {} },
          ]}
        />
        <div className="flex items-start flex-col md:flex-row md:items-center md:space-x-3 justify-between w-full">
          <div className="flex items-start md:items-center space-x-3">
            <Checkbox
              checked={task.completed}
              className="mt-0.5 md:mt-0"
              onCheckedChange={onToggle}
            />

            <span
              className={cn(
                "text-sm font-medium w-full text-gray-600 dark:text-gray-200",
                task.completed && "line-through text-gray-400"
              )}
            >
              {task.text}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <span
              className={cn(
                "text-xs font-medium text-white dark:text-gray-200 rounded-md px-2 py-0.5",
                task.priority === "high" ? "bg-red-500" : "bg-green-500"
              )}
            >
              {task.priority}
            </span>

            <div className="flex w-full  items-center space-x-1 text-gray-600 dark:text-gray-200 text-xs">
              <Clock className="w-3 h-3" />
              <span>{task.time ? task.time : "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
