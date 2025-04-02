import CreateUpdateTask from "@/app/_components/Task/CreateUpdateTask";
import { getTaskById } from "@/app/lib/data-service";

async function page() {
  const { taskId } = await params;
  const data = await getTaskById(taskId);
  console.log(data);
  return (
    <div className="bg-sidebar p-5 rounded-md">
      <CreateUpdateTask isCreate={false} />
    </div>
  );
}

export default page;
