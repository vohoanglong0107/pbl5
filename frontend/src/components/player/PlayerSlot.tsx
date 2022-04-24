import { Box, Typography, Paper, Button } from "@mui/material";
import Player from "./Player";
import socket from "@/lib/socket";

interface PlayerSlotProps {
  player?: Player;
  width?: string;
  height?: string;
}

const PlayerSlot = ({ player, width, height }: PlayerSlotProps) => {
  const handlePlayerClick = () => {
    if (!player) {
      socket.emit("user:take-slot");
    }
  };
  return (
    <Button onClick={handlePlayerClick}>
      <Box
        width={width}
        height={height}
        border="1px dashed grey"
        display="grid"
        gridTemplateRows={"repeat(10, 1fr)"}
      >
        <Paper
          elevation={3}
          sx={{ gridRow: "span 7", backgroundColor: "brown" }}
        ></Paper>
        <Paper variant="outlined" sx={{ gridRow: "span 3" }}>
          <Typography>{player ? player.username : "empty"}</Typography>
        </Paper>
      </Box>
    </Button>
  );
};

export default PlayerSlot;
