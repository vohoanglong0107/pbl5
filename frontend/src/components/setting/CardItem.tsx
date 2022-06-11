import { Box, Grid, Input, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { ChangeEvent, useEffect, useState } from "react";
interface CardItemProps {
  cardName: string;
  numberCards: number;
  handleDeleteCard: (cardName: string) => void;
  handleUpdateCard: (cardName: string, number: number) => void;
}

const CardItem = ({
  cardName,
  numberCards,
  handleDeleteCard,
  handleUpdateCard,
}: CardItemProps) => {
  console.log({ cardName, numberCards });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const val = parseInt(event.target.value);
    if (isNaN(val)) handleUpdateCard(cardName, 0);
    else handleUpdateCard(cardName, val);
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
        <DeleteIcon
          sx={{ color: "#50E3C2" }}
          onClick={() => handleDeleteCard(cardName)}
        />
      </Grid>
    </Grid>
  );
};

export default CardItem;
