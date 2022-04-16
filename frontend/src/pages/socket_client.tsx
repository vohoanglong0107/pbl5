import type { NextPage } from "next";
import { useState, useEffect } from "react";
import socket from "@/lib/socket";
import OnlinePanel from "@/src/components/online_panel";
import ChatMessages from "@/src/components/chat_messages";

const User: NextPage = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <>
        <ChatMessages />
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <OnlinePanel />
      </>
    </div>
  );
};

export default User;
