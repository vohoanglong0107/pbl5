import Card from "@/components/card/Card";
import CardView from "@/components/hand/CardView";
import { useCanSelfPlay } from "@/hook/useGameLogic";
import { useState, useEffect } from "react";
import FutureDialog from "./FutureDialog";
import { Box, Stack, Button } from "@mui/material";
import { usePlayCardMutation, Response, CardCommands } from "../game/gameSlice";

interface CardSelectTrayProp {
  cards: Card[];
}

const CardSelectTray = ({ cards }: CardSelectTrayProp) => {
  const [selectedCards, setSelectedCards] = useState(cards.map(() => false));
  useEffect(() => {
    setSelectedCards(cards.map(() => false));
  }, [cards]);
  const canSelfPlay = useCanSelfPlay();
  const [playCard] = usePlayCardMutation();
  const [futureOpen, setFutureOpen] = useState(false);
  const [futureCards, setFutureCards] = useState<Card[]>([]);
  const handleResponse = (response: Response) => {
    if (response !== null && response.type === CardCommands.SEE_THE_FUTURE) {
      setFutureOpen(true);
      setFutureCards(response.data as Card[]);
    }
  };
  const handlePlayCard = (cards: Card[]) => {
    playCard(cards.map((card) => card.id))
      .unwrap()
      .then((response) => handleResponse(response))
      .catch((err) => {
        alert(`Play card error: ${err}`);
        console.log(`Play card error: `, err);
      });
  };

  return (
    <Box>
      <FutureDialog
        open={futureOpen}
        onClose={() => {
          setFutureOpen(false);
        }}
        cards={futureCards}
      ></FutureDialog>
      <Stack
        direction={"row"}
        border="1px solid brown"
        gridArea={"4 / 1 / 13 / 13"}
      >
        {cards.map((card, index) => (
          <CardView
            key={card.id}
            card={card}
            selected={selectedCards[index]}
            setSelected={(newSelectedStatus) => {
              setSelectedCards(
                selectedCards.map((prevSelectedStatus, i) =>
                  i === index ? newSelectedStatus : prevSelectedStatus
                )
              );
            }}
          />
        ))}
      </Stack>
      <Button
        sx={{
          gridArea: "1 / 9 / 3 / 10",
          backgroundColor: "blue",
        }}
        onClick={() =>
          handlePlayCard(cards.filter((_, index) => selectedCards[index]))
        }
        disabled={!canSelfPlay}
      >
        GO!!!
      </Button>
    </Box>
  );
};

export default CardSelectTray;
