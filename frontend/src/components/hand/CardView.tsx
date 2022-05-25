import { Paper, Tooltip, keyframes, Box } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import CardDetail from "../card/CardDetail";
import deckImage from "@/assets/CardCovers.webp";

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
  return <CardDetail card={card} height="25vh" />;
};

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
    <Tooltip title={<CardToolTip card={card} />}>
      <Box
        sx={{
          "&:last-child": {
            overflow: "visible",
          },
          "&:hover": {
            overflow: "visible",
          },
          overflow: localSelectedStatus ? "visible" : "hidden",
        }}
        height="100%"
        // wtf ?
        // width="100%"
      >
        <Box
          sx={{
            // width: "60px",
            // minWidth: "60px",
            height: "100%",
            aspectRatio: "290/380",
            // backgroundColor: "brown",
            "&:hover": {
              cursor: "pointer",
            },
            position: "relative",
            animation: animation,
            animationFillMode: "forwards",
          }}
          onClick={select}
        >
          <Image layout="fill" src={deckImage} alt={"card"}></Image>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default CardView;
