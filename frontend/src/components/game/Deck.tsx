import { Box, Paper } from "@mui/material";

const Deck = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <Paper
        elevation={3}
        sx={{ backgroundColor: "brown", width: "50%", height: "100%" }}
      ></Paper>
    </Box>
  );
};

export default Deck;
