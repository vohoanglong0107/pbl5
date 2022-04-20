import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from '@/styles/options.module.css';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";

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

