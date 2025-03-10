import MembersList from "@/app/_components/Task/MembersList";
import { getProjectUsers } from "@/app/lib/data-service";

async function page({ params }) {
  const { id } = await params;
  console.log(id);
  const data = await getProjectUsers(id);
  console.log(data);
  return (
    <div className="bg-sidebar rounded-md">
      <MembersList />
    </div>
  );
}

export default page;
