import { Dialog, DialogTitle, Stack, Box } from "@mui/material";
import Card from "../card/Card";
import CardDetail from "../card/CardDetail";

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
      <Stack direction={"row"} border="1px solid black " sx={{
        padding: '20px',
        backgroundColor: '#413F42',
      }}>
        {cards.map((card, index) => (
          <CardDetail key={index} card={card} height={"25vh"} />
        ))}
      </Stack>
    </Dialog>
  );
}
