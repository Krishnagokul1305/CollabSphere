"use client";

import { CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import TodoListItem from "./TodoListItem";
import EmptyList from "../EmptyList";
import { getDateCategory } from "@/app/utils/helper";

export default function TodoList({ todo }) {
  return (
    <div className="mx-auto">
      {todo.length > 0 ? (
        todo.map((group) => (
          <div key={group._id} className="p-4 mb-4 bg-sidebar rounded-md">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 mb-1" />
              <h2 className="text-lg font-semibold">
                {getDateCategory(group._id)}
              </h2>
            </div>
            <CardContent className="space-y-2 mt-1 pb-0 p-0 md:ps-3 w-full">
              {group.todos.map((task) => (
                <TodoListItem task={task} key={task._id} />
              ))}
            </CardContent>
          </div>
        ))
      ) : (
        <EmptyList title={"No Tasks"} message={"Add tasks to your Todo list"} />
      )}
    </div>
  );
}
