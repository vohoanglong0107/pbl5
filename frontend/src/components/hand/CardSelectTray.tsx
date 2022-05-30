import Card from "@/components/card/Card";
import CardView from "@/components/hand/CardView";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { CARD_IMAGE_RATIO } from "@/constant";
import { useMeasure, useWindowSize } from "react-use";

interface CardSelectTrayProp {
  cards: Card[];
  selectedCards: boolean[];
  setSelectedCards: Dispatch<SetStateAction<boolean[]>>;
}

function calculateCardWidths(
  numCards: number,
  maxWidth: number,
  cardWidth: number,
  hoveringIndex: number | undefined
) {
  if (hoveringIndex === undefined) hoveringIndex = numCards - 1;
  if (cardWidth > maxWidth) {
    return Array<number>(numCards).fill(cardWidth);
  }
  if (numCards * cardWidth > maxWidth) {
    const foldedCardWidth = (maxWidth - cardWidth) / (numCards - 1);
    const cardWidths = Array<number>(numCards).fill(foldedCardWidth);
    cardWidths[hoveringIndex] = cardWidth;
    return cardWidths;
  } else {
    return Array<number>(numCards).fill(cardWidth);
  }
}

const CardSelectTray = ({
  cards,
  selectedCards,
  setSelectedCards,
}: CardSelectTrayProp) => {
  const [ref, { width }] = useMeasure();
  const { height: windowHeight } = useWindowSize();
  const [hoveringIndex, setHoveringIndex] = useState<number | undefined>(
    undefined
  );

  const handleHoverCard = (hovering: boolean, cardIndex: number) => {
    if (hovering) setHoveringIndex(cardIndex);
    else setHoveringIndex(undefined);
  };

  const cardHeight = (windowHeight * 25) / 100;
  const cardWidth = cardHeight / CARD_IMAGE_RATIO;
  const cardWidths = calculateCardWidths(
    cards.length,
    width,
    cardWidth,
    hoveringIndex
  );

  return (
    <Box
      width="100%"
      height={`${cardHeight}px`}
      ref={ref}
      display="flex"
      justifyContent={"center"}
      overflow={"hidden"}
      alignItems={"flex-end"}
    >
      {cards.map((card, index) => (
        <CardView
          key={index}
          card={card}
          cardHeight={`${cardHeight}px`}
          cardWidth={`${cardWidth}px`}
          width={`${cardWidths[index]}px`}
          height={`${(cardHeight * 80) / 100}px`}
          selected={selectedCards[index]}
          setSelected={(newSelectedStatus) => {
            setSelectedCards(
              selectedCards.map((prevSelectedStatus, i) =>
                i === index ? newSelectedStatus : prevSelectedStatus
              )
            );
          }}
          hovering={hoveringIndex === index}
          setHovering={(hovering: boolean) => {
            handleHoverCard(hovering, index);
          }}
        />
      ))}
    </Box>
  );
};

export default CardSelectTray;
