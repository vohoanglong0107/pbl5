import { useSelector } from "react-redux";

import { Message, Messages, RootState } from "@/lib/store";

const ChatMessages = () => {
  const messages = useSelector((state: RootState) => state.messages);
  return (
    <div>
      <h1>Chat Messages</h1>
      {messages.map((message: Message) => {
        return <div key={message}>{message}</div>;
      })}
    </div>
  );
};

export default ChatMessages;
