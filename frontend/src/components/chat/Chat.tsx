import { Box, Dialog, Typography } from "@mui/material";
import AllChats from "./AllChats";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";

const MessageBox = styled("div")({
  backgroundColor: "transparent",
  borderRadius: "1rem",
  borderBottomLeftRadius: "0",
  borderBottomRightRadius: "0",
  display: "inline-grid",
  overflowY: "scroll",
  maxHeight: "100px",
  margin: "0px 0px 0px 20px",
  padding: "0",
  width: "347px",
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
  outline: 'none',
  fontFamily: "Ubuntu",
  borderStyle: "1px solid ",
  borderColor: 'orange',
  margin: "0 10px 5px",
  padding: "5px 10px",
  borderRadius: "0.25rem",
  backgroundColor: "#FFF6EA",
  justifyContent: 'center',
  "&:focus": {
    outline: "none",
    backgroundColor: "white",
    borderStyle: "1px solid orange",
  },
});

const Button = styled("button")({
  width: "15%",
  height: '30px',
  // margin: '5px',
  padding: '0px',
  position: 'relative',
  right: '7px',
  
  // justifyContent: 'center',
  border: "none",
  borderStyle: "2px solid #FF7800",
  borderRadius: "0.5rem",
  backgroundColor: "orange",
});
export interface ChatProps {
  setOpen: (value: boolean) => void;
}

const Chat = ({ setOpen }: ChatProps) => {
  const username = "Stranger01";
  const [chats, setChats] = useState(AllChats);
  const [msg, setMsg] = useState("");

  function handleSendMsg(newChat: any) {
    console.log("SEND!");
  }

  function handleTypeMsg(event: any) {
    setMsg(event.target.value);
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: "430px",
        left: "10px",
        backgroundColor: "rgba(169,113,85,0.7)",
        width: "380px",
        borderRadius: "0.25rem",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        maxHeight: "300px",
        margin: 0,
        padding: 0,
      }}
    >
      <KeyboardArrowDownIcon
        sx={{
          color: "orange",
          width: "50px",
          position: "relative",
          top: "5px",
          left: "340px",
        }}
        onClick={() => setOpen(false)}
      />
      <MessageBox>
        {AllChats.map((chat, index) => {
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
              <br />
            </Box>
          );
        })}
      </MessageBox>
      <br />
      <Box sx={{ display: "inline-flex", width: "100%", marginTop: '10px' }}>
        <Input
          name="message"
          placeholder="Type something..."
          onChange={handleTypeMsg}
        />
        <Button onClick={handleSendMsg}>
          <Typography
            sx={{ color: "#FFF6EA", fontWeight: "bold", fontSize: "12px", fontFamily: 'Ubuntu' }}
          >
            SEND
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default Chat;
