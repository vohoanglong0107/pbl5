import { useGetUserQuery } from "../user/userSlice";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectConnectedUsers } from "@/lib/selector";

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
      <Box>
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
      </Box>
    </Box>
  );
}
