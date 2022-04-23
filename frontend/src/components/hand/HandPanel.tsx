import Card from "@/components/card/Card";
import CardView from "@/components/card/CardView";
import socket from "@/lib/socket";
import { useGame, useUser } from "@/lib/store";
import { Box, Button, Stack } from "@mui/material";

const HandPanel = ({ hand }: { hand: Card[] }) => {
  const game = useGame()!;
  const user = useUser()!;

  const currentTurn = game.currentGameState.currentPlayerIndex;
  const currentPlayer = game.players[currentTurn];
  const isMyTurn = currentPlayer?.id === user.id;
  const drawCard = () => {
    socket.emit("user:draw-card");
  };
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gridTemplateColumns={"repeat(12, 1fr)"}
      gridTemplateRows={"repeat(12, 1fr)"}
    >
      <Stack
        direction={"row"}
        border="1px solid brown"
        gridArea={"4 / 1 / 13 / 13"}
      >
        {hand.map((card) => (
          <CardView key={card.id} card={card} />
        ))}
      </Stack>
      <Button
        sx={{
          gridArea: "1 / 9 / 3 / 12",
          backgroundColor: "blue",
        }}
        onClick={drawCard}
        disabled={!isMyTurn}
      >
        Draw
      </Button>
    </Box>
  );
};

export default HandPanel;
