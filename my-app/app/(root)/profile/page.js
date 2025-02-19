import UserDetailsForm from "@/app/_components/profile/UserDetailsForm";
import { authOptions } from "@/app/lib/auth";
import { getUserById } from "@/app/lib/user";
import { getServerSession } from "next-auth";

async function page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <div>User is not authenticated</div>;
  }
  let user = await getUserById(session.user.id);
  user = JSON.parse(JSON.stringify(user));
  return (
    <div className=" rounded-md max-w-7xl p-2 mx-auto">
      <div className="max-w-4xl">
        <UserDetailsForm user={user} id={session.user.id} />
      </div>
    </div>
  );
}

export default page;
