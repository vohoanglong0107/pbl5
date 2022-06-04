import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import deckImage from "@/assets/CardCovers.webp";
import CardDetail from "@/components/card/CardDetail";
import { useSelector } from "react-redux";
import { selectDisCardPile } from "@/lib/selector";
import DiscardPileImage from "@/assets/back.jpg";
// TODO: Allow hover above to see all discarded cards
const DiscardPile = () => {
  const discardPile = useSelector(selectDisCardPile);
  const lastCard = discardPile.at(-1);
  if (lastCard === undefined)
    return (
      <Box
        width={"9vw"}
        height={"70%"}
        p={1}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        >
          <Image src={DiscardPileImage.src} alt="dis-pile" width="90%" height="120%" style={{borderRadius: '0.5rem'}} />
      </Box>
    );
  else
    return (
      <Box
        width={"10vw"}
        height={"100%"}
        p={1}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
      >
        <CardDetail card={lastCard} width="10vw" />
      </Box>
    );
};

export default DiscardPile;
