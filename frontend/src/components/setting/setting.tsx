import { useGetUserQuery } from "../user/userSlice";
import { useState } from "react";
import { Box, Link, Typography, Drawer, CssBaseline, Toolbar, IconButton, Divider, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useSelector } from "react-redux";
import { selectConnectedUsers } from "@/lib/selector";
import settingImage from "@/assets/setting.png";
import Image from "next/image";
import { Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import NestedList from "../nestedList/NestedList";
import KickablePlayer from "../player/KickablePlayer";
import { Player } from "../player";

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const players = [
  "thanhcute", "honicute", "nhongannhucnhuc", "thanhnhanannhong"
];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  })
}));

const DrawerHeader = styled("div")(({ theme }) => 
  ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  justifyContent: "flex-start"
}));
interface GameBoard {
  gameboard: JSX.Element;
}
interface NestedListProps {
  players: Player[];
}
export default function Setting({gameboard} : GameBoard) {
    
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" ,
          }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}
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
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={{ ...(open && { display: "none" }) ,
                    position: "relative",
                    right: "10px",
                }}
              >
                  <Image 
                      src={settingImage} 
                      alt="setting-image" 
                      width={30} 
                      height={30} 
                  />
              </IconButton>
        </AppBar>
        <Main open={open}>
        <DrawerHeader />
        {gameboard}
      </Main>
        <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "rgba(56, 56, 56, 0.7)",
            color: "#fff",
            borderRadius: "0.5rem",
            marginTop: "10px",
          }
        }}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                  width: drawerWidth
              }
            }}
            variant="persistent"
            anchor="right"
            open={open}
        >
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronLeftIcon style={{color: "#00FFC6"}} />
                  ) : (
                    <ChevronRightIcon style={{color: "#00FFC6"}} />
                  )}
                
            </IconButton>
            <Box sx={{
              display: "inline-flex",
              alignItems: "center",
              margin: "auto",
            }}>
                  <Typography sx={{ 
                    color: "#00FFC6",
                    alignItems: "center",
                    margin: "5px",
                  }}>
                    Setting
                  </Typography>
                  <Image 
                      src={settingImage} 
                      alt="setting-image" 
                      width={30} 
                      height={30} 
                  />
                </Box>
            </DrawerHeader>
            <Box sx={{display: "inline-flex"}}>
              <Typography>ROOM ID: </Typography>
              <Link href="#">Room ID/ link</Link>
            </Box>
            <Divider style={{ background: '#00FFC6' }} variant="middle"/>
            <List>
              {/* truyền 1 cái mảng các user qua (avatar, tên) rồi ở component Kickplayer thì dùng map để show lên các player */}
              <NestedList listName={"Players in room"} item={<KickablePlayer players={players} />} />
            </List>
            <Divider style={{ background: '#00FFC6' }} variant="middle"/>
            
        </Drawer>
        </Box>
    );
}
