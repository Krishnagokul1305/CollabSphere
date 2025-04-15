import { getUpcomingTodos } from "@/app/lib/data-service";
import ActivityList from "./ActivityList";

async function Activity() {
  const data = await getUpcomingTodos();
  return (
    <div className=" rounded-md md:col-span-2 bg-muted/50 border">
      <ActivityList data={data} />
    </div>
  );
}

export default Activity;
