"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Clock, GripVertical } from "lucide-react";
import ReusableDropdown from "../ReusableDropdown";
import { formatDateTime } from "@/app/utils/helper";
import { deleteTodo, toggleStatus } from "@/app/lib/actions/todoAction";
import { useRef, useTransition } from "react";
import Modal from "../modal/Modal";
import CreateUpdateTodo from "../forms/CreateUpdateTodo";

export default function TodoListItem({ task }) {
  const [isPending, startTransition] = useTransition();
  const modalRef = useRef(null);
  return (
    <>
      <Modal
        ref={modalRef}
        title="Edit Task"
        description="Modify your task details"
      >
        <CreateUpdateTodo initialData={task} />
      </Modal>
      <div className="flex items-start md:items-center md:flex-row gap-2 flex-col w-full hover:bg-sidebar-border justify-between  rounded-lg p-3">
        <div className="flex items-start md:items-center space-x-3 w-full">
          <ReusableDropdown
            trigger={
              <GripVertical className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-200" />
            }
            label="Actions"
            items={[
              { label: "Edit", onClick: () => modalRef.current?.open() },
              {
                label: "Delete",
                onClick: () => startTransition(() => deleteTodo(task._id)),
              },
            ]}
          />
          <div className="flex items-start flex-col md:flex-row md:items-center md:space-x-3 justify-between w-full">
            <div className="flex items-start md:items-center space-x-3">
              <Checkbox
                checked={task.status == "completed"}
                onClick={() => toggleStatus(task._id)}
                className="mt-0.5 md:mt-0"
              />

              <span
                className={cn(
                  "text-sm font-medium w-full text-gray-600 dark:text-gray-200",
                  task.status == "completed" && "line-through text-gray-400"
                )}
              >
                {task.description}
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
                <span>
                  {task.date_time ? formatDateTime(task.date_time).time : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
