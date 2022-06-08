import settingImage from "@/assets/setting.png";
import { drawerWidth } from "@/constant";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";
import NestedList from "../nestedList/NestedList";
import KickablePlayer from "../player/KickablePlayer";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

interface SettingProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Setting = ({ open, setOpen }: SettingProps) => {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const roomID = "roomID";
  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "rgba(56, 56, 56, 0.7)",
          color: "#fff",
          borderRadius: "0.5rem",
          marginTop: "10px",
        },
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon style={{ color: "#00FFC6" }} />
          ) : (
            <ChevronRightIcon style={{ color: "#00FFC6" }} />
          )}
        </IconButton>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Typography
            sx={{
              color: "#00FFC6",
              alignItems: "center",
              margin: "5px",
              fontFamily: 'Josefin Sans',
              fontWeight: 'bold'
            }}
          >
            SETTING
          </Typography>
          <Image
            src={settingImage}
            alt="setting-image"
            width={30}
            height={30}
          />
        </Box>
      </DrawerHeader>
      <Box sx={{ display: "inline-flex", marginLeft: '15px' }}>
        <Typography>ROOM ID: </Typography>
        <Link href="#">{roomID}</Link>
      </Box>
      <Divider style={{ background: "#00FFC6" }} variant="middle" />
      <List>
        {/* truyền 1 cái mảng các user qua (avatar, tên) rồi ở component Kickplayer thì dùng map để show lên các player */}
        <NestedList listName={"Players in room"} item={<KickablePlayer />} />
      </List>
      <Divider style={{ background: "#00FFC6" }} variant="middle" />
    </Drawer>
  );
};

export default Setting;
