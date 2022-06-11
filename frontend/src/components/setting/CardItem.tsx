import { Box, Grid, Input, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { ChangeEvent, useState } from "react";
interface CardItemProps {
  cardName: string;
  numberOfCards: number;
  yourCards: string[];
  handleDeleteCard: any;
}

const CardItem = ({ cardName, numberOfCards, yourCards, handleDeleteCard }: CardItemProps) => {
  const [numberCards, setNumberCards] = useState(numberOfCards);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const val = parseInt(event.target.value);
    if (isNaN(val)) setNumberCards(0);
    else setNumberCards(val);
  }

  
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography sx={{ fontFamily: "Montserrat" }}>{cardName}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Input
          sx={{ fontFamily: "Montserrat" }}
          value={numberCards}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={2}>
        <DeleteIcon sx={{ color: "#50E3C2" }} onClick={()=>handleDeleteCard(cardName)}/>
      </Grid>
    </Grid>
  );
};

export default CardItem;
