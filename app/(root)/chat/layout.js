import ConversationList from "@/app/_components/chat/ConversationList";
function layout({ children }) {
  return (
    <div className="min-h-screen rounded-md flex gap-3 bg-sidebar text-secondary-foreground">
      <ConversationList />
      <div className="flex-1 h-full overflow-y-auto">{children}</div>
    </div>
  );
}

export default layout;
