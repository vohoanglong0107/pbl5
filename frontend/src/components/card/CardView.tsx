import { Paper, Tooltip, keyframes } from "@mui/material";
import { useState } from "react";
import Card from "./Card";

interface CardToolTipProps {
  card: Card;
}
const CardToolTip = ({ card }: CardToolTipProps) => {
  return (
    <Paper
      sx={{
        width: "120px",
        height: "200px",
        backgroundColor: "yellow",
      }}
    >
      {card.id}
    </Paper>
  );
};

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
  onSelect?: (isSelected: boolean) => void;
}
const CardView = ({ card, onSelect }: CardViewProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [animation, setAnimation] = useState("");
  const select = () => {
    if (isSelected) {
      setAnimation(`${unselectCardAnimation} 0.5s`);
    } else {
      setAnimation(`${selectCardAnimation} 0.5s`);
    }
    setIsSelected(!isSelected);
    onSelect && onSelect(!isSelected);
  };
  return (
    <Tooltip title={<CardToolTip card={card} />}>
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
