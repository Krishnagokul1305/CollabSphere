import MembersList from "@/app/_components/Task/MembersList";
import { getProjectUsers, isOwner } from "@/app/lib/data-service";

async function page({ params }) {
  const { id } = await params;

  const data = await getProjectUsers(id);
  const isOwnerOfProject = await isOwner(id);
  return (
    <div className="bg-sidebar rounded-md">
      <MembersList data={data} isOwner={isOwnerOfProject} projectId={id} />
    </div>
  );
}

export default page;
