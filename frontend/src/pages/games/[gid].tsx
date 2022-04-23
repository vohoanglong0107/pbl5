import ConnectedUsersPanel from "@/components/user/ConnectedUsersPanel";
import PlayerSlot from "@/components/player/PlayerSlot";
import { Deck } from "@/components/game/Deck";
import socket from "@/lib/socket";
import { RootState } from "@/lib/store";
import { Button, Container, Box, Grid } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameStarted } from "@/components/game/Game";

const Game: NextPage = () => {
  const router = useRouter();
  const [gameId, setGameId] = useState("");
  useEffect(() => {
    if (router.query.gid) {
      const gid = router.query.gid as string;
      setGameId(gid);
      console.log("game ID: ", gid);
      socket.auth = { gameId: gid };
      socket.connect();
      socket.emit("user:connect");
    }
  }, [router]);
  const game = useSelector((state: RootState) => state.game.game);
  if (game) {
    const playerSlots = game.players.map((player) => {
      return (
        <Grid key={player.id} item xs={4}>
          <PlayerSlot player={player} width="100%" height="100%" />
        </Grid>
      );
    });
    while (playerSlots.length < 8) {
      playerSlots.push(
        <Grid key={playerSlots.length} item xs={4}>
          <PlayerSlot width="100%" height="100%" />
        </Grid>
      );
    }
    const middleGrid = (
      <Grid item xs={4} display="flex" alignItems="center">
        {game.gameStarted === GameStarted.STARTED ? (
          <Deck />
        ) : (
          <Button onClick={() => socket.emit("game:start")}>Start</Button>
        )}
      </Grid>
    );
    return (
      <Container sx={{ display: "flex", flexDirection: "row" }}>
        <Grid container sx={{ flex: 8 }}>
          {playerSlots.slice(0, 4)}
          {middleGrid}
          {playerSlots.slice(4)}
        </Grid>
        <Box sx={{ flex: 1 }}>
          <ConnectedUsersPanel />
        </Box>
      </Container>
    );
  } else {
    return <h1>Connecting to game</h1>;
  }
};

export default Game;
