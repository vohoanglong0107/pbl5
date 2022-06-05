import { selectPlayers } from "@/lib/selector";
import { Delete } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import AvatarImage from "../../assets/icon.png";

const KickablePlayer = () => {
  const players = useSelector(selectPlayers);
  return (
    <>
      {players.map((player, index) => {
        return (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton>
                <Delete />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar src={AvatarImage.src} />
            </ListItemAvatar>
            <ListItemText primary={player.username} />
          </ListItem>
        );
      })}
    </>
  );
};
export default KickablePlayer;
