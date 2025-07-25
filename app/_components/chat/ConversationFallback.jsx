import { Card } from "@/components/ui/card";

function ConversationFallback() {
  return (
    <Card className="hidden bg-transparent border-none shadow-none flex-1 rounded-md lg:flex h-full w-full items-center justify-center min-h-screen">
      <div className="text-center text-muted-foreground">
        <p className="text-lg font-medium">Select a Project</p>
        <p className="text-sm">Get started with your conversation</p>
      </div>
    </Card>
  );
}

export default ConversationFallback;
