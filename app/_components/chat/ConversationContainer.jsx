import { Card } from "@/components/ui/card";

function ConversationContainer({ children }) {
  return (
    <Card className="w-full bg-transparent border-none shadow-none h-[calc(100svh-32px)] lg:h-full p-2 flex flex-col gap-2">
      {children}
    </Card>
  );
}

export default ConversationContainer;
