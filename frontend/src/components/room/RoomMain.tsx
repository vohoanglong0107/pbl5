import { styled } from "@mui/material/styles";
import { drawerWidth } from "@/constant";
import { ReactNode } from "react";
import GameBoard from "@/components/game/GameBoard";
import ChatBubble from "../chat/ChatBubble";
import HandPanel from "../hand/HandPanel";
import { Box, Container } from "@mui/material";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "100vw",
  ...(open && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: `calc(100vw - ${drawerWidth}px)`,
  }),
  display: "grid",
  gridTemplateRows: "1fr min-content",
  maxHeight: "100vh",
}));

interface RoomMainProps {
  open: boolean;
}

const RoomMain = ({ open }: RoomMainProps) => {
  return (
    <Main open={open}>
      <Box gridRow={"1 / 2"}>
        <GameBoard />
      </Box>
      <Box gridRow={"2 / 3"}>
        <HandPanel />
      </Box>
      <ChatBubble />
    </Main>
  );
};

export default RoomMain;
