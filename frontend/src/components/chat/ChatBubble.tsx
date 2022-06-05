import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Chat from "./Chat";
import Image from "next/image";
import MessageImage from "@/assets/msg-icon.png";
import { styled } from "@mui/system";
import SettingOpenButton from "../setting/SettingOpenButton";

const MsgBubble = styled("button")({
  backgroundColor: "transparent",
  borderColor: "transparent",
  borderRadius: "100%",
  width: "60px",
  height: "60px",
  position: "fixed",
  bottom: "10px",
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

  const newMessages = "";
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
          <NewMsgs>{newMessages}</NewMsgs>
        </MsgBubble>
      ) : (
        <Chat setOpen={setOpen} />
      )}
    </>
  );
};

export default ChatBubble;
