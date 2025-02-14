import { Message } from "./Message";
import ChatInput from "./ChatInput";

export default function Chat() {
  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col justify-between rounded-lg">
      <div className="md:p-4 space-y-5 md:space-y-3 flex-1 overflow-y-auto">
        <Message
          message="The UI is 90% complete, just need to add animations! "
          time="2d ago"
          isSender={false}
          name="Diana T."
          avatar="/sender-avatar.png"
        />

        <Message
          message="Okay, keep me updated!"
          time="3h ago"
          isSender={true}
          name="Daniel A."
          avatar="/receiver-avatar.png"
        />
      </div>

      <ChatInput />
    </div>
  );
}
