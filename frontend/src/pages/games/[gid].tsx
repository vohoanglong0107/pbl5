import Deck from "@/components/game/Deck";
import { GameStarted } from "@/components/game/Game";
import HandPanel from "@/components/hand/HandPanel";
import PlayerSlot from "@/components/player/PlayerSlot";
import ConnectedUsersPanel from "@/components/user/ConnectedUsersPanel";
import { userConnected } from "@/components/user/userSlice";
import socket from "@/lib/socket";
import { useGame, useUser } from "@/lib/store";
import { Box, Button, Container, Grid } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import GameBoard from "@/components/game/GameBoard";
import deckBackGroundImage from "@/assets/deck-image.jpg";
import { User } from "@/components/user";

const Game: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.query.gid) {
      const gid = router.query.gid as string;
      console.log("game ID: ", gid);
      socket.auth = { gameId: gid };
      socket.connect();
      socket.emit("game:connected", (user: User) => {
        console.log(user);
        dispatch(userConnected(user));
      });
    }
  }, [router]);
  const game = useGame();
  const user = useUser();
  if (game && user) {
    const self = game.players.find((p) => p.id == user.id);
    return (
      <Box
        width={"100wh"}
        height={"100vh"}
        sx={{
          backgroundImage: `url(${deckBackGroundImage.src})`,
        }}
      >
        <Container
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(12, 1fr)",
            gridTemplateColumns: "repeat(12, 1fr)",
            height: "100%",
          }}
        >
          <GameBoard game={game} />
          <Box sx={{ gridArea: "10 / 1 / 13 / 10" }}>
            <HandPanel hand={self ? self.hand : []} />
          </Box>
          <Box sx={{ gridArea: "1 / 10 / 13 / 13" }}>
            <ConnectedUsersPanel />
          </Box>
        </Container>
      </Box>
    );
  } else {
    return <h1>Connecting to game</h1>;
  }
};

export default Game;
