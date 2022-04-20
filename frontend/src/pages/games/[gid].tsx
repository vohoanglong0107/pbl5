import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "@mui/material";
import { gameConnected } from "@/components/game/gamesSlice";
import { RootState } from "@/lib/store";
import socket from "@/lib/socket";
import ConnectedUsersPanel from "@/components/user/ConnectedUsersPanel";

const Game: NextPage = () => {
  const router = useRouter();
  const [gameId, setGameId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.query.gid) {
      const gid = router.query.gid as string;
      setGameId(gid);
      console.log("game ID: ", gid);
      socket.auth = { gameId: gid };
      socket.connect();
      socket.emit("game:user:connect", (game) => {
        dispatch(gameConnected(game));
      });
    }
  }, [router]);
  const game = useSelector((state: RootState) => state.game.game);
  if (game) {
    return (
      <Container sx={{ display: "flex", flexDirection: "row" }}>
        <Container sx={{ flex: 1 }}>
          <h1>{gameId}</h1>
          <Button onClick={() => socket.emit("game:start")}>Start</Button>
        </Container>
        <ConnectedUsersPanel />
      </Container>
    );
  } else {
    return <h1>Waiting</h1>;
  }
};

export default Game;
