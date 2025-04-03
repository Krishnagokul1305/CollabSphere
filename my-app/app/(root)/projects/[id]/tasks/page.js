import EmptyList from "@/app/_components/EmptyList";
import TaskCard from "@/app/_components/Task/TaskCard";
import { getTasksByProjectId, isOwner } from "@/app/lib/data-service";

export default async function Page(params) {
  const {
    params: { id },
  } = await params;
  const data = await getTasksByProjectId(id);
  const isOwnerOfProject = await isOwner(id);

  return (
    <div className="h-full flex-1 flex-col  md:flex">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            projectid={id}
            isOwner={isOwnerOfProject}
          />
        ))}
      </div>
      {(data?.length == 0 || !data) && (
        <EmptyList
          count={0}
          title={"No Tasks"}
          message={"Add a task to start"}
        />
      )}
    </div>
  );
}
