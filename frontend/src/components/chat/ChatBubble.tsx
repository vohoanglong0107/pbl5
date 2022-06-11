import MessageImage from "@/assets/msg-icon.png";
import { styled } from "@mui/system";
import Image from "next/image";
import React, { useState } from "react";
import Chat from "./Chat";
import ChatTab from "./ChatTab";

const MsgBubble = styled("button")({
  backgroundColor: "transparent",
  borderColor: "transparent",
  borderRadius: "100%",
  width: "60px",
  height: "60px",
  // position: "fixed",
  // bottom: "10px",
  left: "10px",
  "&:hover": {
    borderColor: "transparent",
  },
});

const NewMsgs = styled("label")({
  color: "red",
  fontSize: "20px",
  fontWeight: "bold",
  position: "relative",
  left: "18px",
  bottom: "53px",
});

const ChatBubble = () => {
  const [isOpen, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const newMessage = "";
  return (
    <>
      {!isOpen ? (
        <MsgBubble onClick={handleClickOpen}>
          <Image
            src={MessageImage}
            alt="message-image"
            width={100}
            height={100}
            onClick={() => setOpen(true)}
          />
          <NewMsgs>{newMessage}</NewMsgs>
        </MsgBubble>
      ) : (
        <ChatTab setOpen={setOpen}/>
      )}
    </>
  );
};

export default ChatBubble;
