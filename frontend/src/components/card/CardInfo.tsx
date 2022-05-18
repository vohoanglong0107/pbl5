import { Paper } from "@mui/material";
import Card from "./Card";

interface CardInfoProps {
  card: Card;
}

const CardInfo = ({ card }: CardInfoProps) => {
  return (
    <Paper
      sx={{
        width: "120px",
        height: "200px",
        backgroundColor: "yellow",
      }}
    >
      {card.commandId}
    </Paper>
  );
};

export default CardInfo;
