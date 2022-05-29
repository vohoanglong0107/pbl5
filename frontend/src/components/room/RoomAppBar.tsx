import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "@/constant";
import SettingOpenButton from "../setting/SettingOpenButton";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

interface RoomAppBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const RoomAppBar = ({ open, setOpen }: RoomAppBarProps) => {
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        backgroundColor: "#383838",
        width: "70px",
        position: "fixed",
        right: -10,
        maxHeight: "40px",
        marginTop: "20px",
        justifyContent: "center",
      }}
    >
      <SettingOpenButton open={open} setOpen={setOpen} />
    </AppBar>
  );
};

export default RoomAppBar;
