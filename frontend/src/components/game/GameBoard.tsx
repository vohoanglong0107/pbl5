import PlayerSlot from "@/components/player/PlayerSlot";
import { Box, Stack } from "@mui/material";
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

const PlayerStack = ({
  players,
  direction,
  startingSeatIndex,
}: {
  players: (Player | undefined)[];
  direction: "row" | "column";
  startingSeatIndex: number;
}) => {
  return (
    <Stack
      direction={direction}
      justifyContent={"space-around"}
      alignContent={"center"}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {players.map((player, index) => (
        <PlayerSlot
          key={index}
          player={player}
          seatId={startingSeatIndex + index}
        />
      ))}
    </Stack>
  );
};

function calculateFourSideNumPlayers(maxPlayers: number) {
  // North, East, South, West
  const baseFourSideNumPlayers = Array<number>(4).fill(
    Math.floor(maxPlayers / 4)
  );
  switch (maxPlayers % 4) {
    case 0:
      break;
    case 1:
      baseFourSideNumPlayers[0]++;
      break;
    case 2:
      baseFourSideNumPlayers[1]++;
      baseFourSideNumPlayers[3]++;
      break;
    case 3:
      baseFourSideNumPlayers[0]++;
      baseFourSideNumPlayers[1]++;
      baseFourSideNumPlayers[3]++;
      break;
    default:
      throw new Error(`Maximum players ${maxPlayers} is not integer`);
  }
  return baseFourSideNumPlayers;
}

function getFourSidePlayerLists(players: (Player | undefined)[]) {
  let currentNumPlayers = 0;
  let currentDirection = 1;
  const fourSideNumPlayers = calculateFourSideNumPlayers(players.length);
  const fourSidePlayerLists = [] as JSX.Element[];
  for (const size of fourSideNumPlayers) {
    fourSidePlayerLists.push(
      <PlayerStack
        players={players.slice(currentNumPlayers, currentNumPlayers + size)}
        direction={currentDirection ? "row" : "column"}
        startingSeatIndex={currentNumPlayers}
      />
    );
    currentNumPlayers += size;
    currentDirection ^= 1;
  }
  return fourSidePlayerLists;
}

const GameBoard = () => {
  const gameSetting = useSelector(selectGameSetting);
  const { maxPlayers } = gameSetting;
  const players = useSelector(selectPlayers);
  const slots = getSeat(players, maxPlayers);
  const fourSideNumPlayers = calculateFourSideNumPlayers(maxPlayers);
  const fourSidePlayerLists = getFourSidePlayerLists(slots);
  const numLRSidePlayers = fourSideNumPlayers[1];
  const numUSidePlayers = fourSideNumPlayers[0];
  const middleGrid = (
    <Box
      alignItems="center"
      sx={{
        gridArea: `2 / 2 / -2 / -2`,
      }}
    >
      <Table />
    </Box>
  );
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: `repeat(${numLRSidePlayers + 2}, 1fr)`,
        gridTemplateColumns: `repeat(${numUSidePlayers + 2}, 1fr)`,
      }}
    >
      <Box
        sx={{
          gridArea: `1 / 2 / 2 / -2`,
        }}
      >
        {fourSidePlayerLists[0]}
      </Box>
      <Box
        sx={{
          gridArea: `2 / -2 / -2 / -1`,
        }}
      >
        {fourSidePlayerLists[1]}
      </Box>
      <Box
        sx={{
          gridArea: `-2 / 2 / -1 / -2`,
        }}
      >
        {fourSidePlayerLists[2]}
      </Box>
      <Box
        sx={{
          gridArea: "2 / 1 / -2 / 2",
        }}
      >
        {fourSidePlayerLists[3]}
      </Box>
      {middleGrid}
    </Box>
  );
};

export default GameBoard;
