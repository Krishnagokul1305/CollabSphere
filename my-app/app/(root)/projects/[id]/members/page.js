import MembersList from "@/app/_components/Task/MembersList";
import { getProjectUsers } from "@/app/lib/data-service";

async function page({ params }) {
  const { id } = await params;

  const data = await getProjectUsers(id);
  return (
    <div className="bg-sidebar rounded-md">
      <MembersList data={data} />
    </div>
  );
}

export default page;
