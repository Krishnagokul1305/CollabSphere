"use client";

import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { File } from "lucide-react";
import TaskMembers from "./TaskMembers";

const taskData = {
  name: "Task Name",
  createdOn: "25 May 2024",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti totam expedita eaque fugiat minus, iusto officiis! Autem quo dolorem dolores, eum itaque quisquam numquam vitae.",
  status: "In Progress",
  dueDate: "25 May 2024",
  attachments: [
    { name: "Attachment1.jpg", url: "#" },
    { name: "Attachment2.jpg", url: "#" },
  ],
  members: [
    {
      name: "John Doe",
      email: "John@email.com",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
    },
    {
      name: "Jane Smith",
      email: "Jane@email.com",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
    },
    {
      name: "Alice Johnson",
      email: "Alice@email.com",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
    },
  ],
};

function Task() {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{taskData.name}</SheetTitle>
        <div className="text-sm dark:text-gray-300 text-gray-800">
          Created on {taskData.createdOn}
        </div>

        <SheetDescription className="border p-4 rounded-md bg-sidebar-border">
          {taskData.description}
        </SheetDescription>
        <div className="dark:text-gray-300 mt-2 text-gray-800">
          <div className="space-y-2">
            <p>
              <span className="font-bold">Status:</span> {taskData.status}
            </p>

            <p>
              <span className="font-bold">Due Date:</span> {taskData.dueDate}
            </p>
          </div>
          <div className="mt-2 space-y-2">
            <h1 className="font-bold">Attachments</h1>
            <div className="grid gap-2">
              {taskData.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-sidebar-border p-2 rounded-md cursor-pointer"
                >
                  <span className="h-10 w-10 dark:bg-gray-200 bg-gray-600 rounded-full flex items-center justify-center">
                    <File className="h-4 w-4 dark:text-gray-600 text-gray-200" />
                  </span>
                  <a href={attachment.url} className="text-blue-500">
                    {attachment.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 space-y-2">
            <h1 className="font-bold">Assigned To</h1>
            <div>
              <TaskMembers />
            </div>
          </div>
        </div>
      </SheetHeader>
      <div className="grid gap-4 py-4"></div>
      <SheetFooter></SheetFooter>
    </SheetContent>
  );
}

export default Task;
