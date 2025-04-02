import CreateUpdateTask from "@/app/_components/Task/CreateUpdateTask";
import { getProjectUsers } from "@/app/lib/data-service";
import { getServerSession } from "next-auth";

async function page({ params }) {
  const { id } = await params;
  const { members } = await getProjectUsers(id);
  console.log(await getServerSession());

  return (
    <div className="bg-sidebar p-5 rounded-md">
      <CreateUpdateTask members={members} />
    </div>
  );
}

export default page;
