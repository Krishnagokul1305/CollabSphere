"use client";

import { Input } from "@/components/ui/input";

function TaskMembers() {
  return (
    <div>
      <Input placeholder="Search Members" />
      <div className="mt-4 grid gap-4">
        <div className="flex items-center space-x-2 bg-sidebar-border p-2 rounded-md cursor-pointer">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="font-bold text-sm">John Doe</h1>
            <p className="text-gray-500 text-sm">John@email.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-sidebar-border p-2 rounded-md cursor-pointer">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="font-bold text-sm">John Doe</h1>
            <p className="text-gray-500 text-sm">John@email.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-sidebar-border p-2 rounded-md cursor-pointer">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="font-bold text-sm">John Doe</h1>
            <p className="text-gray-500 text-sm">John@email.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskMembers;
