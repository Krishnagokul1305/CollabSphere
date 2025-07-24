import { Card } from "@/components/ui/card";

function ConversationContainer({ children }) {
  return (
    <Card className="w-full bg-transparent border-none shadow-none lg:h-full">
      {children}
    </Card>
  );
}

export default ConversationContainer;
