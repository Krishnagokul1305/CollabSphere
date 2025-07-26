import ConversationFallback from "@/app/_components/chat/ConversationFallback";

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
