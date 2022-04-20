import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
        {choices.map((choice) => (
          <ListItem
            button
            onClick={() => handleListItemClick(choice)}
            key={choice}
          >
            <ListItemText primary={choice} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default Options;
