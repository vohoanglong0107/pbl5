import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import CardItem from "./CardItem";

interface AvailableCardsProps {
  yourCards: any[];
  setNotInDeckCards: any;
  setYourCards: any;
}

const AvailableCards = ({ yourCards, setNotInDeckCards, setYourCards }: AvailableCardsProps) => {

  function handleDeleteCard(cardName: string) {
    setYourCards(yourCards.filter((card : any) => card.name !== cardName));
    console.log({yourCards});
    setNotInDeckCards((prevCards: any) => {
      return [...prevCards, cardName];
     })
  }

   useEffect(() => {
    //refresh availableCards
    console.log("hihi");
  }, [yourCards])
  return (
    <Box>
      <Typography sx={{ marginBottom: "10px", fontFamily: "Montserrat" }}>
        Available cards
      </Typography>
      {yourCards.map((card, index) => {
        return (
          <>
            <CardItem
              key={index}
              cardName={card.name}
              numberOfCards={card.number}
              yourCards={yourCards}
              handleDeleteCard={handleDeleteCard}
            />
            <br />
          </>
        );
      })}
    </Box>
  );
};

export default AvailableCards;
