import Deck from "@/components/game/Deck";
import Game, { GameStarted } from "@/components/game/Game";
import PlayerSlot from "@/components/player/PlayerSlot";
import socket from "@/lib/socket";
import { Button, Grid } from "@mui/material";

interface GameBoardProps {
  game: Game;
}

const GameBoard = ({ game }: GameBoardProps) => {
  const playerSlots = game.players.map((player) => {
    return (
      <Grid key={player.id} item xs={4}>
        <PlayerSlot player={player} width="100%" height="100%" />
      </Grid>
    );
  });
  while (playerSlots.length < 8) {
    playerSlots.push(
      <Grid key={playerSlots.length} item xs={4}>
        <PlayerSlot width="100%" height="100%" />
      </Grid>
    );
  }
  const middleGrid = (
    <Grid item xs={4} display="flex" alignItems="center">
      {game.gameStarted === GameStarted.STARTED ? (
        <Deck />
      ) : (
        <Button onClick={() => socket.emit("game:start")}>Start</Button>
      )}
    </Grid>
  );
  return (
    <Grid container sx={{ gridArea: "1 / 1 / 10 / 10" }}>
      {playerSlots.slice(0, 4)}
      {middleGrid}
      {playerSlots.slice(4)}
    </Grid>
  );
};

export default GameBoard;
