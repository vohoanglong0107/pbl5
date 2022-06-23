import {
  ExpandLess,
  ExpandMore,
  MoveToInbox as InboxIcon,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

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
