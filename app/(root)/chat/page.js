import ConversationFallback from "@/app/_components/chat/ConversationFallback";
import ConversationList from "@/app/_components/chat/ConversationList";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

function page() {
  return (
    // <Suspense fallback={<Skeleton className={"min-h-[40vh] w-full p-5"} />}>
    //   <ConversationList />
    // </Suspense>
    <>
      <ConversationFallback />
    </>
  );
}

export default page;
