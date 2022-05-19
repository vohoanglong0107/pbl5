import { Box, Paper } from "@mui/material";

// TODO: Allow hover above to see all discarded cards
const DiscardPile = () => {
  return (
    <Box width={"100%"} height={"100%"} p={1}>
      <Paper
        elevation={3}
        sx={{ backgroundColor: "brown", width: "100%", height: "100%" }}
      ></Paper>
    </Box>
  );
};

export default DiscardPile;
