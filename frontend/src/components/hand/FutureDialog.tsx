import { Dialog, DialogTitle, Stack, Paper } from "@mui/material";
import Card from "../card/Card";

interface FutureDialogProps {
  open: boolean;
  onClose: () => void;
  cards: Card[];
}

const CardView = ({ card }: { card: Card }) => {
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

export default function FutureDialog({
  open,
  onClose,
  cards,
}: FutureDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <h1>Future</h1>
      </DialogTitle>
      <Stack direction={"row"} border="1px solid brown">
        {cards.map((card) => (
          <CardView key={card.id} card={card} />
        ))}
      </Stack>
    </Dialog>
  );
}
