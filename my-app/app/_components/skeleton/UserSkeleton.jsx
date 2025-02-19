import { Skeleton } from "@/components/ui/skeleton";

export default function UserSkeleton({ count = 5 }) {
  const skeletons = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="flex items-center space-x-4 w-full">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ));

  return <>{skeletons}</>;
}
