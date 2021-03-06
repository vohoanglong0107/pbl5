import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectGameCurrentState, selectGameSetting } from "@/lib/selector";
import { InGameState } from "../game/GameState";
import { ArrowCircleUp as ArrowCircleUpIcon } from "@mui/icons-material";

interface StartButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const PlayButton = ({ onClick, disabled }: StartButtonProps) => {
  const gameState = useSelector(selectGameCurrentState) as InGameState;
  
  return (
      <Button
      variant="contained"
      sx={{
        backgroundColor: "orange",
        "&:hover": {
          backgroundColor: "#F77E21",
        },
        borderRadius: "100%",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowCircleUpIcon />
    </Button>
    
  );
};

export default PlayButton;
