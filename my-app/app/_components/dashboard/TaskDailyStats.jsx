import { getTaskStatsPerDay } from "@/app/lib/data-service";
import DailyTaskChart from "./DailyTaskChart";

async function TaskDailyStats({ id }) {
  const data = await getTaskStatsPerDay(id);
  return <DailyTaskChart data={data} />;
}

export default TaskDailyStats;
