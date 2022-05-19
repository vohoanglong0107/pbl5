import { useGetRoomQuery } from "./roomSlice";
import GameBoard from "@/components/game/GameBoard";
import deckBackGroundImage from "@/assets/deck-image.jpg";

import HandPanel from "../hand/HandPanel";
import ConnectedUsersPanel from "../user/ConnectedUsersPanel";
import { Box, Container } from "@mui/material";

const ConnectingPage = () => <h1>Connecting to game</h1>;

interface RoomLayoutProps {
  gameId: string;
}

const RoomLayout = ({ gameId }: RoomLayoutProps) => {
  const roomQueryResult = useGetRoomQuery(gameId);
  if (roomQueryResult.isLoading) return <ConnectingPage />;
  else if (roomQueryResult.isError) {
    return <div>{JSON.stringify(roomQueryResult.error)}</div>;
  } else if (roomQueryResult.isSuccess) {
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
          <GameBoard />
          <Box sx={{ gridArea: "10 / 1 / 13 / 10" }}>
            <HandPanel />
          </Box>
          <Box sx={{ gridArea: "1 / 10 / 13 / 13" }}>
            <ConnectedUsersPanel />
          </Box>
        </Container>
      </Box>
    );
  } else {
    return null;
  }
};

export default RoomLayout;
