import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import {
  useIsGameInPlay,
  useSelfPlayer,
  useCanSelfPlay,
} from "@/hook/useGameLogic";
import Card from "../card/Card";
import CardSelectTray from "./CardSelectTray";
import FutureDialog from "./FutureDialog";
import PlayButton from "./PlayButton";
import { usePlayCardMutation, Response, CardCommands } from "../game/gameSlice";

const CardStackPlaceHolder = () => {
  return <></>;
};

const CardTrayAndButton = ({ cards }: { cards: Card[] }) => {
  const canSelfPlay = useCanSelfPlay();
  const [selectedCards, setSelectedCards] = useState(cards.map(() => false));
  useEffect(() => {
    setSelectedCards(cards.map(() => false));
  }, [cards]);
  const [playCard] = usePlayCardMutation();
  const handlePlayCard = (cards: Card[]) => {
    playCard(cards.map((card) => card.id))
      .unwrap()
      .then((response) => handleResponse(response))
      .catch((err) => {
        alert(`Play card error: ${err}`);
        console.log(`Play card error: `, err);
      });
  };

  const [futureOpen, setFutureOpen] = useState(false);
  const [futureCards, setFutureCards] = useState<Card[]>([]);
  const handleResponse = (response: Response) => {
    if (response !== null && response.type === CardCommands.SEE_THE_FUTURE) {
      setFutureOpen(true);
      setFutureCards(response.data as Card[]);
    }
  };
  return (
    <>
      <FutureDialog
        open={futureOpen}
        onClose={() => {
          setFutureOpen(false);
        }}
        cards={futureCards}
      ></FutureDialog>
      <Box gridColumn={"3 / 11"}>
        <CardSelectTray
          cards={cards}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
        />
      </Box>
      <Box gridColumn={"11 / 13"}>
        <PlayButton
          onClick={() => {
            handlePlayCard(cards.filter((_, index) => selectedCards[index]));
          }}
          disabled={!canSelfPlay}
        />
      </Box>
    </>
  );
};

const HandPanel = () => {
  const isGameInPlay = useIsGameInPlay();

  const selfPlayer = useSelfPlayer();
  const visibility = isGameInPlay && selfPlayer;

  return (
    <Box
      display="grid"
      gridTemplateColumns={"repeat(12, 1fr)"}
      alignItems={"center"}
    >
      {visibility ? (
        <CardTrayAndButton cards={selfPlayer.hand}></CardTrayAndButton>
      ) : (
        <CardStackPlaceHolder />
      )}
    </Box>
  );
};

export default HandPanel;
