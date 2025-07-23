import { Card } from "@/components/ui/card";

function ConversationFallback() {
  return (
    <Card className="hidden bg-transparent border-none shadow-none rounded-md lg:flex h-full w-full p-2 items-center justify-center ">
      Select a Project and get started with your conversation
    </Card>
  );
}

export default ConversationFallback;
