import { useGetGameQuery } from "./gameSlice";
import GameBoard from "./GameBoard";
import deckBackGroundImage from "@/assets/deck-image.jpg";

import HandPanel from "../hand/HandPanel";
import ConnectedUsersPanel from "../user/ConnectedUsersPanel";
import { Box, Container } from "@mui/material";

const ConnectingPage = () => <h1>Connecting to game</h1>;

const GamePlay = ({ gameId }: { gameId: string }) => {
  const gameQueryResult = useGetGameQuery(gameId);
  if (gameQueryResult.isLoading) return <ConnectingPage />;
  else if (gameQueryResult.isError) {
    return <div>{JSON.stringify(gameQueryResult.error)}</div>;
  } else if (gameQueryResult.isSuccess) {
    const game = gameQueryResult.data;
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
            <HandPanel game={game} />
          </Box>
          <Box sx={{ gridArea: "1 / 10 / 13 / 13" }}>
            <ConnectedUsersPanel game={game} />
          </Box>
        </Container>
      </Box>
    );
  } else {
    return null;
  }
};

export default GamePlay;
