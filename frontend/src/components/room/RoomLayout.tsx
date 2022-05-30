import { useGetRoomQuery } from "./roomSlice";
import GameBoard from "@/components/game/GameBoard";
import deckBackGroundImage from "@/assets/deck-image.jpg";
import HandPanel from "../hand/HandPanel";
import { Box, Container } from "@mui/material";
import Setting from "../setting/Setting";
import RoomMain from "./RoomMain";
import { useState } from "react";
import RoomAppBar from "./RoomAppBar";
import ChatBubble from "../chat/ChatBubble";

const ConnectingPage = () => <h1>Connecting to game</h1>;

interface RoomLayoutProps {
  gameId: string;
}

const RoomLayout = ({ gameId }: RoomLayoutProps) => {
  const [openSetting, setOpenSetting] = useState(false);
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
        // justifyContent={"space-between"}
      >
        <RoomAppBar open={openSetting} setOpen={setOpenSetting} />
        <RoomMain open={openSetting}>
          <GameBoard />
          <HandPanel />
          <ChatBubble  />
        </RoomMain>
        <Setting open={openSetting} setOpen={setOpenSetting} />
      </Box>
    );
  } else {
    return null;
  }
};

export default RoomLayout;
