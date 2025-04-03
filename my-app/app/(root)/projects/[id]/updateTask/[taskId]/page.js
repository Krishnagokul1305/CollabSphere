import CreateUpdateTask from "@/app/_components/Task/CreateUpdateTask";
import { getProjectUsers, getTaskById } from "@/app/lib/data-service";

async function page(params) {
  const {
    params: { taskId, id },
  } = await params;
  const data = await getTaskById(taskId);
  let { members } = await getProjectUsers(id);

  members = members.map((member) => ({
    _id: member?.user?._id.toString(),
    name: member?.user?.name,
    email: member?.user?.email,
  }));
  return (
    <div className="bg-sidebar p-5 rounded-md">
      <CreateUpdateTask
        isCreate={false}
        data={data}
        projectId={id}
        members={members}
      />
    </div>
  );
}

export default page;
