import { Paper, Box } from "@mui/material";
import Card from "./Card";
import Image from "next/image";
import { useGetCardQuery } from "./cardSlice";
import { CARD_IMAGE_RATIO } from "@/constant";

type CardDetailProps =
  | {
      card: Card;
    } & (
      | {
          width: string;
          height?: string;
        }
      | { height: string; width?: string }
    );

const CardDetail = ({ card, width, height }: CardDetailProps) => {
  const cardQueryResult = useGetCardQuery(card.id);
  if (cardQueryResult.isLoading) {
    return (
      <Paper
        sx={{
          width: width,
          height: height,
          backgroundColor: "yellow",
          aspectRatio: `1 / ${CARD_IMAGE_RATIO}`,
        }}
      >
        {card.commandId}
      </Paper>
    );
  } else if (cardQueryResult.isError) {
    return (
      <Paper
        sx={{
          width: width,
          height: height,
          backgroundColor: "yellow",
          aspectRatio: `1 / ${CARD_IMAGE_RATIO}`,
        }}
      >
        {cardQueryResult.error}
      </Paper>
    );
  } else if (cardQueryResult.isSuccess) {
    const cardInfo = cardQueryResult.data.data;
    if (!cardInfo) throw new Error("Data unavailable");
    return (
      <Box
        height={height}
        width={width}
        sx={{
          aspectRatio: `1 / ${CARD_IMAGE_RATIO}`,
        }}
        // Due to next.js Image compiling to div with position absolute wrap an image tag
        position="relative"
      >
        <Image
          src={cardInfo.imgUrl}
          alt={`${cardInfo.description}`}
          layout="fill"
        ></Image>
      </Box>
    );
  } else {
    return (
      <Paper
        sx={{
          width: width,
          height: height,
          backgroundColor: "yellow",
          aspectRatio: `1 / ${CARD_IMAGE_RATIO}`,
        }}
      >
        {card.commandId}
      </Paper>
    );
  }
};

export default CardDetail;
