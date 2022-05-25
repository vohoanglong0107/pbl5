import { useGetRoomQuery } from "./roomSlice";
import GameBoard from "@/components/game/GameBoard";
import deckBackGroundImage from "@/assets/deck-image.jpg";

import HandPanel from "../hand/HandPanel";
import ConnectedUsersPanel from "../user/ConnectedUsersPanel";
import { Box } from "@mui/material";

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
        width={"100vw"}
        height={"100vh"}
        sx={{
          backgroundImage: `url(${deckBackGroundImage.src})`,
        }}
        display="flex"
        flexDirection="column"
        justifyContent={"space-between"}
      >
        <GameBoard />
        <HandPanel />
        {/* <ConnectedUsersPanel /> */}
      </Box>
    );
  } else {
    return null;
  }
};

export default RoomLayout;
