import { useSelector } from "react-redux";

import { Message, Messages, RootState } from "@/lib/store";
import { NextPage } from "next";

const PrivateChat: NextPage = () => {
  const messages = useSelector((state: RootState) => state.messages);
  return (
    <div>
      <h1>Chat Messages</h1>
      {messages.map((message: Message, index) => {
        return <div key={index}>{message}</div>;
      })}
    </div>
  );
};

export default PrivateChat;
