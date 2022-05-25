import {
  useIsCurrentPlayerTurn,
  useIsGameInPlay,
  useIsPlayerTargetable,
} from "@/hook/useGameLogic";
import Image from "next/image";
import {
  Box,
  Typography,
  Paper,
  keyframes,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  useTakeSeatMutation,
  useTargetPlayerMutation,
} from "../game/gameSlice";
import Player from "./Player";
import deckImage from "@/assets/CardCovers.webp";

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

interface SeatProps {
  bgcolor: string;
  hoverCursor?: string;
  onClick: () => void;
  title: string;
  animation?: string;
  filter?: string;
  numCards?: number;
}

const Seat = ({
  bgcolor,
  hoverCursor,
  onClick,
  title,
  animation,
  filter,
  numCards,
}: SeatProps) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        display="grid"
        gridTemplateRows={`repeat(13, 1vh)`}
        gridTemplateColumns={`repeat(10, 1vh)`}
        minHeight="0"
      >
        <Avatar
          sx={{
            bgcolor: bgcolor,
            height: "10vh",
            width: "unset",
            aspectRatio: "1 / 1",
            "&:hover": {
              cursor: hoverCursor,
            },
            animation: animation,
            filter: filter,
            gridArea: "1 / 1 / 11 / 11",
          }}
          variant="rounded"
          onClick={onClick}
        />
        {numCards !== undefined ? (
          <Tooltip title={`${numCards} left`}>
            <Box gridArea={"7 / 3 / -1 / 4"} width="6vh">
              <Image alt={"Player Card Cover"} src={deckImage} />
            </Box>
          </Tooltip>
        ) : null}
      </Box>

      <Typography>{title}</Typography>
    </Box>
  );
};

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
    <Seat
      bgcolor="brown"
      hoverCursor={isGameInPlay ? undefined : "pointer"}
      onClick={handleTakeSeat}
      title="empty"
    />
  );
};

const SeatHavePlayer = ({ player }: { player: Player }) => {
  const isCurrentPlayerTurn = useIsCurrentPlayerTurn(player.id);
  const isPlayerTargetable = useIsPlayerTargetable(player.id);
  const isGameInPlay = useIsGameInPlay();
  const [targetPlayer] = useTargetPlayerMutation();
  const handleTarget = () => {
    if (isPlayerTargetable) {
      targetPlayer(player.id)
        .unwrap()
        .catch((e) => console.log(e));
    }
  };
  return (
    <Seat
      bgcolor="brown"
      hoverCursor={isPlayerTargetable ? "pointer" : undefined}
      onClick={handleTarget}
      title={player.username}
      animation={
        isCurrentPlayerTurn ? `${blinkAnimation} 1s infinite` : undefined
      }
      filter={player.exploded ? "grayscale(100%)" : undefined}
      numCards={isGameInPlay ? player.hand.length : undefined}
    />
  );
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
