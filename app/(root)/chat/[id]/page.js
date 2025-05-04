import ChatArea from "@/app/_components/chat/Chat";
import { getMessagesByProjectId } from "@/app/lib/data-service";

async function page({ params }) {
  const { id } = await params;
  const data = await getMessagesByProjectId(id);
  return (
    <div>
      <ChatArea projectId={id} messages={data} />
    </div>
  );
}

export default page;
