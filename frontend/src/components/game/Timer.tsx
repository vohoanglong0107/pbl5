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
      margin={"0 auto"}
    >
      <Box position="relative" right="50px" bottom="50px" >
        <CircularProgress sx={{color: '#C2DED1', position: 'absolute'}} variant="determinate" value={100} thickness={7} size={100} />
        <CircularProgress
          sx={{
            color: "#14C38E",
            position: 'absolute',
          }}
          size={100}
          thickness={7}
          variant="determinate"
          value={(timeLeft / timeLimit) * 100}
        />
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            sx={{ color: "#37E2D5", fontSize: '30px', position: 'absolute', top: '25px', left: '31px'}}
          >
            {timeLeft > 9 ? timeLeft : `0${timeLeft}` }
            </Typography>
      </Box>
      
    </Box>
  );
};

export default Timer;
