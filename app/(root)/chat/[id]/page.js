import ChatArea from "@/app/_components/chat/Chat";
import ConversationContainer from "@/app/_components/chat/ConversationContainer";
import { authOptions } from "@/app/lib/auth";
import { getMessagesByProjectId } from "@/app/lib/data-service";
import { getServerSession } from "next-auth";

async function page({ params }) {
  const { id } = await params;
  const data = await getMessagesByProjectId(id);
  const session = await getServerSession(authOptions);
  return (
    <ConversationContainer>
      <ChatArea projectId={id} messages={data} user={session?.user} />
    </ConversationContainer>
  );
}

export default page;
