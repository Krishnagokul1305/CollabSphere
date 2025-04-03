"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Check, MoreVertical } from "lucide-react";
import ReusableDropdown from "../ReusableDropdown";
import ProgressSlider from "../ProgressSlider";
import DeleteModal from "../modal/DeleteModal";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { deleteTask } from "@/app/lib/actions/taskAction";

function TaskCard({ task, projectid, isOwner = false }) {
  const router = useRouter();
  const deleteModalRef = useRef(null);
  const handleDelete = async () => {
    await deleteTask(task.id, projectid);
  };
  console.log("complted", task.completedMembers);
  return (
    <div className="bg-sidebar p-4 rounded-md">
      {/* Delete Modal */}
      <DeleteModal ref={deleteModalRef} onDelete={handleDelete} />

      <div className="flex justify-between items-center">
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-md">
          {task.tag}
        </span>
        <ReusableDropdown
          items={[
            { label: "View", onClick: () => router.push(`tasks/${task.id}`) },
            ...(isOwner
              ? [
                  {
                    label: "Update",
                    onClick: () => router.push(`updateTask/${task.id}`),
                  },
                  {
                    label: "Delete",
                    onClick: () => deleteModalRef.current?.open(), // Open modal
                  },
                ]
              : []),
          ]}
          trigger={
            <div className="p-2 rounded-full cursor-pointer hover:bg-sidebar-border">
              <MoreVertical size={20} />
            </div>
          }
        />
      </div>

      <h3 className="mt-2 text-lg font-semibold capitalize text-gray-900 dark:text-white">
        {task.title}
      </h3>
      <p className="text-gray-500 text-sm mt-1 capitalize">
        {task?.description?.length > 80
          ? `${task.description.slice(0, 80)}...`
          : task.description}
      </p>

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          Progress
        </div>
        <ProgressSlider
          value={
            task?.members?.length > 0
              ? (task?.completedMembers?.length / task.members?.length) * 100
              : 0
          }
          color="green-500"
        />
      </div>

      <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
        <div className="flex -space-x-2">
          {task?.completedMembers?.length > 0 ? (
            <>
              {task?.completedMembers?.map((avatar, index) => (
                <img
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                  src={avatar}
                  alt={`User ${index + 1}`}
                />
              ))}
              <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full border-2 border-white dark:border-gray-900">
                <Check size={18} />
              </div>
            </>
          ) : (
            <div className="px-3 py-1 text-sm rounded-full bg-yellow-500 border-2 text-white flex items-center gap-2 border-white dark:border-gray-900">
              Completion none <ExclamationTriangleIcon size={18} />
            </div>
          )}
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
    </div>
  );
}

export default TaskCard;
