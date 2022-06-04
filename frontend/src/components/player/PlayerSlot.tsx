import {
  useIsCurrentPlayerTurn,
  useIsGameInPlay,
  useIsPlayerTargetable,
  useSelfPlayer
} from "@/hook/useGameLogic";
import Image from "next/image";
import UserAvatar from "@/assets/avt1.jpg";
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
  hoverCursor?: string;
  onClick: () => void;
  title: string;
  titleColor: string;
  animation?: string;
  filter?: string;
  numCards?: number;
}

const Seat = ({
  hoverCursor,
  onClick,
  title,
  titleColor,
  animation,
  filter,
  numCards
  
}: SeatProps) => {
  return (
    <Box
      width={"100%"}
      height={"calc(13vh + 1.5rem)"}
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        display="grid"
        gridTemplateRows={
          numCards !== undefined ? `repeat(13, 1vh)` : undefined
        }
        gridTemplateColumns={
          numCards !== undefined ? `repeat(10, 1vh)` : undefined
        }
        minHeight="0"
      >
        <Avatar
          sx={{
            height: "10vh",
            width: "unset",
            aspectRatio: "1 / 1",
            "&:hover": {
              cursor: hoverCursor,
            },
            animation: animation,
            filter: filter,
            gridArea: numCards !== undefined ? "1 / 1 / 11 / 11" : undefined,
          }}
          variant="rounded"
          onClick={onClick}
          src={UserAvatar.src}
        />
        {numCards !== undefined ? (
          <Tooltip title={`${numCards} left`}>
            <Box gridArea={"7 / 3 / -1 / 4"} width="6vh">
              <Image alt={"Player Card Cover"} src={deckImage} />
            </Box>
          </Tooltip>
        ) : null}
      </Box>

      <Typography sx={{
        fontSize: '1rem',
        fontFamily: 'Ubuntu',
        color: titleColor,
      }}>{title}</Typography>
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
      titleColor="white"
      hoverCursor={isGameInPlay ? undefined : "pointer"}
      onClick={handleTakeSeat}
      title="Empty"
    />
  );
};

const SeatHavePlayer = ({ player }: { player: Player }) => {
  const isCurrentPlayerTurn = useIsCurrentPlayerTurn(player.id);
  const isPlayerTargetable = useIsPlayerTargetable(player.id);
  const isGameInPlay = useIsGameInPlay();
  const selfPlayer = useSelfPlayer();
  const isSelfPlayer = selfPlayer?.id === player.id;
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
      hoverCursor={isPlayerTargetable ? "pointer" : undefined}
      onClick={handleTarget}
      title={isSelfPlayer ? player.username +" (Me)"  : player.username}
      titleColor={isSelfPlayer ? 'yellow' : "white"}
      animation={
        isCurrentPlayerTurn ? `${blinkAnimation} 1s infinite` : undefined
      }
      filter={player.exploded ? "grayscale(100%)" : undefined}
      numCards={isGameInPlay ? player.hand.length : undefined}
    />
  );
};

const PlayerSlot = ({ player, seatId }: PlayerSlotProps) => {
  if (player) return <SeatHavePlayer player={player}></SeatHavePlayer>;
  else return <EmptySeat seatId={seatId}></EmptySeat>;
};

export default PlayerSlot;
