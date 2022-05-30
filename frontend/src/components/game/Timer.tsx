import { selectGameCurrentState, selectGameSetting } from "@/lib/selector";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ClockImage from "@/assets/5059-removebg-preview.png";
import { InGameState } from "./GameState";

const Timer = () => {
  const [timeLimit, setTimeLimit] = useState(1);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const gameState = useSelector(selectGameCurrentState) as InGameState;
  const gameSetting = useSelector(selectGameSetting);
  useEffect(() => {
    let newTimeLimit;
    switch (gameState.type) {
      case "PlayState":
        newTimeLimit = gameSetting.turnTime;
        break;

      case "TargetingState":
        newTimeLimit = gameSetting.targetingTime;
        break;

      default:
        newTimeLimit = 1;
        break;
    }
    // Milliseconds to secs
    newTimeLimit = Math.round(newTimeLimit / 1000);
    setTimeLeft(newTimeLimit);
    setTimeLimit(newTimeLimit);
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) =>
        prevTimeLeft === 0 ? 0 : prevTimeLeft - 1
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [
    gameState.type,
    gameState.gameEntity.currentPlayerNumberOfTurns,
    gameState.currentPlayer.id,
    gameSetting.turnTime,
    gameSetting.targetingTime,
  ]);
  return (
    <Box
      width={"10vw"}
      height={"100%"}
      p={1}
      display={"flex"}
      justifyContent="center"
      alignItems="center"
    >
      <Box position="relative" overflow="hidden" height="80px" width="80px">
        <Image src={ClockImage} layout="fill" alt="Timer" />
        <Box
          position="absolute"
          display="inline-flex"
          borderRadius={100}
          top={0}
          left={0}
          bottom={0}
          right={0}
          height="40px"
          width="40px"
          margin="23.5px auto auto"
        >
          <CircularProgress
            variant="determinate"
            value={(timeLeft / timeLimit) * 100}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${timeLeft}s`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Timer;
