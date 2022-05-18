import {
  useIsCurrentPlayerTurn,
  useIsGameInPlay,
  useIsPlayerTargetable,
} from "@/hook/useGameLogic";
import { Box, Typography, Paper, keyframes } from "@mui/material";
import {
  useTakeSeatMutation,
  useTargetPlayerMutation,
} from "../game/gameSlice";
import Player from "./Player";

interface PlayerSlotProps {
  player?: Player;
  seatId: number;
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

const EmptySeat = ({ seatId }: { seatId: number }) => {
  const [takeSeat] = useTakeSeatMutation();
  const isGameInPlay = useIsGameInPlay();
  const handleTakeSeat = () => {
    if (!isGameInPlay) {
      takeSeat(seatId)
        .unwrap()
        .catch((e) => console.log(e));
    }
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      border="1px dashed grey"
      display="grid"
      gridTemplateRows={"repeat(10, 1fr)"}
      onClick={handleTakeSeat}
      sx={{
        "&:hover": {
          cursor: isGameInPlay ? undefined : "pointer",
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
        <Typography>{"empty"}</Typography>
      </Paper>
    </Box>
  );
};

const SeatHavePlayer = ({ player }: { player: Player }) => {
  const isCurrentPlayerTurn = useIsCurrentPlayerTurn(player.id);
  const isPlayerTargetable = useIsPlayerTargetable(player.id);
  const [targetPlayer] = useTargetPlayerMutation();
  const handleTarget = () => {
    if (isPlayerTargetable) {
      console.log("targeting");
      targetPlayer(player.id)
        .unwrap()
        .catch((e) => console.log(e));
    }
  };
  return (
    <Box
      width={"100%"}
      height={"100%"}
      border="1px dashed grey"
      display="grid"
      gridTemplateRows={"repeat(10, 1fr)"}
      sx={{
        animation: isCurrentPlayerTurn ? `${blinkAnimation} 1s infinite` : "",
        "&:hover": {
          cursor: isPlayerTargetable ? "pointer" : undefined,
        },
      }}
      onClick={handleTarget}
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
  );
};

const PlayerSlot = ({ player, seatId }: PlayerSlotProps) => {
  if (player) return <SeatHavePlayer player={player}></SeatHavePlayer>;
  else return <EmptySeat seatId={seatId}></EmptySeat>;
};

export default PlayerSlot;
