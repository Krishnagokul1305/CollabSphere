import { getUserTaskStats } from "@/app/lib/data-service";
import { CircleCheck, CircleX, Clock, Flame } from "lucide-react";
import TaskStats from "./TaskStats";

async function Dashboardtask() {
  let stats = await getUserTaskStats();
  stats = [
    {
      label: "Total Tasks",
      color: "blue",
      description: "Total tasks created",
      value: stats.total,
      icon: <Clock className="text-blue-500 w-5 h-5" />,
    },
    {
      label: "Completed",
      color: "green",
      description: "Total tasks completed",
      value: stats.completed,
      icon: <CircleCheck className="text-green-500 w-5 h-5" />,
    },
    {
      label: "Not Completed",
      value: stats.notCompleted,
      description: "Pending tasks",
      color: "orange",
      icon: <CircleX className="text-orange-500 w-5 h-5" />,
    },
    {
      label: "High Priority",
      color: "red",
      description: "High priority tasks",
      value: stats.highPriority,
      icon: <Flame className="text-red-500 w-5 h-5" />,
    },
  ];
  return (
    <>
      {stats.map((item, index) => (
        <TaskStats key={index} data={item} />
      ))}
    </>
  );
}

export default Dashboardtask;
