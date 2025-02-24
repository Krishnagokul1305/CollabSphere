"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import TodoListItem from "./TodoListItem";
import EmptyList from "../EmptyList";

const initialData = [
  {
    date: "Today",
    tasks: [
      {
        id: 1,
        text: "Finish the sales presentation",
        time: "2:00 PM",
        completed: false,
      },
      { id: 2, text: "Send follow-up emails", completed: false },
      {
        id: 3,
        text: "Review and approve the marketing budget",
        time: "10:00 AM",
        completed: true,
      },
      {
        id: 4,
        text: "Attend the team meeting",
        time: "10:30 AM",
        completed: true,
      },
    ],
  },
  {
    date: "Tomorrow",
    tasks: [
      {
        id: 5,
        text: "Read a chapter of your book",
        time: "7:00 PM",
        completed: false,
      },
    ],
  },
  {
    date: "Wed, 27 Sept",
    tasks: [{ id: 6, text: "Pay the electricity bill", completed: true }],
  },
  {
    date: "Fri, 29 Sept",
    tasks: [
      { id: 7, text: "Take 10 minutes for meditation", completed: false },
    ],
  },
];

export default function TodoList() {
  const [data, setData] = useState(initialData);

  const toggleTask = (dateIndex, taskId) => {
    setData((prevData) =>
      prevData.map((group, index) =>
        index === dateIndex
          ? {
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : group
      )
    );
  };

  return (
    <div className="mx-auto">
      {data.length > 0 ? (
        data.map((group) => (
          <div key={group.date} className="p-4 mb-4 bg-sidebar rounded-md">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 mb-1" />
              <h2 className="text-lg font-semibold">{group.date}</h2>
            </div>
            <CardContent className="space-y-2 mt-1 pb-0 ps-3">
              {group.tasks.map((task) => (
                <TodoListItem task={task} key={task.id} />
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
