import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/system";
import Image from "next/image";
import MessageImage from "@/assets/msg-icon.png";
import Chat from "./Chat";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";

interface ChatTabProps {
  setOpen: (open: boolean) => void;
}
const ChatTab = ({ setOpen }: ChatTabProps) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "30%",
        typography: "body1",
        position: "fixed",
        top: "430px",
        left: "10px",
        borderStyle: 'none',
        borderRadius: '1rem',
        backgroundColor: 'rgba(169,113,85,0.7)'
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{color: 'orange', '&:focus': {color: 'orange'}}} label="Chat" value="1" />
            <Tab sx={{color: 'orange', '&:focus': {color: 'orange'}}} label="System" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: '10px'}}>
          <Chat setOpen={setOpen} disable={false} placeholder={"Type something..."} bgcolor={"#FFF6EA"}/>
        </TabPanel>
        <TabPanel value="2">
          <Chat setOpen={setOpen} disable={true} placeholder={""} bgcolor={""} />
        </TabPanel>
        <KeyboardArrowDownIcon
        sx={{
          color: "yellow",
          width: "50px",
          position: "relative",
          bottom: "165px",
          left: "330px",
        }}
        onClick={() => setOpen(false)}
      />
      </TabContext>
    </Box>
  );
};

export default ChatTab;
