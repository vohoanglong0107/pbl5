import homepageImage from "@/assets/homepage.jpg";
import Options from "@/components/RoomOption";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import type { NextPage } from "next";
import { useState } from "react";

const choices = ["Create room", "Join room", "Join random"];

const User: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(choices[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Container
      sx={{
        backgroundImage: `url(${homepageImage.src})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundPosition: "center",
      }}
      maxWidth={false}
    >
      <Button
        sx={{
          position: "absolute",
          bottom: "1rem",
          marginLeft: "auto",
          marginRight: "auto",
          left: "40%",
          width: "200px",
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}
        onClick={handleClickOpen}
      >
        Explode now!
      </Button>
      <Options
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        choices={choices}
      />
    </Container>
  );
};

export default User;
