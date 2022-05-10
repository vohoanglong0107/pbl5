import Card from "@/components/card/Card";
import CardView from "@/components/card/CardView";
import { GameStarted } from "@/components/game/Game";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { Game } from "../game";
import {
  useDrawCardMutation,
  usePlayCardMutation,
  Response,
  CardCommands,
} from "../game/gameSlice";
import { useGetUserQuery } from "../user/userSlice";
import FutureDialog from "./FutureDialog";

const HandPanel = ({ game }: { game: Game }) => {
  const { data: user } = useGetUserQuery();
  const [drawCard] = useDrawCardMutation();
  const [playCard] = usePlayCardMutation();
  const [futureOpen, setFutureOpen] = useState(false);
  const [futureCards, setFutureCards] = useState<Card[]>([]);
  const isDisabled = game.gameStarted !== GameStarted.STARTED;
  if (isDisabled) {
    return <></>;
  }
  const currentPlayerId = game.currentGameState!.currentPlayerId;
  const isMyTurn = currentPlayerId === user?.id;
  const self = game.currentGameState!.players.find(
    (p) => p && p.id === user?.id
  );
  const hand = self ? self.hand : [];
  const handleDrawCard = () => {
    drawCard();
  };
  const handlePlayCard = (cards: Card[]) => {
    playCard(cards.map((card) => card.id))
      .unwrap()
      .then((response) => handleResponse(response))
      .catch((err) => alert(err));
  };
  const selectedCards = hand.map((card) => false);
  const handleResponse = (response: Response) => {
    if (response.type === CardCommands.SEE_THE_FUTURE) {
      setFutureOpen(true);
      setFutureCards(response.data as Card[]);
    }
  };
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gridTemplateColumns={"repeat(12, 1fr)"}
      gridTemplateRows={"repeat(12, 1fr)"}
    >
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
        {hand.map((card, index) => (
          <CardView
            key={card.id}
            card={card}
            onSelect={(isSelected) => {
              selectedCards[index] = isSelected;
            }}
          />
        ))}
      </Stack>
      <Button
        sx={{
          gridArea: "1 / 11 / 3 / 12",
          backgroundColor: "blue",
        }}
        onClick={handleDrawCard}
        disabled={!isMyTurn}
      >
        Draw
      </Button>
      <Button
        sx={{
          gridArea: "1 / 9 / 3 / 10",
          backgroundColor: "blue",
        }}
        onClick={() =>
          handlePlayCard(hand.filter((_, index) => selectedCards[index]))
        }
        disabled={!isMyTurn}
      >
        GO!!!
      </Button>
    </Box>
  );
};

export default HandPanel;
