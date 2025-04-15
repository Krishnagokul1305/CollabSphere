import CreateUpdateTask from "@/app/_components/Task/CreateUpdateTask";
import { getProjectUsers } from "@/app/lib/data-service";

async function page({ params }) {
  const { id } = await params;
  let { members } = await getProjectUsers(id, true);
  members = members.map((member) => ({
    _id: member?.user?._id.toString(),
    name: member?.user?.name,
    email: member?.user?.email,
  }));
  return (
    <div className="bg-sidebar p-5 rounded-md">
      <CreateUpdateTask members={members} projectId={id} />
    </div>
  );
}

export default page;
