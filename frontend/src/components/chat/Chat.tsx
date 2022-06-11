import { selectChatHistory } from "@/lib/selector";
import { socketClient } from "@/lib/SocketClient";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const MessageBox = styled("div")({
  backgroundColor: "transparent",
  display: "inline-grid",
  overflowY: "scroll",
  maxHeight: "80px",
  marginBottom: "15px",
  padding: "0px",
  width: "347px",
  // wordWrap: 'break-word',
  "&::-webkit-scrollbar": {
    width: 5,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "orange",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "lightgray",
    borderRadius: 2,
  },
});

const Input = styled("input")({
  width: "300px",
  color: "#04293A",
  outline: "none",
  fontFamily: "Ubuntu",
  margin: '0px 10px 0px 0px',
  padding: '5px 10px',
  borderStyle: "1px solid ",
  borderColor: "orange",
  borderRadius: "0.25rem",
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  position: 'fixed',
  bottom: '10px',
  "&:focus": {
    outline: "none",
    backgroundColor: "white",
    borderStyle: "1px solid orange",
  },
});

const Button = styled("button")({
  width: "15%",
  height: "30px",
  padding: "0px",
  position: 'fixed',
  bottom: '10px',

  // justifyContent: 'center',
  border: "none",
  borderStyle: "2px solid #FF7800",
  borderRadius: "0.5rem",
  backgroundColor: "orange",
});
export interface ChatProps {
  setOpen: (value: boolean) => void;
  disable: boolean,
  placeholder: string,
  bgcolor: string
}

const Chat = ({ setOpen, disable, placeholder, bgcolor }: ChatProps) => {
  const [msg, setMsg] = useState("");
  const chatHistory = useSelector(selectChatHistory);

  function handleSendMsg() {
    socketClient.emit("room:chated", msg);
    setMsg("");
  }

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") {
      handleSendMsg();
    }
  }

  function handleTypeMsg(event: any) {
    setMsg(event.target.value);
  }
  const messagesEndRef = useRef(0);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [chatHistory]);

  return (
    <Box
      sx={{
        
        backgroundColor: "transparent",
        height: "300px",
        margin: 0,
        padding: 0,
      }}
    >
      
      <MessageBox>

        {chatHistory.map((chat, index) => {
          return (
            <Box key={index} style={{ display: "inline-flex", width: "300px" }}>
              <label>
                <span style={{ color: "yellow", fontFamily: "Josefin Sans" }}>
                  {"["}
                  {chat.username}
                  {"]"}
                </span>
                {": "}
                <span
                  style={{
                    wordWrap: "break-word",
                    color: "#04293A",
                    fontFamily: "Ubuntu",
                  }}
                >
                  {chat.msg}
                </span>
              </label>
            </Box>
          );
        })}
        <Box ref={messagesEndRef} />
      </MessageBox>
      <br />
      <Box sx={{ display: "inline-flex", width: "100%" }}>
        <Input
          onKeyDown={handleEnter}
          name="message"
          value={msg}
          placeholder={placeholder}
          onChange={handleTypeMsg}
          autoComplete={"off"}
          disabled={disable}
          sx={{
            backgroundColor: {bgcolor}}} 
        />
        <Button onClick={handleSendMsg}>
          <Typography
            sx={{
              color: "#FFF6EA",
              fontWeight: "bold",
              fontSize: "12px",
              fontFamily: "Ubuntu",
            }}
          >
            SEND
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default Chat;
