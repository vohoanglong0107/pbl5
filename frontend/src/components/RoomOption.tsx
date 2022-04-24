import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  choices: string[];
}

function Options(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, choices } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Explode with your kittens!</DialogTitle>
      <List sx={{ pt: 0 }}>
        {choices.map((choice, id) => (
          <Link
            key={id}
            target="_blank"
            href="/create-game"
            rel="noopener noreferrer"
            underline="none"
            color="inherit"
          >
            <ListItem
              button
              onClick={() => handleListItemClick(choice)}
              key={choice}
            >
              <ListItemText primary={choice} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Dialog>
  );
}

export default Options;
