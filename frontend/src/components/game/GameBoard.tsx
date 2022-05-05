import Deck from "@/components/game/Deck";
import Game, { GameStarted } from "@/components/game/Game";
import PlayerSlot from "@/components/player/PlayerSlot";
import UserSeat from "../user/UserSeat";
import { useStartGameMutation } from "./gameSlice";
import { Button, Grid } from "@mui/material";

interface GameBoardProps {
  game: Game;
}

// TODO: move seats and player slot position calculating logic to this components
const ResponsiveRoundBoard = () => {
  // Round in wide viewport
  // Square in narrow viewport, which
  //   - max_players % 4 == 0 => each size max_players / 4 + 1 (including corner)
  //   - max_players % 4 == 1 => Bottom edge get plus 1 player
  //   - max_players % 4 == 2 => Both top and bottom get plus 1 player
  //   - max_players % 4 == 3 => Both side and bottom get plus 1 player
};

const WaitingGameBoard = ({ game }: GameBoardProps) => {
  const [startGame] = useStartGameMutation();
  const max_players = game.gameSetting.max_players;
  const userSeats = game.seats.map((seat, index) => {
    return (
      <Grid key={index} item xs={4}>
        <UserSeat user={seat} width="100%" height="100%" seatId={index} />
      </Grid>
    );
  });
  while (userSeats.length < max_players) {
    userSeats.push(
      <Grid key={userSeats.length} item xs={4}>
        <UserSeat width="100%" height="100%" seatId={userSeats.length} />
      </Grid>
    );
  }
  const middleGrid = (
    <Grid item xs={4} display="flex" alignItems="center">
      <Button
        onClick={() =>
          startGame()
            .unwrap()
            .catch((err) => alert(err))
        }
      >
        Start
      </Button>
    </Grid>
  );
  return (
    <Grid container sx={{ gridArea: "1 / 1 / 10 / 10" }}>
      {userSeats.slice(0, max_players / 2)}
      {middleGrid}
      {userSeats.slice(max_players / 2)}
    </Grid>
  );
};

const InPlayGameBoard = ({ game }: GameBoardProps) => {
  const currentPlayerIndex = game.currentGameState?.currentPlayerIndex;
  const max_players = game.gameSetting.max_players;
  const playerSlots = game.currentGameState!.players.map((player, index) => {
    return (
      <Grid key={index} item xs={4}>
        <PlayerSlot
          player={player}
          width="100%"
          height="100%"
          isCurrentTurn={currentPlayerIndex === index}
        />
      </Grid>
    );
  });
  while (playerSlots.length < max_players) {
    playerSlots.push(
      <Grid key={playerSlots.length} item xs={4}>
        <PlayerSlot width="100%" height="100%" />
      </Grid>
    );
  }
  const middleGrid = (
    <Grid item xs={4} display="flex" alignItems="center">
      <Deck />
    </Grid>
  );
  return (
    <Grid container sx={{ gridArea: "1 / 1 / 10 / 10" }}>
      {playerSlots.slice(0, max_players / 2)}
      {middleGrid}
      {playerSlots.slice(max_players / 2)}
    </Grid>
  );
};

const GameBoard = ({ game }: GameBoardProps) => {
  const isGameStarted = game.gameStarted === GameStarted.STARTED;

  if (isGameStarted) {
    return <InPlayGameBoard game={game} />;
  } else {
    return <WaitingGameBoard game={game} />;
  }
};

export default GameBoard;
