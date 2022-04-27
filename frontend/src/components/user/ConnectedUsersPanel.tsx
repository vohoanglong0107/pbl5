import { useGame, useUser } from "@/lib/store";
import { Box, Typography } from "@mui/material";

export default function ConnectedUsersPanel() {
  const game = useGame()!;
  const users = game.connectedUsers;
  const user = useUser();
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
