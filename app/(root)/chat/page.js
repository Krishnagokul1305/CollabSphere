import ConversationList from "@/app/_components/chat/ConversationList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<Skeleton className={"min-h-[40vh] w-full p-5"} />}>
      <ConversationList />
    </Suspense>
  );
}

export default page;
