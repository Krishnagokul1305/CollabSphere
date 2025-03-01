"use client";
import { Skeleton } from "@/components/ui/skeleton";
import UserSkeleton from "../skeleton/UserSkeleton";

function UserList() {
  return (
    <div className="w-full max-w-md mx-auto space-y-5 flex flex-col items-center">
      {/* <Skeleton className="w-full h-10 rounded-md" />
      <UserSkeleton count={7} /> */}
    </div>
  );
}

export default UserList;
