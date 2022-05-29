import Image from "next/image";
import AvatarImage from "../../assets/icon.png";
import { Delete } from "@mui/icons-material";
import {
  Grid,
  Button,
  Typography,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectPlayers } from "@/lib/selector";

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
