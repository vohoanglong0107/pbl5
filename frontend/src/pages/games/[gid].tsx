import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import socket from "@/src/lib/socket";

const Game: NextPage = () => {
  const router = useRouter();
  const [gameId, setGameId] = useState("");
  useEffect(() => {
    if (router.query.gid) {
      const gid = router.query.gid as string;
      setGameId(gid);
      socket.connect();
      console.log("game ID: ", gid);
      socket.emit("game:join", gid);
      return () => {
        socket.disconnect();
      };
    }
  }, [router]);

  return (
    <Container sx={{ display: "flex", flexDirection: "row" }}>
      <Container sx={{ flex: 1 }}>
        <h1>{gameId}</h1>
        <Button onClick={() => socket.emit("game:start", gameId)}>Start</Button>
      </Container>
    </Container>
  );
};

export default Game;
