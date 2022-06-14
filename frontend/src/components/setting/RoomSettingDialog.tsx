import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SettingIcon from "@/assets/setting.png";
import Image from "next/image";
import { Divider, Typography, Box, Slider, Grid, Input } from "@mui/material";
import Link from "next/link";
import SetTime from "./SetTime";
import CardItem from "./CardItem";
import AddNewCard from "./AddNewCard";
import AvailableCards from "./AvailableCards";
import { defaultCards, allTypeOfCards } from "./CardSetting";
import { socketClient } from "@/lib/SocketClient";
import GameSetting from "./GameSetting"

interface RoomSettingDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const RoomSettingDialog = ({ open, setOpen }: RoomSettingDialogProps) => {
  // const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState({
    turnTime: 10,
    target: 10,
    nope: 10,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [yourCards, setYourCards] = useState(defaultCards);

  const roomID = "roomID";



  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    let gameSetting: GameSetting = {
      maxPlayers: 8,
      targetingTime: sliderValue.target,
      turnTime: sliderValue.turnTime,
      cardSetting: yourCards
    }
    socketClient.emit("room:setting", gameSetting);
    setOpen(false);
  };

  const handleSliderChange = (event: Event) => {
    const { name, value } = event.target;
    setSliderValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSliderValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value === "" ? "" : Number(value),
      };
    });
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (
      sliderValue.turnTime < 10 ||
      sliderValue.target < 10 ||
      sliderValue.nope < 10
    )
      setSliderValue((prevValue) => {
        return {
          ...prevValue,
          [name]: 10,
        };
      });
    else if (
      sliderValue.turnTime > 100 ||
      sliderValue.target > 100 ||
      sliderValue.nope > 100
    ) {
      setSliderValue((prevValue) => {
        return {
          ...prevValue,
          [name]: 100,
        };
      });
    }
  };


  return (
    <Box>
      <Button onClick={handleClickOpen} sx={{
        ...(open && { display: "none" }),
        position: "relative",
        right: "10px",
      }}>
        <Image
          src={SettingIcon.src}
          alt="setting-icon"
          width={30}
          height={30}
        />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: "rgba(6, 40, 61, 0.9)",
            display: "inline-flex",
            borderStyle: "none",
          }}
        >
          <Typography
            sx={{
              color: "#00FFC6",
              margin: "auto 0",
              marginRight: "5px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
          >
            SETTING
          </Typography>
          <Image
            src={SettingIcon.src}
            alt="setting-icon"
            width={30}
            height={30}
          />
        </DialogTitle>
        <Divider sx={{ backgroundColor: "#00FFC6" }} />
        <DialogContent
          sx={{
            width: "600px",
            backgroundColor: "rgba(6, 40, 61, 0.8)",
            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#BADFDB",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(6, 40, 61, 0.9)",
              borderRadius: 0,
            },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "white" }}
          >
            <Box sx={{ display: "inline-flex", padding: "15px" }}>
              <Typography sx={{ fontFamily: "Ubuntu", fontWeight: "bold" }}>
                ROOM ID:
              </Typography>
              <Link href="#" passHref>
                <Typography
                  sx={{
                    marginLeft: "10px",
                    color: "#1de9b6",
                    textDecoration: "underline",
                    fontFamily: "Montserrat",
                  }}
                >
                  {roomID}
                </Typography>
              </Link>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ padding: "15px" }}>
              <Typography
                sx={{
                  fontFamily: "Ubuntu",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Set time
              </Typography>
              {/* Time limit each turn */}

              <SetTime
                title={"Time limit each turn"}
                name={"turnTime"}
                value={sliderValue.turnTime}
                handleSliderChange={handleSliderChange}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
              />
              {/* Time limit on target */}
              <SetTime
                title={"Time limit on targeting"}
                name={"target"}
                value={sliderValue.target}
                handleSliderChange={handleSliderChange}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
              />
              {/* Time limit fpr nope */}
              <SetTime
                title={"Time limit for nope"}
                name={"nope"}
                value={sliderValue.nope}
                handleSliderChange={handleSliderChange}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
              />
            </Box>
            <Divider variant="middle" />
            <Box sx={{ padding: "15px" }}>
              <Typography
                sx={{
                  fontFamily: "Ubuntu",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Set Deck
              </Typography>
              <AddNewCard availableCards={yourCards} setAvailableCards={setYourCards} />
              <AvailableCards availableCards={yourCards} setAvailableCards={setYourCards} />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "rgba(6, 40, 61, 0.9)" }}>
          <Button onClick={handleClose} sx={{ color: "#BADFDB" }}>
            Cancel
          </Button>
          <Button onClick={handleSave} sx={{ color: "#BADFDB" }} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoomSettingDialog;
