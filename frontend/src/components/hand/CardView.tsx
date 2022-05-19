import { Paper, Tooltip, keyframes } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [localSelectedStatus, setLocalSelectedStatus] = useState(false);
  useEffect(() => {
    if (selected) {
      setAnimation(`${selectCardAnimation} 0.5s`);
    } else if (localSelectedStatus) {
      setAnimation(`${unselectCardAnimation} 0.5s`);
    }
  }, [selected, localSelectedStatus]);
  // Can't combine these 2 into one or stack blow up
  useEffect(() => {
    setLocalSelectedStatus(selected);
  }, [selected]);
  const select = () => {
    setLocalSelectedStatus(selected);
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
