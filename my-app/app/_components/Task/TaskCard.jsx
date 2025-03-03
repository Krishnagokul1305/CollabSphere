"use client";

import { useState } from "react";
import { Check, MoreVertical } from "lucide-react";
import ReusableDropdown from "../ReusableDropdown";
import ProgressSlider from "../ProgressSlider";
import { Sheet } from "@/components/ui/sheet";
import Task from "@/app/_components/Task/Task";

function TaskCard({ task }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-sidebar p-4 rounded-md">
      {/* Dropdown Menu */}
      <div className="flex justify-between items-center">
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-md">
          {task.category}
        </span>
        <ReusableDropdown
          items={[
            { label: "View", onClick: () => setOpen(true) },
            { label: "Edit", onClick: () => console.log("Edit task") },
            { label: "Update", onClick: () => console.log("Update task") },
            { label: "Delete", onClick: () => console.log("Delete task") },
          ]}
          trigger={
            <div className="p-2 rounded-full cursor-pointer hover:bg-sidebar-border">
              <MoreVertical size={20} />
            </div>
          }
        />
      </div>

      {/* Title and Description */}
      <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
        {task.title}
      </h3>
      <p className="text-gray-500 text-sm mt-1">{task.description}</p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          Progress
        </div>
        <ProgressSlider value={task.progress} />
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
        <div className="flex -space-x-2">
          {task.members.map((member, index) => (
            <img
              key={index}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
              src={member}
              alt={`User ${index + 1}`}
            />
          ))}
          <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full border-2 border-white dark:border-gray-900">
            <Check size={18} />
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6 2a1 1 0 011-1h6a1 1 0 011 1v2h3a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h3V2zM8 3v1h4V3H8zM4 6v10h12V6H4z"></path>
          </svg>
          <span>{task.dueDate}</span>
        </div>
      </div>

      {/* Task Sheet (Opens on View) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <Task task={task} />
      </Sheet>
    </div>
  );
}

export default TaskCard;
