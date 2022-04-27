import { Box, Typography, Paper, Button, keyframes } from "@mui/material";
import Player from "./Player";
import socket from "@/lib/socket";

interface PlayerSlotProps {
  player?: Player;
  width?: string;
  height?: string;
  isCurrentTurn?: boolean;
}

const blinkAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const PlayerSlot = ({
  player,
  width,
  height,
  isCurrentTurn,
}: PlayerSlotProps) => {
  const handlePlayerClick = () => {
    if (!player) {
      socket.emit("game:take-slot");
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
        sx={{
          animation: isCurrentTurn ? `${blinkAnimation} 1s infinite` : "",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            gridRow: "span 7",
            backgroundColor: player && player.exploded ? "yellow" : "brown",
          }}
        ></Paper>
        <Paper variant="outlined" sx={{ gridRow: "span 3" }}>
          <Typography>{player ? player.username : "empty"}</Typography>
        </Paper>
      </Box>
    </Button>
  );
};

export default PlayerSlot;
