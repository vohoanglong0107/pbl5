import Image from "next/image";
import { Box, Tooltip } from "@mui/material";
import { useDrawCardMutation } from "./gameSlice";
import { useCanSelfPlay, useDeck } from "@/hook/useGameLogic";
import deckImage from "@/assets/CardCovers.webp";

const Deck = () => {
  const [drawCard] = useDrawCardMutation();
  const canSelfPlay = useCanSelfPlay();
  const deck = useDeck();
  const handleDrawCard = () => {
    if (canSelfPlay) {
      drawCard()
        .unwrap()
        .catch((err) => alert(err));
    }
  };
  return (
    // Check for current user's turn and if the game is in play state
    <Tooltip title={`${deck.length} cards left`}>
      <Box
        
      margin={"0 auto"}
        width={"10vw"}
        height={"100%"}
        p={1}
        onClick={handleDrawCard}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        sx={{
          "&:hover": {
            cursor: canSelfPlay ? "pointer" : undefined,
          },
        }}
      >
        <Image alt={"Deck Cover"} src={deckImage}></Image>
      </Box>
    </Tooltip>
  );
};

export default Deck;
