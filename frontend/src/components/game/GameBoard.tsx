import Deck from "@/components/game/Deck";
import PlayerSlot from "@/components/player/PlayerSlot";
import { Grid } from "@mui/material";
import { Player } from "../player";
import { useSelector } from "react-redux";
import {
  selectPlayers,
  selectSetting,
  selectGameSetting,
} from "@/lib/selector";
import Table from "./Table";

// TODO: move player slot position calculating logic to this components
const ResponsiveRoundBoard = () => {
  // Round in wide viewport
  // Square in narrow viewport, which
  //   - max_players % 4 == 0 => each size max_players / 4 + 1 (including corner)
  //   - max_players % 4 == 1 => Bottom edge get plus 1 player
  //   - max_players % 4 == 2 => Both top and bottom get plus 1 player
  //   - max_players % 4 == 3 => Both side and bottom get plus 1 player
};

function getSeat(players: Player[], maxPlayers: number) {
  const seats = Array<Player | undefined>(maxPlayers).fill(undefined);
  for (const player of players) {
    seats[player.seat] = player;
  }

  return seats;
}

const GameBoard = () => {
  const setting = useSelector(selectSetting);
  const gameSetting = useSelector(selectGameSetting);
  const { maxPlayers } = gameSetting;
  const players = useSelector(selectPlayers);
  const slots = getSeat(players, maxPlayers);
  const playerSlots = slots.map((player, index) => {
    return (
      <Grid key={index} item xs={4}>
        <PlayerSlot player={player} seatId={index} />
      </Grid>
    );
  });
  const middleGrid = (
    <Grid item xs={4} display="flex" alignItems="center">
      <Table />
    </Grid>
  );
  return (
    <Grid container sx={{ gridArea: "1 / 1 / 10 / 10" }}>
      {playerSlots.slice(0, maxPlayers / 2)}
      {middleGrid}
      {playerSlots.slice(maxPlayers / 2)}
    </Grid>
  );
};

export default GameBoard;
