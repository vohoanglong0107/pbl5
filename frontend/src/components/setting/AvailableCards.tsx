import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import CardItem from "./CardItem";
import { CardSetting, allTypeOfCards } from "./CardSetting";

interface AvailableCardsProps {
  availableCards: CardSetting[];
  setAvailableCards: Dispatch<SetStateAction<CardSetting[]>>;
}

const AvailableCards = ({
  availableCards,
  setAvailableCards,
}: AvailableCardsProps) => {

  function handleDeleteCard(cardName: string) {
    setAvailableCards(availableCards.filter((card) => card.name !== cardName));
    console.log({ yourCards: availableCards });
    console.log(
      `yourCards updated: ${JSON.stringify(
        availableCards.filter((card: any) => card.name !== cardName)
      )}`
    );
  }

  function handleUpdateCard(cardName: string, number: number) {
    setAvailableCards(
      availableCards.map((card) =>
        card.name === cardName ? { ...card, number: number } : card
      )
    );
  }

  return (
    <Box>
      <Typography sx={{
        fontFamily: "Ubuntu",
        fontWeight: "bold",
        marginBottom: "10px",
      }}>
        Available cards
      </Typography>
      {availableCards.map((card, index) => {
        console.log(card);
        return (
          <>
            <CardItem
              key={index}
              cardName={card.name}
              numberCards={card.number}
              handleDeleteCard={handleDeleteCard}
              handleUpdateCard={handleUpdateCard}
            />
            <br />
          </>
        );
      })}
    </Box>
  );

};

export default AvailableCards;
