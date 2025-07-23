import ChatArea from "@/app/_components/chat/Chat";
import ConversationContainer from "@/app/_components/chat/ConversationContainer";
import { getMessagesByProjectId } from "@/app/lib/data-service";

async function page({ params }) {
  // const { id } = await params;
  // const data = await getMessagesByProjectId(id);
  return (
    <ConversationContainer>
      {/* <ChatArea projectId={id} messages={data} /> */}
      ConversationContainer
    </ConversationContainer>
  );
}

export default page;
