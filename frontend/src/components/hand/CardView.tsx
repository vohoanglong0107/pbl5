import { Tooltip, Box } from "@mui/material";
import { keyframes } from "@mui/system";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import CardDetail from "../card/CardDetail";

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

const CardToolTip = ({ card }: { card: Card }) => {
  return <CardDetail card={card} height="35vh" />;
};

interface CardViewProps {
  card: Card;
  cardWidth: string;
  cardHeight: string;
  width: string;
  height: string;
  selected: boolean;
  setSelected: (selected: boolean) => void;
  hovering: boolean;
  setHovering: (hovering: boolean) => void;
}
const CardView = ({
  card,
  cardWidth,
  cardHeight,
  width,
  height,
  selected,
  setSelected,
  hovering,
  setHovering,
}: CardViewProps) => {
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
    <Tooltip title={<CardToolTip card={card} />}>
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          position: "relative",
          animation: animation,
          animationFillMode: "forwards",
          transition: "width 0.3s",
        }}
        onClick={select}
        width={width}
        height={height}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        <CardDetail card={card} height={cardHeight} width={cardWidth} />
      </Box>
    </Tooltip>
  );
};

export default CardView;
