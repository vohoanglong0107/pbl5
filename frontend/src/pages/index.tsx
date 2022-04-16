import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import socket from "@/lib/socket";

const User: NextPage = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  const onClink = () => {};
  return (
    <div>
      <>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={onClink}>Send</button>
      </>
    </div>
  );
};

export default User;
