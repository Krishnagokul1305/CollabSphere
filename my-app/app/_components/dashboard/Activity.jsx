import { getUpcomingTodos } from "@/app/lib/data-service";

async function Activity() {
  const data = await getUpcomingTodos();
  return (
    <div className="p-6 rounded-md md:col-span-2 bg-muted/50 border">
      <h2 className="text-lg font-semibold">Upcomming Todos</h2>
    </div>
  );
}

export default Activity;
