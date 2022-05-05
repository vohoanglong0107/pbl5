import { Box, Typography, Paper, Button } from "@mui/material";
import User from "./User";
import { useTakeSeatMutation } from "../game/gameSlice";

interface UserSeatProps {
  user?: User;
  width?: string;
  height?: string;
  seatId: number;
}

const UserSeat = ({ user, width, height, seatId }: UserSeatProps) => {
  const [takeSeat] = useTakeSeatMutation();
  const handlePlayerClick = () => {
    if (!user) {
      takeSeat(seatId);
    }
  };
  return (
    <Box
      width={width}
      height={height}
      border="1px dashed grey"
      display="grid"
      gridTemplateRows={"repeat(10, 1fr)"}
      onClick={handlePlayerClick}
      sx={{
        "&:hover": {
          cursor: user ? undefined : "pointer",
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          gridRow: "span 7",
          backgroundColor: "brown",
        }}
      ></Paper>
      <Paper variant="outlined" sx={{ gridRow: "span 3" }}>
        <Typography>{user ? user.username : "empty"}</Typography>
      </Paper>
    </Box>
  );
};

export default UserSeat;
