import { useGetUserQuery } from "../user/userSlice";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectConnectedUsers } from "@/lib/selector";
import onlineUserIcon from "@/assets/online-user.png";
import Image from "next/image";
import { Button } from "@mui/material";

export default function ConnectedUsersPanel() {
  const users = useSelector(selectConnectedUsers);
  const { data: user } = useGetUserQuery();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={"100%"}
    >
      <Button variant="contained" 
        sx={{ 
          backgroundColor: "#383838",
          width: "30px",
          position: "fixed",
          right: -10,
          minHeight: "40px",
        }}>
        <Image src={onlineUserIcon} alt="setting-image" width={20} height={20} />
      </Button>
        
      {/* <Box>
        <Typography variant="h6" color="inherit" noWrap>
          Connected Users
        </Typography>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </Box>
      <Box>
        <Typography variant="h3" color="inherit" noWrap>
          {user?.username}
        </Typography>
      </Box> */}
    </Box>
  );
}
