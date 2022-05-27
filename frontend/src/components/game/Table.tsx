import { useIsGameInPlay } from "@/hook/useGameLogic";
import { useStartGameMutation } from "./gameSlice";
import Deck from "./Deck";
import DiscardPile from "./DiscardPile";
import Timer from "./Timer";
import { Box, Button, Grid } from "@mui/material";

const Table = () => {
  const [startGame] = useStartGameMutation();
  const isGameInPlay = useIsGameInPlay();

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      justifyContent="center"
      alignItems={"center"}
    >
      {!isGameInPlay ? (
        <Button
          onClick={() =>
            startGame()
              .unwrap()
              .catch((err) => alert(err))
          }
        >
          Start
        </Button>
      ) : (
        <Grid container width={"100%"} height={"100%"}>
          <Grid item xs={4}>
            <Timer />
          </Grid>
          <Grid item xs={4}>
            <Deck />
          </Grid>
          <Grid item xs={4}>
            <DiscardPile />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Table;
