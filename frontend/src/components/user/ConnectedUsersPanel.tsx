import { useGame } from "@/lib/store";
import { Box, Typography } from "@mui/material";

export default function ConnectedUsersPanel() {
  const game = useGame()!;
  const users = game.connectedUsers;
  return (
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
  );
}
