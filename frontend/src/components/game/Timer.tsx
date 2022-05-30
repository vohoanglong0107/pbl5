import { selectGameCurrentState, selectGameSetting } from "@/lib/selector";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ClockImage from "@/assets/timer.png";
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
      <Box position="relative" overflow="hidden" height="120px" width="120px">
        {/* <Image src={ClockImage} layout="fill" alt="Timer" /> */}
        {/* <Box
          sx={{backgroundColor: 'yellow'}}
          position="absolute"
          display="inline-flex"
          borderRadius={100}
          top={0}
          left={0}
          bottom={0}
          right={0}
          height="120px"
          width="120px"
          margin="-10px 0px 0px 0px"
        > */}
        <CircularProgress
          sx={{
            color: "#14C38E",
          }}
          size={110}
          thickness={7}
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
            sx={{ color: "#37E2D5", fontSize: '30px'}}
          >{`${timeLeft}`}</Typography>
        </Box>
      {/* </Box> */}
      </Box>
    </Box>
  );
};

export default Timer;
