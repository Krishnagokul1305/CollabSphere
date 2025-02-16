import UserDetailsForm from "@/app/_components/UserDetailsForm";
import { getUser } from "@/app/lib/auth";
import { UserProfile } from "@clerk/nextjs";

async function page() {
  return (
    <div className=" rounded-md max-w-7xl p-2 mx-auto">
      <div className="max-w-4xl">
        <UserDetailsForm />
      </div>
    </div>
  );
}

export default page;
