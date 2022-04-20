import logo from "../assets/icon.png";
import { Box, ThemeProvider, Typography } from "@mui/material";
import Image from "next/image";
import { createTheme } from "@mui/system";

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: ["Palette Mosaic", "cursive"].join(","),
      fontSize: "25px",
    },
  },
});
const TopNav = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box display={"inline-flex"}>
        <Image src={logo} width={50} height={50} alt="no" />
        <Typography variant="h3" color={"#FFD365"}>
          Exploding kittens
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default TopNav;
