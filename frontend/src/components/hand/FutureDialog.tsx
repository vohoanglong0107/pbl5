import { Dialog, DialogTitle, Stack, Paper } from "@mui/material";
import Card from "../card/Card";
import CardInfo from "../card/CardInfo";

interface FutureDialogProps {
  open: boolean;
  onClose: () => void;
  cards: Card[];
}

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
          <CardInfo key={card.id} card={card} />
        ))}
      </Stack>
    </Dialog>
  );
}
