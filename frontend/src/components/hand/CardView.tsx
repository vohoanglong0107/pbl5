import { Paper, Tooltip, keyframes } from "@mui/material";
import { useState } from "react";
import Card from "../card/Card";
import CardInfo from "../card/CardInfo";

const selectCardAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20%);
  }
`;

const unselectCardAnimation = keyframes`
  from {
    transform: translateY(-20%);
  }
  to {
    transform: translateY(0);
  }
`;
interface CardViewProps {
  card: Card;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}
const CardView = ({ card, selected, setSelected }: CardViewProps) => {
  const [animation, setAnimation] = useState("");
  const select = () => {
    if (selected) {
      setAnimation(`${unselectCardAnimation} 0.5s`);
    } else {
      setAnimation(`${selectCardAnimation} 0.5s`);
    }
    setSelected(!selected);
  };
  return (
    <Tooltip title={<CardInfo card={card} />}>
      <Paper
        sx={{
          width: "60px",
          height: "100px",
          backgroundColor: "brown",
          "&:hover": {
            cursor: "pointer",
          },
          animation: animation,
          animationFillMode: "forwards",
        }}
        onClick={select}
      >
        {card.id}
      </Paper>
    </Tooltip>
  );
};

export default CardView;
