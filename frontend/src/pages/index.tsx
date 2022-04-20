import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import socket from "@/lib/socket";
import { Container, Grid } from "@mui/material";
import TopNav from "@/components/top_nav";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PlayButton from "@/components/play_button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import Options from "../components/room_options";

const choices = ["Create room", "Join room", "Join random"];

const User: NextPage = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  const onClink = () => {};
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(choices[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Button className={styles.explodeButton} onClick={handleClickOpen}>
          Explode now!
        </Button>
        <Options
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          choices={choices}
        />
        <a target="_blank" href="/create-game" rel="noopener noreferrer">
          <Button className={styles.explodeButton}>Create game</Button>
        </a>
      </div>
    </div>
  );
};

export default User;
