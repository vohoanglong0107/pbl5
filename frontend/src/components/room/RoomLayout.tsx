import { useGetRoomQuery } from "./roomSlice";
import deckBackGroundImage from "@/assets/deck-image.jpg";
import { Box, Container } from "@mui/material";
import Setting from "../setting/Setting";
import RoomMain from "./RoomMain";
import { useState } from "react";
import RoomAppBar from "./RoomAppBar";
import LoadingPage from "../loading/Page";

const ConnectingPage = () => <LoadingPage pageName="Joinning Room" />;

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
        <RoomMain open={openSetting} />

        <Setting open={openSetting} setOpen={setOpenSetting} />
      </Box>
    );
  } else {
    return null;
  }
};

export default RoomLayout;
