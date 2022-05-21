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

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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

export default function Setting() {
    
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
          backgroundColor: "red",
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
            <Toolbar>
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
            </Toolbar>
        </AppBar>
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
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton>
                    {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider style={{ background: '#00FFC6' }} variant="middle"/>
            <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton>
                    {/* <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
        </Box>
    );
}
