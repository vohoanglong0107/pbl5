import { Paper } from "@mui/material";
import Card from "./Card";

interface CardViewProps {
  card: Card;
}

const CardView = ({ card }: CardViewProps) => {
  return (
    <Paper
      sx={{
        width: "60px",
        height: "100px",
        backgroundColor: "brown",
      }}
    >
      {card.id}
    </Paper>
  );
};

export default CardView;
