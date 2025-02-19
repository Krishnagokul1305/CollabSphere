import { Skeleton } from "@/components/ui/skeleton";
import UserSkeleton from "../skeleton/UserSkeleton";
import UserListItem from "./UserListItem";

function UserList() {
  const users = [
    { name: "Basil Iwanyk", attachment: "Relay", daysAgo: 22, image: "" },
    {
      name: "Jannet Foxx",
      attachment: "Reginald",
      daysAgo: 22,
    },
  ];
  return (
    <div className="w-full max-w-md mx-auto space-y-5 p-5 flex flex-col items-center">
      {/* {users.map((user) => (
        <UserListItem user={user} key={user.name} />
      ))} */}
      <Skeleton className="w-full h-10 rounded-md" />
      <UserSkeleton count={7} />
    </div>
  );
}

export default UserList;
