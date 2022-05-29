import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";

interface SettingProps {
  listName: String;
  item: JSX.Element;
}
const NestedList = ({ listName, item }: SettingProps) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon sx={{ color: "#00FFC6" }} />
        </ListItemIcon>
        <ListItemText primary={listName} sx={{ margin: 0, padding: 0 }} />
        {open ? (
          <ExpandLess sx={{ color: "#00FFC6" }} />
        ) : (
          <ExpandMore sx={{ color: "#00FFC6" }} />
        )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit sx={{ color: "red" }}>
        <List disablePadding sx={{ margin: "5px", padding: 0 }}>
          {item}
        </List>
      </Collapse>
    </>
  );
};

export default NestedList;
