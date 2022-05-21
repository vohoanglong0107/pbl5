import Image from "next/image";
import { Box, Paper } from "@mui/material";
import deckImage from "@/assets/CardCovers.webp";

// TODO: Allow hover above to see all discarded cards
const DiscardPile = () => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      p={1}
      display={"flex"}
      justifyContent="center"
      alignItems="center"
    >
      <Image alt={"Deck Cover"} src={deckImage}></Image>
    </Box>
  );
};

export default DiscardPile;
