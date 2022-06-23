import { Box, Button, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch, SetStateAction, useState } from "react";
import { allTypeOfCards, CardSetting } from "./CardSetting";

interface AddNewCardProps {
  availableCards: CardSetting[];
  setAvailableCards: Dispatch<SetStateAction<CardSetting[]>>;
}

const AddNewCard = ({ availableCards, setAvailableCards }: AddNewCardProps) => {
  const chosenCards = availableCards.map((card) => card.name);
  const notInDeckCards = allTypeOfCards.filter(
    (cardType) => !chosenCards.includes(cardType)
  );

  const [card, setCard] = useState<number>();

  const handleChangeCard = (event: SelectChangeEvent<number>) => {
    const id = event.target.value;
    console.log(id);
    if (typeof id === "string") {
      setCard(parseInt(id));
    } else {
      setCard(id);
    }
  };

  const handleAddCard = () => {
    if (card) {
      setAvailableCards((prevCards) => {
        return [...prevCards, { name: notInDeckCards[card], number: 1 }];
      });
      setCard(undefined);
    }
  };

  return (
    <Box sx={{ display: "inline-flex", marginBottom: "10px" }}>
      <Typography
        sx={{
          width: "100%",
          margin: "auto 0",
          fontFamily: "Montserrat",
        }}
      >
        Add new card
      </Typography>
      <Box
        sx={{
          minWidth: "120",
          margin: "auto 20px",
          borderColor: "white",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Card</InputLabel>
          <Select
            sx={{
              color: "white",
              width: "200px",
              fontFamily: "Montserrat",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Card"
            onChange={handleChangeCard}
            value={card}
          >
            {notInDeckCards.map((card, index) => (
              <MenuItem key={index} value={index}>
                {card}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        sx={{
          fontFamily: "Ubuntu",
          fontWeight: "bold",
          color: "#394A51",
          backgroundColor: "#BADFDB",
          "&:hover": {},
        }}
        onClick={handleAddCard}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddNewCard;
