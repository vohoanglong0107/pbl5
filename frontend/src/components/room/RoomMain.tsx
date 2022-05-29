import { styled } from "@mui/material/styles";
import { drawerWidth } from "@/constant";
import { ReactNode } from "react";

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
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

interface RoomMainProps {
  open: boolean;
  children: ReactNode;
}

const RoomMain = ({ children, open }: RoomMainProps) => {
  return <Main open={open}>{children}</Main>;
};

export default RoomMain;
