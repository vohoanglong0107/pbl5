import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function ConnectedUsersPanel() {
  const users = useSelector(
    (state: RootState) => state.game.game!.connectedUsers
  );
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
