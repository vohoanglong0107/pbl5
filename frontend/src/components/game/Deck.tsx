import { Box, Paper } from "@mui/material";
import { useDrawCardMutation } from "./gameSlice";
import { useCanSelfPlay } from "@/hook/useGameLogic";

const Deck = () => {
  const [drawCard] = useDrawCardMutation();
  const canSelfPlay = useCanSelfPlay();
  const handleDrawCard = () => {
    if (canSelfPlay) {
      drawCard()
        .unwrap()
        .catch((err) => alert(err));
    }
  };
  return (
    // Check for current user's turn and if the game is in play state
    <Box
      width={"100%"}
      height={"100%"}
      p={1}
      onClick={handleDrawCard}
      sx={{
        "&:hover": {
          cursor: canSelfPlay ? "pointer" : undefined,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{ backgroundColor: "brown", width: "100%", height: "100%" }}
      ></Paper>
    </Box>
  );
};

export default Deck;
